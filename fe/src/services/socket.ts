import { io } from "socket.io-client";
import { serverUrl } from "../types";

const socket = io(serverUrl);

export const emitEvent = (event: string, data: any) => {
  socket.emit(event, data);
};

export const onEvent = (event: string, callback: (data: any) => void) => {
  socket.on(event, callback);
};

export const offEvent = (event: string) => {
  socket.off(event);
};