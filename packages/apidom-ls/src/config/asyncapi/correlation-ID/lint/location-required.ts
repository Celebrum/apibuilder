import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const correlationIDLocationRequiredLint: LinterMeta = {
  code: ApilintCodes.CORRELATIONID_LOCATION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'location'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['location'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'location' field",
        action: 'addChild',
        snippetYaml: 'location: \n  ',
        snippetJson: '"location": "",\n    ',
      },
    ],
  },
};

export default correlationIDLocationRequiredLint;