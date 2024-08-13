import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function JourneysList() {
  let initiated = false;
  const [journeysList, setJourneysList] = useState([]);

  async function fetchData() {
    const url = "http://localhost:3307/journeys/";
    const jsonData = await (await fetch(url)).json();

    setJourneysList(jsonData.data);
    console.log(jsonData, "list", journeysList.data, "journeysList");
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
          {journeysList.map((journey) => (
            <JourneySection key={journey.id} journey={journey}></JourneySection>
          ))}
        </div>
      </section>
    </>
  );
}

function JourneySection({ journey, reverse }) {
  function getImgUrl() {
    if (!journey.image) {
      return "/no-image.jpg";
    }

    if (journey.image.startsWith("http") || journey.image.startsWith("data:")) {
      return journey.image;
    }

    return "http://localhost:3307/" + journey.image;
  }

  return (
    <div className={"w-full py-24 border-b flex "}>
      {/* img */}
      <div className="aspect-square w-1/3">
        <img src={getImgUrl()} alt="" className="w-full h-full object-cover" />
      </div>

      <div className={"flex flex-col gap-6  w-2/3 " + "pl-24"}>
        {/* title */}
        <h2 className="text-4xl font-semibold mb-4">{journey.title}</h2>

        {/* description */}
        <p className="text-xl text-gray-500">
          {journey.description ?? "Description not found"}
        </p>

        <div className="flex gap-4">
          <Link
            to={"/journeys/" + journey.id}
            className=" bg-blue-500 hover:bg-blue-800 px-8 py-4 rounded-lg text-white transition-colors"
          >
            Visualizza
          </Link>
        </div>
      </div>
    </div>
  );
}
