import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import titleImage from './titleImage.png';
import About from './About';
import Contact from './Contact';
import FormComponent from './FormComponent';
import Home from './Home';

function App() {
  const [file, setFile] = useState(null);
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [localization, setLocalization] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('localization', localization);

    const response = await fetch('http://localhost:8000/predict/', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setPrediction(data);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={titleImage} alt="Title" style={{ marginRight: '10px', height: '80px' }} />
            <h1 className="App-title" style={{ fontSize: '2.5em' }}>DermaVision</h1>
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home 
              file={file} 
              setFile={setFile} 
              age={age} 
              setAge={setAge} 
              sex={sex} 
              setSex={setSex} 
              localization={localization} 
              setLocalization={setLocalization} 
              handleSubmit={handleSubmit} 
            />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>Footer information here.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
