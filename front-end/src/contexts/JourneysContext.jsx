import { createContext, useContext, useState } from "react";
import fetchApi from "../utils/fetchApi";

// context creation
const JourneysContext = createContext();

// creation of a custom element around the provider
export default function JourneysProvider({ children }) {
  const [journeysList, setJourneysList] = useState([]);

  async function fetchData() {
    const jsonData = await fetchApi("/journeys");

    setJourneysList(jsonData.data);
  }

  return (
    <JourneysContext.Provider value={{ journeysList, fetchData }}>
      {children}
    </JourneysContext.Provider>
  );
}

// creation of a custom hook to access context
export function useJourneys() {
  return useContext(JourneysContext);
}
