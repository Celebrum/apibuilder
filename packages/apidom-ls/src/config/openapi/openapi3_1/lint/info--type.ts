import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_INFO_TYPE,
  source: 'apilint',
  message: 'info must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['info'],
  marker: 'value',
  target: 'info',
  data: {},
};

export default infoTypeLint;