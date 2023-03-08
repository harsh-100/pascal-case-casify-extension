// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "converttopascalcase" is now active!'
  );

  const convertToPascalCase = (highlighted: string) => {
    const snakeTextArray = highlighted.split("_");
    const newData = snakeTextArray.map(
      (singleWord: string) =>
        singleWord.charAt(0).toUpperCase() + singleWord.slice(1)
    );
    const resultText = newData.join("");
    return resultText;
  };
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "converttopascalcase.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const editor = vscode.window.activeTextEditor;
      const selection = editor?.selection;
      if (selection && !selection.isEmpty) {
        const selectionRange = new vscode.Range(
          selection.start.line,
          selection.start.character,
          selection.end.line,
          selection.end.character
        );
        const highlighted: any = editor.document.getText(selectionRange);

        editor.edit((editBuilder) => {
          editBuilder.replace(selectionRange, convertToPascalCase(highlighted));
        });
      }

      vscode.window.showInformationMessage(
        "Hello World from convertToPascalCase!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
