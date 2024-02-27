const dateInput = document.getElementById("dateInput");
const imgInformation = document.querySelector(
  ".img-information .imgInformation"
);
const imgBlock = document.querySelector(".img-information .img-container img");

dateInput.addEventListener("change", function () {
  const date = new Date(dateInput.value);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  const nasaApi = `https://epic.gsfc.nasa.gov/api/natural/date/${year}-${month}-${day}`;

  fetch(nasaApi)
    .then((response) => response.json())
    .then((data) => {
      const imageData = data[0];
      const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${imageData.image}.jpg`;

      // Update image block
      imgBlock.setAttribute("src", imageUrl);

      // Update image information block
      imgInformation.innerHTML = `
        <p>Caption: ${imageData.caption}</p>
        <p>Latitude: ${imageData.centroid_coordinates.lat}</p>
        <p>Longitude: ${imageData.centroid_coordinates.lon}</p>
        <p>DSCOV-J2000 Position (x, y, z): (${imageData.dscovr_j2000_position.x}, ${imageData.dscovr_j2000_position.y}, ${imageData.dscovr_j2000_position.z})</p>
        <p>Lunar J2000 Position (x, y, z): (${imageData.lunar_j2000_position.x}, ${imageData.lunar_j2000_position.y}, ${imageData.lunar_j2000_position.z})</p>
        <p>Sun J2000 Position (x, y, z): (${imageData.sun_j2000_position.x}, ${imageData.sun_j2000_position.y}, ${imageData.sun_j2000_position.z})</p>
      `;
      imgInformation.classList.add("border", "border-info-subtle");
    })

    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
