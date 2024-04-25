import React, { useState } from 'react';
import './App.css';
import myImage from './assets/humbleLogo.png';
import uploadImage from './assets/imageUpload.png';
import HB from './assets/HB.png';
import LoadingOverlay from './LoadingOverlay';

function App() {

  const [isActive, setIsActive] = useState (false);
  const [professionalBarWidth, setProfessionalBarWidth] = useState(70);
  const [communityBarWidth, setCommunityBarWidth] = useState(60);
  const [personalLifeBarWidth, setPersonalLifeBarWidth] = useState(50);
  const [newHobbiesBarWidth , setNewHobbiesBarWidth] = useState(90);

  const [firstName, setFirstName] = useState('Professional');
  const [secondName, setSecondName] = useState('Community');
  const [thirdName, setThirdName] = useState('Personal Life');
  const [fourthName, setFourthName] = useState('New Hobbies');


  const [displayText, setDisplayText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null); // State to hold the uploaded image file
  const [uploadedImage2, setUploadedImage2] = useState(null); // State to hold the uploaded image file

  const handleFileUpload = async () => {
    setIsActive(true);
    if (!uploadedImage) {
      alert('Please upload an image first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', uploadedImage);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();  // Getting more detailed error message
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }
  
      const result = await response.json();
      // Set state with rounded percentages as strings
      setProfessionalBarWidth(Math.round(result.CorrespondingPercentages[0] * 100));
      setCommunityBarWidth(Math.round(result.CorrespondingPercentages[1] * 100));
      setPersonalLifeBarWidth(Math.round(result.CorrespondingPercentages[2] * 100));
      setNewHobbiesBarWidth(Math.round(result.CorrespondingPercentages[3] * 100));
      setFirstName(result.TopCategories[0]);
      setSecondName(result.TopCategories[1]);
      setThirdName(result.TopCategories[2]);
      setFourthName(result.TopCategories[3]);

      setDisplayText(result.Response);
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert('Failed to upload the image: ' + error.message);
    }
    setIsActive(false);
  };
  

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setUploadedImage2(URL.createObjectURL(event.dataTransfer.files[0]));
      setUploadedImage(event.dataTransfer.files[0]);
    }
  };

  // Prevent default behavior (Prevent file from being opened)
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <LoadingOverlay isActive={isActive} />
      <div className="blackNavigation">
        <img src={HB} className="HBText" alt="Description of the image" />
      </div>

      <div className="parent">
        <div className="greyWelcomeBox">
          <p className="helloText">Hello Chuk!</p>
          <p className="againText">It's good to see you again.</p>
          <img src={myImage} className="humbleBox" alt="Description of the image" />
        </div>
      </div>

      <p className="uploadText">Upload Image</p>
      <div className="greyUploadBox" onDrop={handleDrop} onDragOver={handleDragOver}>
        <img src={uploadedImage2 || uploadImage} className="imageUpload" alt="Drag and drop or click to upload image" />
        <div className="blackUploadBox">
          <p className="dragText">Drag Your Image</p>
        </div>
      </div>

      <div className="chart">
        <div className="bar">
          <div className="ProfessionalLabel">
            <p className="labelText">{firstName}</p>
          </div>
          <div style={{ backgroundColor: '#FFA5A5', height: 30, marginLeft: 140, width: (260 * professionalBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{professionalBarWidth}%</p>
          </div>
        </div>

        <div className="bar">
          <div className="ProfessionalLabel">
            <p className="labelText">{secondName}</p>
          </div>
          <div style={{ backgroundColor: '#95DFFF', height: 30, marginLeft: 140, width: (260 * communityBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{communityBarWidth}%</p>
          </div>
        </div>

        <div className="bar">
          <div className="ProfessionalLabel">
            <p className="labelText">{thirdName}</p>
          </div>
          <div style={{ backgroundColor: '#95FFF9', height: 30, marginLeft: 140, width: (260 * personalLifeBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{personalLifeBarWidth}%</p>
          </div>
        </div>

        <div className="bar">
          <div className="ProfessionalLabel">
            <p className="labelText">{fourthName}</p>
          </div>
          <div style={{ backgroundColor: '#E3C7FF', height: 30, marginLeft: 140, width: (260 * newHobbiesBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{newHobbiesBarWidth}%</p>
          </div>
        </div>
      </div>

      <div className="parsedTextDisplay">
        <center>
          <div className="parsedTextTitle">
            <button onClick={handleFileUpload} className="parsedTextTitleText">Parsed Text</button>
          </div>
          <div className="parsedTextContent">
            <p>{displayText}</p>
          </div>
        </center>
      </div>
    </>
  );
}

export default App;
