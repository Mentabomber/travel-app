import { useEffect, useState } from "react";
import FabButton from "../components/FabButton";
import JourneysProvider from "../contexts/JourneysContext";
import CreateNewJourney from "../components/journeys/Create";
import StageCreateOverlay from "../components/stages/CreateOverlay";
import StageUpdateOverlay from "../components/stages/UpdateOverlay";
import { PlusIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";

export default function NewJourney() {
  const [showStageCreateOverlay, setShowStageCreateOverlay] = useState(false);
  const [showStageUpdateOverlay, setShowStageUpdateOverlay] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null); // Store the ID of the stage being edited
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
    document.body.classList.toggle(
      "overflow-hidden",
      showStageCreateOverlay || showStageUpdateOverlay
    );
    document.body.classList.toggle(
      "pr-4",
      showStageCreateOverlay || showStageUpdateOverlay
    );

    // Reset selectedStageId when both overlays are closed
    if (!showStageCreateOverlay && !showStageUpdateOverlay) {
      setSelectedStageId(null);
    }
  }, [showStageCreateOverlay, showStageUpdateOverlay]);

  const handleAddStage = (newStage) => {
    setStages((prevStages) => [
      ...prevStages,
      { ...newStage, journeyId: formData.id, id: uuidv4() }, // Ensure unique ID is assigned
    ]);
    setShowStageCreateOverlay(false); // Close the create overlay after saving
  };

  const handleUpdateStage = (updatedStage) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === updatedStage.id ? updatedStage : stage
      )
    );
    setShowStageUpdateOverlay(false); // Close the update overlay after saving
  };

  const handleDeleteStage = (stageId) => {
    setStages((prevStages) =>
      prevStages.filter((stage) => stage.id !== stageId)
    );
  };

  const openEditOverlay = (stageId) => {
    setSelectedStageId(stageId); // Store the ID of the stage to be edited
    setShowStageUpdateOverlay(true);
  };

  // Get the stage data to populate the overlay based on the selected stage ID
  const overlayData =
    selectedStageId !== null
      ? stages.find((stage) => stage.id === selectedStageId)
      : null;

  useEffect(() => {
    console.log("Stages:", stages);
  }, [stages]);

  return (
    <JourneysProvider>
      <CreateNewJourney
        formData={formData}
        setFormData={setFormData}
        stages={stages}
        onAddStage={handleAddStage}
        onEditStage={openEditOverlay} // Passing openEditOverlay instead of onUpdateStage
        onUpdateStage={handleUpdateStage}
        onDeleteStage={handleDeleteStage}
      />
      {/* Button to trigger the stage creation overlay */}
      <FabButton onClick={() => setShowStageCreateOverlay(true)}>
        <PlusIcon className="group-hover:rotate-180 group-hover:scale-125 duration-500"></PlusIcon>
      </FabButton>

      {/* Overlay for creating stages */}
      <StageCreateOverlay
        show={showStageCreateOverlay}
        onSave={handleAddStage}
        onClose={() => setShowStageCreateOverlay(false)}
      />

      {/* Overlay for updating stages */}
      <StageUpdateOverlay
        show={showStageUpdateOverlay}
        data={overlayData} // Pass the full stage data for the selected stage
        onSave={handleUpdateStage}
        onClose={() => setShowStageUpdateOverlay(false)}
      />
    </JourneysProvider>
  );
}
