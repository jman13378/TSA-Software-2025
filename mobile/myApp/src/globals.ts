import { Creds } from "./credentialManager";
import { io } from "socket.io-client";
export const CredentialManager = new Creds();

// Importing required modules: Creds for credentials management and socket.io-client for WebSocket communication

// var socketInstance = io("https://backend.chaptercore.org/");
// Commented out production backend URL. Currently using localhost for development purposes.

console.log("Initializing socket");

var socketInstance = io("https://localhost:3000/");
// Initializing socket connection with local server on port 3000 for development purposes.

console.log("Connecting to socket");
socketInstance.connect();
// Initiating connection to the WebSocket server.

socketInstance.on("connect", () => {
  console.log("Successfully Connected");
  console.log('%c Successfully Connected ', 'background: #222; color: #bada55');
  // Logging successful connection. The second log uses custom styling for visual distinction in the console.
});

export const socket = {
  socket: socketInstance,
  on: socketInstance.on.bind(socketInstance),
  id: socketInstance.id,
  emit: (ev: string, body: Object, callback: Function = () => { }) => {
    let data = CredentialManager.getData();
    // Fetching user data using CredentialManager.

    const payload = {
      body: body,
      id: socketInstance.id,
      userData: data == undefined ? {} : data,
      // Creating payload to be sent, including user data if available.
    };

    socketInstance.emit(ev, JSON.stringify(payload), (response: any) => callback && callback(response));
    // Emitting event to server with serialized payload. If callback is provided, it's executed with the server response.
  },
  join: (roomId: string) => {
    socket.emit("join room", {
      Id: roomId,
      // Joining a specific room by room ID.
    });
  },
};

// Adding an event listener for any event that occurs on the socket instance and logging the event and its arguments.
socket.socket.onAny((event, ...args) => {
  console.log(event, args);
});

/**
 * Play notification sound when required.
 * This will be used in the desktop app; mobile implementation may differ.
 */
export function playSound() {
  let mySound = new Audio("https://firebasestorage.googleapis.com/v0/b/twetzel-a07f2.appspot.com/o/sounds%2Fmixkit-gaming-lock-2848_A_major__bpm_121_B%E2%99%AD_major__bpm_102.mp3?alt=media&token=d22be255-dbd0-455c-83b9-4ea6a06569d2");
  mySound.play();
  // Play audio from a given URL. Useful for notifying users of certain events.
}

/**
 * Send a desktop notification.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body text of the notification.
 * @param {string} icon - The icon to use for the notification (default is a logo path).
 * @param {object} options - Additional options for the notification (optional).
 */
export function sendNotification(title: string, body: string, icon: string = "../dist/img/logo.png", options = undefined) {
  if (Notification.permission !== "granted") Notification.requestPermission();
  // Request permission if notifications are not already granted.
  else {
    var notification = new Notification(title, {
      icon: icon,
      body: body,
    });
    // Create a new notification with the specified title, icon, and body text.

    notification.onclick = function () {
      if (eval("window['desktop']==true")) {
        window.open(`twetzel://`);
        // Open custom URL scheme if running on a desktop app (uses eval - be cautious).
      } else window.open(``);
      // If not on desktop, open a blank URL (could be adjusted for different behavior).
    };
  }
}
// Function to send desktop notifications, checking first if permissions are granted. This is used to alert users about important events or updates.
