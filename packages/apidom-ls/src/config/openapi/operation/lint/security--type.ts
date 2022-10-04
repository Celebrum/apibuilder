import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_OPERATION_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation-security'],
  marker: 'value',
  target: 'security',
  data: {},
};

export default securityTypeLint;
