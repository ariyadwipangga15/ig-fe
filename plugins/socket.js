// import { io } from "socket.io-client";
// import Vue from "vue";

// const socket = new io(process.env.socketUrl, {
//   transports: ["websocket"],
//   upgrade: false,
//   rejectUnauthorized: false,
//   reconnection: true
// });

// socket.connect();

// socket.on("connected", (data) => {
//   console.log("Connect To Socket");
// });
// export default ({ app }, inject) => {
//   inject("socket", Vue.observable({ main: socket }));
// };  
