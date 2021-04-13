import stampit from 'stampit';
import { ObjectElement, Element } from 'apidom';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement, isSchemaLikeElement } from '../../../predicates';

const SchemasVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isSchemaLikeElement(element)
        ? ['document', 'objects', 'Schema']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('schemas');
  },
});

export default SchemasVisitor;
