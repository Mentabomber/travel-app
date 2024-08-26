import { useEffect, useState } from "react";
import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";

export default function Show() {
  let initiated = false;
  const { id } = useParams();
  console.log(id);
  // I get a  state with the present query string

  const [searchParams, setSearchParams] = useSearchParams();
  const [journey, setJourney] = useState({});
  const navigation = useNavigate();

  console.log(searchParams);

  async function fetchData() {
    try {
      const url = "http://localhost:3307/journeys/";
      const jsonData = await (await fetch(url + id)).json();
      console.log(jsonData, "jsonData");
      if (jsonData === null) {
        navigation("not-found");
      } else {
        setJourney(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function getImgUrl() {
    if (journey.image) {
      return "/no-image.jpg";
    }

    if (journey.image.startsWith("http") || journey.image.startsWith("data:")) {
      return journey.image;
    }

    return "http://localhost:3307/" + journey.image;
  }

  useEffect(() => {
    if (initiated) {
      return;
    }

    fetchData();

    initiated = true;
  }, []);

  return (
    <div>
      <button onClick={() => navigation(-1)}>Back</button>
      <h1>
        Journey Details #{id} - {journey?.title}
      </h1>
      <span>{journey.description}</span>

      <img src={getImgUrl()} alt="" />
    </div>
  );
}
