var threatList = [
  { name: "Question Paper Server Access Attempt",
    reasons: [ { text: "Login from unknown account",        points: 40 },
               { text: "Access attempted at unusual time",   points: 32 },
               { text: "Multiple failed passwords",          points: 24 } ] },

  { name: "Question Paper Downloaded Before Exam Date",
    reasons: [ { text: "File opened 3 days before the exam", points: 38 },
               { text: "Download from an unregistered device", points: 30 },
               { text: "Copy sent to an outside email",      points: 26 } ] },

  { name: "Marks Database Edited After Result Lock",
    reasons: [ { text: "Marks changed after final submission", points: 36 },
               { text: "Edit made from a new device",        points: 28 },
               { text: "No approval from head examiner",      points: 24 } ] },

  { name: "Unknown Administrator Login",
    reasons: [ { text: "Account not in the approved admin list", points: 30 },
               { text: "Login from a different state",       points: 27 },
               { text: "OTP was skipped",                    points: 22 } ] },

  { name: "Repeated Password Changes",
    reasons: [ { text: "Password changed 5 times in one hour", points: 28 },
               { text: "All changes from the same IP address", points: 26 },
               { text: "Old password entered wrongly 12 times", points: 20 } ] },

  { name: "Question Paper Copied To USB Drive",
    reasons: [ { text: "USB device not registered with the board", points: 36 },
               { text: "Copy made 40 minutes before the exam", points: 32 },
               { text: "Centre camera was switched off",     points: 24 } ] },

  { name: "Fake Examination Centre Login",
    reasons: [ { text: "Centre code 88 does not exist",      points: 33 },
               { text: "Location does not match any centre", points: 30 },
               { text: "Login repeated from 3 devices",      points: 24 } ] },

  { name: "OTP Verification Bypassed",
    reasons: [ { text: "Login completed without OTP",        points: 31 },
               { text: "Same OTP used twice",                points: 28 },
               { text: "Request came from an unknown app",   points: 24 } ] },

  { name: "Invigilator Account Shared",
    reasons: [ { text: "One account used at 2 centres together", points: 27 },
               { text: "Two different devices at the same time", points: 24 },
               { text: "Password not changed in 8 months",   points: 20 } ] },

  { name: "Result Website Page Changed",
    reasons: [ { text: "Homepage file edited at midnight",   points: 24 },
               { text: "Editor account not recognised",      points: 22 },
               { text: "Backup copy does not match",         points: 18 } ] },

  { name: "Exam Centre 23 Server Overload",
    reasons: [ { text: "Too many requests in 5 minutes",     points: 22 },
               { text: "All requests from one IP address",   points: 20 },
               { text: "Possible DDoS attack",               points: 16 } ] },

  { name: "Result Database Accessed At Night",
    reasons: [ { text: "Access at 2:40 AM",                  points: 20 },
               { text: "Outside office hours",               points: 18 },
               { text: "No exam scheduled that day",         points: 14 } ] },

  { name: "CCTV Feed Offline At Centre 12",
    reasons: [ { text: "Camera offline for 25 minutes",      points: 19 },
               { text: "Happened during the exam",           points: 16 },
               { text: "No fault reported by the centre",    points: 14 } ] },

  { name: "Answer Sheet Scanner Not Verified",
    reasons: [ { text: "Scanner software not updated",       points: 18 },
               { text: "Device certificate has expired",     points: 14 },
               { text: "Used at 4 centres today",            points: 12 } ] }
];

// How many risk points each action removes
var actions = [
  { label: "Lock Account",  message: "Account locked",              drop: 50 },
  { label: "Block Access",  message: "Unauthorized access blocked", drop: 60 },
  { label: "Investigate",   message: "Sent for investigation",      drop: 25 }
];

var riskNow = [];     // the risk of each threat on screen


/* 81-100 Critical   61-80 High   31-60 Medium   0-30 Low */
function levelName(risk) {
  if (risk >= 81) { return "Critical"; }
  if (risk >= 61) { return "High"; }
  if (risk >= 31) { return "Medium"; }
  return "Low";
}


/* ---------- RUN SECURITY SCAN ---------- */

function scan() {
  document.getElementById('status').textContent = "Scanning examination infrastructure...";
  document.getElementById('threats').innerHTML = "";

  setTimeout(showThreats, 1500);
}

function showThreats() {
  var start = Math.floor(Math.random() * (threatList.length - 2));
  var boxes = "";

  for (var i = 0; i < 3; i++) {
    var t = threatList[start + i];
    var risk = 0;
    var points = "";

   
    for (var j = 0; j < t.reasons.length; j++) {
      var p = t.reasons[j].points - 6 + Math.floor(Math.random() * 13);

      risk = risk + p;
      points += "<li>" + t.reasons[j].text + " <span class='pts'>+" + p + "</span></li>";
    }

    if (risk > 100) { risk = 100; }
    riskNow[i] = risk;

    boxes += `
      <div class="card threat" id="threat${i}">
        <h3>Threat ${i + 1}: ${t.name}</h3>
        <p class="risk-line">Risk: <b id="risk${i}">${risk}</b>%
          <span class="risk ${levelName(risk).toLowerCase()}" id="level${i}">${levelName(risk)}</span></p>
        <p>Reason:</p>
        <ul>${points}</ul>
        <div class="actions">
          <button onclick="doAction(${i}, 0)">Lock Account</button>
          <button onclick="doAction(${i}, 1)">Block Access</button>
          <button onclick="doAction(${i}, 2)">Investigate</button>
        </div>
        <p class="done" id="done${i}"></p>
      </div>`;
  }

  document.getElementById('threats').innerHTML = boxes;
  updateStatus();
}



function doAction(number, which) {
  var act = actions[which];

  riskNow[number] = riskNow[number] - act.drop;
  if (riskNow[number] < 0) { riskNow[number] = 0; }

  var risk = riskNow[number];

  document.getElementById('risk' + number).textContent = risk;
  document.getElementById('level' + number).textContent = levelName(risk);
  document.getElementById('level' + number).className = "risk " + levelName(risk).toLowerCase();

  document.getElementById('done' + number).textContent =
    "✅ " + act.message + ". Risk reduced by " + act.drop + " points.";

  if (risk <= 30) {
    document.getElementById('threat' + number).className = "card threat resolved";
  }

  updateStatus();
}


function updateStatus() {
  var total = riskNow[0] + riskNow[1] + riskNow[2];
  var average = Math.round(total / 3);

  document.getElementById('status').textContent =
    "3 threats detected. Average risk: " + average + "% (" + levelName(average) + ")";
}