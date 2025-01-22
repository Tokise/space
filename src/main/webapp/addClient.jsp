<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space - New - Client | Floors</title>
    <!-- Google Font: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom CSS for container form and grid -->
    <link rel="stylesheet" href="css/index-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">
  
</head>
<body>
	    <!-- Add the hamburger menu just after the opening body tag -->
    <div class="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
    </div>
	
	
	<!-- Sidebar -->
    <div class="sidebar" id="sidebar">
       <div class="logo">
            <h1><a href="index.jsp"><img alt="" src="assets/1.png"></a></h1>
        </div>
         <a href="index.jsp" class="sidebar-link"><i class="fas fa-home"></i> <span>Home</span></a>
        <a href="addClient.jsp" id="add-client-btn" class="sidebar-link active"><i class="fa-solid fa-plus"></i> <span>Create</span></a>
        <a href="client-type.jsp" class="sidebar-link"><i class="fas fa-users"></i> <span>Client Type</span></a>
        <a href="vehicle-type.jsp" class="sidebar-link"><i class="fas fa-car"></i> <span>Vehicle Type</span></a>
        <a href="payment.jsp" class="sidebar-link"><i class="fas fa-credit-card"></i> <span>Payment</span></a>
        <a href="out-client.jsp" class="sidebar-link"><i class="fa-solid fa-receipt"></i> <span>Transactions</span></a>
       
        
    </div>


	<div class="main-wrapper">
    <!-- Top Bar -->
    <div class="top-bar">
        <button onclick="history.back()" class="back"><i class="fa-solid fa-arrow-left"></i></button>
       
          <div class="account-icon">
                <img src="assets/icon.png" alt="Profile Icon" onclick="toggleDropdown()">
                
                <div id="account-dropdown-menu" class="dropdown-menu">
					<div class="sub-menu">
					<div class="user-info">
					<img src="assets/icon.png">
					<h3><%=session.getAttribute("name") != null ? session.getAttribute("name").toString().substring(0, 1).toUpperCase() 
							+ session.getAttribute("name").toString().substring(1) : "Guest"%></h3>
					 </div>
					 <hr>
					 
					<a href="profile.jsp" class="dropdown-item">Change Profile</a>
                    <a href="change-password.jsp" class="dropdown-item">Change Password</a>
                    <a href="logout" class="dropdown-item" onclick="handleLogout()">Logout</a>
                   
                    <div class="dropdown-item dark-mode-toggle-wrapper">
                        <button class="dark-mode-toggle">
                            <i class="fas fa-moon"></i> <span id="mode-text">Dark
									Mode</span>
                        </button>
                    </div>
                   
                    </div>
                </div>
            </div>
    </div>

<div class="main-content">
           
            <div class="dashboard-grid">
                <!-- Floors -->
                <div class="dashboard-item">
                    <div class="dashboard-icon">
                       <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="dashboard-details">
                        <h3><a href="#floors">Added Floors</a></h3>
                        <p id="added-floors">0</p>
                    </div>
                </div>
                
                <!-- Vehicle Type -->
                <div class="dashboard-item">
                    <div class="dashboard-icon">
                      <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <div class="dashboard-details">
                        <h3><a href="index.jsp">New Client</a></h3>
                         <p id="added-client">0</p>
                    </div>
                </div>
                </div>
                
                
    <div class="form-container">
        <!-- Form to manage parking slots -->
        <div class="form-container-addfloors" id="floors">
            <div class="form-header">
                <h2>Manage Floors</h2>
            </div>
            
            <form id="slot-management-form" method="post" action="${pageContext.request.contextPath}/manage-parking" onsubmit="return handleAddFloor(event);">
                <!-- Section to add a new floor -->
                <div id="add-new-floor-section">
                    <h3>Add New Floor</h3>
                    <label for="new-floor-number">New Floor Number:</label>
                    <input type="number" id="new-floor-number" name="newFloorNumber" placeholder="e.g., 5" required>

                    <label for="new-floor-slots">Available Slots on New Floor:</label>
                    <input type="number" id="new-floor-slots" name="newFloorSlots" min="0" placeholder="e.g., 15" required>
                </div>

                <button type="submit">Add Floor</button>
            </form>
        </div>

	<hr style="margin-bottom: 5%; margin-top: 5%;">
        <!-- Form to add a new client -->
        <div class="form-container-add-client" id="add-client">
            <div class="form-header">
                <h2>New Client</h2>
            </div>
            <div class="form-body">
                <form id="client-form" method="post" action="${pageContext.request.contextPath}/user-data" onsubmit="return handleAddClient(event);">
                    <!-- New License Plate Input -->
                    <label for="license-plate">License Plate Number</label>
                    <input type="text" id="license-plate" name="license_plate" placeholder="License Plate Number" required>

                    <!-- Existing Fields -->
                    <label for="client-name">Client Name</label>
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

                    
                    <!-- Floor Dropdown -->
                    <label for="floor-dropdown">Choose a Floor:</label>
                    <select id="floor-dropdown" name="floor" required>
                        <!-- Dynamic floor options will be inserted here by JavaScript -->
                    </select>

                    <!-- Parking Slots Grid -->
                    <label for="slot-grid">Parking Slots:</label>
                    <div id="slot-grid"></div>

                    <input type="hidden" id="selected-slot" name="parking_slot">

                    <button type="submit" id="add-client-submit">Add Client</button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
    <!-- Script to fetch floor data and generate parking slots -->
    <script src="script/slot.js"></script>
    <script src="script/dark-mode.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
	<script src="script/nav.js"></script>
	   <script src="script/account.js"></script>
   
</body>
</html>