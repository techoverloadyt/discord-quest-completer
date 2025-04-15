# Discord Quest Auto-Completer

<p align="center">
 <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with gradient -->
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5865F2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#404EED;stop-opacity:1" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Main background -->
  <rect width="800" height="200" rx="10" fill="url(#bg-gradient)" />
  
  <!-- Decorative elements -->
  <circle cx="650" cy="50" r="80" fill="#7289DA" opacity="0.2" />
  <circle cx="100" cy="150" r="60" fill="#7289DA" opacity="0.2" />
  
  <!-- Discord logo stylized -->
  <g transform="translate(60, 100) scale(0.9)" fill="#FFFFFF">
    <path d="M40,12 C26.8,12 16,22.8 16,36 C16,49.2 26.8,60 40,60 C53.2,60 64,49.2 64,36 C64,22.8 53.2,12 40,12 Z M27.2,42 C24.4,42 22,39.2 22,36 C22,32.8 24.4,30 27.2,30 C30,30 32.4,32.8 32.4,36 C32.4,39.2 30,42 27.2,42 Z M52.8,42 C50,42 47.6,39.2 47.6,36 C47.6,32.8 50,30 52.8,30 C55.6,30 58,32.8 58,36 C58,39.2 55.6,42 52.8,42 Z" filter="url(#glow)" />
  </g>
  
  <!-- Main title text with subtle shadow -->
  <text x="400" y="85" font-family="Arial, sans-serif" font-weight="bold" font-size="38" text-anchor="middle" fill="#FFFFFF" filter="url(#glow)">DISCORD QUEST</text>
  <text x="400" y="125" font-family="Arial, sans-serif" font-weight="bold" font-size="38" text-anchor="middle" fill="#FFFFFF" filter="url(#glow)">AUTO COMPLETER</text>
  
  <!-- Subtitle -->
  <text x="400" y="160" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#FFFFFF">Automate your Discord quests with ease</text>
  
  <!-- Checkmark symbols to represent "completion" -->
  <g transform="translate(560, 90) scale(0.8)" fill="#FFFFFF">
    <circle cx="20" cy="20" r="18" fill="#43B581" />
    <path d="M14,20 L18,24 L26,16" stroke="#FFFFFF" stroke-width="3" fill="none" />
  </g>
  
  <g transform="translate(190, 90) scale(0.8)" fill="#FFFFFF">
    <circle cx="20" cy="20" r="18" fill="#43B581" />
    <path d="M14,20 L18,24 L26,16" stroke="#FFFFFF" stroke-width="3" fill="none" />
  </g>
  
  <!-- Decorative lines -->
  <line x1="150" y1="180" x2="650" y2="180" stroke="#FFFFFF" stroke-width="2" opacity="0.3" />
  <line x1="180" y1="185" x2="620" y2="185" stroke="#FFFFFF" stroke-width="1" opacity="0.2" />
</svg>
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
