import logo from './logo.svg';
import './App.css';
import myImage from './assets/humbleLogo.png';
import uploadImage from './assets/imageUpload.png';
import HB from './assets/HB.png';
function App() {
  const professionalBarWidth = 70;
  const communityBarWidth = 60;
  const personalLifeBarWidth = 80;
  const newHobbiesBarWidth = 90;


  return (
    <>

      <div className="blackNavigation">
        <img src={HB} className="HBText" alt="Description of the image" />
        {/* <img src={myImage} className="HBLogoLeft" alt="Description of the image" /> */}
      </div>




      <div className="parent">



        <div className="greyWelcomeBox">
          <p className="helloText">Hello Chuk!</p>
          <p className="againText">It's good to see you again.</p>
          <img src={myImage} className="humbleBox" alt="Description of the image" />
        </div>


      </div>




      <p className="uploadText">Upload Image</p>

      <div className="greyUploadBox">
        <img src={uploadImage} className="imageUpload" alt="Description of the image" />
        <div className="blackUploadBox">
          <p className="dragText">Drag Your Image</p>
        </div>
      </div>

      <div className="App">


      </div>


      <div className="chart">
        <div className="bar">
          {/* <div style={{ width: temp, backgroundColor: "#000000" }}></div> */}
          <div className="ProfessionalLabel">
            <p className="labelText">Professional</p>
          </div>

          <div style={{ backgroundColor: '#FFA5A5', height: 30, marginLeft: 140, width: (260 * professionalBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{professionalBarWidth}%</p>
          </div>


        </div>
        <div className="bar">
          <div className="ProfessionalLabel">
            <p className="labelText">Community</p>
          </div>

          <div style={{ backgroundColor: '#95DFFF', height: 30, marginLeft: 140, width: (260 * communityBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{communityBarWidth}%</p>
          </div>

        </div>
        <div className="bar">
          <div className="ProfessionalLabel">
            <p className="labelText">Personal Life</p>
          </div>

          <div style={{ backgroundColor: '#95FFF9', height: 30, marginLeft: 140, width: (260 * personalLifeBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{personalLifeBarWidth}%</p>
          </div>

        </div>



        <div className="bar">

          <div className="ProfessionalLabel">

            <p className="labelText">New Hobbies</p>
          </div>



          <div style={{ backgroundColor: '#E3C7FF', height: 30, marginLeft: 140, width: (260 * newHobbiesBarWidth * .01), marginTop: -50, borderRadius: '0 20px 20px 0px' }}>
            <p style={{ color: '#FFFFFF', height: 20, textAlign: 'right', paddingRight: 20, paddingTop: 4, fontWeight: 900 }}>{newHobbiesBarWidth}%</p>
          </div>

          <div className="barLine"></div>

        </div>




      </div>

      <div className="parsedTextDisplay">
        <center>
          <div className="parsedTextTitle">
            <p className="parsedTextTitleText">Parsed Text</p>

          </div>

          <div className="parsedTextContent">
            <p>Lorem ipsum dolor sit amet. Qui eaque eligendi cum atque quaerat aut obcaecati iusto ex modi quod et rerum temporibus! Ut repudiandae recusandae sit dolores consectetur a fuga voluptates eum vero molestias. In dolorem assumenda et quas reiciendis ea nobis recusandae qui dolorem omnis rem omnis itaque. </p>

          </div>
        </center>
      </div>




    </>

  );
}

export default App;
