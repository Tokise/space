document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
    document.getElementById('searchBar').addEventListener('input', filterClients); // Add event listener for the search bar
});

function fetchClientData() {
    fetch('payment-list') // Ensure this endpoint is correct
        .then(response => response.json())
        .then(data => {
            window.clientsData = data; // Store fetched data globally for filtering
            populateClientTable(data); // Populate the table with initial data
        })
        .catch(error => console.error('Error fetching client data:', error));
}

function populateClientTable(data) {
    const tableBody = document.getElementById('clientTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(client => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = client.id;
        row.appendChild(idCell);

        const clientNameCell = document.createElement('td');
        clientNameCell.textContent = client.client_name;
        row.appendChild(clientNameCell);

        const licensePlateCell = document.createElement('td');
        licensePlateCell.textContent = client.license_plate;
        row.appendChild(licensePlateCell);
       
		 const parkingSlotCell = document.createElement('td');
        parkingSlotCell.textContent = client.parking_slot;
        row.appendChild(parkingSlotCell);

        const startTimeCell = document.createElement('td');
        startTimeCell.textContent = client.start_time;
        row.appendChild(startTimeCell);

        const endTimeCell = document.createElement('td');
        endTimeCell.textContent = client.end_time ? client.end_time : 'In Progress';
        row.appendChild(endTimeCell);

        const feeCell = document.createElement('td');
        feeCell.textContent = client.parking_fee ? `₱${client.parking_fee.toFixed(2)}` : 'Calculating...';
        row.appendChild(feeCell);

        const payButton = document.createElement('button');
        payButton.textContent = 'Pay Bill';
        payButton.onclick = () => openPaymentModal(client.id, client.client_name, client.parking_fee, client.parking_slot, client.duration, client.start_time, client.end_time, client.license_plate);
        
        // Apply styles to the button
        payButton.style.backgroundColor = "#3f51d6";
        payButton.style.border = "none";
        payButton.style.color = "white";
        payButton.style.padding = "4px 8px";
        payButton.style.fontSize = "13px";
        payButton.style.margin = "4px 2px";
        payButton.style.cursor = "pointer";
        payButton.style.borderRadius = "3px";
        payButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

        const actionsCell = document.createElement('td');
        actionsCell.appendChild(payButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

// Function to filter clients based on the search input
function filterClients() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase(); // Get search value
    const filteredClients = window.clientsData.filter(client => 
        client.client_name.toLowerCase().includes(searchValue) || 
        client.license_plate.toLowerCase().includes(searchValue)
    ); // Filter based on name or license plate

    populateClientTable(filteredClients); // Populate the table with filtered data
}


// Function to calculate VAT
function calculateVAT(amount, vatRate = 0.12) {
    return amount * vatRate;
}

// Open the payment modal with client details
function openPaymentModal(id, name, fee, slot, duration, startTime, endTime, licensePlate) {
    const vat = calculateVAT(fee);
    const totalWithVAT = fee + vat;

    document.getElementById('clientId').innerText = id;
    document.getElementById('clientName').innerText = name;
    document.getElementById('parkingFee').innerText = fee.toFixed(2); // Display parking fee without VAT
    document.getElementById('vatAmount').innerText = vat.toFixed(2); // Display VAT amount
    document.getElementById('amountToPay').innerText = totalWithVAT.toFixed(2); // Display total amount with VAT
    
    // Store client data for later use in receipt generation
    document.getElementById('confirmPayment').dataset.client = JSON.stringify({
        id, name, fee, slot, duration, startTime, endTime, licensePlate, vat, totalWithVAT
    });

    document.getElementById('payAmount').value = ''; // Clear previous input
    document.getElementById('exchangeAmount').innerText = '0'; // Reset exchange
    document.getElementById('paymentModal').style.display = 'block'; // Show modal
}

// Close the payment modal
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Calculate and display the exchange when the pay amount is entered
document.getElementById('payAmount').addEventListener('input', function() {
    const amountToPay = parseFloat(document.getElementById('amountToPay').innerText);
    const payAmount = parseFloat(this.value);

    if (!isNaN(payAmount)) {
        const exchange = payAmount - amountToPay;
        document.getElementById('exchangeAmount').innerText = exchange >= 0 ? exchange.toFixed(2) : '0';
    } else {
        document.getElementById('exchangeAmount').innerText = '0';
    }
});

// Confirm payment and send data to the server
document.getElementById('confirmPayment').addEventListener('click', function() {
    const client = JSON.parse(this.dataset.client);
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    const totalAmount = parseFloat(document.getElementById('amountToPay').innerText);

    // Check if the paid amount is sufficient
    if (payAmount >= totalAmount) {
        closeModal();

        // Send payment data to the server
        fetch('user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                id: client.id,             // Send client ID
                payment: payAmount,        // Send payment amount
                total: totalAmount         // Send total amount including VAT
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Payment recorded successfully.');

                // Automatically generate the receipt after successful payment
                generateReceipt(client.id); // Pass the client ID directly to generateReceipt

                // Show success alert
                alert('Payment was successful!');

                // After alert, delete the client data row
                deleteClientRow(client.id);
            } else {
                console.error('Error recording payment:', response.statusText);
            }
        })
        .catch(error => console.error('Fetch error:', error));
    } else {
        alert('The paid amount must be equal to or greater than the total amount due.');
    }
});

// Function to delete the client row from the table
function deleteClientRow(clientId) {
    const tableBody = document.getElementById('clientTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const idCell = row.getElementsByTagName('td')[0];

        if (idCell && idCell.textContent == clientId) {
            tableBody.removeChild(row); // Remove the row from the table
            break;
        }
    }
}

// Function to generate the receipt with undefined fields removed
function generateReceipt(clientId) {
    const clientData = JSON.parse(document.getElementById('confirmPayment').dataset.client); // Get client data
    const payAmount = parseFloat(document.getElementById('payAmount').value); // Use the amount paid
    const exchange = payAmount - clientData.totalWithVAT; // Calculate exchange

    const { jsPDF } = window.jspdf;

    // Create a new PDF document with custom dimensions
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 185] // Width of 80mm and height of 185mm for a compact receipt
    });

    // Use Poppins font (if jsPDF supports it) or fallback to a standard font
    doc.setFont('Poppins', 'normal');

    // Add a header and center it
    doc.setFontSize(16);
    const header = 'Space Parking System';
    const headerWidth = doc.getTextWidth(header);
    doc.text(header, (80 - headerWidth) / 2, 10); // Center the header

    // Add a line for separation
    doc.line(5, 15, 75, 15);

    // Set font size for details
    doc.setFontSize(13);

    // Required details
    const details = [
        `Client ID: ${clientData.id}`,
        `License Plate: ${clientData.licensePlate}`,
        `Client Name: ${clientData.name}`,
        `Parking Slot: ${clientData.slot}`,
        `Start Time: ${clientData.startTime}`,
        `End Time: ${clientData.endTime}`,
        `Duration: ${clientData.duration} minutes`,
        `Parking Fee: ${clientData.fee.toFixed(2)} Pesos`,
        `VAT (12%): ${clientData.vat.toFixed(2)} Pesos`,
        `Total Amount: ${clientData.totalWithVAT.toFixed(2)} Pesos`,
        `Amount Paid: ${payAmount.toFixed(2)} Pesos`,
        `Exchange: ${exchange.toFixed(2)} Pesos`
    ];

    let y = 25; // Initial y-coordinate for the details
    details.forEach(detail => {
        doc.text(detail, 5, y);
        y += 8; // Add spacing between each detail line
    });

    // Add a thank you message at the bottom
    doc.setFontSize(13);
    doc.text('Thank you for your payment!', 5, y);
    y += 8;
    doc.text('Have a safe drive!', 5, y);

    // Save the receipt PDF with a dynamic file name
    doc.save(`Receipt_${clientId}.pdf`);
}

