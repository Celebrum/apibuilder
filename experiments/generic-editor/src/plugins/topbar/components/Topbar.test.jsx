import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Topbar from './Topbar';
import LinkHome from './LinkHome'; // from swagger-ui
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import FileMenuDropdown from './FileMenuDropdown';
import EditMenuDropdown from './EditMenuDropdown';
import ImportFileDropdownItem from './ImportFileDropdownItem';
import GeneratorMenuDropdown from './GeneratorMenuDropdown';
import SaveAsJsonOrYaml from './SaveAsJsonOrYaml';
import * as topbarActions from '../actions';

// mock es6 re-exports
jest.mock('../actions');

test('renders Topbar with required components', async () => {
  // These two spies are needed to render the GeneratorMenuDropdown component
  const spyGeneratorList = jest
    .spyOn(topbarActions, 'instantiateGeneratorClient')
    .mockImplementation(() => ({
      servers: ['blue', 'brown'],
      clients: ['apple', 'avocado'],
      specVersion: 'some string',
    }));

  const spyShouldReInstantiate = jest
    .spyOn(topbarActions, 'shouldReInstantiateGeneratorClient')
    .mockImplementation(() => {
      return false;
    });

  // These two spies are needed to render the FileMenuDropdown component
  const spyLanguageFormat = jest
    .spyOn(topbarActions, 'getDefinitionLanguageFormat')
    .mockImplementation(() => ({
      languageFormat: 'yaml',
    }));
  const spyShouldUpdateLanguageFormat = jest
    .spyOn(topbarActions, 'shouldUpdateDefinitionLanguageFormat')
    .mockImplementation(() => ({
      languageFormat: 'yaml',
      shouldUpdate: false,
    }));

  const components = {
    LinkHome,
    DropdownMenu,
    DropdownItem,
    FileMenuDropdown,
    EditMenuDropdown,
    ImportFileDropdownItem,
    GeneratorMenuDropdown,
    SaveAsJsonOrYaml,
  };

  render(
    <Topbar
      getComponent={(c) => {
        return components[c];
      }}
      topbarActions={topbarActions}
    />
  );

  // GeneratorMenuDropdown:1: async http call
  await waitFor(() => expect(spyGeneratorList).toBeCalled());
  // top-level dropdown menu. currently 4 menu items.
  const linkElement1 = screen.getByText(/File/i);
  await waitFor(() => linkElement1);
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Edit/i);
  await waitFor(() => linkElement2);
  expect(linkElement2).toBeInTheDocument();
  // element dependent on async mock resolve
  const linkElement3 = screen.getByText(/Generate Server/i);
  await waitFor(() => linkElement3);
  expect(linkElement3).toBeInTheDocument();
  // element dependent on async mock resolve
  const linkElement4 = screen.getByText(/Generate Client/i);
  await waitFor(() => linkElement4);
  expect(linkElement4).toBeInTheDocument();
  // GeneratorMenuDropdown:2: action method call
  expect(spyShouldReInstantiate).toBeCalled();
  // FileMenuDropdown: action methods call
  expect(spyLanguageFormat).toBeCalled();
  expect(spyShouldUpdateLanguageFormat).toBeCalled();
});
