import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFormSubmit } from "../../utils/handleFormSubmit";

const initialFormData = {
  title: "",
  description: "",
  date: "",
  lat: 0,
  lng: 0,
  journeyId: 0,
};
export default function NewStageOverlay() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dateNow = Date.now();
  const today = new Date(dateNow);
  today.toLocaleDateString();

  const inputClasses =
    "w-full border-2 border-gray-300 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:border-primary";
  const [formData, setFormData] = useState(initialFormData);
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

  useEffect(() => {}, []);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        {error && <div className="p-6 text-white bg-red-600">{error}</div>}
        <h1 className="text-2xl mb-12">Create a new Stage!</h1>

        <form
          className="mb-8 flex-grow"
          onSubmit={(e) => handleFormSubmit(e, "journey")}
          id="stageForm"
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
            <div className="mb-4">
              <label htmlFor="date_input">Arrival Date</label>
              <input
                type="date"
                min={today}
                value={formData.date}
                onChange={(e) => handleInputChange(e, "date")}
                id="date_input"
                className={inputClasses}
              />
              {validationErrors.date && (
                <div className="error p-1 text-white bg-red-600 rounded">
                  {validationErrors.date}
                </div>
              )}
            </div>
          </div>

          {/* I need a search bar to locate the place where I want to go after that save it maybe with an alert or a confirmation button so that it gets added to the stages list and also I need a button to remove a stage from the list if I change my mind while still creating my journey */}

          {/* search bar */}

          {/* lat */}

          {/* lng */}
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
