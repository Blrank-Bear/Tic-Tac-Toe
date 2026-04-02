import { useEffect } from "react";
import { onEvent, offEvent } from "../services/socket";

export const useSocket = (event: string, callback: (data: any) => void) => {
  useEffect(() => {
    onEvent(event, callback);
    return () => offEvent(event);
  }, [event]);
};