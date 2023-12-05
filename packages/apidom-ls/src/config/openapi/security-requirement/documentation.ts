import { OpenAPI30, OpenAPI31 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#securityRequirementObject)\n\nLists the required security schemes to execute this operation.\nThe name used for each property MUST correspond to a security scheme declared in the [Security Schemes](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsSecuritySchemes) under the [Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsObject).\n\nSecurity Requirement Objects that contain multiple schemes require that all schemes MUST be satisfied for a request to be authorized.\nThis enables support for scenarios where multiple query parameters or HTTP headers are required to convey security information.\n\nWhen a list of Security Requirement Objects is defined on the [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#oasObject) or [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject), only one of the Security Requirement Objects in the list needs to be satisfied to authorize the request.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | [`string`] | Each name MUST correspond to a security scheme which is declared in the [Security Schemes](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsSecuritySchemes) under the [Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#componentsObject). If the security scheme is of type `"oauth2"` or `"openIdConnect"`, then the value is a list of scope names required for the execution, and the list MAY be empty if authorization does not require a specified scope. For other security scheme types, the array MUST be empty.\n\n##### Security Requirement Object Examples\n\n###### Non-OAuth2 Security Requirement\n\n\n\\\nJSON\n```json\n{\n  "api_key": []\n}\n```\n\n\n\\\nYAML\n```yaml\napi_key: []\n```\n\n###### OAuth2 Security Requirement\n\n```json\n{\n  "petstore_auth": [\n    "write:pets",\n    "read:pets"\n  ]\n}\n```\n\n```yaml\npetstore_auth:\n- write:pets\n- read:pets\n```\n\n###### Optional OAuth2 Security\n\nOptional OAuth2 security as would be defined in an [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#openapi-object) or an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operation-object):\n\n```json\n{\n  "security": [\n    {},\n    {\n      "petstore_auth": [\n        "write:pets",\n        "read:pets"\n      ]\n    }\n  ]\n}\n```\n\n```yaml\nsecurity:\n  - {}\n  - petstore_auth:\n    - write:pets\n    - read:pets\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityRequirementObject)\n\nLists the required security schemes to execute this operation. The name used for each property MUST correspond to a security scheme declared in the Security Schemes under the [Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject).\n\n\\\nSecurity Requirement Objects that contain multiple schemes require that all schemes MUST be satisfied for a request to be authorized. This enables support for scenarios where multiple query parameters or HTTP headers are required to convey security information.\n\n\\\nWhen a list of Security Requirement Objects is defined on the [OpenAPI Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasObject) or [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject), only one of the Security Requirement Objects in the list needs to be satisfied to authorize the request.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | [`string`] | Each name MUST correspond to a security scheme which is declared in the Security Schemes under the [Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject). If the security scheme is of type `"oauth2"` or `"openIdConnect"`, then the value is a list of scope names required for the execution, and the list MAY be empty if authorization does not require a specified scope. For other security scheme types, the array MAY contain a list of role names which are required for the execution, but are not otherwise defined or exchanged in-band.\n\n##### Security Requirement Object Examples\n\n##### Non-OAuth2 Security Requirement\nJSON\n```json\n{\n  "api_key": []\n}\n```\n\n\\\nYAML\n```yaml\napi_key: []\n```\n##### OAuth2 Security Requirement\nJSON\n```json\n{\n  "petstore_auth": [\n    "write:pets",\n    "read:pets"\n  ]\n}\n```\n\n\\\nYAML\n```yaml\npetstore_auth:\n- write:pets\n- read:pets\n```\n##### Optional OAuth2 Security\nOptional OAuth2 security as would be defined in an OpenAPI Object or an Operation Object:\n\n\\\nJSON\n```json\n{\n  "security": [\n    {},\n    {\n      "petstore_auth": [\n        "write:pets",\n        "read:pets"\n      ]\n    }\n  ]\n}\n```\n\n\\\nYAML\n```yaml\nsecurity:\n  - {}\n  - petstore_auth:\n    - write:pets\n    - read:pets\n```\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
