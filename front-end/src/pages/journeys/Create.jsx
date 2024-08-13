import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../utils/fetchApi";

const initialFormData = {
  title: "",
  description: "",
  published: true,
  image: "",
  duration: 0,
  stages: [],
};

const initialStageFormData = {
  title: "",
  description: "",
  date: "",
  lat: 0,
  lng: 0,
  journeyId: 0,
};
export default function CreateNewJourney() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dateNow = Date.now();
  const today = new Date(dateNow);
  today.toLocaleDateString();
  console.log(today, "data oggi");
  const inputClasses =
    "w-full border-2 border-gray-300 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:border-primary";
  const [formData, setFormData] = useState(initialFormData);
  const [stagesList, setStagesList] = useState(initialStageFormData);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const [created, setCreated] = useState(false);

  function handleInputChange(e, key) {
    const value = e.target.value;
    const checked = e.target.checked;

    let newValue = e.target.type === "checkbox" ? checked : value;

    if (e.target.type === "file") {
      // I get the first selected file that is an istance of File's class.
      newValue = e.target.files[0];
    }

    console.log(newValue, "prima di essere mandata");
    setFormData((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  }

  function validateForm() {
    let isValid = true;
    const newValidationErrors = {};
    // Title Validation
    if (!formData.title) {
      newValidationErrors.title = "Title is required";
      isValid = false;
    }
    // Description Validation
    if (!formData.description) {
      newValidationErrors.description = "Description is required";
      isValid = false;
    }
    // Image Validation
    if (!formData.image) {
      newValidationErrors.image = "Image is required";
      isValid = false;
    }

    // Stage Validation
    if (formData.stages.length === 0) {
      newValidationErrors.stage = "At least 2 stages must be added.";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);
    return isValid;
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, you can submit or process the data here
      console.log("Form data:", formData);

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      console.log(formDataToSend, "send");
      const data = await fetchApi("/journeys/", "POST", formDataToSend);

      setCreated(true); // Set a submitted flag

      navigate("/journeys/" + data.id);
    } else {
      // Form is not valid, display error messages
      Error("Error when sending data");
    }
  }

  useEffect(() => {
    // fetchCategories();
  }, []);

  function getImagePreview() {
    return typeof formData.image !== "string"
      ? URL.createObjectURL(formData.image)
      : formData.image;
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl">
          Welcome {user?.name} {user?.surname}
        </h1>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {error && <div className="p-6 text-white bg-red-600">{error}</div>}
        <h1 className="text-2xl mb-12">Start a new Journey!</h1>

        <form
          className="mb-8 flex-grow"
          onSubmit={handleFormSubmit}
          id="journeyForm"
        >
          <div className="mb-4">
            <label htmlFor="title_input">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title")}
              id="title_input"
              className={inputClasses}
            />
            {validationErrors.title && (
              <div className="error p-1 text-white bg-red-600 rounded">
                {validationErrors.title}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description_input">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange(e, "description")}
              id="description_input"
              className={inputClasses}
            />
            {validationErrors.description && (
              <div className="error p-1 text-white bg-red-600 rounded">
                {validationErrors.description}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="available_input">Publish</label>
            <input
              type="checkbox"
              value={formData.published}
              onChange={(e) => handleInputChange(e, "published")}
              id="published_input"
              className={inputClasses}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image_input" className="mb-1 block">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange(e, "image")}
              id="image_input"
              className={inputClasses}
            />
            {getImagePreview() && (
              <img
                src={getImagePreview()}
                alt=""
                className="w-32 h-32 object-cover"
              />
            )}
            {validationErrors.image && (
              <div className="error p-1 text-white bg-red-600 rounded">
                {validationErrors.image}
              </div>
            )}
          </div>

          {/* departure */}
          {/* this should be necessary to track the place from where we are starting the journey but I'm considering if its necessary  */}

          <div className="mb-4">
            <h3>Stages</h3>

            {/* title */}
            <div className="mb-4">
              <label htmlFor="stage_title_input">Title</label>
              <input
                type="text"
                value={stagesList.title}
                onChange={(e) => handleInputChange(e, "stage title")}
                id="stage_title_input"
                className={inputClasses}
              />
              {validationErrors.stageTitle && (
                <div className="error p-1 text-white bg-red-600 rounded">
                  {validationErrors.stageTitle}
                </div>
              )}
            </div>
            {/* description */}
            <div className="mb-4">
              <label htmlFor="stage_description_input">Description</label>
              <input
                type="text"
                value={stagesList.description}
                onChange={(e) => handleInputChange(e, "stage description")}
                id="stage_description_input"
                className={inputClasses}
              />
              {validationErrors.stageDescription && (
                <div className="error p-1 text-white bg-red-600 rounded">
                  {validationErrors.stageDescription}
                </div>
              )}
            </div>
            {/* date */}
            <div className="mb-4">
              <label htmlFor="stage_date_input">Arrival Date</label>
              <input
                type="date"
                min={today}
                value={stagesList.date}
                onChange={(e) => handleInputChange(e, "stage date")}
                id="stage_date_input"
                className={inputClasses}
              />
              {validationErrors.stageDate && (
                <div className="error p-1 text-white bg-red-600 rounded">
                  {validationErrors.stageDate}
                </div>
              )}
            </div>
            {/* I need a search bar to locate the place where I want to go after that save it maybe with an alert or a confirmation button so that it gets added to the stages list and also I need a button to remove a stage from the list if I change my mind while still creating my journey */}

            {/* search bar */}

            {/* stage name */}

            {/* lat */}

            {/* lng */}

            {/* map with all stages */}
          </div>
        </form>

        <div className="flex gap-4">
          <button
            className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
            form="tagForm"
            type="submit"
            onClick={handleFormSubmit}
          >
            Add
          </button>
          <button
            className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
