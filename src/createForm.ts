import Form = GoogleAppsScript.Forms.Form;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

function createForm() {
  const editors = ["hogehoge@gmail.com"];
  let form: Form;
  let spreadSheet: Spreadsheet;
  let conditions: Conditions;
  const dateFrom = Moment.moment().add(-7, "days");
  const dateTo = Moment.moment().add(-1, "days");
  let formattedDate: string;
  formattedDate = `${dateFrom.format("MM/dd")}~${dateTo.format("MM/dd")}`;

  // form作成
  form = FormApp.create("【" + formattedDate + "】今週のhogehoge賞")
    .setTitle("【" + formattedDate + "】今週のhogehoge賞 ")
    .setDescription("メンバーを一名投票してください。")
    .addEditors(editors)
    .setCollectEmail(true);

  form
    .addTextItem()
    .setTitle("今週最もhogehogeだったと思うメンバー")
    .setRequired(true);
  form.addTextItem().setTitle("理由");

  // 既存のspreadシートを取得する
  spreadSheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
  );

  // 作成したシートを回答先に紐付ける
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadSheet.getId());

  // slackに通知する
  conditions = {
    text: `みなさま！今週のhogehogeの投票をお願い致します🔥\n ${form.getPublishedUrl()}`,
    title: "今週のhogehoge投稿"
  };

  this.sendSlack(conditions);
}
