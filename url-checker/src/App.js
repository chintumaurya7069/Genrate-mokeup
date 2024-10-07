import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import './App.css';
import html2canvas from 'html2canvas';

function App() {
  const [url, setUrl] = useState('');
  const [valid, setValid] = useState(true);
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState('#fff'); // Background color state

  const handleSubmit = async (e) => {
    e.preventDefault();
    function myFunction() {
      document.body.style.backgroundColor = "red";
    }
    // Check if the URL is in the correct format
    if (!validator.isURL(url)) {
      setValid(false);
      return alert('The URL is not in the correct format');
    }

    setValid(true);
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/search?url=${url}`);

      if (response.status === 200) {
        setExists(true);
      } else {
        setExists(false);
        alert("Website doesn't exist in Google search");
      }
    } catch (error) {
      setExists(false);
      alert("Website doesn't exist or can't be fetched");
    } finally {
      setLoading(false);
    }
  };


  // Function to take screenshots
  const handleTakeScreenshot = async () => {
    if (!url) {
      alert('Please provide a URL first');
      return;
    }

    const devices = ['mobile', 'tablet', 'laptop'];

    for (let device of devices) {
      const deviceElement = document.querySelector(`.${device}`);
      if (deviceElement) {
        const canvas = await html2canvas(deviceElement?.contentWindow?.document?.body);
        const image = canvas.toDataURL('image/png');

        // Create a download link
        const link = document.createElement('a');
        link.href = image;
        link.download = `${device}-screenshot.png`;
        link.click();
      }
    }
  };

  return (

    <div className="fluid-container" style={{ width: '100%', padding: '0px' }}>
      <div className="nav-bar">
        <div style={{ display: 'flex', justifyContent: '' }}>
          <h2 className="brand" style={{ backgroundColor: 'orange', display: 'flex', width: '25%', padding: '10px' }}>Multi Device Website<br /> Mockup Generator</h2>
          <form onSubmit={handleSubmit} style={{ justifyContent: 'center', textAlign: 'center' }}>
            <input
              type="text"
              value={url}
              placeholder="Enter URL"
              onChange={(e) => setUrl(e.target.value)}
              className={!valid ? 'invalid' : ''}
            />
            <button type="submit" style={{ fontWeight: 'bold' }}>Generate Mockup</button>
          </form>
        </div>
      </div>

      <div className='contanier'>
        <div className="nav-bar-wrapper px-3" style={{padding:'10px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'black', color: 'white' }}>

          <div><label>Background Color <span>  </span>
            <input type='color' style={{
              width: '30px',
              padding: '2px'
            }} />
          </label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label" >IMac</label>
          </div>


          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label" >MacBook</label>
          </div>


          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label" >iPad</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label" >Phone</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label">iPhone FullScreen</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" />
            <label className="form-check-label">Large Mockups</label>
          </div>





          <select name="cars" id="cars" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',border:'none',padding:'0px'}}>
            <option value="volvo">From Left Perspective</option>
            <option value="saab">From Right Perspective</option>
            <option value="mercedes">From Front Perspective</option>
          </select>

          <button className='btn btn-success' onClick={handleTakeScreenshot} >Download Mockup</button>
          <button className='btn btn-warning'>Contact Us</button>


        </div>
      </div>


      <h2 className='text-center'>Website Preview</h2>


      {/* For showing the devices */}
      {loading && <p>Loading...</p>}

      {exists && (
        <div className="device-container" style={{ justifyContent: 'center' }}>

          <div className="device mobile" style={{ border: 'none' }}>
            <iframe src={url} title="Mobile View" style={{
              backgroundSize: 'cover', position: 'absolute',
              zIndex: '10',
              left: '20%',
              top: '700px',
              border: '20px solid black',
              borderRadius: '15px'
            }}></iframe>
          </div>
          <div className="device tablet" style={{ border: 'none' }}>
            <iframe src={url} title="Tablet View" style={{
              backgroundSize: 'cover', position: 'absolute',
              zIndex: '8',
              left: '11%',
              top: '550px',
              border: '20px solid black',
              borderRadius: '15px',
            }}></iframe>
            <p></p>
          </div>
          <div className="device laptop" style={{ border: 'none' }}>
            <iframe src={url} title="Laptop View" style={{
              backgroundSize: 'cover', position: 'absolute',
              zIndex: '10',
              right: '50px',
              top: '550px',
              border: '20px solid black',
              borderRadius: '15px'
            }}></iframe>
          </div>
          <div className="device destop" style={{ border: 'none' }}>
            <iframe src={url} title="Destop View" style={{
              backgroundSize: 'cover',
              position: 'absolute',
              left: '18%',
              border: '20px solid black',
              borderRadius: '15px'
            }}></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;



// import React, { useState } from 'react';
// import axios from 'axios';
// import validator from 'validator';
// import './App.css';

// function App() {
//   const [url, setUrl] = useState('');
//   const [valid, setValid] = useState(true);
//   const [exists, setExists] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [bgColor, setBgColor] = useState('#fff'); // Background color state
//   const [showColorPicker, setShowColorPicker] = useState(false); // Toggle color picker

//   // Function to handle URL validation and Google search check
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if the URL is in the correct format
//     if (!validator.isURL(url)) {
//       setValid(false);
//       return alert('The URL is not in the correct format');
//     }

//     setValid(true);
//     setLoading(true);

//     // Using CORS proxy to bypass CORS error
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     const searchUrl = `https://www.google.com/search?q=${url}`;

//     try {
//       const response = await axios.get(proxyUrl + searchUrl);

//       // Assuming Google returns results for the URL check
//       if (response.status === 200) {
//         setExists(true);
//       } else {
//         setExists(false);
//         alert("Website doesn't exist in Google search");
//       }
//     } catch (error) {
//       setExists(false);
//       alert("Website doesn't exist or can't be fetched");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle background color change
//   const handleBgColorChange = (color) => {
//     setBgColor(color);
//     setShowColorPicker(false); // Hide color picker after selection
//   };

//   return (
//     <div className="App">
//       <h1>URL Checker</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={url}
//           placeholder="Enter URL"
//           onChange={(e) => setUrl(e.target.value)}
//           className={!valid ? 'invalid' : ''}
//         />
//         <button type="submit">Check URL</button>
//       </form>

//       {loading && <p>Loading...</p>}

//       {exists && (
//         <div>
//           <div className="device-container">
//             <h2>Website Preview</h2>

//             <div className="device mobile" style={{ backgroundColor: bgColor }}>
//               <iframe src={url} title="Mobile View"></iframe>
//               <p>Mobile View</p>
//             </div>
//             <div className="device tablet" style={{ backgroundColor: bgColor }}>
//               <iframe src={url} title="Tablet View"></iframe>
//               <p>Tablet View</p>
//             </div>
//             <div className="device laptop" style={{ backgroundColor: bgColor }}>
//               <iframe src={url} title="Laptop View"></iframe>
//               <p>Laptop View</p>
//             </div>
//           </div>

//           {/* Button to show color picker */}
//           <button onClick={() => setShowColorPicker(!showColorPicker)}>
//             Change Background Color
//           </button>

//           {/* Color Picker Options */}
//           {showColorPicker && (
//             <div className="color-picker">
//               <button onClick={() => handleBgColorChange('#fff')}>White</button>
//               <button onClick={() => handleBgColorChange('#f0f0f0')}>Light Gray</button>
//               <button onClick={() => handleBgColorChange('#ffebcd')}>Beige</button>
//               <button onClick={() => handleBgColorChange('#ffcccb')}>Pink</button>
//               <button onClick={() => handleBgColorChange('#b0e0e6')}>Light Blue</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
