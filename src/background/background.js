/* global chrome */

chrome.runtime.onMessage.addListener((message, sender) => {
  // element save
  if (message.type === 'SAVE_ELEMENT') {
    const tabUrl = new URL(sender.tab.url).origin;
    
    chrome.storage.local.get([tabUrl], (result) => {
      const storedSelectors = result[tabUrl] || [];
      storedSelectors.push(message.selector);
      
      chrome.storage.local.set({ [tabUrl]: storedSelectors }, () => {
        console.log('元素选择器已存储:', message.selector);
      });
    });
  }

  // element load
  if (message.type === 'REQUEST_HIDDEN_ELEMENTS') {
    const tabUrl = new URL(sender.tab.url).origin;
    
    chrome.storage.local.get([tabUrl], (result) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'APPLY_HIDDEN_ELEMENTS',
        selectors: result[tabUrl] || []
      });
    });
  }
});
