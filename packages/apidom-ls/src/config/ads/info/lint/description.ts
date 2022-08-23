import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoDescriptionLint: LinterMeta = {
  code: ApilintCodes.ADS_INFO_INFO_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: 'description must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default infoDescriptionLint;