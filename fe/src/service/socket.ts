import { io } from "socket.io-client";
import { serverUrl } from "../type";

const socket = io(serverUrl); // Adjust the URL if needed

export const socket_api = (action: number, path: string, reqestData: object): object => {
    if(action == 0) {
        socket.emit(path, reqestData);
        return {};
    }
    else if(action == 1) {
        socket.on(path, (data) => {return data})
    }
    else {
        socket.off(path);
    }
    return {};
}