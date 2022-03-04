import {
  PathItemElement,
  ParameterElement,
  RequestBodyElement,
  ResponseElement,
  OperationElement,
  isStringElement,
  isObjectElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

const plugin = () => () => {
  let operationIdentifiers: string[][] = [];
  let responseIdentifiers: string[][] = [];

  return {
    visitor: {
      OperationElement: {
        enter(element: OperationElement, ...rest: any) {
          const [, , , ancestors] = rest;
          const parentPathItem: PathItemElement = ancestors[ancestors.length - 2];

          operationIdentifiers.push(
            ['http', 'transaction'],
            ['http', 'request'],
            ['http', 'request', 'url'],
            ['http', 'request', 'url', parentPathItem.meta.get('path').toValue()],
            ['http', 'request', 'method'],
            ['http', 'request', 'method', element.meta.get('http-method').toValue().toLowerCase()],
          );

          // fold PathItem.parameters to Operation.parameters
          // @ts-ignore
          parentPathItem?.parameters?.forEach((parameter: ParameterElement) => {
            if (
              isStringElement(parameter.in) &&
              isStringElement(parameter.name) &&
              parameter.in.toValue() === 'header'
            ) {
              operationIdentifiers.push(
                ['http', 'request', 'header'],
                ['http', 'request', 'header', parameter.name.toValue()],
                ['http', 'message', 'header'],
                ['http', 'message', 'header', parameter.name.toValue()],
              );
            }
          });
        },
        leave(element: OperationElement) {
          element.setMetaProperty('ads-s-standard-identifier', operationIdentifiers);
          operationIdentifiers = [];
        },
      },
      ParameterElement(element: ParameterElement) {
        if (
          isStringElement(element.in) &&
          isStringElement(element.name) &&
          element.in.toValue() === 'header'
        ) {
          operationIdentifiers.push(
            ['http', 'request', 'header'],
            ['http', 'request', 'header', element.name.toValue()],
            ['http', 'message', 'header'],
            ['http', 'message', 'header', element.name.toValue()],
          );
        }
      },
      RequestBodyElement(element: RequestBodyElement) {
        if (!isObjectElement(element.contentProp)) return;

        operationIdentifiers.push(['http', 'request', 'body'], ['http', 'message', 'body']);

        if (typeof element.contentProp !== 'undefined' && isObjectElement(element.contentProp)) {
          element.contentProp.forEach(() => {
            operationIdentifiers.push(
              ['http', 'request', 'header'],
              ['http', 'request', 'header', 'Content-Type'],
              ['http', 'message', 'header'],
              ['http', 'message', 'header', 'Content-Type'],
            );
          });
        }
      },
      ResponseElement: {
        enter(element: ResponseElement) {
          responseIdentifiers.push(['http', 'response']);

          if (element.meta.hasKey('http-status-code')) {
            const statusCode = String(element.meta.get('http-status-code').toValue());
            const statusCodeAlias = statusCode.startsWith('2')
              ? 'success'
              : statusCode.startsWith('3')
              ? 'redirect'
              : statusCode.startsWith('4')
              ? 'client_error'
              : statusCode.startsWith('5')
              ? 'sever_error'
              : 'unknown';

            responseIdentifiers.push(
              ['http', 'response', 'status_code'],
              ['http', 'response', 'status_code', statusCode],
              ['http', 'response', 'status_code', statusCodeAlias],
            );
          }

          if (typeof element.headers !== 'undefined' && isObjectElement(element.headers)) {
            element.headers.forEach((value, key) => {
              const headerName = key.toValue();

              responseIdentifiers.push(
                ['http', 'response', 'header'],
                ['http', 'response', 'header', headerName],
                ['http', 'message', 'header', headerName],
              );
            });
          }

          if (typeof element.contentProp !== 'undefined' && isObjectElement(element.contentProp)) {
            responseIdentifiers.push(['http', 'response', 'body'], ['http', 'message', 'body']);

            element.contentProp.forEach((value, key) => {
              const headerName = key.toValue();

              responseIdentifiers.push(
                ['http', 'response', 'header'],
                ['http', 'response', 'header', headerName],
                ['http', 'message', 'header', headerName],
              );
            });
          }
        },
        leave(element: ResponseElement) {
          element.setMetaProperty('ads-s-standard-identifier', responseIdentifiers);
          responseIdentifiers = [];
        },
      },
    },
  };
};

export default plugin;
