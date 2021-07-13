import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ReactModal from 'react-modal';

import FileMenuDropdown from './FileMenuDropdown';
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import ImportFileDropdownItem from './ImportFileDropdownItem';
import SaveAsJsonOrYaml from './SaveAsJsonOrYaml';
import * as topbarActions from '../actions';

ReactModal.setAppElement('*'); // suppresses modal-related test warnings.
// mock es6 re-exports
jest.mock('../actions');

describe('renders FileMenuDropdown', () => {
  beforeEach(() => {
    // These two spies are needed to render the FileMenuDropdown component
    // Note that mocking these two spies does not cause state change in test
    // eslint-disable-next-line no-unused-vars
    const spyLanguageFormat = jest
      .spyOn(topbarActions, 'getDefinitionLanguageFormat')
      .mockImplementation(() => ({
        languageFormat: 'yaml',
      }));
    // eslint-disable-next-line no-unused-vars
    const spyShouldUpdateLanguageFormat = jest
      .spyOn(topbarActions, 'shouldUpdateDefinitionLanguageFormat')
      .mockImplementation(() => ({
        languageFormat: 'yaml',
        shouldUpdate: false,
      }));

    const components = {
      DropdownItem,
      DropdownMenu,
      ImportFileDropdownItem,
      SaveAsJsonOrYaml,
    };

    render(
      <FileMenuDropdown
        getComponent={(c) => {
          return components[c];
        }}
        topbarActions={topbarActions}
      />
    );
  });

  test('should include File as the menu description', async () => {
    const linkElement = screen.getByText(/File/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('on dropdown, should be able to click on "Import URL', async () => {
    // only call spy if user input in prompt/modal is mocked
    // const spy = jest.spyOn(topbarActions, 'importFromURL').mockImplementation();
    const linkElement = screen.getByText(/File/i);
    fireEvent.click(linkElement);

    const buttonElement = screen.getByText('Import URL');
    await waitFor(() => buttonElement);
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    const modalElement = screen.getByText('Enter the URL to import from');
    await waitFor(() => modalElement);
    expect(modalElement).toBeInTheDocument();

    // we could mock user input, then click "submit"
    // expect(spy).toBeCalled();
  });

  test('on dropdown, should be able to click on "Import File', async () => {
    const linkElement = screen.getByText(/File/i);
    fireEvent.click(linkElement);

    const buttonElement = screen.getByText('Import File');
    await waitFor(() => buttonElement);
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    // we may be able to check that the file dialog box opens
    // then we could define a file to upload with "userEvent.upload",
    // then we could mock topbarActions, to check calls.length
    // though as user, Dropdown doesn't see changes to editor or swagger-ui, or modals
  });

  test('on dropdown, should be able to click on "Clear Editor', async () => {
    const spy = jest.spyOn(topbarActions, 'clearEditor').mockImplementation();
    const linkElement = screen.getByText(/File/i);
    fireEvent.click(linkElement);

    const buttonElement = screen.getByText('Clear Editor');
    await waitFor(() => buttonElement);
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(spy).toBeCalled();
    // topbar doesn't render editor, so no other user visible changes
  });

  test('on dropdown, should render partial text: "Save (as', async () => {
    // ref: SaveAsJsonOrYaml component test for display toggle
    const linkElement = screen.getByText(/File/i);
    fireEvent.click(linkElement);

    const buttonElement = screen.getByText(/Save \(as/);
    await waitFor(() => buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });

  test('on dropdown, should rener partial text: "Convert and save as', async () => {
    // ref: SaveAsJsonOrYaml component test for display toggle
    const linkElement = screen.getByText(/File/i);
    fireEvent.click(linkElement);

    const buttonElement = screen.getByText(/Convert and save as/);
    await waitFor(() => buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });
});

describe.skip('importUrl e2e', () => {
  // todo: refactor descriptions once implemented
  // ref: importedData.data/importedData.error are references within component
  // todo: could also implement equivalent topbarActions.importFromURL unit tests
  test('(normal) user clicks on link, but then clicks on cancel prompt.', async () => {});
  test('(default) user clicks on link, inputs valid url is valid; importedData.data exists && importedData.error does not exist', async () => {});
  test('(normal) user clicks on link, but inputs an invalid url; importedData.error exists && importedData.data does not exist', async () => {});
  test('(exception) user clicks on link, inputs valid url is valid; should not see a case where both importedData.data && importedData.error exists', async () => {});
});
