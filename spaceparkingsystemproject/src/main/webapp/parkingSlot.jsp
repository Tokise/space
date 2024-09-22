
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Parking Slot</title>
    <!-- Google Font: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/index-style.css">
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Logo -->
        <div class="logo">
            <h1>Space</h1>
        </div>
        <!-- Sidebar Links with Icons -->
        <a href="addClient.jsp" class="sidebar-link"><i class="fas fa-user-plus"></i> ADD CLIENT</a>
        <a href="client.jsp" class="sidebar-link"><i class="fas fa-users"></i> CLIENT</a>
        <a href="parkingSlot.jsp" class="sidebar-link"><i class="fas fa-th-large"></i> SLOTS</a>
        <a href="type-management.jsp" class="sidebar-link"><i class="fas fa-tasks"></i> TYPE MANAGEMENT</a>
        <a href="vehicle.jsp" class="sidebar-link"><i class="fas fa-car"></i> VEHICLE MANAGEMENT</a>
        <a href="logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> LOGOUT</a>
    </div>

    <!-- Top Bar -->
    <div class="top-bar">
        <div class="welcome-message">WELCOME BACK ADMIN</div>
        <div class="search-container">
            <input type="text" class="search-bar" placeholder="Search...">
            <button class="search-btn"><i class="fas fa-search"></i></button> <!-- Search button beside search bar -->
        </div>
        <button class="dark-mode-toggle"><i class="fas fa-moon"></i></button> <!-- Dark mode toggle on the right side -->
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <table>
            <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Parking Slots</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Parking Fee</th>
                    <th>Receipt</th>
                </tr>
            </thead>
            <tbody>
                <!-- Sample Row -->
                <tr>
                    <td>John Doe</td>
                    <td>Slot A1</td>
                    <td>10:00 AM</td>
                    <td>12:00 PM</td>
                    <td>$5.00</td>
                    <td><button class="receipt-btn">Generate Receipt</button></td>
                </tr>
                <!-- Add more rows as needed -->
            </tbody>
        </table>
    </div>

    <!-- JavaScript -->
    <script src="script/main.js"></script>
</body>
</html>
