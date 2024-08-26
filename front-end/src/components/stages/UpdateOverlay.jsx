import React, { useEffect, useState } from "react";
import styles from "../../css/modules/NewStageOverlay.module.css";

const StageUpdateOverlay = ({ show, data, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    lat: 0,
    lng: 0,
    journeyId: "",
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      lat: 0,
      lng: 0,
      journeyId: "",
    });
  };

  return (
    <div className={`${styles.newStageOverlay}`} onClick={onClose}>
      <div className={styles.panelOverlay} onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl">Update Stage</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title_input">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              id="title_input"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description_input">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              id="description_input"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date_input">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              id="date_input"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex gap-4">
            <button
              className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
              type="submit"
            >
              Save
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-400 px-8 py-4 rounded-lg text-gray-800 transition-colors"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StageUpdateOverlay;
