import { io } from "socket.io-client";

const socket = io("https://scholarly-server-five.vercel.app", {
  transports: ["websocket"],
});

export default socket;
