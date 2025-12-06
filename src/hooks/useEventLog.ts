import {useContext} from "react";
import EventContext from "../context/EventContext.ts";

const useEventLog = () => {
    const context = useContext(EventContext);

    if (!context) {
        throw new Error();
    }

    return context;
}

export default useEventLog;