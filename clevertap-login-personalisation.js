if(typeof clevertap === "undefined"){
  var clevertap = {
    event: [],
    profile: [],
    account: [],
    notifications: [],
    onUserLogin: [],
    region:"sk1",
    privacy: []
  };
}

// sk1 - Web Testing.
clevertap.account.push({"id": "WRK-485-456Z"});
clevertap.privacy.push({optOut: false});
clevertap.privacy.push({useIP: false});

(function () {
  var wzrk = document.createElement("script");
  wzrk.type = "text/javascript";
  wzrk.async = true;
  wzrk.src = "https://cdn.jsdelivr.net/gh/CleverTap/clevertap-web-sdk/clevertap.min.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wzrk, s);
})();

// render fallback content
const fallback = document.getElementById("fallback");
const mainWrapper = document.getElementById("main-wrapper");
const fallbackNode = fallback.content.cloneNode(true);
mainWrapper.appendChild(fallbackNode);

clevertap.event.push("Login Page Visited");

function renderLoginPage (data) {
  // add rendering logic here
  console.log("event", data);
}

document.addEventListener("CT_web_native_display", function(event) {
  const data = event.detail;
  const topic = data.kv.topic;
  switch (topic) {
    case "login_personalisation":
      renderLoginPage(data);
      break;
  }
});
