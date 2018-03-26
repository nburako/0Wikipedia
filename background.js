chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var part1 = details.url.substr(0, details.url.indexOf("wi"));
    var part2 = details.url.substr(details.url.indexOf("wi"), details.url.length -1);
    var last = part1.concat("0").concat(part2);
    return {redirectUrl: last};
  },
  {
    urls: [
    "*://wikipedia.org/*",
    "*://*.wikipedia.org/*"
    ],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
  },
  ["blocking"]
  )

chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var userLang = navigator.language || navigator.userLanguage;
  if(userLang.indexOf('-') > -1){
    userLang = userLang.substr(0, userLang.indexOf('-'));
  }
  var newURL = "https://".concat(userLang).concat(".0wikipedia.org");
  chrome.tabs.create({ url: newURL });
});

String.prototype.replace = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};


