/*
 * 毎週金曜日12:30にアラート
 */
function alertContributor() {
  // 型定義
  let spreadSheet: Spreadsheet;
  let ngEmails: any[];
  let answerSheet: GoogleAppsScript.Spreadsheet.Sheet;
  let memberSheet: GoogleAppsScript.Spreadsheet.Sheet;
  let conditions: Conditions;

  // スプレッドシートIDを取得
  spreadSheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
  );

  // シートを取得
  answerSheet = spreadSheet.getActiveSheet();
  // 二次元配列を一次元配列に直す
  const okEmailsLists = [];
  answerSheet
    .getRange("B2:B" + answerSheet.getLastRow())
    .getValues()
    .map(okEmail => {
      okEmailsLists.push(okEmail[0]);
    });

  memberSheet = spreadSheet.getSheetByName("members");

  const emailLists = [];
  // 二次元配列を一次元配列に直す
  memberSheet
    .getRange("A1:A" + memberSheet.getLastRow())
    .getValues()
    .map(memberEmail => {
      emailLists.push(memberEmail[0]);
    });

  ngEmails = [];
  for (const emailList of emailLists) {
    if (okEmailsLists.indexOf(emailList) === -1.0) {
      ngEmails.push(emailList);
    }
  }

  // slackに通知する
  if (ngEmails.length) {
    conditions = {
      text: ngEmails.join("\n"),
      title: "今週のhogehoge未投稿者"
    };

    this.sendSlack(conditions);
  }
}
