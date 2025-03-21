<div align="center">

# TinyPage

#### A Chrome extension to declutter and beautify web pages effortlessly.

</div>

> Note: Modifications cannot be made to protected web pages.

## TODO
- [ ] Allow users to remove saved CSS selectors (important!)
- [ ] Add a font conversion tool
- [ ] Add a webpage background color converter
- [x] Press Esc to exit selection mode
- [ ] Bug fix (src/popup/index.html)

## Quick Start 

> TinyPage is not yet listed on the Chrome Web Store.

### Install Node.js

Download and install <a href="https://nodejs.org/en/">Node.js</a>. Then, verify the installation:

```
node -v
```

You should see something like “v22.11.0”.

Node.js comes with npm. Verify npm installation:

```
npm -v
```

You should see something like “10.9.0”.

### Clone & Build

Clone the repository and navigate to the project folder:

```
git clone https://github.com/Emptope/TinyPage.git
cd TinyPage
```

Install dependencies and build the extension:

```
npm install
npm run build
```

### Load the Extension

   1. Copy `manifest.json` to the `dist` folder.
   2. Open Chrome and go to `chrome://extensions`.
   3. Enable `Developer mode` (toggle in the top right).
   4. Click `Load unpacked` and select the `dist` folder.

### Use TinyPage

   1. Click the **Extensions** icon and pin **TinyPage**.
   2. Click the TinyPage icon and select **Start Selecting Elements**.
   3. Press **Enter** to hide selected elements.
   4. Enjoy a cleaner web experience! 🚀
