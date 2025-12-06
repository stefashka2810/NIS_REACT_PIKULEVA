import {createContext, type Dispatch, type SetStateAction} from "react";

type EventContextType = {
    logs: string[];
    setLog: Dispatch<SetStateAction<string>>;
}

const EventContext = createContext<EventContextType | null>(null);

export default EventContext;