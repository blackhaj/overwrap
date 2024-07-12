import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable1 = vscode.commands.registerCommand(
    'extension.wrapWithDoubleQuotes',
    () => {
      wrapSelection('"', '"');
    }
  );

  const disposable2 = vscode.commands.registerCommand(
    'extension.wrapWithSingleQuotes',
    () => {
      wrapSelection('"', '"');
    }
  );

  const disposable3 = vscode.commands.registerCommand(
    'extension.wrapWithParens',
    () => {
      wrapSelection('(', ')');
    }
  );

  const disposable4 = vscode.commands.registerCommand(
    'extension.wrapWithSquareBrackets',
    () => {
      wrapSelection('[', ']');
    }
  );

  const disposable5 = vscode.commands.registerCommand(
    'extension.wrapWithCurlyBraces',
    () => {
      wrapSelection('{', '}');
    }
  );

  const disposable6 = vscode.commands.registerCommand(
    'extension.wrapWithBackticks',
    () => {
      wrapSelection('`', '`');
    }
  );

  context.subscriptions.push(
    disposable1,
    disposable2,
    disposable3,
    disposable4,
    disposable5
  );
}

const startingChars = ['"', "'", '`', '(', '[', '{'];
const endingChars = ['"', "'", '`', ')', ']', '}'];

function wrapSelection(startChar: string, endChar: string) {
  const editor = vscode.window.activeTextEditor;
  const configuration = vscode.workspace.getConfiguration('overwrap');
  const trimWhitespace = configuration.get('trimWhitespace', false);

  if (editor) {
    const selections = editor.selections;

    editor.edit((editBuilder) => {
      for (const selection of selections) {
        const text = editor.document.getText(selection);

        let newText = text;

        if (trimWhitespace) {
          newText = newText.trim();
        }

        if (startingChars.includes(text[0])) {
          newText = text.slice(1);
        }

        if (endingChars.includes(text[text.length - 1])) {
          newText = newText.slice(0, -1);
        }

        editBuilder.replace(selection, `${startChar}${newText}${endChar}`);
      }
    });
  }
}

export function deactivate() {}
