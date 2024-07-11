import { Creds } from "./credentialManager";
import { io } from "socket.io-client";
const CredentialManager = new Creds();

// var socketInstance = io("https://backend.chaptercore.org/");
var socketInstance = io("https://localhost:3000/");

const socket = {
  socket: socketInstance,
  on: socketInstance.on.bind(socketInstance),
  id: socketInstance.id,
  emit: (ev, body, callback) => {
    let data = CredentialManager.getData();

    const payload = {
      body: body,
      id: socketInstance.id,
      userData: data == undefined ? {} : data,
    };

    socketInstance.emit(ev, JSON.stringify(payload), (response) => callback && callback(response));
  },
  join: (roomId) => {
    socket.emit("join", {
      Id: roomId,
    });
  },
};
socket.socket.onAny((event, ...args) => {
  console.log(event, args);
});
/**
 * this will be for the desktop app once we start the mobile app it will be different
 */
 function playSound() {
  let mySound = new Audio("https://firebasestorage.googleapis.com/v0/b/twetzel-a07f2.appspot.com/o/sounds%2Fmixkit-gaming-lock-2848_A_major__bpm_121_B%E2%99%AD_major__bpm_102.mp3?alt=media&token=d22be255-dbd0-455c-83b9-4ea6a06569d2");
  mySound.play();
}
 function sendNotification(title, body, icon = "../dist/img/logo.png", options = undefined) {
  if (Notification.permission !== "granted") Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      icon: icon,
      body: body,
    });
    notification.onclick = function () {
      if (window["desktop"] == true) {
        window.open(`twetzel://`);
      } else window.open(``);
    };
  }
}
export {CredentialManager,playSound,CredentialManager,sendNotification,socket}