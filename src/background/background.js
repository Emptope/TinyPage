/* global chrome */

// chrome.runtime.onMessage.addListener((message, sender) => {
//   // element save
//   if (message.type === 'SAVE_ELEMENT') {
//     const tabUrl = new URL(sender.tab.url).origin;
    
//     chrome.storage.local.get([tabUrl], (result) => {
//       const storedSelectors = result[tabUrl] || [];
//       storedSelectors.push(message.selector);
      
//       chrome.storage.local.set({ [tabUrl]: storedSelectors }, () => {
//         console.log('元素选择器已存储:', message.selector);
//       });
//     });
//   }

//   // element load
//   if (message.type === 'REQUEST_HIDDEN_ELEMENTS') {
//     const tabUrl = new URL(sender.tab.url).origin;
    
//     chrome.storage.local.get([tabUrl], (result) => {
//       chrome.tabs.sendMessage(sender.tab.id, {
//         type: 'APPLY_HIDDEN_ELEMENTS',
//         selectors: result[tabUrl] || []
//       });
//     });
//   }
// });

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SAVE_ELEMENT') {
    chrome.storage.local.get([message.url], (result) => {
      const storedSelectors = result[message.url] || [];
      storedSelectors.push(message.selector);
      chrome.storage.local.set({
        [message.url]: storedSelectors
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'APPLY_HIDDEN_ELEMENTS') {
    chrome.storage.local.get([window.location.href], (result) => {
      const selectors = result[window.location.href] || [];
      selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.style.display = 'none';
      });
    });
  }
});
