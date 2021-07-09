# Changelog / Migration Status

### Known Issues
[x] fix editor configuration/onChange to always word-wrap.  
[ ] ~~fix exploding styling/rendering when using in-browser (ctrl+f) find text within monaco; monaco's find+replace feature~~  
[ ] update monaco syntax highlighting  
[ ] remove "dev mode" case when editor content is undefined  
[ ] handle case(s) when specSelectors.method returns undefined  
[x] remove mock data/fixtures/configuration from `actions.js`  
[ ] ~~warning: overlapping semantic tokens~~ THIS IS APIDOM-LS ISSUE  
[x] in codeActionUi, sometimes recieve an Uncaught promise TypeError: d.dispose is not a funtion  
[x] asyncapi support: anywhere we should be detecting async api (or any other supported spec); e.g. clearEditor  
[x] handle apidom parser throw, when unable to detect langugage. e.g. empty string, or oas2  
[ ] load default (oas3). note the topbar generate server/client exists. -> clear all. user may type random string. note that the topbar generate server/client did NOT disappear  
[ ] load default -> import OAS2. note the topbar generate server/client exists. -> clear all. user may type random string. note that the topbar generate server/client did NOT disappear  


### Legacy Swagger Editor Migrated Features

Extract menu action methods from React to Actions  
[x] importFromURL  
[x] saveAsYaml  
[x] saveAsJson  
[x] convertToYaml  
[x] downloadGeneratedFile  
[x] importFile  
[x] onDocumentLoad prop - removed. handled now in actions. Theoretically, we could expose as a user-overwritable function. Maybe SH needed it?  
[x] updateEditorContent prop - will be removed, and handled in actions.  
[x] clearEditor  

Deprecate methods from React  
[x] saveAsText  
[x] handleResponse  

Extract menu logic helpers to Actions
[x] getGeneratorUrl  
[x] instantiateGeneratorClient  
[x] shouldReInstantiateGeneratorClient (new)  

Extract menu logic helpers to utils-converter
[x] hasParserErrors  
[x] getFileName  
[x] getDefinitionLanguage  
[x] getDefinitionVersion  

Create (axios) http method to utils-http
[x] getDefinitionFromUrl  
[x] getGenerator2Definition  
[x] postPerformOasConversion  

Remove unnecessary state:
[x] swaggerClient  
[x] definitionVersion  

Migrate state to redux (or try react hooks):
[ ] clients  
[ ] servers  

Remove use of alert and confirm via new modal system (try react hooks)
[x] alert  
[x] confirm  

Migrate React Components
[x] topbar-dropdown  
[x] topbar-edit-menu  
[x] topbar-file-menu  
[x] convert from swagger2 to oas3 (plugin -> edit menu)  
[x] ImportFileMenuItem (plugin); effective a DropdownItem, so try re-use  
[x] modal system (all-new)  
[ ] react-dropzone  
[ ] topbar-insert (plugin); this should be a copy/paste  
[ ] jump-to-path; this should be a copy/paste  
[x] topbar-menu-generator-clients; if done, probably as PureComponent  
[x] topbar-menu-generator-servers; if done, probably as PureComponent  
[ ] match and extend configurability options  
[ ] if refresh empty monaco, should load a default definition  
[ ] localStorage  


### Integration
[x] swagger-ui redux state  
[x] connect monaco state to swagger-ui redux state  
[x] connect actions with monaco state, e.g. updateEditorContent  
[ ] mixed monaco css with swagger css/less/sass  
[ ] additional initial style and configuration of monaco editor, as appropriate  
[x] init oas spec via swagger-ui  
[x] connect & sync generic-editor updates to swagger-ui  
[x] init oas spec via import File (finish action) - Json  
[x] init oas spec via import File (finish action) - Yaml  
[x] init oas spec via import Url (finish action)  
[x] CSS/Less/Saas styling  
[x] remove use of mock data in topbarActions. (mock fixtures not removed yet)  
[x] try react-modal lib instead of creating internal version  
[ ] pull-in SH validation pane  
[ ] pull-in SH left sidebar (search, op/schema/etc sections)  
[x] modify generic-editor plugin to have a default editor placeholder (instead of calling GenericEditorContainer directly)  
[x] add disposables array, and ability to dispose()  
[x] make generator servers/clients toggleable; enable oas3.1/others when supported  
[ ] update generator (plugin?) for oas3.1, asyncapi, etc. support when available  
[ ] add generic error catch component, e.g. SHub uses react-error-boundary  
[ ] debounce initial load of definition. this may help with single vs. multi-line render in editor. atm, this would also apply to all user updates  
[ ] debounce user updates (might not be needed)  
[ ] File Menu dropdown - add json/yaml detection to display appropriate link  
[ ] Edit menu dropdown - render convert to OAS3 only if currently 'isSwagger2`  
[ ] Edit menu dropdown - render convert to Yaml only if currently 'json'  
[ ] monaco - config/remove minimap. UX discussion.  
[ ] onboard - default definition should be in YAML format


### Optimization
[x] breakdown `actions.js` into smaller files (new)  
[x] further extraction in `actions.js` of business logic from action creators  
[x] monaco-editor should only load specified languages; webpack required  
[ ] overall styling and consistency  
[x] deprecate use of `swagger-client`  
[ ] update "minimal" specs for `clearEditor`; oas2, oas3, oas3_1, asycapi2  


### Test Coverage
[x] Topbar rendering; spies/mocks on calls to topbarActions, to avoid live http methods  
[ ] topbarActions: http calls with swagger-generator + swagger-client; response   includes additional functions;  
[ ] should add unit tests with bad/invalid urls; generator, import Url  
[ ] topbarActions: downloadFile (mock download)  
[ ] monaco-editor render  
[ ] monaco-editor features  
[ ] swagger-ui render  
[ ] actions that affect swagger-ui spec  
[ ] should add unit tests when both swagger2 and oas3 flags set to same value (both true, both false)  
[ ] should add unit tests allowing exclusion of both swagger2 and oas3, e.g. future asynapi, graphql, etc.  
[x] e2e:monaco. user "select all" + "clear/cut" definition.  
[ ] e2e:monaco. upload unsupported spec -> hover should not cause UI error  
[ ] e2e:monaco. upload unsupported spec -> user edit should not cause UI error  


### Additional Notes:
* Includes mock data and mock configuration. Should remove after implementing unit tests.
* there exists 1 case of 'require', but the lib does not have an es6 support. we could make a PR, or bring in house.
* Difference between Ace and Monaco: It appears Monaco does not/should not need an initial value. There exists default value, which atm, is set to a welcome string so that the component can load quickly and immediately.

Proposals:  
**1**. Should test files be co-located with domain?  
A: based on CRA setup, should be co-located. e.g. within /src and not /test  

**2**. Do we want to control modals from React Component, or from redux Actions?  
A: currently controlled via components. keep actions atomic.  
