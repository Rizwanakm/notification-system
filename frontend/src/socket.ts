// frontend/src/socket/socket.ts
import { io } from "socket.io-client";

// Make sure this matches your backend URL
export const socket = io("http://localhost:5000");
