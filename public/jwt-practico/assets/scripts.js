const getPosts = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
      fillTable(data, "js-table-posts");
      toggleFormAndTable("js-form-wrapper", "js-table-wrapper");
    }
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
};

const postData = async (email, password) => {
  try {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Origin", "http://localhost:3000");
    headers.append(
      "Access-Control-Allow-Methods",
      "Origin",
      "http://localhost:3000"
    );
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
    headers.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: headers,
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const fillTable = (data, table) => {
  let rows = "";
  $.each(data, (i, row) => {
    rows += `<tr>
    <td> ${row.title} </td>
    <td> ${row.body} </td>
    </tr>`;
  });
  $(`#${table} tbody`).append(rows);
};

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).toggle();
  $(`#${table}`).toggle();
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    getPosts(token);
  }
};
init();

$("#js-form").submit(async (event) => {
  event.preventDefault();
  const email = document.getElementById("js-input-email").value;
  const password = document.getElementById("js-input-password").value;
  const JWT = await postData(email, password);
  getPosts(JWT);
});

window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Earthquakes - per month",
    },
    data: [
      {
        type: "line",

        dataPoints: [
          { x: new Date(2012, 00, 1), y: 450 },
          { x: new Date(2012, 01, 1), y: 414 },
          { x: new Date(2012, 02, 1), y: 520 },
          { x: new Date(2012, 03, 1), y: 460 },
          { x: new Date(2012, 04, 1), y: 450 },
          { x: new Date(2012, 05, 1), y: 500 },
          { x: new Date(2012, 06, 1), y: 480 },
          { x: new Date(2012, 07, 1), y: 480 },
          { x: new Date(2012, 08, 1), y: 410 },
          { x: new Date(2012, 09, 1), y: 500 },
          { x: new Date(2012, 10, 1), y: 480 },
          { x: new Date(2012, 11, 1), y: 510 },
        ],
      },
    ],
  });

  chart.render();
};
