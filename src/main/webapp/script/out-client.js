document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
    document.getElementById('searchBar').addEventListener('input', searchClients);
});

let allClientsData = [];
let currentPage = 1;
const clientsPerPage = 5;
let filteredData = [];

function fetchClientData() {
    fetch('out-client-data')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            allClientsData = data;
            filteredData = data;
            displayData();
            updatePagination();
        })
        .catch(error => console.error('Error fetching client data:', error));
}

function displayData() {
    const tableBody = document.getElementById('clientTableBody');
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * clientsPerPage;
    const endIndex = Math.min(startIndex + clientsPerPage, filteredData.length);

    for (let i = startIndex; i < endIndex; i++) {
        const client = filteredData[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.client_name}</td>
            <td>${client.license_plate}</td>
            <td>${client.parking_slot}</td>
            <td>${client.start_time}</td>
            <td>${client.end_time ? client.end_time : 'In Progress'}</td>
            <td>${client.parking_fee ? `₱${client.parking_fee.toFixed(2)}` : 'Calculating...'}</td>
            <td>${client.payment ? client.payment : 'Unknown'}</td>
            <td>${client.duration}</td>
            <td>
                <button class="action-btn" onclick="seeClient(${client.id})"><i class="fa-regular fa-eye"></i></button>
                <button class="delete-btn" onclick="deleteClient(${client.id})"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredData.length / clientsPerPage);
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    displayData();
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / clientsPerPage);
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
    const canPaginate = totalPages > 1;
    document.getElementById('prevPageBtn').style.display = canPaginate ? 'inline-block' : 'none';
    document.getElementById('nextPageBtn').style.display = canPaginate ? 'inline-block' : 'none';
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

function searchClients() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    filteredData = allClientsData.filter(client =>
        client.client_name.toLowerCase().includes(searchValue) ||
        client.id.toString().includes(searchValue) ||
        client.license_plate.toLowerCase().includes(searchValue)
    );
    currentPage = 1;
    displayData();
    updatePagination();
}

function sortTable(column) {
    filteredData.sort((a, b) => {
        if (column === 'start_time' || column === 'end_time') {
            return new Date(a[column]) - new Date(b[column]);
        }
        return a[column].localeCompare(b[column]);
    });
    displayData();
    updatePagination();
}

function seeClient(clientId) {
    const client = allClientsData.find(c => c.id === clientId);
    if (client) {
        document.getElementById('modal-client-id').textContent = client.id;
        document.getElementById('modal-license-plate').textContent = client.license_plate;
        document.getElementById('modal-client-name').textContent = client.client_name;
        document.getElementById('modal-client-type').textContent = client.client_type;
        document.getElementById('modal-parking-slot').textContent = client.parking_slot;
        document.getElementById('modal-start-time').textContent = client.start_time;
        document.getElementById('modal-end-time').textContent = client.end_time ? client.end_time : 'In Progress';
        document.getElementById('modal-parking-fee').textContent = `₱${client.parking_fee ? client.parking_fee.toFixed(2) : 'Calculating...'}`;
        document.getElementById('modal-payment-status').textContent = client.payment ? client.payment : 'Unknown';
        document.getElementById('modal-pay').textContent = `₱${client.pay ? client.pay : 'Unknown'}`;
        document.getElementById('modal-total').textContent = `₱${client.totalAmount ? client.totalAmount : 'Unknown'}`;
        const modal = document.getElementById('clientInfoModal');
        modal.style.display = 'block';
        document.querySelector('.close').onclick = function () {
            modal.style.display = 'none';
        };
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

function deleteClient(clientId) {
    if (confirm("Are you sure you want to delete this client?")) {
        fetch(`out-client-data?id=${clientId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert(data.message);
                    allClientsData = allClientsData.filter(client => client.id !== clientId);
                    filteredData = filteredData.filter(client => client.id !== clientId);
                    displayData();
                    updatePagination();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("There was an error deleting the client.");
            });
    }
}
