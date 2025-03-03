window.onload = function () {
  fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("picture-of-the-day").src = data.hdurl ?? data.url;
      document.getElementById("picture-of-the-day-description").innerText = `${data.title} -- "${data.explanation}"`;
    })
    .catch((error) => console.error(error));
};
