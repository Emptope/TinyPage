/* global chrome */
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
    <div style={{ width: "500px", padding: "12px" }}>
      <button 
        onClick={handleToggleSelect}
        style={{
          padding: "8px 16px",
          background: isSelecting ? "#ff4444" : "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {isSelecting ? 'Stop Selecting (Press Enter to select or ESC to quit)' : 'Start Selecting Elements'}
      </button>
    </div>
  );
};
