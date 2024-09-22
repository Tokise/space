// JavaScript for grid generation and dark mode toggle

// Grid creation
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('slot-grid');
    const rows = 10;
    const cols = 10;
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let selectedSlot = null;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let slotId = `${alphabet[j]}${i + 1}`;
            let slot = document.createElement('div');
            slot.textContent = slotId;
            slot.classList.add('grid-item');
            slot.dataset.slotId = slotId;
            gridContainer.appendChild(slot);

            // Event listener for selection
            slot.addEventListener('click', () => {
                // Remove 'selected' class from previously selected slot
                if (selectedSlot) {
                    selectedSlot.classList.remove('selected');
                }

                // Add 'selected' class to the clicked slot
                slot.classList.add('selected');
                selectedSlot = slot;

                // Set the selected slot value in the hidden input
                document.getElementById('selected-slot').value = slot.dataset.slotId;
            });
        }
    }
});


document.getElementById("client-form").addEventListener("submit", function(e) {
    let licensePlate = document.getElementById("license-plate").value;
    let clientName = document.getElementById("client-name").value;

    if (!licensePlate || !clientName) {
        alert("Please fill in all required fields!");
        e.preventDefault();
    }
});