import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_OPERATION_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: 'summary must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
};

export default summaryTypeLint;