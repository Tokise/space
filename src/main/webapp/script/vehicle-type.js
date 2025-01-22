document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
    document.getElementById('vehicleFilter').addEventListener('change', filterByVehicleType);
});

// Global variables
let allClientsData = []; // To store all fetched client data
let currentPage = 1; // Current page number
const recordsPerPage = 5; // Number of records to display per page

function fetchClientData() {
    fetch('vehicle-type')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Check if data is being logged correctly
            allClientsData = data.clients; // Store the fetched client data
            displayData(allClientsData); // Display all data initially
            updatePagination(); // Update pagination controls
            
            // Display client counts
            displayClientCounts(data.total_2, data.total_4, data.total_8, data.total_16);
        })
        .catch(error => console.error('Error fetching client data:', error));
}

function displayClientCounts(total2Wheel, total4Wheel, total8Wheel, total16Wheel) {
    document.getElementById('total2wheelsCount').textContent = total2Wheel || 0;  // Ensure default value is 0
    document.getElementById('total4wheelsCount').textContent = total4Wheel || 0;  // Ensure default value is 0
    document.getElementById('total8wheelsCount').textContent = total8Wheel || 0;  // Ensure default value is 0
    document.getElementById('total16wheelsCount').textContent = total16Wheel || 0; // Ensure default value is 0
}

// Function to display data in the table
function displayData(data) {
    const tableBody = document.getElementById('clientTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = data.slice(startIndex, endIndex); // Get records for the current page

    paginatedData.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.client_name}</td>
            <td>${client.license_plate}</td>
            <td>${client.vehicle_type}</td>
            <td></td>
            <td></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to filter data by vehicle type (case-insensitive)
function filterByVehicleType() {
    const filterValue = document.getElementById('vehicleFilter').value.toLowerCase(); // Convert to lowercase
    const filteredData = filterValue === 'all' 
        ? allClientsData 
        : allClientsData.filter(client => client.vehicle_type.toLowerCase() === filterValue); // Compare in lowercase

    currentPage = 1; // Reset to first page when filtering
    displayData(filteredData);
    updatePagination(filteredData);
}

// Function to change the current page
function changePage(direction) {
    const filteredData = document.getElementById('vehicleFilter').value.toLowerCase() === 'all'
        ? allClientsData
        : allClientsData.filter(client => client.vehicle_type.toLowerCase() === document.getElementById('vehicleFilter').value.toLowerCase());

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    // Update current page
    if (direction === 1 && currentPage < totalPages) {
        currentPage++;
    } else if (direction === -1 && currentPage > 1) {
        currentPage--;
    }

    displayData(filteredData);
    updatePagination(filteredData);
}

// Function to update pagination controls
function updatePagination(data = allClientsData) {
    const totalPages = Math.ceil(data.length / recordsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;

    // Enable pagination only if there are enough clients to fill multiple pages
    const canPaginate = totalPages > 1;
    document.getElementById('prevPageBtn').style.display = canPaginate ? 'inline-block' : 'none';
    document.getElementById('nextPageBtn').style.display = canPaginate ? 'inline-block' : 'none';
    
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}
