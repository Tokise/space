<%
	if(session.getAttribute("name")==null){
		response.sendRedirect("login.jsp");
	}
%>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Parking System</title>
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
        <a href="addClient.jsp" id="add-client-btn" class="sidebar-link"><i class="fas fa-user-plus"></i> Add Client</a>
        <a href="client.jsp" class="sidebar-link"><i class="fas fa-users"></i> Client List</a>
        <a href="slots.jsp" class="sidebar-link"><i class="fas fa-th-large"></i> Parking Slots</a>
        <a href="type-management.jsp" class="sidebar-link"><i class="fas fa-tasks"></i> Membership</a>
        <a href="vehicle-management.jsp" class="sidebar-link"><i class="fas fa-car"></i> Vehicle Type</a>
        <a href="logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>

    <!-- Top Bar -->
    <div class="top-bar">
        <div class="welcome-message">WELCOME BACK ADMIN<br>DASHBOARD</div>
        <div class="search-container">
            <input type="text" class="search-bar" placeholder="Search...">
            <button class="search-button"><i class="fas fa-search"></i></button>
        </div>
        <button class="dark-mode-toggle"><i class="fa"></i></button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Dashboard Grids -->
        <div class="dashboard-grid">
            <!-- Online Clients -->
            <div class="dashboard-item">
                <div class="dashboard-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="dashboard-details">
                    <h3>Online Clients</h3>
                    <p id="online-clients">0</p>
                </div>
            </div>

            <!-- Available Parking Slots -->
            <div class="dashboard-item">
                <div class="dashboard-icon">
                    <i class="fas fa-parking"></i>
                </div>
                <div class="dashboard-details">
                    <h3>Available Slots</h3>
                    <p id="available-slots">0</p>
                </div>
            </div>

            <!-- Completed Clients -->
            <div class="dashboard-item">
                <div class="dashboard-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="dashboard-details">
                    <h3>Completed Clients</h3>
                    <p id="completed-clients">0</p>
                </div>
            </div>
        </div>

        <h2>Online Parking Records</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                     <th>License Plate</th>
                    <th>Client Name</th>
                    <th>Parking Slot</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Parking Fee</th> <!-- New column for parking fee -->
                    <th>Actions</th> <!-- New column for action buttons -->
                </tr>
            </thead>
            <tbody id="clientTableBody">
                <!-- Data will be dynamically inserted here -->
            </tbody>
        </table>
    </div>

    <!-- JavaScript -->
    <script src="script/main.js"></script>
    <script src="script/dark-mode.js"></script>
</body>
</html>
