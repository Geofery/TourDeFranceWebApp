const url = "http://localhost:8080";
const ridersURL = url + "/riders";
const teamsURL = url + "/teams";
const yellowShirtURL = ridersURL + "/yellowShirt";
const whiteShirtURL = ridersURL + "/whiteShirt";
const greenShirtURL = ridersURL + "/greenShirt";
const dottedShirtURL = ridersURL + "/dottedShirt";

const editRiderForm = document.getElementById("editRiderForm");
const createRiderForm = document.getElementById("createRiderForm");

function fetchData(url) {
  return fetch(url).then(res => res.json()).catch(err => alert(err));
}


addTableRow();

async function addTableRow() {
  const riders = await fetchData(ridersURL);
  const yellowShirt = await fetchData(yellowShirtURL);
  const whiteShirt = await fetchData(whiteShirtURL);
  const greenShirt = await fetchData(greenShirtURL);
  const dottedShirt = await fetchData(dottedShirtURL);
  let shirt = "";

  let table = document.getElementById("teams");


  riders.forEach((rider, index) => {

    if (rider.riderId === yellowShirt.riderId) {
      shirt = "Yellow shirt";
    } else if (rider.riderId === whiteShirt.riderId) {
      shirt = "White shirt";
    } else if (rider.riderId === greenShirt.riderId) {
      shirt = "Green shirt";
    } else if (rider.riderId === dottedShirt.riderId) {
      shirt = "Dotted shirt"
    } else {
      shirt = "";
    }

    table.innerHTML += `
        <tr>
        <tbody>
        <th scope="row">${index + 1}</th>
        <th>${rider.name}</th>
        <th>${rider.age}</th>
        <th>${rider.nationality}</th>
        <th>${rider.mountainPoints}</th>
        <th>${rider.sprintPoints}</th>
        <th>${rider.timeSeconds / 3600} hours</th>
        <th>${shirt}</th>
        <th>
        <button type="button" data-bs-toggle="modal" data-bs-target="#editModal" onclick="openEditor(${JSON.stringify(rider).split('"').join("&quot;")})">✍🏽</button>
        </th>
        <th>
        <button onclick="deleteRider(${rider.riderId})">🗑</button>
        </th>
        </tbody>
        </tr>
      `;
  })
};

function openCreateRider(){
  console.log("test")
  document.getElementById("modal-label1").innerHTML = `test`;
  const modalBody = document.getElementById("modal-body1");

  modalBody.innerHTML = `
  <div class="mb-3">
    <label for="inputNewName" class="form-label">Name:</label>
    <input name="newName" class="form-control" id="inputNewName" aria-describedby="nameHelp" value="name">
  </div>
  <div class="mb-3">
    <label for="inputNewAge" class="form-label">Age:</label>
    <input name="newAge" class="form-control" id="inputNewAge" aria-describedby="nameHelp" value="25">
  </div>
   <div class="mb-3">
    <label for="inputNewNationality" class="form-label">Nationality:</label>
    <input name="newNationality" class="form-control" id="inputNewNationality" aria-describedby="nameHelp" value="Nationality">
  </div>
   <div class="mb-3">
    <label for="inputNewMountainPoints" class="form-label">Mountain Points:</label>
    <input name="newMountainPoints" class="form-control" id="inputNewMountainPoints" aria-describedby="nameHelp" value="13">
  </div>
  <div class="mb-3">
    <label for="inputNewSprintPoints" class="form-label">Sprint Points:</label>
    <input name="newSprintPoints" class="form-control" id="inputNewSprintPoints" aria-describedby="sprintPointsHelp" value="15">
  </div>
  <div class="mb-3">
    <label for="inputNewTime" class="form-label">Time:</label>
    <input name="newTime" class="form-control" id="inputNewTime" aria-describedby="sprintPointsHelp" value="4200">
  </div>
  <div class="mb-3">
    <label for="inputNewTeam" class="form-label">Team id:</label>
    <input name="newTeam" class="form-control" id="inputNewTeam" aria-describedby="sprintPointsHelp" value="1">
  </div>
  `;
};


function createRider(event){
  event.preventDefault()
  const elements1 = event.target.elements;
  const newName = elements1.newName.value;
  const newAge = elements1.newAge.value;
  const newNationality = elements1.newNationality.value;
  const newMountainPoints = elements1.newMountainPoints.value;
  const newSprintPoints = elements1.newSprintPoints.value;
  const newTimeSeconds = elements1.newTime.value;
  const newTeamId = elements1.newTeam.value;

  fetch(ridersURL + "/" + newTeamId, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      name: newName,
      age: newAge,
      nationality: newNationality,
      mountainPoints: newMountainPoints,
      sprintPoints: newSprintPoints,
      timeSeconds: newTimeSeconds,
    })
  }).then( (res) => { res.json()
    const toastLiveExample = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastLiveExample);

    const toastBody = document.getElementById('toastBody');
    toastBody.innerHTML = `You successfully created ${newName}`;

    toast.show();

  });
};






function openEditor(rider) {
  document.getElementById("modal-label").innerHTML = `${rider.name}`;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `

  <div class="mb-3">
    <label for="inputName" class="form-label">Name:</label>
    <input name="name" class="form-control" id="inputName" aria-describedby="nameHelp" value="${rider.name}">
  </div>
  <div class="mb-3">
    <label for="inputAge" class="form-label">Age:</label>
    <input name="age" class="form-control" id="inputAge" aria-describedby="ageHelp" value="${rider.age}">
  </div>
  <div class="mb-3">
    <label for="inputNationality" class="form-label">Nationality:</label>
    <input name="nationality" class="form-control" id="inputNationality" aria-describedby="nationalityHelp" value="${rider.nationality}">
  </div>
  <div class="mb-3">
    <label for="inputMountainPoints" class="form-label">Mountain Points:</label>
    <input name="mountainPoints" class="form-control" id="inputMountainPoints" aria-describedby="mountainPointsHelp" value="${rider.mountainPoints}">
  </div>
  <div class="mb-3">
    <label for="inputSprintPoints" class="form-label">Sprint Points:</label>
    <input name="sprintPoints" class="form-control" id="inputSprintPoints" aria-describedby="sprintPointsHelp" value="${rider.sprintPoints}">
  </div>
  <div class="mb-3">
    <label for="inputTimeSeconds" class="form-label">Time in Seconds:</label>
    <input name="timeSeconds" class="form-control" id="inputTimeSeconds" aria-describedby="timeSecondsHelp" value="${rider.timeSeconds}">
  </div>
  <div class="mb-3">
    <label for="inputTeam" class="form-label">Team:</label>
    <input name="team" class="form-control" id="inputTeam" aria-describedby="teamHelp" value="${1}">
  </div>
  <div class="mb-3">
    <label for="inputRiderId" class="form-label">Rider Id:</label>
    <input name="riderId" class="form-control" id="riderIdTeam" aria-describedby="riderIdHelp" value="${rider.riderId}">
  </div>
  `;

};

function editRider(event) {
  event.preventDefault();
  const elements = event.target.elements;
  const name = elements.name.value;
  const age = elements.age.value;
  const nationality = elements.nationality.value;
  const mountainPoints = elements.mountainPoints.value;
  const sprintPoints = elements.sprintPoints.value;
  const timeSeconds = elements.timeSeconds.value;
  const teamId = elements.team.value;
  const riderId = elements.riderId.value;

  fetch(ridersURL + "/" + riderId, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      name: name,
      age: age,
      nationality: nationality,
      mountainPoints: mountainPoints,
      sprintPoints: sprintPoints,
      timeSeconds: timeSeconds,
      teamId: teamId
    })
  })
    .then( (res) => { res.json()
      const toastLiveExample = document.getElementById('liveToast');
      const toast = new bootstrap.Toast(toastLiveExample);

      const toastBody = document.getElementById('toastBody');
      toastBody.innerHTML = `You successfully updated ${name}`;

      toast.show();
    });


  console.log(event.target.elements.name.value)

};

function deleteRider(id) {
  fetch(ridersURL + "/" + id, {
    method: "DELETE",

  })
    .then(res => { res.json()
      const toastLiveExample = document.getElementById('liveToast');
      const toast = new bootstrap.Toast(toastLiveExample);

      const toastBody = document.getElementById('toastBody');
      toastBody.innerHTML = `You successfully deleted rider: ` + id;

      toast.show()

    })
};


editRiderForm.addEventListener('submit', editRider);
createRiderForm.addEventListener('submit', createRider);



