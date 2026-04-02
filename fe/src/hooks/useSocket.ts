import { useEffect } from "react";
import { socketOn, socketOff } from "../socket/socket";

export const useSocket = (
  event: string, 
  callback: (data: any) => void
) => {
  useEffect(() => {
    socketOn(event, callback);
    return () => socketOff(event);
  }, [event]);
};