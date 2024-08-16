import { useEffect, useState } from "react";
import FabButton from "../components/FabButton";
import JourneysProvider from "../contexts/JourneysContext";
import StageOverlay from "../components/stages/CreateOverlay";
import { PlusIcon } from "@heroicons/react/24/solid";
import TheFooter from "../components/TheFooter";
import TheNavbar from "../components/TheNavbar";

export default function NewJourney() {
  const [showStageOverlay, setShowStageOverlay] = useState(false);
  const [overlayData, setOverlayData] = useState(null);

  // tolgo overflow dal body quando overlay è aperto
  useEffect(() => {
    // Devo togliere l'overflow dal body quando l'overlay è aperto
    document.body.classList.toggle("overflow-hidden", showStageOverlay);
    document.body.classList.toggle("pr-4", showStageOverlay);

    // Se il modale è stato chiuso, va resettato il overlayData
    if (!showStageOverlay) {
      setOverlayData(null);
    }
  }, [showStageOverlay]);

  function openEditOverlay(stageData) {
    setOverlayData(stageData);
    setShowStageOverlay(true);
  }

  return (
    <JourneysProvider>
      <StagesList onEditJourney={openEditOverlay}></StagesList>

      <FabButton onClick={() => setShowStageOverlay(true)}>
        <PlusIcon className="group-hover:rotate-180 group-hover:scale-125 duration-500"></PlusIcon>
      </FabButton>

      <StageOverlay
        show={showStageOverlay}
        data={overlayData}
        onClose={() => setShowStageOverlay(false)}
      ></StageOverlay>
    </JourneysProvider>
  );
}
