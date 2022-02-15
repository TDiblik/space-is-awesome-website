window.onload = function () {
  showRocket(true);

  var select = document.getElementById("select-rocket");

  var opt_null = document.createElement("option");
  opt_null.value = ""; //rocket_id
  opt_null.innerHTML = ""; // rocket_name
  select.appendChild(opt_null);

  fetch(`https://api.spacexdata.com/v3/rockets/`)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        let currData = data[i];
        var opt = document.createElement("option");
        opt.value = currData.rocket_id;
        opt.innerHTML = currData.rocket_name;
        select.appendChild(opt);
      }
    })
    .catch((error) => console.error(error));
};

function showRocket(should_show) {
  var state = should_show ? "active" : "deactive";

  document.getElementById("rocket-identifier").classList = state;
  var svgDoc = document.getElementById("rocket-identifier").contentDocument;
  svgDoc.getElementById("rocket-whole").classList = state;
  svgDoc.getElementById("Basic-rocket-info").classList = state;
  svgDoc.getElementById("Engines-rocket-info").classList = state;
  svgDoc.getElementById("Payload-rocket-info").classList = state;
}

function getDataFromSpaceX() {
  var id = document.getElementById("select-rocket").value;
  if (id == "") return;
  console.log(id);
  fetch(`https://api.spacexdata.com/v3/rockets/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showRocket(false);
      setTimeout(function () {
        showRocket(true);
      }, 7000);
      setTimeout(function () {
        var svgDoc =
          document.getElementById("rocket-identifier").contentDocument;

        // Basic info
        console.log("začal basic info");
        svgDoc.getElementById("_Rocket_name").children[0].innerHTML =
          data.rocket_name;
        svgDoc.getElementById("_Rocket_description").children[0].innerHTML =
          data.description;
        svgDoc.getElementById(
          "_Rocket_Mass"
        ).children[0].innerHTML = `${data.mass.kg} kg`;
        svgDoc.getElementById(
          "_Rocket_Height"
        ).children[0].innerHTML = `${data.height.meters} m`;
        svgDoc.getElementById(
          "_Rocket_Diameter"
        ).children[0].innerHTML = `${data.diameter.meters} m`;
        svgDoc.getElementById("_Rocket_First_Flight").children[0].innerHTML =
          data.first_flight;
        svgDoc.getElementById(
          "_Rocket_Cost_Per_Launch"
        ).children[0].innerHTML = `${data.cost_per_launch}$`;
        console.log("překonal basic info");

        // Engines
        svgDoc.getElementById("_Engines_type").children[0].innerHTML =
          data.engines.type;
        svgDoc.getElementById("_Engines_version").children[0].innerHTML =
          data.engines.version;
        svgDoc.getElementById("_Engines_number").children[0].innerHTML =
          data.engines.number;
        svgDoc.getElementById(
          "_Engines_max_loss_engine"
        ).children[0].innerHTML = data.engines.engine_loss_max;
        svgDoc.getElementById("_Engines_layout").children[0].innerHTML =
          data.engines.layout;
        svgDoc.getElementById(
          "_Engines_thrust_to_weight"
        ).children[0].innerHTML = data.engines.thrust_to_weight;
        console.log("překonal engines");

        // Payload
        svgDoc.getElementById("_Payload_id_1").children[0].innerHTML =
          data.payload_weights[0].id;
        svgDoc.getElementById(
          "_Payload_mass_1"
        ).children[0].innerHTML = `${data.payload_weights[0].kg} kg`;
        svgDoc.getElementById("_Payload_id_2").children[0].innerHTML =
          data.payload_weights[1].id;
        svgDoc.getElementById(
          "_Payload_mass_2"
        ).children[0].innerHTML = `${data.payload_weights[1].kg} kg`;
        svgDoc.getElementById("_Payload_id_3").children[0].innerHTML =
          data.payload_weights[2].id;
        svgDoc.getElementById(
          "_Payload_mass_3"
        ).children[0].innerHTML = `${data.payload_weights[2].kg} kg`;
      }, 7000);
    })
    .catch((error) => console.error(error));
}
