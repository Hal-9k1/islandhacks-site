async function fetchSchedule() {
  try {
    const response = await fetch('scripts/schedule.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    populateScheduleTable(data);
  } catch (error) {
    console.error('Could not fetch schedule:', error);
    document.querySelector("table").insertAdjacentHTML('afterend', '<p>Sorry, we couldn\'t load the schedule. Please try again later.</p>');
  }
}

function populateScheduleTable(data) {
  const tableBody = document.querySelector("table tbody");
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    const activityCell = document.createElement("td");

    timeCell.textContent = item.time;
    activityCell.textContent = item.activity;

    row.appendChild(timeCell);
    row.appendChild(activityCell);

    if (item.additional) {
      const additionalCell = document.createElement("td");
      additionalCell.textContent = item.additional;
      row.appendChild(additionalCell);
      activityCell.setAttribute("colspan", "1");
    } else {
      activityCell.setAttribute("colspan", "2");
    }

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
}

fetchSchedule();