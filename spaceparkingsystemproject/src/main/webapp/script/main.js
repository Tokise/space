document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
});

// Fetch client data from the server and populate the table
function fetchClientData() {
    fetch('user-data')  // This endpoint should return the active parking client data
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('clientTableBody');
            tableBody.innerHTML = '';  // Clear the table before appending new rows

            data.forEach(client => {
                const row = document.createElement('tr');

                // ID column
                const idCell = document.createElement('td');
                idCell.textContent = client.id;
                row.appendChild(idCell);

                // Client Name column
                const nameCell = document.createElement('td');
                nameCell.textContent = client.client_name;
                row.appendChild(nameCell);

                // License Plate column
                const licenseCell = document.createElement('td');
                licenseCell.textContent = client.license_plate;
                row.appendChild(licenseCell);

                // Parking Slot column
                const slotCell = document.createElement('td');
                slotCell.textContent = client.parking_slot;
                row.appendChild(slotCell);

                // Start Time column
                const startTimeCell = document.createElement('td');
                startTimeCell.textContent = client.start_time;
                row.appendChild(startTimeCell);

                // End Time column (will be empty if not stopped yet)
                const endTimeCell = document.createElement('td');
                endTimeCell.textContent = client.end_time || 'In Progress';
                row.appendChild(endTimeCell);

                // Parking Fee column (only calculated if end_time is available)
                const feeCell = document.createElement('td');
                if (client.end_time) {
                    const parkingFee = calculateParkingFee(client.start_time, client.end_time);
                    feeCell.textContent = `₱${parkingFee}`;
                } else {
                    feeCell.textContent = 'Calculating...';
                }
                row.appendChild(feeCell);

                // Actions column with "Stop Time" button
                const actionsCell = document.createElement('td');
                const stopTimeButton = document.createElement('button');
                stopTimeButton.textContent = 'Stop Time';
                stopTimeButton.onclick = () => stopTime(client.id);
                actionsCell.appendChild(stopTimeButton);
                row.appendChild(actionsCell);

                // Append row to table body
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching client data:', error));
}

// Send POST request to stop time for a client
function stopTime(clientId) {
    fetch(`stop-time?client_id=${clientId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Time stopped successfully!');
                fetchClientData();  // Refresh client data after stopping time
            } else {
                alert('Error stopping time: ' + data.message);
            }
        })
        .catch(error => console.error('Error stopping time:', error));
}

// Function to calculate the parking fee
function calculateParkingFee(startTime, endTime) {
    const ratePerHour = 50;  // PHP rate per hour
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = (end - start) / (1000 * 60 * 60);  // Convert to hours
    return (Math.round(duration * ratePerHour * 100) / 100).toFixed(2);  // Round to 2 decimal places
}
