function notificationMyChallenge() {
  let conditions: Conditions;
  const dateFrom = Moment.moment().add(-6, "days");
  const dateTo = Moment.moment();
  let formattedDate: string;

  formattedDate = `${dateFrom.format("MM/dd")}~${dateTo.format("MM/dd")}`;

  conditions = {
    text:
      `今週のhogehogeをご投稿ください\\n 対象期間: ${formattedDate}`,
    title: "今週のhogehoge投稿"
  };

  this.sendSlack(conditions);
}
