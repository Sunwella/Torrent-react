import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { getTrackers, Tracker } from "../data";

export const TrackersContext = createContext<Tracker[]>([]);

export const TrackersProvider = ({ children }: PropsWithChildren) => {
    const [trackers, setTrackers] = useState<Tracker[]>([]);
  
    const fetchTrackersHandler = async () => {
      const data = await getTrackers();
      setTrackers(data);
    };
  
    useEffect(() => {
      fetchTrackersHandler();
    }, []);
    
    return <TrackersContext.Provider value={trackers}>{children}</TrackersContext.Provider>
}

export const useTrackers = () => useContext(TrackersContext)