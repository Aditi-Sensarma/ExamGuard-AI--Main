
var alertSets = [
  "<tr><td>Repeated login attempts to Question Paper Server</td><td><span class='risk critical'>Critical</span></td></tr>" +
  "<tr><td>Unknown administrator login</td><td><span class='risk high'>High</span></td></tr>" +
  "<tr><td>Result database accessed outside normal hours</td><td><span class='risk medium'>Medium</span></td></tr>" +
  "<tr><td>Examination Centre 23 verified</td><td><span class='risk safe'>Safe</span></td></tr>",

  "<tr><td>Question paper file downloaded from unknown device</td><td><span class='risk critical'>Critical</span></td></tr>" +
  "<tr><td>Password changed 5 times in one hour</td><td><span class='risk high'>High</span></td></tr>" +
  "<tr><td>Exam server slow: possible DDoS attack</td><td><span class='risk medium'>Medium</span></td></tr>" +
  "<tr><td>Daily backup of marks completed</td><td><span class='risk safe'>Safe</span></td></tr>",

  "<tr><td>Marks entry blocked from unknown location</td><td><span class='risk high'>High</span></td></tr>" +
  "<tr><td>Two admin accounts still without OTP</td><td><span class='risk medium'>Medium</span></td></tr>" +
  "<tr><td>All question paper files encrypted</td><td><span class='risk safe'>Safe</span></td></tr>" +
  "<tr><td>Examination Centre 47 verified</td><td><span class='risk safe'>Safe</span></td></tr>"
];

function refresh() {

  var score = Math.floor(Math.random() * 22) + 78;

  document.getElementById('score').textContent      = score;
  document.getElementById('fill').style.width       = score + '%';

  document.getElementById('centres').textContent    = Math.floor(Math.random() * 13) + 118;
  document.getElementById('admins').textContent     = Math.floor(Math.random() * 13) + 12;
  document.getElementById('secure').textContent     = (Math.floor(Math.random() * 10) + 90) + '%';
  document.getElementById('suspicious').textContent = Math.floor(Math.random() * 9);
  document.getElementById('threats').textContent    = Math.floor(Math.random() * 4);

  document.getElementById('alerts').innerHTML = alertSets[Math.floor(Math.random() * 3)];
}


refresh();