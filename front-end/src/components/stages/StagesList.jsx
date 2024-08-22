import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StagesList() {
  let initiated = false;
  const [stagesList, setStagesList] = useState([]);

  async function fetchData() {
    const url = "http://localhost:3307/stages/";
    const jsonData = await (await fetch(url)).json();
    console.log("Fetched stages:", jsonData.data);
    setStagesList(jsonData.data);
    console.log(jsonData, "lista", stagesList.data, "stagesList");
  }
  async function handleEditClick(id) {
    const stageData = await (
      await fetch("http://localhost:3307/stages/" + id)
    ).json();

    // opening the overlay
    onEditStage(stageData);
  }

  // At the start of the application, fetch data
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
            .filter((stage) => stage.journeyId === journey.id)
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
export function StageSection({ stage, handleEditClick, handleDeleteClick }) {
  console.log("Stage object:", stage); // Add this line for debugging

  const handleDelete = () => {
    console.log("Deleting stage with ID:", stage.id);
    if (handleDeleteClick) {
      handleDeleteClick(stage.id);
    }
  };
  return (
    <div className={"w-full py-24 border-b flex"}>
      <div className={"flex flex-col gap-6  w-2/3 pl-24"}>
        <h2 className="text-4xl font-semibold mb-4">{stage.title}</h2>

        {/* description */}
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
          <button
            className="w-full bg-red-500 hover:bg-red-800 px-8 py-4 rounded-lg text-white transition-colors"
            onClick={handleDelete}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
