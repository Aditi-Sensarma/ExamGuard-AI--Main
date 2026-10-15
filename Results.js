var changes = [
  { candidate: "CBSE26X417", subject: "Mathematics", oldMark: 76, newMark: 96,
    user: "Unknown Admin",         risk: "CRITICAL", colour: "critical" },

  { candidate: "CBSE26X882", subject: "Science",     oldMark: 54, newMark: 71,
    user: "Login from new device", risk: "HIGH",     colour: "high" },

  { candidate: "CBSE26X105", subject: "English",     oldMark: 68, newMark: 74,
    user: "Admin ID 12 (no OTP)",  risk: "MEDIUM",   colour: "medium" }
];




function showChanges() {
  var boxes = "";

  for (var i = 0; i < changes.length; i++) {
    var c = changes[i];

    boxes += `<div class="card threat" id="change${i}">

        <div class="change-top">
          <h3>🚨 Suspicious Result Modification Detected</h3>
          <span class="risk ${c.colour}">${c.risk}</span>
        </div>

        <div class="marks">
          <div><p>Original mark</p><h2>${c.oldMark}</h2></div>
          <div class="arrow">➜</div>
          <div><p>Attempted modification</p><h2 class="red">${c.newMark}</h2></div>
        </div>

        <div class="meta">
          <div><p>Candidate</p>${c.candidate}</div>
          <div><p>Subject</p>${c.subject}</div>
          <div><p>User making change</p>${c.user}</div>
        </div>

        <div class="actions">
          <button onclick="reject(${i})">Reject Change</button>
          <button onclick="allow(${i})">Allow Change</button>
        </div>

        <p class="done" id="result${i}"></p>
      </div>`;
  }

  document.getElementById('changes').innerHTML = boxes;
}

function reject(number) {
  document.getElementById('result' + number).textContent =
    "✅ Unauthorised modification prevented. Original mark kept.";
  document.getElementById('change' + number).className = "card threat resolved";
}

function allow(number) {
  var c = changes[number];
  document.getElementById('result' + number).textContent =
    "✅ Change approved. Mark updated to " + c.newMark + " and recorded in the audit log.";
  document.getElementById('change' + number).className = "card threat resolved";
}



function openForm() {
  document.getElementById('formBox').style.display = "block";
}

function closeForm() {
  document.getElementById('formBox').style.display = "none";
  document.getElementById('formMessage').textContent = "";
}

function riskOfJump(jump) {
  if (jump >= 20) { return "CRITICAL"; }
  if (jump >= 10) { return "HIGH"; }
  if (jump >= 5)  { return "MEDIUM"; }
  return "LOW";
}


function riskColour(risk) {
  if (risk == "LOW") { return "safe"; }
  return risk.toLowerCase();
}


function sendRequest() {
  var note = document.getElementById('formMessage');

  var candidate = document.getElementById('fCandidate').value;
  var subject   = document.getElementById('fSubject').value;
  var centre    = document.getElementById('fCentre').value;
  var user      = document.getElementById('fUser').value;
  var oldMark   = Number(document.getElementById('fOld').value);
  var newMark   = Number(document.getElementById('fNew').value);


  note.className = "form-message error";

  if (candidate == "" || subject == "" || centre == "" || user == "") {
    note.textContent = "❌ Please fill in every box.";
    return;
  }

  if (oldMark < 0 || oldMark > 100 || newMark < 0 || newMark > 100) {
    note.textContent = "❌ Marks must be between 0 and 100.";
    return;
  }

  if (newMark == oldMark) {
    note.textContent = "❌ The new mark is the same as the old one.";
    return;
  }

  var jump = newMark - oldMark;
  var risk = riskOfJump(jump);

  note.className = "form-message";
  note.textContent = "Sending...";

  db.collection("markChangeRequests").add({
    candidate: candidate,
    subject:   subject,
    centre:    centre,
    user:      user,
    oldMark:   oldMark,
    newMark:   newMark,
    jump:      jump,
    risk:      risk,
    status:    "Pending review",
    time:      new Date().toString(),
    created:   Date.now()
  })
  .then(function (record) {
    note.className = "form-message ok";
    note.textContent = "✅ Request sent. Reference: " + record.id.substring(0, 6).toUpperCase() +
                       ". Risk assessed as " + risk + ".";
    clearForm();
    showRequests();
  })
  .catch(function (error) {
    note.className = "form-message error";
    note.textContent = "❌ Could not send: " + error.message;
  });
}


function clearForm() {
  document.getElementById('fCandidate').value = "";
  document.getElementById('fSubject').value   = "";
  document.getElementById('fCentre').value    = "";
  document.getElementById('fUser').value      = "";
  document.getElementById('fOld').value       = "";
  document.getElementById('fNew').value       = "";
}








function showRequests() {
  var box = document.getElementById('requests');

  db.collection("markChangeRequests").orderBy("created", "desc").limit(5).get()
    .then(function (records) {

      if (records.empty) {
        box.innerHTML = "<p class='note'>No requests yet.</p>";
        return;
      }

      var rows = "";

      records.forEach(function (record) {
        var r = record.data();

        rows += `<tr>
            <td>${r.candidate}</td>
            <td>${r.subject}</td>
            <td>${r.centre}</td>
            <td>${r.oldMark} ➜ ${r.newMark}</td>
            <td>${r.user}</td>
            <td><span class="risk ${riskColour(r.risk)}">${r.risk}</span></td>
            <td>${r.status}</td>
          </tr>`;
      });

      box.innerHTML = `<table>
          <tr>
            <th>Candidate</th><th>Subject</th><th>Centre</th>
            <th>Marks</th><th>Requested by</th><th>Risk</th><th>Status</th>
          </tr>${rows}</table>`;
    })
    .catch(function (error) {
      box.innerHTML = "<p class='note'>Could not load requests: " + error.message + "</p>";
    });
}


showChanges();
showRequests();