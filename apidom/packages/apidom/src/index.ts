import { has } from 'ramda';
import { isPlainObject, isString } from 'ramda-adjunct';
import { NamespacePlugin, Element, Namespace as INamespace } from 'minim';

import './refractor/registration';
import defaultNamespaceInstance, { Namespace as ApiDOMNamespace } from './namespace';

export {
  Element,
  ObjectElement,
  MemberElement,
  ArrayElement,
  BooleanElement,
  StringElement,
  NullElement,
  NumberElement,
  RefElement,
  LinkElement,
  KeyValuePair,
  ObjectSlice,
  ArraySlice,
} from 'minim';
export { default as namespace, Namespace } from './namespace';
export { default as AnnotationElement } from './elements/Annotation';
export { default as CommentElement } from './elements/Comment';
export { default as ParseResultElement } from './elements/ParseResult';
export { default as SourceMapElement } from './elements/SourceMap';

export {
  isElement,
  isStringElement,
  isNumberElement,
  isNullElement,
  isBooleanElement,
  isArrayElement,
  isObjectElement,
  isMemberElement,
  isLinkElement,
  isRefElement,
  isAnnotationElement,
  isParseResultElement,
  isSourceMapElement,
  isPrimitiveElement,
  hasElementSourceMap,
  includesSymbols,
  includesClasses,
} from './predicates';
export { default as createPredicate } from './predicates/helpers';

export { filter, reject, find, findAtOffset, some, traverse, parents } from './traversal';
export {
  visit,
  BREAK,
  mergeAllVisitors,
  getNodeType,
  keyMapDefault as keyMap,
} from './traversal/visitor';
export { transclude, default as Transcluder } from './transcluder';
export { dereference } from './util';

export const createNamespace = (namespacePlugin?: NamespacePlugin): ApiDOMNamespace => {
  const namespace = new ApiDOMNamespace();

  if (isPlainObject(namespacePlugin)) {
    namespace.use(namespacePlugin);
  }

  return namespace;
};

/**
 * Transforms data to an Element from a particular namespace.
 */
export const from = (data: any, namespace: INamespace = defaultNamespaceInstance): Element => {
  if (isString(data)) {
    // JSON serialized refract
    return namespace.fromRefract(JSON.parse(data));
  }
  if (isPlainObject(data) && has('element', data)) {
    // refract javascript structure
    return namespace.fromRefract(data);
  }

  return namespace.toElement(data);
};

/**
 * Transforms the ApiDOM into JavaScript POJO.
 * This POJO would be the result of interpreting the ApiDOM
 * into JavaScript structure.
 */
export const toValue = (element: Element): any => element.toValue();

/**
 * Creates a refract representation of an Element.
 * https://github.com/refractproject/refract-spec
 */
export const dehydrate = (
  element: Element,
  namespace: INamespace = defaultNamespaceInstance,
): Record<string, any> => {
  return namespace.toRefract(element);
};

/**
 * Create a refracted string representation of an Element.
 */
export const toString = (
  element: Element,
  namespace: INamespace = defaultNamespaceInstance,
): string => {
  const refract = dehydrate(element, namespace);
  return JSON.stringify(refract);
};

export { default as sexprs } from './sexprs';
