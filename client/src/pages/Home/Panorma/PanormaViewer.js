import React, { useEffect } from 'react';

const PanoramaViewer = () => {
  useEffect(() => {
    // Create a script element for three.js
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.min.js';
    threeScript.integrity = 'sha512-uWKImujbh9CwNa8Eey5s8vlHDB4o1HhrVszkympkm5ciYTnUEQv3t4QHU02CUqPtdKTg62FsHo12x63q6u0wmg==';
    threeScript.crossOrigin = 'anonymous';
    threeScript.referrerPolicy = 'no-referrer';

    console.log(threeScript);

    // Create a script element for panolens.min.js
    const panolensScript = document.createElement('script');
    panolensScript.src = 'js/panolens.min.js'; // Update the path to panolens.min.js

    // Make sure both scripts are loaded asynchronously
    threeScript.async = true;
    panolensScript.async = true;

    // Append the scripts to the document's head
    document.head.appendChild(threeScript);
    document.head.appendChild(panolensScript);
  }, []);


  //use this div to render the panorama use panorma css
  return (
    <div className="main-container">
      <h1>Hi, Welcome</h1>
      <div className="image-container"></div>
    </div>
  );
};

export default PanoramaViewer;
