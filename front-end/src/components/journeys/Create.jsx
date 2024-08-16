import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFormSubmit } from "../../utils/handleFormSubmit";
import { handleInputChange } from "../../utils/handleInputChange";

const initialFormData = {
  title: "",
  description: "",
  published: true,
  image: "",
  duration: 0,
  stages: [],
};

export default function CreateNewJourney() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const inputClasses =
    "w-full border-2 border-gray-300 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:border-primary";
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(() => {}, []);

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
          onSubmit={(e) => handleFormSubmit(e, "journey", setFormData)}
          id="journeyForm"
          name="journeys"
        >
          <div className="mb-4">
            <label htmlFor="title_input">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title", setFormData)}
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
              onChange={(e) => handleInputChange(e, "description", setFormData)}
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
              onChange={(e) => handleInputChange(e, "published", setFormData)}
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
              onChange={(e) => handleInputChange(e, "image", setFormData)}
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
          <div className="mb-4">
            <h3>stages</h3>
            <button
              className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
              form="tagForm"
              type="submit"
              onClick={handleFormSubmit}
              name="journeys"
            >
              Add
            </button>
          </div>
          {/* departure */}
          {/* this should be necessary to track the place from where we are starting the journey but I'm considering if its needed  */}
          {/* map with all stages */}
        </form>

        <div className="flex gap-4">
          <button
            className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
            form="tagForm"
            type="submit"
            onClick={handleFormSubmit}
            name="journeys"
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
