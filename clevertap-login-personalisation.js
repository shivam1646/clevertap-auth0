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

// render loading screen
const loadingScreen = document.getElementById("loading");
const mainWrapper = document.getElementById("main-wrapper");
const loadingScreenNode = loadingScreen.content.cloneNode(true);
mainWrapper.appendChild(loadingScreenNode);

var isFallbackLoaded = false
// render fallback screen
var fallbackTimeout = setTimeout(function () {
  isFallbackLoaded = true
  const mainWrapper = document.getElementById("main-wrapper");
  // clear loading screen
  mainWrapper.innerHTML = "";
  // append fallback screen
  const fallback = document.getElementById("fallback");
  const fallbackNode = fallback.content.cloneNode(true);
  mainWrapper.appendChild(fallbackNode);
  // update styles
  mainWrapper.style.backgroundColor = '#101727';
  mainWrapper.style.color = 'white';
}, 500);


clevertap.event.push("Login Page Visited");

function renderLoginPage (data) {
  const mainWrapper = document.getElementById("main-wrapper");      
  // clear content
  mainWrapper.innerHTML = "";
  // render custom template
  const custom = document.getElementById("custom");
  const customNode = custom.content.cloneNode(true);
  mainWrapper.appendChild(customNode);

  mainWrapper.style.backgroundColor = data.kv.backgroundColor;
  mainWrapper.style.color = data.kv.textColor;
  // update data from key value pairs
  const label = document.getElementById("label");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const cta = document.getElementById("cta");
  const image = document.getElementById("image");

  label.innerText = data.kv.label;
  title.innerText = data.kv.title;
  desc.innerText = data.kv.desc;
  cta.innerText = data.kv.ctaText;
  cta.href = data.kv.ctaUrl;
  image.src = data.kv.imageUrl;
}

document.addEventListener("CT_web_native_display", function(event) {
  if (isFallbackLoaded) return
  clearTimeout(fallbackTimeout);
  const data = event.detail;
  const topic = data.kv.topic;
  switch (topic) {
    case "login_personalisation":
      renderLoginPage(data);
      break;
  }
});
