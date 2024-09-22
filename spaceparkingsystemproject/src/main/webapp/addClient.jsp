<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Client</title>
    <!-- Google Font: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom CSS for container form and grid -->
    <link rel="stylesheet" href="css/index-style.css">
   </head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="logo">
            <h1>Space</h1>
        </div>
        <a href="index.jsp" class="sidebar-link"><i class="fas fa-home"></i> Dashboard</a>
        <a href="client.jsp" class="sidebar-link"><i class="fas fa-users"></i> Client List</a>
        <a href="slots.jsp" class="sidebar-link"><i class="fas fa-th-large"></i> Parking Slots</a>
        <a href="type-management.jsp" class="sidebar-link"><i class="fas fa-tasks"></i> Membership</a>
        <a href="vehicle-management.jsp" class="sidebar-link"><i class="fas fa-car"></i> Vehicle Type</a>
        <a href="logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>

    <!-- Top Bar -->
    <div class="top-bar">
        <div class="welcome-message">NEW CLIENT</div>
        <div class="search-container">
            <input type="text" class="search-bar" placeholder="Search...">
            <button class="search-button"><i class="fas fa-search"></i></button>
        </div>
        <button class="dark-mode-new"><i class="fas fa-moon"></i></button>
    </div>

   <!-- Form Container -->
<div class="form-container">
    <div class="form-header">
        <h2>Add Client</h2>
    </div>
    <div class="form-body">
        <form id="client-form" method="post" action="user-data">
            
            <!-- New License Plate Input -->
            <label for="license-plate">License Plate Number</label>
            <input type="text" id="license-plate" name="license_plate" placeholder="License Plate Number" required>

            <!-- Existing Fields -->
            <input type="text" id="client-name" name="client_name" placeholder="Client Name" required>
            
            <label for="client-type">Client Type:</label>
            <select id="client-type" name="client_type" required>
                <option value="">Select Client Type</option>
                <option value="vip">VIP</option>
                <option value="member">Member</option>
                <option value="guest">Guest</option>
            </select>

            <label for="vehicle-type">Vehicle Type:</label>
            <select id="vehicle-type" name="vehicle_type" required>
                <option value="">Select Vehicle Type</option>
                <option value="2-wheel">2-Wheel</option>
                <option value="4-wheel">4-Wheel</option>
                <option value="8-wheel">8-Wheel</option>
                <option value="16-wheel">16-Wheel</option>
            </select>

            <label for="age">Age</label>
            <input type="number" id="client-age" name="client_age" placeholder="Age" required>

            <label for="contact">Contact Number</label>
            <input type="tel" id="contact-number" name="contact_number" placeholder="Contact Number" required pattern="[0-9]{11}">

            <label for="parking-slots">Parking Slots:</label>
            <div id="slot-grid" class="grid-container"></div>

            <input type="hidden" id="selected-slot" name="parking_slot">

            <button type="submit" id="add-client-submit">Add Client</button>
        </form>
    </div>
</div>

    <script src="script/script.js"></script>
    <script src="script/dark-mode.js"></script>
</body>
</html>
