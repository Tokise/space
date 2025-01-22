document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
    fetchDashboardData();
});

function fetchClientData() {
    fetch('user-data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('clientTableBody');
            tableBody.innerHTML = '';

            data.forEach(client => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = client.id;
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = client.client_name;
                row.appendChild(nameCell);

                const licenseCell = document.createElement('td');
                licenseCell.textContent = client.license_plate;
                row.appendChild(licenseCell);

                const slotCell = document.createElement('td');
                slotCell.textContent = client.parking_slot;
                row.appendChild(slotCell);

                const startTimeCell = document.createElement('td');
                startTimeCell.textContent = client.start_time;
                row.appendChild(startTimeCell);

                const actionsCell = document.createElement('td');
                const stopTimeButton = document.createElement('button');
                stopTimeButton.textContent = 'Stop Time';

                stopTimeButton.style.backgroundColor = "#3f51d6";
                stopTimeButton.style.border = "none";
                stopTimeButton.style.color = "white";
                stopTimeButton.style.padding = "4px 8px";
                stopTimeButton.style.textAlign = "center";
                stopTimeButton.style.textDecoration = "none";
                stopTimeButton.style.display = "inline-block";
                stopTimeButton.style.fontSize = "12px";
                stopTimeButton.style.margin = "4px 2px";
                stopTimeButton.style.cursor = "pointer";
                stopTimeButton.style.borderRadius = "3px";
                stopTimeButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

                stopTimeButton.onclick = () => stopTime(client.id);
                actionsCell.appendChild(stopTimeButton);
                row.appendChild(actionsCell);

                tableBody.appendChild(row);
            });

            fetchDashboardData();
        })
        .catch(error => console.error('Error fetching client data:', error));
}

function stopTime(clientId) {
    fetch(`stop-time?client_id=${clientId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Time stopped successfully!');
                fetchClientData();
            } else {
                alert('Error stopping time: ' + data.message);
            }
        })
        .catch(error => console.error('Error stopping time:', error));
}

function calculateParkingFee(startTime, endTime) {
    const ratePerHour = 50;
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = (end - start) / (1000 * 60 * 60);
    return (Math.round(duration * ratePerHour * 100) / 100).toFixed(2);
}

function fetchDashboardData() {
    fetch('dashboard-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("online-clients").innerText = data.online_count;
            document.getElementById("available-slots").innerText = data.available_slots;
            document.getElementById("completed-clients").innerText = data.completed_count;
            document.getElementById("unpaid-client").innerText = data.unpaid_client;
            document.getElementById("total-revenue").innerText = parseFloat(data.total_revenue).toFixed(2);
            document.getElementById("total-duration").innerText = data.totalDuration;
        })
        .catch(error => console.error('Error fetching dashboard data:', error));
}

function startDashboardUpdates() {
    fetchDashboardData();
    setInterval(fetchDashboardData, 300000);
}

window.onload = startDashboardUpdates;
