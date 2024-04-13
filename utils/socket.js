import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");
//const socket = io.connect("http://10.70.0.30:3000");
export default socket;
