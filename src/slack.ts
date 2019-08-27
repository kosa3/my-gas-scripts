import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

interface Conditions {
  text: string;
  title: string;
}

function sendSlack(conditions: Conditions) {
  const url = PropertiesService.getScriptProperties().getProperty(
    "WEB_HOOK_URL"
  );
  const data = {
    attachments: [
      {
        color: "#d23546",
        text: conditions.text,
        title: conditions.title
      }
    ],
    channel: "#通知テストチャンネル",
    username: "テスト"
  };
  const payload = JSON.stringify(data);
  let options: URLFetchRequestOptions;
  options = {
    contentType: "application/json",
    method: "post",
    payload
  };

  UrlFetchApp.fetch(url, options);
}
