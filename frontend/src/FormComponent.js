import React from 'react';
import { useDropzone } from 'react-dropzone';
import './FormComponent.css';

const FormComponent = ({ file, setFile, age, setAge, sex, setSex, localization, setLocalization, handleSubmit }) => {
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>File Upload:</label>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag and drop a file here, or click to select one</p>
        </div>
      </div>
      <div className="input-group">
        <label>Age:</label>
        <input type="number" className="form-input" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Sex:</label>
        <select className="form-input" value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="input-group">
        <label>Localization:</label>
        <select className="form-input" value={localization} onChange={(e) => setLocalization(e.target.value)}>
          <option value="">Select</option>
          <option value="scalp">Scalp</option>
          <option value="ear">Ear</option>
          <option value="face">Face</option>
          <option value="back">Back</option>
          <option value="trunk">Trunk</option>
          <option value="chest">Chest</option>
          <option value="upper_extremity">Upper extremity</option>
          <option value="abdomen">Abdomen</option>
          <option value="unknown">Unknown</option>
          <option value="lower_extremity">Lower extremity</option>
          <option value="genital">Genital</option>
          <option value="neck">Neck</option>
          <option value="hand">Hand</option>
          <option value="foot">Foot</option>
          <option value="acral">Acral</option>
        </select>
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default FormComponent;
