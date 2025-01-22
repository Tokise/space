document.addEventListener("DOMContentLoaded", () => {
	fetchFloorData();
    // Fetch floors from the server on page load
    fetch('manage-parking')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Floors data is not in expected format');
            }

            const floorDropdown = document.getElementById('floor-dropdown');
            floorDropdown.innerHTML = '<option value="">Select a Floor</option>';
            data.forEach(floor => {
                const option = document.createElement('option');
                option.value = floor.floorNumber; // Ensure this matches your backend structure
                option.setAttribute('data-available-slots', floor.availableSlots); // Store available slots in data attribute
                option.textContent = `Floor ${floor.floorNumber} - ${floor.availableSlots} slots`;
                floorDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching floor data:', error);
            swal("Error", "Error fetching floor data. Please try again later.", "error");
        });

    const floorDropdown = document.getElementById('floor-dropdown');
    floorDropdown.addEventListener('change', (event) => {
        const selectedFloor = event.target.value;

        if (selectedFloor) {
            const availableSlots = parseInt(event.target.selectedOptions[0].getAttribute('data-available-slots'), 10);
            const slotsContainer = document.getElementById('slot-grid');
            slotsContainer.innerHTML = ''; // Clear existing slots

            for (let i = 1; i <= availableSlots; i++) {
                const slotDiv = document.createElement('div');
                slotDiv.className = 'slot available'; // Initially set as available
                slotDiv.textContent = `F${selectedFloor}S${i}`; // Naming slots
                slotDiv.dataset.slotNumber = `F${selectedFloor}S${i}`; // Store slot number in a data attribute

                // Add click event listener for the slot
                slotDiv.addEventListener('click', () => {
                    const selectedSlotInput = document.getElementById('selected-slot');
                    selectedSlotInput.value = `F${selectedFloor}S${i}`; // Store selected slot in hidden input

                    const previouslySelected = document.querySelector('.slot.selected');
                    if (previouslySelected) {
                        previouslySelected.classList.remove('selected');
                    }

                    slotDiv.classList.add('selected'); // Mark the clicked slot as selected
                });

                slotsContainer.appendChild(slotDiv); // Add the slot to the container
            }

            fetchParkingSlotStatus(); // Fetch current status of parking slots
        }
    });

    // Function to fetch parking slot status and update the grid
    function fetchParkingSlotStatus() {
        fetch('user-data')  // Fetch from the user-data endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response as JSON
            })
            .then(data => {
                data.forEach(client => {
                    const parkingSlot = client.parking_slot; // Get parking slot from client data
                    if (parkingSlot) {
                        const slotElement = document.querySelector(`[data-slot-number="${parkingSlot}"]`);
                        if (slotElement) {
                            slotElement.classList.remove('available');
                            slotElement.classList.add('occupied'); // Mark the slot as occupied
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching parking slot data:', error);
            });
    }

    // Handle adding a new client
    const clientForm = document.getElementById('client-form');
    clientForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const selectedSlot = document.getElementById('selected-slot').value;

        if (selectedSlot) {
            fetch(clientForm.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(clientForm)),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding client');
                }
                // Assuming the server responds with success
                markSlotAsOccupied(selectedSlot); // Mark slot as occupied
                swal("Success", "Client has been added successfully!", "success");
                clientForm.reset(); // Reset the form
				// Refresh the page after a short delay
				            setTimeout(() => {
				                location.reload(); // Refresh the page
				            }, 1000); // Adjust the timeout duration as needed (2000 ms = 2 seconds)

            })
            .catch(error => {
                console.error('Error adding client:', error);
                swal("Error", "Failed to add client. Please try again.", "error");
            });
        } else {
            swal("Error", "Please select a parking slot before adding a client.", "error");
        }
    });

    // Handle adding a new floor
    const slotManagementForm = document.getElementById('slot-management-form');
    slotManagementForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        fetch(slotManagementForm.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(slotManagementForm)),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding floor');
            }
            // Assuming the server responds with success
            swal("Success", `Floor has been added successfully!`, "success");
            
            // Refresh the page after a short delay
            setTimeout(() => {
                location.reload(); // Refresh the page
            }, 1000); // Adjust the timeout duration as needed (2000 ms = 2 seconds)

            slotManagementForm.reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error adding floor:', error);
            swal("Error", "Failed to add new floor. Please try again.", "error");
        });
    });

    // Function to mark slots as occupied when a new client is added
    const markSlotAsOccupied = (slotNumber) => {
        const slotDiv = document.querySelector(`div[data-slot-number="${slotNumber}"]`);
        if (slotDiv) {
            slotDiv.classList.remove('available');
            slotDiv.classList.add('occupied');
        }
    };
});

// Function to fetch and update dashboard data
function fetchFloorData() {
    fetch('dash-floor')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the displayed counts
            document.getElementById("added-floors").innerText = data.addFloor;
           	document.getElementById("added-client").innerText = data.newClient;
			
			

           
        })
        .catch(error => {
            console.error('Error fetching dashboard data:', error);
        });
}