import { useEffect, useState } from "react";
import FabButton from "../components/FabButton";
import JourneysProvider from "../contexts/JourneysContext";
import CreateNewJourney from "../components/journeys/Create";
import StageOverlay from "../components/stages/CreateOverlay";
import { PlusIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";

export default function NewJourney() {
  const [showStageOverlay, setShowStageOverlay] = useState(false);
  const [overlayData, setOverlayData] = useState(null);
  const [stages, setStages] = useState([]);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    published: true,
    image: "",
    duration: 0,
    stages: [],
  });

  useEffect(() => {
    // Manage body overflow when overlay is open
    document.body.classList.toggle("overflow-hidden", showStageOverlay);
    document.body.classList.toggle("pr-4", showStageOverlay);

    // Reset overlayData when overlay is closed
    if (!showStageOverlay) {
      setOverlayData(null);
    }
  }, [showStageOverlay]);

  const handleAddStage = (newStage) => {
    setStages((prevStages) => [
      ...prevStages,
      { ...newStage, journeyId: formData.id },
    ]);
  };

  const handleUpdateStage = (updatedStage) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === updatedStage.id ? updatedStage : stage
      )
    );
  };

  const handleDeleteStage = (stageId) => {
    setStages((prevStages) =>
      prevStages.filter((stage) => stage.id !== stageId)
    );
  };

  const openEditOverlay = (stageData) => {
    setOverlayData(stageData);
    setShowStageOverlay(true);
  };

  return (
    <JourneysProvider>
      <CreateNewJourney
        formData={formData}
        setFormData={setFormData}
        stages={stages}
        onAddStage={handleAddStage}
        onUpdateStage={handleUpdateStage}
        onDeleteStage={handleDeleteStage}
      />
      {/* Button to trigger the stage overlay */}
      <FabButton onClick={() => setShowStageOverlay(true)}>
        <PlusIcon className="group-hover:rotate-180 group-hover:scale-125 duration-500"></PlusIcon>
      </FabButton>

      {/* Overlay for adding or editing stages */}
      <StageOverlay
        show={showStageOverlay}
        data={overlayData}
        onSave={handleAddStage}
        onClose={() => setShowStageOverlay(false)}
      />
    </JourneysProvider>
  );
}
