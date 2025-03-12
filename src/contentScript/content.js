/* global chrome */

let currentElement = null;
let isSelecting = false;

const getCssPath = (element) => {
  if (!element) return "";
  const path = [];
  while (element && element.nodeType === Node.ELEMENT_NODE) {
    let selector = element.nodeName.toLowerCase();
    if (element.id) {
      selector += `#${element.id}`;
      path.unshift(selector);
      break;
    } else {
      let sibling = element;
      let nth = 1;
      while (sibling !== element.parentNode.firstChild) {
        if (sibling.nodeName === element.nodeName) nth++;
        sibling = sibling.previousSibling;
      }
      if (nth !== 1) selector += `:nth-of-type(${nth})`;
    }
    path.unshift(selector);
    element = element.parentNode;
  }
  return path.join(" > ");
};

const highlightElement = (element) => {
  if (currentElement) {
    currentElement.style.outline = "";
  }
  currentElement = element;
  if (element) {
    element.style.outline = "2px solid red";
  }
};

const startElementSelection = () => {
  isSelecting = true;

  const mouseMoveHandler = (e) => {
    if (!isSelecting) return;
    const element = document.elementFromPoint(e.clientX, e.clientY);
    highlightElement(element);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && isSelecting && currentElement) {
      const cssPath = getCssPath(currentElement);
      currentElement.style.display = "none";

      chrome.runtime.sendMessage({
        type: "SAVE_ELEMENT",
        url: window.location.href,
        selector: cssPath,
      });

      stopElementSelection();
    }
  };

  const stopElementSelection = () => {
    isSelecting = false;
    highlightElement(null);
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("keypress", keyPressHandler);
  };

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("keypress", keyPressHandler);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "START_SELECT") {
    startElementSelection();
  } else if (message.action === "STOP_SELECT") {
    isSelecting = false;
    highlightElement(null);
  }
});

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.type === "APPLY_HIDDEN_ELEMENTS") {
//     message.selectors.forEach((selector) => {
//       const element = document.querySelector(selector);
//       if (element) element.style.display = "none";
//     });
//   }
// });

// chrome.runtime.sendMessage({ type: "REQUEST_HIDDEN_ELEMENTS" });

chrome.runtime.sendMessage({ type: 'APPLY_HIDDEN_ELEMENTS' });
