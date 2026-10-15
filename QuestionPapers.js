var papers = [
  { subject: "Mathematics", grade: 10, status: "Encrypted & Secure",     colour: "safe",     risk: 7,
    alert: "No unusual activity. File opened only by the authorised controller.",
    action: "No action needed." },

  { subject: "Science", grade: 10, status: "Encrypted & Secure",         colour: "safe",     risk: 11,
    alert: "No unusual activity. Encryption key verified this morning.",
    action: "No action needed." },

  { subject: "English", grade: 10, status: "Suspicious Access Attempt",  colour: "critical", risk: 89,
    alert: "Examination file was accessed outside the authorised time window.",
    action: "Lock file access and verify administrator identity." },

  { subject: "Economics", grade: 10, status: "Encrypted & Secure",       colour: "safe",     risk: 9,
    alert: "No unusual activity. File still sealed until exam day.",
    action: "No action needed." },

  { subject: "History", grade: 10, status: "Downloaded From New Device", colour: "medium",   risk: 54,
    alert: "File downloaded from a device that is not on the approved list.",
    action: "Confirm the device with the centre before the exam." },

  { subject: "French", grade: 10, status: "Encrypted & Secure",          colour: "safe",     risk: 5,
    alert: "No unusual activity. Backup copy matches the original.",
    action: "No action needed." }
];


function showPapers() {
  var boxes = "";

  for (var i = 0; i < papers.length; i++) {
    var p = papers[i];

    boxes += `<div class="card centre" onclick="showReport(${i})">
        <h4>${p.subject} – Grade ${p.grade}</h4>
        <span class="risk ${p.colour}">${p.status}</span>
      </div>`;
  }

  document.getElementById('papers').innerHTML = boxes;
  document.getElementById('report').innerHTML = "";
}


function showReport(number) {
  var p = papers[number];

  document.getElementById('report').innerHTML = `
    <h2>${p.subject} – Grade ${p.grade}</h2>
    <div class="card">
      <p>Status:</p>
      <p class="alert-line"><span class="risk ${p.colour}">${p.status}</span></p>

      <p>AI Alert:</p>
      <p class="alert-line">${p.alert}</p>

      <p>Risk Score:</p>
      <p class="alert-line">${p.risk}%</p>
      <div class="bar"><div class="fill" style="width: ${p.risk}%"></div></div>

      <p class="spaced">Recommended action:</p>
      <p class="alert-line">${p.action}</p>

      <div class="actions no-print">
        <button onclick="window.print()">🖨 Download as PDF</button>
      </div>
    </div>`;
}

showPapers();