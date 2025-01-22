<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space - Vehicle - Type</title>
    <!-- Google Font: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/index-style.css"> <!-- Use the same stylesheet for consistency -->
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
        <a href="addClient.jsp" id="add-client-btn" class="sidebar-link"><i class="fa-solid fa-plus"></i> <span>Create</span></a>
        <a href="client-type.jsp" class="sidebar-link"><i class="fas fa-users"></i> <span>Client Type</span></a>
        <a href="vehicle-type.jsp" class="sidebar-link active"><i class="fas fa-car"></i> <span>Vehicle Type</span></a>
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
    
    <!-- Main Content -->
    <div class="main-content">
        <h2>Vehicle Type</h2>
        
        <div class="dashboard-grid">
                <!--2 Wheels -->
                <div class="dashboard-item">
                    <div class="dashboard-icon">
                      <i class="fa-solid fa-motorcycle"></i>
                    </div>
                    <div class="dashboard-details">
                        <h3><a href="">2 Wheels</a></h3>
                        <p id="total2wheelsCount">0</p>
                    </div>
                </div>
                
                <!-- 4 wheels -->
                <div class="dashboard-item">
                    <div class="dashboard-icon">
                        <i class="fa-solid fa-car-side"></i>
                    </div>
                    <div class="dashboard-details">
                        <h3><a href="">4 Wheels</a></h3>
                         <p id="total4wheelsCount">0</p>
                    </div>
                </div>
                
                <!-- Guest -->
                <div class="dashboard-item">
                    <div class="dashboard-icon">
                     <i class="fa-solid fa-truck"></i>
                    </div>
                    <div class="dashboard-details">
                        <h3><a href="">8 Wheels</a></h3>
                         <p id="total8wheelsCount">0</p>
                    </div>
                </div>
                
                  <!-- Guest -->
                <div class="dashboard-item">
                    <div class="dashboard-icon">
                     <i class="fa-solid fa-truck-moving"></i>
                    </div>
                    <div class="dashboard-details">
                        <h3><a href="">16 Wheels</a></h3>
                         <p id="total16wheelsCount">0</p>
                    </div>
                </div>
                
                </div>
                
                
        <label for="vehicleFilter">Filter by Vehicle Type:</label>
        <select id="vehicleFilter">
            <option value="all">All</option>
            <option value="2-wheel">2-Wheel</option>
            <option value="4-wheel">4-Wheel</option>
            <option value="8-wheel">8-Wheel</option>
            <option value="16-wheel">16-Wheel</option>
            <!-- Add more vehicle types as needed -->
        </select>
        
        
        <div class="records-section">
        <div class = "table-responsive">
        <table id="completed-parking-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>License Plate</th>
                    <th>Vehicle Type</th>
                     <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="clientTableBody"> 
                <!-- Data will be populated by the server-side script or JavaScript -->
            </tbody>
        </table>
        </div>
        </div>
       <!-- Pagination Controls -->
<div id="pagination-controls">
    <button id="prevPageBtn" class="pagination-btn" onclick="changePage(-1)">Prev</button>
    <span id="pageInfo">Page 1 of 1</span>
    <button id="nextPageBtn" class="pagination-btn" onclick="changePage(1)">Next</button>
</div>
</div>
</div>
    

    <script src="script/vehicle-type.js"></script>
    <script src="script/dark-mode.js"></script>
     <script src="script/nav.js"></script>
     <script src="script/account.js"></script>
</body>
</html>
