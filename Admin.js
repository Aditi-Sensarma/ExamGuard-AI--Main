
var users = [
  { name: "admin01",      role: "Exam Administrator",     status: "Secure",        colour: "safe",
    flags: ["Logged in from the registered office device", "No failed password attempts today"] },

  { name: "centre23",     role: "Centre Superintendent",  status: "Secure",        colour: "safe",
    flags: ["Login time matches the exam schedule", "Access limited to Centre 23 files"] },

  { name: "admin07",      role: "Examination Officer",    status: "Failed Logins", colour: "medium",
    flags: ["7 repeated failed passwords", "Login attempted at 3:12 AM, an unusual time"] },

  { name: "unknown_user", role: "Unknown",                status: "Blocked",       colour: "critical",
    flags: ["Account not in the approved admin list", "Login from an unknown location and device", "Attempted to open restricted question paper files"] },

  { name: "admin12",      role: "Result Controller",      status: "OTP Not Set",   colour: "high",
    flags: ["Two-step verification is switched off", "Password not changed in 8 months"] }
];


function showUsers() {
  var rows = "";

  for (var i = 0; i < users.length; i++) {
    var u = users[i];

    rows += `<tr class="user-row" onclick="showUser(${i})">
        <td>${u.name}</td>
        <td>${u.role}</td>
        <td><span class="risk ${u.colour}">${u.status}</span></td>
      </tr>`;
  }

  document.getElementById('users').innerHTML = rows;
  document.getElementById('userDetails').innerHTML = "";
}


function showUser(number) {
  var u = users[number];
  var points = "";

  for (var j = 0; j < u.flags.length; j++) {
    points = points + "<li>" + u.flags[j] + "</li>";
  }

  document.getElementById('userDetails').innerHTML = `
    <h2>${u.name} – ${u.role}</h2>
    <div class="card threat">
      <p>AI observations:</p>
      <ul>${points}</ul>
      <span class="risk ${u.colour}">${u.status}</span>
    </div>`;
}

showUsers();