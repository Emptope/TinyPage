/* global chrome */

/**
 *  Use red box to highlight the selected element.
 */

import { useState } from 'react';

export const Highlighter = () => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleToggleSelect = () => {
    const newState = !isSelecting;
    setIsSelecting(newState);
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { 
        action: newState ? 'START_SELECT' : 'STOP_SELECT' 
      });
    });
  };

  return (
    <div className="popup">
      <button onClick={handleToggleSelect}>
        {isSelecting ? 'Stop Selecting' : 'Start Selecting'}
      </button>
    </div>
  );
};
