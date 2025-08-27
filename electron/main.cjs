const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // optional
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // 👉 Dev mode: load Vite server
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools(); // optional in dev only
  } else {
    // 👉 Prod mode: load built app
    win.loadFile(path.join(__dirname, "../dist/index.html")).catch(err => {
      console.error("❌ Failed to load index.html:", err);
    });
  }

  // Optional: handle external links in the user’s browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    require("electron").shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
