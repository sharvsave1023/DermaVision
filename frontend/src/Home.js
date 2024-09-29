import React from 'react';
import FormComponent from './FormComponent';
import './FormComponent.css'; // Ensure to import the CSS

const Home = ({ file, setFile, age, setAge, sex, setSex, localization, setLocalization, handleSubmit }) => {
  return (
    <div className="home-layout">
      <div className="welcome-message">
        <h2>Welcome to DermaVision</h2>
        <p>Please fill out the form below to make a prediction:</p>
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
