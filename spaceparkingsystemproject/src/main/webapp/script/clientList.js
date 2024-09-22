// Fetch and display client data in the table
document.addEventListener('DOMContentLoaded', () => {
    fetchClientData();
});

function fetchClientData() {
    fetch('client-list') // Ensure this endpoint is correct
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('clientTableBody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(client => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${client.id}</td>
                    <td>${client.license_plate}</td>
                    <td>${client.client_name}</td>
                    <td>${client.parking_slot}</td>
                    <td>${client.start_time}</td>
                    <td>${client.end_time ? client.end_time : 'In Progress'}</td>
                    <td>${client.parking_fee ? `₱${client.parking_fee.toFixed(2)}` : 'Calculating...'}</td>
                    <td><button onclick="openPaymentModal(${client.id}, '${client.client_name}', ${client.parking_fee}, '${client.parking_slot}', '${client.vehicle_type}', '${client.client_type}', ${client.duration}, '${client.start_time}', '${client.end_time}', '${client.contact_number}', ${client.client_age}, '${client.license_plate}')">Pay Bill</button></td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching client data:', error));
}

// Open the payment modal with client details
function openPaymentModal(id, name, fee, slot, vehicle, type, duration, startTime, endTime, contactNumber, age, licensePlate) {
    document.getElementById('clientId').innerText = id;
    document.getElementById('clientName').innerText = name;
    document.getElementById('amountToPay').innerText = fee ? fee.toFixed(2) : '0.00';
    
    // Store client data for later use in receipt generation
    document.getElementById('confirmPayment').dataset.client = JSON.stringify({
        id, name, fee, slot, vehicle, type, duration, startTime, endTime, contactNumber, age, licensePlate
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

// Confirm payment and generate the receipt
document.getElementById('confirmPayment').addEventListener('click', function() {
    const client = JSON.parse(this.dataset.client);
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    const amountToPay = parseFloat(document.getElementById('amountToPay').innerText);
    const exchange = payAmount - amountToPay;

    if (payAmount >= amountToPay) {
        generateReceipt(client, payAmount, exchange.toFixed(2));
        closeModal();
    } else {
        alert('The paid amount must be equal to or greater than the amount due.');
    }
});

// Function to generate receipt
// Function to generate the receipt with updated formatting
function generateReceipt(client, payAmount, exchange) {
    const { jsPDF } = window.jspdf;

    // Create a new PDF document with custom dimensions
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 200] // Width of 80mm and height of 200mm for a compact receipt
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
    
    // Add details with updated spacing and alignment
    const details = [
        `Client ID: ${client.id}`,
        `License Plate: ${client.licensePlate}`, // Ensure license plate is displayed correctly
        `Client Name: ${client.name}`,
        `Client Type: ${client.type}`,
        `Vehicle Type: ${client.vehicle}`,
        `Client Age: ${client.age}`,
        `Contact Number: ${client.contactNumber}`,
        `Parking Slot: ${client.slot}`,
        `Start Time: ${client.startTime}`,
        `End Time: ${client.endTime ? client.endTime : 'In Progress'}`,
        `Duration (min): ${client.duration}`,
        `Parking Fee: ${client.fee} Pesos`, // Change peso sign to "Pesos"
        `Amount Paid: ${payAmount.toFixed(2)} Pesos`, // Change peso sign to "Pesos"
        `Exchange: ${exchange} Pesos` // Change peso sign to "Pesos"
    ];

    let y = 20; // Starting y position for details
    details.forEach(detail => {
        const detailWidth = doc.getTextWidth(detail);
        doc.text(detail, (80 - detailWidth) / 2, y); // Center the text
        y += 8; // Add space between lines
    });

    // Add a footer and center it
    doc.line(5, y, 75, y); // Line at the bottom
    doc.setFontSize(12);
    const footerText = 'Thank you for using our service!';
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (80 - footerWidth) / 2, y + 10); // Center the footer

    // Save the PDF
    doc.save(`receipt_${client.id}.pdf`);
}


