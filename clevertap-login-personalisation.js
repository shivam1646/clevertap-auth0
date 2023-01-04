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
var fallbackTimeout = setTimeout(function () {
  const fallback = document.getElementById("fallback");
  const mainWrapper = document.getElementById("main-wrapper");
  const fallbackNode = fallback.content.cloneNode(true);
  mainWrapper.appendChild(fallbackNode);
}, 2000);


clevertap.event.push("Login Page Visited");

function renderLoginPage (data) {
  const mainWrapper = document.getElementById("main-wrapper");      
  // clear fallback content
  mainWrapper.innerHTML = "";
  // render custom template
  const custom = document.getElementById("custom");
  const customNode = custom.content.cloneNode(true);
  mainWrapper.appendChild(customNode);

  mainWrapper.style.justifyContent = "space-between";
  mainWrapper.style.backgroundColor = data.kv.backgroundColor;
  mainWrapper.style.color = data.kv.textColor;
  // update data from key value pairs
  const label = document.getElementById("label");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const image = document.getElementById("image");

  label.innerText = data.kv.label;
  title.innerText = data.kv.title;
  desc.innerText = data.kv.desc;

  image.src = data.kv.imageUrl;
}

document.addEventListener("CT_web_native_display", function(event) {
  clearTimeout(fallbackTimeout);
  const data = event.detail;
  const topic = data.kv.topic;
  switch (topic) {
    case "login_personalisation":
      renderLoginPage(data);
      break;
  }
});
