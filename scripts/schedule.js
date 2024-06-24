fetch('scripts/schedule.json') // I guess it looks from one directory up?
.then(response => response.json())  
.then(data => {
  // data is now an array containing the schedule objects
  populateScheduleTable(data);
})
.catch(error => console.error(error));

function populateScheduleTable(data) {
  const tableBody = document.querySelector("table tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    var activityCell = document.createElement("td");
    activityCell.setAttribute("colspan", 2);
    
    timeCell.textContent = item.time;
    activityCell.textContent = item.activity;

    row.appendChild(timeCell);
    row.appendChild(activityCell);
    if (item.additional) {
      const additionalCell = document.createElement("td");
      additionalCell.textContent = item.additional;
      row.appendChild(additionalCell);
      activityCell.setAttribute("colspan", 1);
    }
    
    tableBody.appendChild(row);
  });
}