import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleFormSubmit } from "../../utils/handleFormSubmit";
import { handleInputChange } from "../../utils/handleInputChange";
import { StageSection } from "../stages/StagesList";

export default function CreateNewJourney({
  formData,
  setFormData,
  stages,
  onAddStage,
  onEditStage,
  onUpdateStage,
  onDeleteStage,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const inputClasses =
    "w-full border-2 border-gray-300 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:border-primary";

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
        <h1 className="text-2xl mb-12">Start a new Journey!</h1>

        <form
          className="mb-8 flex-grow"
          onSubmit={(e) => handleFormSubmit(e, "journey", setFormData)}
          id="journeyForm"
          name="journeys"
        >
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="title_input">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title", setFormData)}
              id="title_input"
              className={inputClasses}
            />
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
          </div>
          <div className="mb-4">
            <label htmlFor="available_input">Publish</label>
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleInputChange(e, "published", setFormData)}
              id="published_input"
              className={inputClasses}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image_input">Image</label>
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
          </div>

          {/* Stages Section */}
          <div className="mb-4">
            <h3>Stages</h3>
            <section className="py-8">
              <div className="container px-4 mx-auto">
                {stages.map((stage) => (
                  <StageSection
                    key={stage.id}
                    stage={stage}
                    handleEditClick={onEditStage}
                    handleDeleteClick={onDeleteStage}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Form Submit Button */}
          <div className="flex gap-4">
            <button
              className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
              type="submit"
              form="journeyForm"
            >
              Create Journey
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
