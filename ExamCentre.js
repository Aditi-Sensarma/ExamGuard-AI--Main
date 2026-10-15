
var centres = [
  { code: "001", city: "Kozhikode",  status: "Secure",                      colour: "safe",     users: 14, risk: 8,  last: "Attendance uploaded, 10:42 AM" },
  { code: "002", city: "Kannur",     status: "Secure",                      colour: "safe",     users: 11, risk: 12, last: "Answer sheets scanned, 11:05 AM" },
  { code: "003", city: "Malappuram", status: "Suspicious Login",            colour: "medium",   users: 9,  risk: 56, last: "Login from new device, 11:18 AM" },
  { code: "004", city: "Thrissur",   status: "Unauthorized Access Attempt", colour: "critical", users: 13, risk: 94, last: "5 failed logins, 11:26 AM" },
  { code: "005", city: "Palakkad",   status: "Secure",                      colour: "safe",     users: 16, risk: 6,  last: "Question paper unlocked, 9:30 AM" },
  { code: "006", city: "Wayanad",    status: "Suspicious Login",            colour: "medium",   users: 8,  risk: 48, last: "Login outside exam hours, 10:02 AM" }
];


function showCentres() {
  var boxes = "";

  for (var i = 0; i < centres.length; i++) {
    var c = centres[i];

    boxes += `<div class="card centre" onclick="showDetails(${i})">
        <h4>Centre ${c.code} – ${c.city}</h4>
        <span class="risk ${c.colour}">${c.status}</span>
      </div>`;
  }

  document.getElementById('centres').innerHTML = boxes;
  document.getElementById('details').innerHTML = "";
}

function showDetails(number) {
  var c = centres[number];

  document.getElementById('details').innerHTML = `
    <h2>Centre ${c.code} – ${c.city}</h2>
    <div class="card"><table>
      <tr><td>Centre code</td><td>EXC-${c.code}</td></tr>
      <tr><td>Login status</td><td><span class="risk ${c.colour}">${c.status}</span></td></tr>
      <tr><td>Last activity</td><td>${c.last}</td></tr>
      <tr><td>Authorised users</td><td>${c.users}</td></tr>
      <tr><td>Risk score</td><td>${c.risk} / 100</td></tr>
    </table></div>`;
}


showCentres();