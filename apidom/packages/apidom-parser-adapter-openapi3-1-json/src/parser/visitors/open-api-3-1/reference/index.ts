import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ReferenceVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Reference']),
  },
  init() {
    this.element = new this.namespace.elements.Reference();
  },
});

export default ReferenceVisitor;
