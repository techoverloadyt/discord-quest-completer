# Discord Quest Auto-Completer

<p align="center">
<img href="https://raw.githubusercontent.com/techoverloadyt/discord-quest-completer/main/banner.svg" alt="Discord Quest Auto Completer" width="800">
  <br>
  <a href="https://github.com/yourusername/discord-quest-auto-completer/stargazers"><img src="https://img.shields.io/github/stars/yourusername/discord-quest-auto-completer" alt="Stars"></a>
  <a href="https://github.com/yourusername/discord-quest-auto-completer/issues"><img src="https://img.shields.io/github/issues/yourusername/discord-quest-auto-completer" alt="Issues"></a>
  <a href="https://github.com/yourusername/discord-quest-auto-completer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/yourusername/discord-quest-auto-completer" alt="License"></a>
</p>

A powerful script to automatically complete Discord quests without actually having to play games or do activities. Save time and earn rewards effortlessly!

## Features

- ✅ Auto-complete video watching quests
- ✅ Auto-complete desktop app playing quests
- ✅ Auto-complete streaming quests
- ✅ Auto-complete activity quests
- ✅ Customizable completion speed
- ✅ Beautiful floating UI with branding
- ✅ Visual notifications
- ✅ Extremely lightweight and optimized

## Installation

### Method 1: Browser Console (Quick)

1. Open Discord in your browser (Chrome, Firefox, Edge, etc.)
2. Press F12 or right-click and select "Inspect" to open developer tools
3. Go to the "Console" tab
4. Paste the entire script contents from [quest-completer.js](quest-completer.js)
5. Press Enter to run the script

## Usage

1. After running the script, you'll see a floating "Hackcode.live" button in the top-left corner
2. Right-click the button to start completing all available quests
3. Or use the control panel in the top-right to manage quests

## Show Love

Here is th my Offical webpage **hackcode.live** where you can get lot of Knowledge and Information related to tech and programming also **Paid Products in free** as a love

### Configuration

You can customize the script behavior by editing the CONFIG object:

```javascript
const CONFIG = {
  QUEST_EXCLUSIONS: ["1248385850622869556"], // IDs to exclude
  AUTO_COMPLETE_ALL: true,                   // Set to true to auto-complete all quests
  COMPLETION_DELAY: 0.5,                     // Delay between progress updates (seconds)
  ACCELERATION_FACTOR: 15,                   // Higher = faster completion
  CONSOLE_LOGGING: true,                     // Enable console logs
  GUI_LOGGING: true,                         // Enable on-screen notifications
  INJECT_UI: true,                           // Enable custom UI controls
  BRANDING: {
    NAME: "Hackcode.live",                   // Branding name
    COLOR: "#00AAFF",                        // Branding color
    SHOW_FLOATING_LOGO: true                 // Show floating logo
  }
};
