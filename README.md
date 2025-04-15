# Discord Quest Auto-Completer
<!-- Banner -->
<p align="center">
  <img src="https://raw.githubusercontent.com/techoverloadyt/discord-quest-completer/main/banner.svg" alt="Discord Quest Auto Completer Banner">
</p>
<p align="center">
  <a href="https://github.com/techoverloadyt/discord-quest-completer/stargazers">
    <img src="https://img.shields.io/github/stars/techoverloadyt/discord-quest-completer" alt="Stars">
  </a>
  <a href="https://github.com/techoverloadyt/discord-quest-completer/issues">
    <img src="https://img.shields.io/github/issues/techoverloadyt/discord-quest-completer" alt="Issues">
  </a>
  <a href="https://github.com/techoverloadyt/discord-quest-completer/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/techoverloadyt/discord-quest-completer" alt="License">
  </a>
</p>


A powerful script to automatically complete Discord quests without actually having to play games or do activities well managed **quest auto completer**. Save time and earn rewards effortlessly!

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

### Method : Discord COnsole (Quick)

1. Open Discord. _(Must be app not work in MOBILE and any BROWSER)_
2. Go to Quest Tab in Settings. 
3. Goto "View Quest"
4. Press <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> to Open Inspect 
5. Paste the entire script contents from [quest-completer.js](quest-completer.js)  
6. Press Enter to run the script
7. There Will Float a Popup " [Hackcode]Quest Completer " > Click on <kbd>Complete All</kbd>
8. Start any Quest <kbd>Script</kbd> will Automatically Finsih all Quest😎  

## Usage

1. After running the script, you'll see a floating **Hackcode.live** button in the top-left corner  
2. Right-click the button to start "_Completing all_" available quests  
3. Or use the control panel in the top-right to manage quests  

## ❤️Show Love

Here is my official website **[hackcode.live](https://hackcode.live)** where you can find tons of knowledge and tech/programming content — including **paid products for free** as a token of love ❤️

## Configuration

You can customize the script behavior by editing the `CONFIG` object:

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
