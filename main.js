const electron = require("electron");
const { app, globalShortcut, ipcMain, BrowserWindow, Menu, Tray } = electron;
const configuration = require("./configuration");
const path = require("path");
const url = require("url");

let mainWindow, settingsWindow;

function createWindow() {
  if (!configuration.readSettings("shortcutKeys")) {
    configuration.saveSettings("shortcutKeys", ["ctrl", "shift"]);
  }
  mainWindow = new BrowserWindow({
    width: 420,
    height: 720,
    frame: false,
    resizable: false
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  setGlobalShortcuts();
  createTray();
}

function openSettings() {
  if (settingsWindow) {
    return;
  }
  settingsWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200
  });
  settingsWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "settings.html"),
      protocol: "file:",
      slashes: true
    })
  );

  settingsWindow.on("closed", function() {
    settingsWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  globalShortcut.unregisterAll();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on('will-quit', () => {
//     // Unregister all shortcuts.
//     globalShortcut.unregisterAll()
// })

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("close-main-window", (event, arg) => {
  app.quit();
});

ipcMain.on("open-settings-window", (event, arg) => {
  openSettings();
});

ipcMain.on("close-settings-window", (event, arg) => {
  if (settingsWindow) {
    settingsWindow.close();
  }
});

ipcMain.on("set-global-shortcuts", (event, arg) => {
  setGlobalShortcuts();
});

let keys = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
const alphabet = [...keys, ...["F1", "F2", "F3", "F4"]];
// let sendContent = function(key) {
//   console.log("KEY", key, index);
//   let val = alphabet.findIndex((s)=>key==s);
//   console.log("VAL", val);
//   mainWindow.webContents.send("global-shortcut", val);
// };

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();

  var shortcutKeysSetting = configuration.readSettings("shortcutKeys");
  var shortcutPrefix =
    shortcutKeysSetting.length === 0 ? "" : shortcutKeysSetting.join("+") + "+";

  // for (var i = 0; i < alphabet.length; i++) {
  //   globalShortcut.register(shortcutPrefix + alphabet[i], () =>
  //     mainWindow.webContents.send("global-shortcut", i)
  //   );
  // }


  //12345
  globalShortcut.register(shortcutPrefix + "1", function() {
    mainWindow.webContents.send("global-shortcut", 0);
  });
  globalShortcut.register(shortcutPrefix + "2", function() {
    mainWindow.webContents.send("global-shortcut", 1);
  });
  globalShortcut.register(shortcutPrefix + "3", function() {
    mainWindow.webContents.send("global-shortcut", 2);
  });
  globalShortcut.register(shortcutPrefix + "4", function() {
    mainWindow.webContents.send("global-shortcut", 3);
  });
  globalShortcut.register(shortcutPrefix + "5", function() {
    mainWindow.webContents.send("global-shortcut", 4);
  });
  globalShortcut.register(shortcutPrefix + "6", function() {
    mainWindow.webContents.send("global-shortcut", 5);
  });
  globalShortcut.register(shortcutPrefix + "7", function() {
    mainWindow.webContents.send("global-shortcut", 6);
  });
  globalShortcut.register(shortcutPrefix + "8", function() {
    mainWindow.webContents.send("global-shortcut", 7);
  });
  globalShortcut.register(shortcutPrefix + "9", function() {
    mainWindow.webContents.send("global-shortcut", 8);
  });

  globalShortcut.register(shortcutPrefix + "0", function() {
    mainWindow.webContents.send("global-shortcut", 9);
  });

  //QWERTY
  globalShortcut.register(shortcutPrefix + "q", function() {
    mainWindow.webContents.send("global-shortcut", 10);
  });
  globalShortcut.register(shortcutPrefix + "w", function() {
    mainWindow.webContents.send("global-shortcut", 11);
  });
  globalShortcut.register(shortcutPrefix + "e", function() {
    mainWindow.webContents.send("global-shortcut", 12);
  });
  globalShortcut.register(shortcutPrefix + "r", function() {
    mainWindow.webContents.send("global-shortcut", 13);
  });
  globalShortcut.register(shortcutPrefix + "t", function() {
    mainWindow.webContents.send("global-shortcut", 14);
  });
  globalShortcut.register(shortcutPrefix + "y", function() {
    mainWindow.webContents.send("global-shortcut", 15);
  });
  globalShortcut.register(shortcutPrefix + "u", function() {
    mainWindow.webContents.send("global-shortcut", 16);
  });
  globalShortcut.register(shortcutPrefix + "i", function() {
    mainWindow.webContents.send("global-shortcut", 17);
  });
  globalShortcut.register(shortcutPrefix + "o", function() {
    mainWindow.webContents.send("global-shortcut", 18);
  });
  globalShortcut.register(shortcutPrefix + "p", function() {
    mainWindow.webContents.send("global-shortcut", 19);
  });
  //ASDF
  globalShortcut.register(shortcutPrefix + "a", function() {
    mainWindow.webContents.send("global-shortcut", 20);
  });
  globalShortcut.register(shortcutPrefix + "s", function() {
    mainWindow.webContents.send("global-shortcut", 21);
  });
  globalShortcut.register(shortcutPrefix + "d", function() {
    mainWindow.webContents.send("global-shortcut", 22);
  });
  globalShortcut.register(shortcutPrefix + "f", function() {
    mainWindow.webContents.send("global-shortcut", 23);
  });
  globalShortcut.register(shortcutPrefix + "g", function() {
    mainWindow.webContents.send("global-shortcut", 24);
  });
  globalShortcut.register(shortcutPrefix + "h", function() {
    mainWindow.webContents.send("global-shortcut", 25);
  });
  globalShortcut.register(shortcutPrefix + "j", function() {
    mainWindow.webContents.send("global-shortcut", 26);
  });
  globalShortcut.register(shortcutPrefix + "k", function() {
    mainWindow.webContents.send("global-shortcut", 27);
  });
  globalShortcut.register(shortcutPrefix + "l", function() {
    mainWindow.webContents.send("global-shortcut", 28);
  });

  //ZXCV
  globalShortcut.register(shortcutPrefix + "z", function() {
    mainWindow.webContents.send("global-shortcut", 29);
  });
  globalShortcut.register(shortcutPrefix + "x", function() {
    mainWindow.webContents.send("global-shortcut", 30);
  });
  globalShortcut.register(shortcutPrefix + "c", function() {
    mainWindow.webContents.send("global-shortcut", 31);
  });
  globalShortcut.register(shortcutPrefix + "v", function() {
    mainWindow.webContents.send("global-shortcut", 32);
  });
  globalShortcut.register(shortcutPrefix + "b", function() {
    mainWindow.webContents.send("global-shortcut", 33);
  });
  globalShortcut.register(shortcutPrefix + "n", function() {
    mainWindow.webContents.send("global-shortcut", 34);
  });
  globalShortcut.register(shortcutPrefix + "m", function() {
    mainWindow.webContents.send("global-shortcut", 35);
  });

  //F1 F2
  globalShortcut.register(shortcutPrefix + "F1", function() {
    mainWindow.webContents.send("global-shortcut", 36);
  });
  globalShortcut.register(shortcutPrefix + "F2", function() {
    mainWindow.webContents.send("global-shortcut", 37);
  });
  globalShortcut.register(shortcutPrefix + "F3", function() {
    mainWindow.webContents.send("global-shortcut", 38);
  });
  globalShortcut.register(shortcutPrefix + "F4", function() {
    mainWindow.webContents.send("global-shortcut", 39);
  });

}

function createTray() {
  const trayMenuTemplate = [
    {
      label: "Settings",
      click: function() {
        openSettings();
      }
    },
    {
      label: "Quit",
      click: function() {
        app.quit();
      }
    }
  ];
  const tray = new Tray(path.join(__dirname,"./img/tray.png"));
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setToolTip("Sound Machine.");
  tray.setContextMenu(contextMenu);
}
