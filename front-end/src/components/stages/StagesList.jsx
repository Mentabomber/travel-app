import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function StagesList() {
  let initiated = false;
  const [stagesList, setStagesList] = useState([]);

  async function fetchData() {
    const url = "http://localhost:3307/stages/";
    const jsonData = await (await fetch(url)).json();

    setStagesList(jsonData.data);
    console.log(jsonData, "lista", stagesList.data, "stagesList");
  }
  async function handleEditClick(id) {
    const stageData = await (
      await fetch("http://localhost:3307/stages/" + id)
    ).json();

    // apriamo l'overlay
    onEditStage(stageData);
  }

  // All'avvio dell'applicazione, fetchiamo i dati
  useEffect(() => {
    if (initiated) {
      return;
    }

    fetchData();

    initiated = true;
  }, []);

  return (
    <>
      <section className="py-8">
        <div className="container px-4 mx-auto">
          {stagesList
            .filter((stage) => stage.journeyId === journey.id) // Filtra solo le foto con published true
            .map((stage) => (
              <StageSection
                key={stage.id}
                stage={stage}
                handleEditClick={handleEditClick}
              ></StageSection>
            ))}
        </div>
      </section>
    </>
  );
}
function StageSection(stage, handleEditClick) {
  return (
    <div className={"w-full py-24 border-b flex"}>
      <div className={"flex flex-col gap-6  w-2/3 pl-24"}>
        <h2 className="text-4xl font-semibold mb-4">{stage.title}</h2>

        {/* descrizione */}
        <p className="text-xl text-gray-500">
          {stage.description ?? "Description not available"}
        </p>

        <div className="flex gap-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-800 px-8 py-4 rounded-lg text-white transition-colors"
            onClick={() => handleEditClick(stage.id)}
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
}
