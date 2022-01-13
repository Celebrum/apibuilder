import httpMessageBindingAllowedFieldsLint from './allowed-fields';
import headersLint from './headers';
import headersPropertiesLint from './headers-properties';
import bindingVersionLint from './bindingVersion';

const httpMessageBindingLints = [
  httpMessageBindingAllowedFieldsLint,
  headersLint,
  headersPropertiesLint,
  bindingVersionLint,
];

export default httpMessageBindingLints;
