import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const InfoVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Info']),
  },
  init() {
    this.element = new this.namespace.elements.Info();
  },
});

export default InfoVisitor;
