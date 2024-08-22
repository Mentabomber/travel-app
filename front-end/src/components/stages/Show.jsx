import React, { useState, useEffect } from "react";
import styles from "../../css/modules/NewStageOverlay.module.css";

const initialFormData = {
  title: "",
  description: "",
  date: "",
  lat: 0,
  lng: 0,
  journeyId: "",
};

export default function Show({ show, data, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setFormData(initialFormData);
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
          <h1 className="text-2xl">Stage Details</h1>
          <form className="flex flex-col gap-4">
            <div className="mb-4">
              <label htmlFor="title_input">Title</label>
              <input
                type="text"
                value={formData.title}
                readOnly
                id="title_input"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description_input">Description</label>
              <input
                type="text"
                value={formData.description}
                readOnly
                id="description_input"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex gap-4">
              <button
                className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
                type="button"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
