import AsyncApi2_0Element from '../elements/AsyncApi2-0';
import AsyncApiVersionElement from '../elements/AsyncApiVersion';
import ChannelBindingsElement from '../elements/ChannelBindings';
import ChannelItemElement from '../elements/ChannelItem';
import ChannelsElement from '../elements/Channels';
import ComponentsElement from '../elements/Components';
import ContactElement from '../elements/Contact';
import CorrelationIDElement from '../elements/CorrelationID';
import IdentifierElement from '../elements/Identifier';
import InfoElement from '../elements/Info';
import LicenseElement from '../elements/License';
import OperationElement from '../elements/Operation';
import ParameterElement from '../elements/Parameter';
import ParametersElement from '../elements/Parameters';
import ReferenceElement from '../elements/Reference';
import SchemaElement from '../elements/Schema';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import ServerElement from '../elements/Server';
import ServerBindingsElement from '../elements/ServerBindings';
import ServersElement from '../elements/Servers';
import ServerVariableElement from '../elements/ServerVariable';
import { createRefractor } from './index';

// register refractors specific to element types
AsyncApi2_0Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AsyncApi',
  '$visitor',
]);
AsyncApiVersionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AsyncApiVersion',
  '$visitor',
]);
ChannelBindingsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelBindings',
  '$visitor',
]);
ChannelItemElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelItem',
  '$visitor',
]);
ChannelsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Channels',
  '$visitor',
]);
ComponentsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Components',
  '$visitor',
]);
ContactElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Contact',
  '$visitor',
]);
CorrelationIDElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'CorrelationID',
  '$visitor',
]);
IdentifierElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Identifier',
  '$visitor',
]);
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
LicenseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'License',
  '$visitor',
]);
OperationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Operation',
  '$visitor',
]);
ParameterElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameter',
  '$visitor',
]);
ParametersElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameters',
  '$visitor',
]);
ReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Reference',
  '$visitor',
]);
SchemaElement.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
SecurityRequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);
ServerElement.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerBindingsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerBindings',
  '$visitor',
]);
ServersElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Servers',
  '$visitor',
]);
ServerVariableElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);
