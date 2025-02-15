let siteData = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const url = new URL(tab.url).hostname;
    if (!siteData[url]) {
      siteData[url] = { timeSpent: 0, lastAccess: Date.now() };
    } else {
      const timeSpent = Date.now() - siteData[url].lastAccess;
      siteData[url].timeSpent += timeSpent;
      siteData[url].lastAccess = Date.now();
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getData") {
    sendResponse(siteData);
  }
});