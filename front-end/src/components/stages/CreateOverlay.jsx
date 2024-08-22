import { useEffect, useState } from "react";
import styles from "../../css/modules/NewStageOverlay.module.css";

const initialFormData = {
  title: "",
  description: "",
  date: "",
  lat: 0,
  lng: 0,
  journeyId: "",
};

export default function NewStageOverlay({ show, data, onSave, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);
  function handleSave(e) {
    e.preventDefault();
    if (formData.title && formData.description) {
      // Ensure data is present
      onSave(formData); // Pass formData to parent component
      handleClose(); // Close the overlay
    } else {
      alert("Please fill out all required fields");
    }
  }

  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setFormData(initialFormData); // Reset form data on close
      onClose();
      setClosing(false);
    }, 500);
  }
  return (
    show && (
      <div
        className={`${styles.newStageOverlay} ${closing ? styles.closing : ""}`}
        onClick={handleClose}
      >
        <div
          className={styles.panelOverlay}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-2xl">Add New Stage</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSave}
            id="newStageForm"
            name="stages"
          >
            {/* Stage Form Fields */}
            <div className="mb-4">
              <label htmlFor="title_input">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                id="title_input"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description_input">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                id="description_input"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Form Submit Button */}
            <div className="flex gap-4">
              <button
                className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
                type="submit"
                form="newStageForm"
              >
                Save Stage
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
