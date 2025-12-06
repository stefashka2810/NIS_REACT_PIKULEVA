import {type ReactNode, useState} from "react";
import EventContext from "./EventContext.ts";

const EventProvider = ({ children }: { children: ReactNode }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [log, setLog] = useState<string>('');

    if (log) {
        setLogs([...logs, log]);
        setLog('');
    }

    return (
        <EventContext.Provider value={{ logs, setLog }}>
            {children}
        </EventContext.Provider>
    );
};

export default EventProvider;