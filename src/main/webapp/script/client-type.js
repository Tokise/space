document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
});

let clientData = [];
let filteredData = [];
let currentPage = 1;
const clientsPerPage = 5;

function fetchClientData() {
    fetch('client-type')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            clientData = data.client_details;
            filteredData = clientData;
            displayClients(filteredData);
            updatePagination(filteredData);
            displayClientCounts(data.total_vip, data.total_guests, data.total_member);
        })
        .catch(error => console.error('Error fetching client data:', error));
}

function displayClientCounts(totalVip, totalGuests, totalMember) {
    document.getElementById('totalVipCount').textContent = totalVip || 0;
    document.getElementById('totalGuestsCount').textContent = totalGuests || 0;
    document.getElementById('totalMemberCount').textContent = totalMember || 0;
}

function displayClients(clients) {
    const tableBody = document.getElementById('clientTableBody');
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * clientsPerPage;
    const endIndex = Math.min(startIndex + clientsPerPage, clients.length);

    if (clients.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">No clients found.</td></tr>`;
    } else {
        for (let i = startIndex; i < endIndex; i++) {
            const client = clients[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.id}</td>
                <td>${client.client_name}</td>
                <td>${client.license_plate}</td>
                <td>${client.client_type}</td>
                <td></td>
                <td></td>
            `;
            tableBody.appendChild(row);
        }
    }
    updatePagination(clients);
}

function changePage(direction) {
    currentPage += direction;
    displayClients(filteredData);
}

function updatePagination(clients) {
    const totalPages = Math.ceil(clients.length / clientsPerPage);
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
    const canPaginate = totalPages > 1;
    document.getElementById('prevPageBtn').style.display = canPaginate ? 'inline-block' : 'none';
    document.getElementById('nextPageBtn').style.display = canPaginate ? 'inline-block' : 'none';
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

function sortClientData() {
    const selectedType = document.getElementById('clientTypeSort').value;
    if (selectedType === 'all') {
        filteredData = clientData;
    } else {
        filteredData = clientData.filter(client => client.client_type.toLowerCase() === selectedType.toLowerCase());
    }
    currentPage = 1;
    displayClients(filteredData);
}
