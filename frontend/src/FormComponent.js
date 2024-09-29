import React from 'react';
import './FormComponent.css';

const FormComponent = ({ file, setFile, age, setAge, sex, setSex, localization, setLocalization, handleSubmit }) => {
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>File Upload:</label>
        <input type="file" className="form-input" onChange={(e) => setFile(e.target.files[0])} />
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
          <option value="localization1">trunk</option>
          <option value="localization2">face</option>
          <option value="localization3">foot</option>
          <option value="localization1">chest</option>
          <option value="localization2">back</option>
          <option value="localization3">abdomen</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default FormComponent;
