import React from "react";
import { SeasonEpisodeProvider } from "./SeasonEpisodeProvider";
import TVResult from "./TVResults";
import Episode from "./Episode";
import EpisodeInfo from "./EpisodeInfo";

function App() {
  return (
    <SeasonEpisodeProvider>
      <TVResult />
      <Episode />
    </SeasonEpisodeProvider>
  );
}

export default App;
