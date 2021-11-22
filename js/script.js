window.addEventListener("load", () => {
  let long;
  let lat;
  let localTime = document.querySelector(".location-timezone");
  let tempSection = document.querySelector(".degree-section");
  let tempDegree = document.querySelector(".temperature-degree");
  let tempSpan = document.querySelector(".degree-section span");
  let tempDesc = document.querySelector(".temperature-description");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?&key=SANWW2Z8BCS5RWAJBZLPKSVP3`;

      fetch(api)
        .then((respond) => {
          return respond.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, conditions, icon } = data.currentConditions;
          // extracted DOM elements from the API
          tempDegree.textContent = temp + "°";
          tempDesc.textContent = conditions;
          localTime.textContent = data.timezone;

          // formula for converting to Celsius
          let celsius = (temp - 32) * (5 / 9);

          // set icon
          setIcons(icon, document.querySelector(".icon"));

          //changing temperature to Celsius/Fahrenheit
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celsius) + "°";
            } else {
              tempSpan.textContent = "F";
              tempDegree.textContent = temp + "°";
            }
          });
        });
    });
  }

  const setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: "white" });
    const currIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currIcon]);
  };
});
