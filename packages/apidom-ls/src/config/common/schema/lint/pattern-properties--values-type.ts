import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const patternPropertiesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERNPROPERTIES,
  source: 'apilint',
  message: 'patternProperties members must be schema objects or boolean JSON schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema', 'boolean']],
  marker: 'key',
  markerTarget: 'patternProperties',
  target: 'patternProperties',
  data: {},
};

export default patternPropertiesValuesTypeLint;
