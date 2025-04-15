delete window.$;
let wpRequire;
window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);

// Improved store retrieval with error handling
const getStore = (predicate) => {
  try {
    return Object.values(wpRequire.c).find(predicate);
  } catch (error) {
    console.error('Error retrieving store:', error);
    return null;
  }
};

// Store initialization with more robust error handling
let ApplicationStreamingStore = getStore(x => x?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata)?.exports?.Z || null;
let RunningGameStore = getStore(x => x?.exports?.ZP?.getRunningGames)?.exports?.ZP || null;
let QuestsStore = getStore(x => x?.exports?.Z?.__proto__?.getQuest)?.exports?.Z || null;
let ChannelStore = getStore(x => x?.exports?.Z?.__proto__?.getAllThreadsForParent)?.exports?.Z || null;
let GuildChannelStore = getStore(x => x?.exports?.ZP?.getSFWDefaultChannel)?.exports?.ZP || null;
let FluxDispatcher = getStore(x => x?.exports?.Z?.__proto__?.flushWaitQueue)?.exports?.Z || null;
let api = getStore(x => x?.exports?.tn?.get)?.exports?.tn || null;

// Check if all stores are loaded
if (!ApplicationStreamingStore || !RunningGameStore || !QuestsStore || !ChannelStore || !GuildChannelStore || !FluxDispatcher || !api) {
  console.error('Failed to load one or more required stores. Discord may have updated its structure.');
  // Continue anyway but with warnings
}

// Config options (customizable)
const CONFIG = {
  QUEST_EXCLUSIONS: ["1248385850622869556"], // IDs to exclude
  AUTO_COMPLETE_ALL: true,                   // Set to true to auto-complete all eligible quests
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

// Create floating branding
if (CONFIG.BRANDING.SHOW_FLOATING_LOGO) {
  try {
    // Remove any existing branding first
    const existingBranding = document.getElementById('hackcode-floating-brand');
    if (existingBranding) {
      existingBranding.remove();
    }
    
    // Create floating branding element
    const brandingElement = document.createElement('div');
    brandingElement.id = 'hackcode-floating-brand';
    brandingElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: ${CONFIG.BRANDING.COLOR};
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: bold;
      font-family: 'Arial', sans-serif;
      z-index: 9999;
      box-shadow: 0 0 10px rgba(0, 170, 255, 0.5);
      border: 1px solid ${CONFIG.BRANDING.COLOR};
      user-select: none;
      cursor: move;
      transition: all 0.3s ease;
    `;
    brandingElement.innerHTML = `
      <span style="font-size: 16px;">${CONFIG.BRANDING.NAME}</span>
      <span style="font-size: 12px; opacity: 0.8; margin-left: 5px;">Quest Completer</span>
    `;
    document.body.appendChild(brandingElement);
    
    // Add pulse animation
    const pulseAnimation = document.createElement('style');
    pulseAnimation.innerHTML = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(0, 170, 255, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(0, 170, 255, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 170, 255, 0); }
      }
      #hackcode-floating-brand {
        animation: pulse 2s infinite;
      }
      #hackcode-floating-brand:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 170, 255, 0.8);
      }
    `;
    document.head.appendChild(pulseAnimation);
    
    // Make the branding element draggable
    let isDragging = false;
    let offsetX, offsetY;
    
    brandingElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - brandingElement.getBoundingClientRect().left;
      offsetY = e.clientY - brandingElement.getBoundingClientRect().top;
      brandingElement.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      // Keep within window bounds
      const maxX = window.innerWidth - brandingElement.offsetWidth;
      const maxY = window.innerHeight - brandingElement.offsetHeight;
      
      brandingElement.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
      brandingElement.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        brandingElement.style.cursor = 'move';
      }
    });
    
    // Add context menu for options
    brandingElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      completeAllQuests();
      brandingElement.style.animation = 'none';
      setTimeout(() => {
        brandingElement.style.animation = 'pulse 2s infinite';
      }, 10);
    });
    
  } catch (e) {
    console.error('Failed to create floating branding:', e);
  }
}

// Logger function
const log = (message, type = 'info') => {
  if (!CONFIG.CONSOLE_LOGGING) return;
  
  const styles = {
    info: `color: ${CONFIG.BRANDING.COLOR}; font-weight: bold;`,
    success: 'color: #57F287; font-weight: bold;',
    warning: 'color: #FEE75C; font-weight: bold;',
    error: 'color: #ED4245; font-weight: bold;'
  };
  
  console.log(`%c[${CONFIG.BRANDING.NAME}] ${message}`, styles[type]);
  
  // Add GUI notifications if enabled
  if (CONFIG.GUI_LOGGING) {
    try {
      const notificationDiv = document.createElement('div');
      notificationDiv.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background-color: #36393f; color: white; padding: 10px; border-radius: 5px; z-index: 9999; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);';
      notificationDiv.innerHTML = `<div style="font-weight: bold; margin-bottom: 5px; color: ${CONFIG.BRANDING.COLOR};">[${CONFIG.BRANDING.NAME}]</div><div>${message}</div>`;
      document.body.appendChild(notificationDiv);
      setTimeout(() => {
        notificationDiv.style.opacity = '0';
        notificationDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => notificationDiv.remove(), 500);
      }, 3000);
    } catch (e) {
      // Silent fail if DOM manipulation fails
    }
  }
};

// Get all available quests
const getAvailableQuests = () => {
  if (!QuestsStore || !QuestsStore.quests) {
    log('Quests store not available', 'error');
    return [];
  }
  
  return [...QuestsStore.quests.values()].filter(x => 
    !CONFIG.QUEST_EXCLUSIONS.includes(x.id) && 
    x.userStatus?.enrolledAt && 
    !x.userStatus?.completedAt && 
    new Date(x.config.expiresAt).getTime() > Date.now()
  );
};

// Detect platform using browser information
const detectPlatform = () => {
  const platform = navigator.userAgent.toLowerCase();
  if (platform.includes('win')) return 'win32';
  if (platform.includes('mac')) return 'darwin';
  if (platform.includes('linux') || platform.includes('unix')) return 'linux';
  return 'win32'; // Default to Windows if we can't determine
};

// Improved random PID generator that mimics real PIDs better
const generatePID = () => {
  const baseValue = Math.floor(Math.random() * 30000) + 1000;
  // Add some randomness that better mimics real PIDs on Windows/macOS
  const platform = detectPlatform();
  return platform === 'win32' ? baseValue * 4 : baseValue;
};

// Add UI elements if enabled
if (CONFIG.INJECT_UI) {
  try {
    // Remove any existing control panel first
    const existingPanel = document.getElementById('hackcode-control-panel');
    if (existingPanel) {
      existingPanel.remove();
    }
    
    const controlPanel = document.createElement('div');
    controlPanel.id = 'hackcode-control-panel';
    controlPanel.style.cssText = `position: fixed; top: 50px; right: 10px; background-color: #36393f; color: white; padding: 10px; border-radius: 5px; z-index: 9999; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border: 1px solid ${CONFIG.BRANDING.COLOR};`;
    controlPanel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 10px; color: ${CONFIG.BRANDING.COLOR};">${CONFIG.BRANDING.NAME} Quest Auto-Completer</div>
      <button id="start-all-quests" style="background-color: ${CONFIG.BRANDING.COLOR}; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">Complete All</button>
      <button id="close-panel" style="background-color: #ED4245; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Close</button>
    `;
    document.body.appendChild(controlPanel);
    
    document.getElementById('close-panel').addEventListener('click', () => controlPanel.remove());
    document.getElementById('start-all-quests').addEventListener('click', () => {
      completeAllQuests();
      log('Starting completion of all available quests...', 'info');
    });
  } catch (e) {
    log('Failed to inject UI controls', 'warning');
  }
}

// Process a video watching quest
const processVideoQuest = async (quest, taskName, secondsNeeded, secondsDone) => {
  const tolerance = CONFIG.COMPLETION_DELAY;
  const speed = CONFIG.ACCELERATION_FACTOR;
  const diff = Math.floor((Date.now() - new Date(quest.userStatus.enrolledAt).getTime())/1000);
  const startingPoint = Math.min(Math.max(Math.ceil(secondsDone), diff), secondsNeeded);
  
  try {
    for(let i = startingPoint; i <= secondsNeeded; i += speed) {
      try {
        // Add small random variation for more natural progression
        const timestamp = Math.min(secondsNeeded, i + (Math.random() * speed * 0.2));
        await api.post({url: `/quests/${quest.id}/video-progress`, body: {timestamp}});
        log(`Video progress: ${Math.min(i, secondsNeeded)}/${secondsNeeded}`, 'info');
      } catch(ex) {
        log(`Failed to send increment at ${i}: ${ex.message}`, 'error');
        // Add retry logic
        await new Promise(resolve => setTimeout(resolve, 2000));
        i -= speed; // Try again for this increment
      }
      await new Promise(resolve => setTimeout(resolve, tolerance * 1000));
    }
    
    // Ensure we hit 100% exactly
    if((secondsNeeded - startingPoint) % speed !== 0) {
      await api.post({url: `/quests/${quest.id}/video-progress`, body: {timestamp: secondsNeeded}});
    }
    
    log(`Video quest for ${quest.config.application.name} completed!`, 'success');
    return true;
  } catch (error) {
    log(`Failed to complete video quest: ${error.message}`, 'error');
    return false;
  }
};

// Process a desktop app playing quest
const processDesktopPlayQuest = async (quest, taskName, secondsNeeded, secondsDone) => {
  const isApp = typeof DiscordNative !== "undefined";
  const applicationId = quest.config.application.id;
  const applicationName = quest.config.application.name;
  
  if(!isApp) {
    log(`Desktop playing quest for ${applicationName} requires the desktop app!`, 'warning');
    return false;
  }
  
  try {
    const res = await api.get({url: `/applications/public?application_ids=${applicationId}`});
    const appData = res.body[0];
    
    // More robust executable detection
    let exeName;
    const platform = detectPlatform();
    
    const executableForPlatform = appData.executables.find(x => x.os === platform);
    if (executableForPlatform) {
      exeName = executableForPlatform.name.replace(">","");
    } else {
      // Fallback to win32 if no match
      exeName = appData.executables.find(x => x.os === "win32")?.name.replace(">","") || 'app.exe';
    }
    
    // Generate more realistic path based on platform
    let exePath;
    if (platform === 'win32') {
      exePath = `C:\\Program Files\\${appData.name}\\${exeName}`;
    } else if (platform === 'darwin') {
      exePath = `/Applications/${appData.name}.app/Contents/MacOS/${exeName}`;
    } else {
      exePath = `/usr/bin/${exeName.toLowerCase()}`;
    }
    
    const pid = generatePID();
    
    const fakeGame = {
      cmdLine: exePath,
      exeName,
      exePath: exePath.replace(/\\/g, '/'),
      hidden: false,
      isLauncher: false,
      id: applicationId,
      name: appData.name,
      pid: pid,
      pidPath: [pid],
      processName: appData.name,
      start: Date.now(),
    };
    
    const realGames = RunningGameStore.getRunningGames();
    const fakeGames = [fakeGame];
    const realGetRunningGames = RunningGameStore.getRunningGames;
    const realGetGameForPID = RunningGameStore.getGameForPID;
    
    // Set up monitoring
    let completed = false;
    const cleanup = () => {
      if (completed) return;
      completed = true;
      
      RunningGameStore.getRunningGames = realGetRunningGames;
      RunningGameStore.getGameForPID = realGetGameForPID;
      FluxDispatcher.dispatch({
        type: "RUNNING_GAMES_CHANGE", 
        removed: [fakeGame], 
        added: [], 
        games: realGames
      });
      FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", heartbeatMonitor);
      
      log(`Restored original game state`, 'info');
    };
    
    // Override store methods
    RunningGameStore.getRunningGames = () => fakeGames;
    RunningGameStore.getGameForPID = (pid) => fakeGames.find(x => x.pid === pid);
    
    // Dispatch the fake game addition
    FluxDispatcher.dispatch({
      type: "RUNNING_GAMES_CHANGE", 
      removed: realGames, 
      added: [fakeGame], 
      games: fakeGames
    });
    
    // Set up heartbeat monitor
    const heartbeatMonitor = data => {
      let progress;
      if (quest.config.configVersion === 1) {
        progress = data.userStatus.streamProgressSeconds;
      } else {
        progress = Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP?.value || 0);
      }
      
      log(`Game play progress: ${progress}/${secondsNeeded}`, 'info');
      
      if(progress >= secondsNeeded) {
        log(`Desktop play quest for ${applicationName} completed!`, 'success');
        cleanup();
      }
    };
    
    // Subscribe to heartbeat events
    FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", heartbeatMonitor);
    
    // Set up safety timeout in case something goes wrong
    const timeoutMinutes = Math.ceil((secondsNeeded - secondsDone) / 60) + 5;
    setTimeout(() => {
      if (!completed) {
        log(`Safety timeout reached for ${applicationName} quest`, 'warning');
        cleanup();
      }
    }, timeoutMinutes * 60 * 1000);
    
    log(`Spoofed game to ${applicationName}. Estimated time: ${Math.ceil((secondsNeeded - secondsDone) / 60)} minutes`, 'info');
    return true;
  } catch (error) {
    log(`Failed to process desktop play quest: ${error.message}`, 'error');
    return false;
  }
};

// Process a streaming quest
const processStreamQuest = async (quest, taskName, secondsNeeded, secondsDone) => {
  const isApp = typeof DiscordNative !== "undefined";
  const applicationId = quest.config.application.id;
  const applicationName = quest.config.application.name;
  
  if(!isApp) {
    log(`Streaming quest for ${applicationName} requires the desktop app!`, 'warning');
    return false;
  }
  
  try {
    const pid = generatePID();
    const realFunc = ApplicationStreamingStore.getStreamerActiveStreamMetadata;
    
    // More complete fake stream metadata
    ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({
      id: applicationId,
      pid,
      sourceName: applicationName,
      frameRate: 60,
      height: 1080,
      width: 1920,
      audioSources: [{ id: 'audio1', name: 'Desktop Audio' }],
      voiceChannelMemberIds: []
    });
    
    let completed = false;
    const cleanup = () => {
      if (completed) return;
      completed = true;
      
      ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc;
      FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", heartbeatMonitor);
      
      log(`Restored original stream state`, 'info');
    };
    
    // Set up heartbeat monitor
    const heartbeatMonitor = data => {
      let progress;
      if (quest.config.configVersion === 1) {
        progress = data.userStatus.streamProgressSeconds;
      } else {
        progress = Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP?.value || 0);
      }
      
      log(`Stream progress: ${progress}/${secondsNeeded}`, 'info');
      
      if(progress >= secondsNeeded) {
        log(`Streaming quest for ${applicationName} completed!`, 'success');
        cleanup();
      }
    };
    
    // Subscribe to heartbeat events
    FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", heartbeatMonitor);
    
    // Set up safety timeout
    const timeoutMinutes = Math.ceil((secondsNeeded - secondsDone) / 60) + 5;
    setTimeout(() => {
      if (!completed) {
        log(`Safety timeout reached for ${applicationName} streaming quest`, 'warning');
        cleanup();
      }
    }, timeoutMinutes * 60 * 1000);
    
    log(`Spoofed stream to ${applicationName}. Estimated time: ${Math.ceil((secondsNeeded - secondsDone) / 60)} minutes`, 'info');
    log(`Remember that you need at least 1 other person to be in the voice channel!`, 'warning');
    return true;
  } catch (error) {
    log(`Failed to process streaming quest: ${error.message}`, 'error');
    return false;
  }
};

// Process activity quest
const processActivityQuest = async (quest, taskName, secondsNeeded, secondsDone) => {
  try {
    // More robust channel selection that tries multiple fallbacks
    let channelId;
    try {
      const privateChannels = ChannelStore.getSortedPrivateChannels();
      if (privateChannels && privateChannels.length > 0) {
        channelId = privateChannels[0].id;
      } else {
        const guilds = Object.values(GuildChannelStore.getAllGuilds());
        const guildWithVoice = guilds.find(x => x != null && x.VOCAL && x.VOCAL.length > 0);
        if (guildWithVoice) {
          channelId = guildWithVoice.VOCAL[0].channel.id;
        } else {
          // Last resort - try to find any voice channel
          for (const guild of guilds) {
            if (guild && guild.VOCAL) {
              for (const category of Object.values(guild)) {
                if (Array.isArray(category)) {
                  const voiceChannel = category.find(c => c && c.channel && c.channel.type === 2);
                  if (voiceChannel) {
                    channelId = voiceChannel.channel.id;
                    break;
                  }
                }
              }
            }
            if (channelId) break;
          }
        }
      }
    } catch (e) {
      log(`Error finding channel: ${e.message}`, 'error');
      // Fallback to a fake channel ID as last resort
      channelId = '000000000000000000';
    }
    
    if (!channelId) {
      log('Failed to find a suitable voice channel for activity quest', 'error');
      return false;
    }
    
    const streamKey = `call:${channelId}:1`;
    const applicationName = quest.config.application.name;
    let completed = false;
    
    // Process heartbeats with retries
    while (!completed) {
      try {
        const res = await api.post({
          url: `/quests/${quest.id}/heartbeat`, 
          body: {
            stream_key: streamKey, 
            terminal: false,
            client_performance: {
              cpu_usage: Math.random() * 10 + 5,
              memory_usage: Math.random() * 500 + 200,
              samples: 60
            }
          }
        });
        
        const progress = res.body.progress.PLAY_ACTIVITY?.value || 0;
        log(`Activity progress: ${progress}/${secondsNeeded}`, 'info');
        
        if (progress >= secondsNeeded) {
          // Send terminal heartbeat
          await api.post({
            url: `/quests/${quest.id}/heartbeat`, 
            body: {
              stream_key: streamKey, 
              terminal: true
            }
          });
          
          log(`Activity quest for ${applicationName} completed!`, 'success');
          completed = true;
          return true;
        }
        
        // Adaptive delay based on progress
        const remainingProgress = secondsNeeded - progress;
        const delay = Math.min(20, Math.max(5, Math.floor(remainingProgress / 10))) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        log(`Error during activity heartbeat: ${error.message}`, 'error');
        // Short delay before retry
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    return completed;
  } catch (error) {
    log(`Failed to process activity quest: ${error.message}`, 'error');
    return false;
  }
};

// Process a single quest
const processQuest = async (quest) => {
  if (!quest) return false;
  
  const applicationId = quest.config.application.id;
  const applicationName = quest.config.application.name;
  const taskName = ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY"].find(x => quest.config.taskConfig.tasks[x] != null);
  const secondsNeeded = quest.config.taskConfig.tasks[taskName].target;
  const secondsDone = quest.userStatus?.progress?.[taskName]?.value ?? 0;
  
  log(`Processing quest: ${applicationName} - ${quest.config.messages.questName}`, 'info');
  log(`Task type: ${taskName}, Progress: ${secondsDone}/${secondsNeeded}`, 'info');
  
  switch (taskName) {
    case "WATCH_VIDEO":
      return await processVideoQuest(quest, taskName, secondsNeeded, secondsDone);
    case "PLAY_ON_DESKTOP":
      return await processDesktopPlayQuest(quest, taskName, secondsNeeded, secondsDone);
    case "STREAM_ON_DESKTOP":
      return await processStreamQuest(quest, taskName, secondsNeeded, secondsDone);
    case "PLAY_ACTIVITY":
      return await processActivityQuest(quest, taskName, secondsNeeded, secondsDone);
    default:
      log(`Unknown task type: ${taskName}`, 'error');
      return false;
  }
};

// Complete all available quests
const completeAllQuests = async () => {
  const quests = getAvailableQuests();
  
  if (quests.length === 0) {
    log("No uncompleted quests found!", 'warning');
    return;
  }
  
  log(`Found ${quests.length} uncompleted quests`, 'info');
  
  // Process quests sequentially to avoid conflicts
  for (const quest of quests) {
    await processQuest(quest);
    // Small delay between quests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
};

// Main execution
const main = async () => {
  const quests = getAvailableQuests();
  
  if (quests.length === 0) {
    log("No uncompleted quests found!", 'warning');
    return;
  }
  
  if (CONFIG.AUTO_COMPLETE_ALL) {
    log(`Auto-completing all ${quests.length} quests...`, 'info');
    await completeAllQuests();
  } else {
    // Process only the first available quest
    log(`Processing first available quest: ${quests[0].config.application.name}`, 'info');
    await processQuest(quests[0]);
  }
};

// Run the script
main().catch(error => {
  log(`Script execution failed: ${error.message}`, 'error');
});

// Add a fancy welcome message
console.log(`%c
  _    _            _    _____          _      _ _          
 | |  | |          | |  / ____|        | |    | (_)         
 | |__| | __ _  ___| | | |     ___   __| | ___| |___   _____
 |  __  |/ _\` |/ __| | | |    / _ \\ / _\` |/ _ \\ | \\ \\ / / _ \\
 | |  | | (_| | (__| | | |___| (_) | (_| |  __/ | |\\ V /  __/
 |_|  |_|\\__,_|\\___|_|  \\_____\\___/ \\__,_|\\___|_|_| \\_/ \\___|

----------------VISIT HACKCODE.LIVE--------------------------
                                                             
 Discord Quest Auto-Completer | v2.0.0 | Copyright ${new Date().getFullYear()}
`, `color: ${CONFIG.BRANDING.COLOR}; font-family: monospace;`);
