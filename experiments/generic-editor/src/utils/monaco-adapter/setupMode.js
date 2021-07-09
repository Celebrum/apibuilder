/* eslint-disable import/prefer-default-export */
import * as monaco from 'monaco-editor-core';

import { WorkerManager } from './workerManager';
import DiagnosticsAdapter from './diagnosticsAdapter';
import HoverAdapter from './hoverAdapter';
import CompletionItemsAdapter from './completionItemsAdapter';
import SemanticTokensAdapter from './semanticTokensAdapter';
import CodeActionsAdapter from './codeActionsAdapter';
import DocumentSymbolsAdapter from './documentSymbolsAdapter';

const disposeAll = (disposables) => {
  while (disposables.length) {
    disposables.pop().dispose();
  }
};

const asDisposable = (disposables) => {
  return { dispose: () => disposeAll(disposables) };
};

// todo?: async/await?
// bug: codeActions sometimes doesn't load fast enough for monaco to register its .dispose()
const registerProviders = ({ languageID, providers, worker }) => {
  disposeAll(providers);

  const diagnostics = new DiagnosticsAdapter(worker);
  providers.push(diagnostics);
  const hover = new HoverAdapter(worker);
  providers.push(monaco.languages.registerHoverProvider(languageID, hover));
  const completionItems = new CompletionItemsAdapter(worker);
  providers.push(monaco.languages.registerCompletionItemProvider(languageID, completionItems));
  const codeActions = new CodeActionsAdapter(worker);
  providers.push(monaco.languages.registerCodeActionProvider(languageID, codeActions));
  const documentSymbols = new DocumentSymbolsAdapter(worker);
  providers.push(monaco.languages.registerDocumentSymbolProvider(languageID, documentSymbols));
  const semanticTokens = new SemanticTokensAdapter(worker);
  providers.push(
    monaco.languages.registerDocumentSemanticTokensProvider(languageID, semanticTokens)
  );

  return providers;
};

// { languageID, modeConfiguration } = defaults; may include onDidChange()? within defaults
export function setupMode({ languageID }) {
  const disposables = [];
  const providers = [];

  // instantiate a new WorkerManager() to proxy monaco.editor.createWebWorker()
  const client = new WorkerManager(); // with defaults?
  disposables.push(client);
  // define a worker promise to actually getLanguageServiceWorker
  const worker = (...uris) => {
    return client.getLanguageServiceWorker(...uris);
  };
  // register the providers with the worker we just creaeted
  const registeredProviders = registerProviders({ languageID, providers, worker });
  // we could do this too for additional configuration:
  // disposables.push(monaco.languages.setLanguageConfiguration(languageID, richLanguageConfiguration));

  disposables.push(asDisposable(registeredProviders));
  return asDisposable(disposables);
}
