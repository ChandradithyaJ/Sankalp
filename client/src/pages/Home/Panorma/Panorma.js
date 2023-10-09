// combined.js
const panoramaImage = new PANOLENS.ImagePanorama("../../../../public/images/Panorma.jpeg");
const imageContainer = document.querySelector(".image-container");

const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  controlBar: false,  
} );

viewer.add(panoramaImage);

document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");

  const h1 = document.createElement("h1");
  h1.textContent = "Hi, Welcome";

  mainContainer.appendChild(h1);
  mainContainer.appendChild(imageContainer);

  document.body.appendChild(mainContainer);
});
