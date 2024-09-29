import React from 'react';
import FormComponent from './FormComponent';
import './FormComponent.css'; // Ensure to import the CSS
import './Home.css'; // Import the Home CSS

const Home = ({ file, setFile, age, setAge, sex, setSex, localization, setLocalization, handleSubmit }) => {
  return (
    <div className="home-layout">
      <div className="welcome-message">
        <h2>Welcome to DermaVision</h2>
        <ul className="instruction-list">
          <li className="instruction-item">Please ensure that your camera has good lighting.</li>
          <li className="instruction-item">Center the camera on the affected area.</li>
          <li className="instruction-item">If possible, attempt to upload the picture in a 4:3 aspect ratio.</li>
          <li className="instruction-item">Once finished inputting age, sex, and localization, please press submit and wait for the results!</li>
        </ul>
      </div>
      <div className="form-section">
        <FormComponent 
          file={file} 
          setFile={setFile} 
          age={age} 
          setAge={setAge} 
          sex={sex} 
          setSex={setSex} 
          localization={localization} 
          setLocalization={setLocalization} 
          handleSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
};

export default Home;
