<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space - Transactions</title>
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
        <a href="vehicle-type.jsp" class="sidebar-link"><i class="fas fa-car"></i> <span>Vehicle Type</span></a>
        <a href="payment.jsp" class="sidebar-link"><i class="fas fa-credit-card"></i> <span>Payment</span></a>
        <a href="out-client.jsp" class="sidebar-link active"><i class="fa-solid fa-receipt"></i> <span>Transactions</span></a>
       
        
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
        <h2>Transaction History</h2>
        
        <!-- Search Bar -->
        <div class="search">
            <input type="text" id="searchBar" placeholder="Search for clients..." />
        </div>
        <div class="records-section">
	<div class="table-responsive">
        <table id="completed-parking-table">
            <thead>
                <tr>
                    <th onclick="sortTable('id')">ID</th>
                    <th onclick="sortTable('client_name')">Client Name</th>
                    <th onclick="sortTable('license_plate')">License Plate</th>
                    <th onclick="sortTable('parking_slot')">Parking Slot</th>
                    <th onclick="sortTable('start_time')">Start Time</th>
                    <th onclick="sortTable('end_time')">End Time</th>
                    <th onclick="sortTable('parking_fee')">Parking Fee</th>
                    <th>Payment Status</th>
                    <th>Duration(Min)</th>
                    <th>Actions</th> <!-- New Actions Header -->
                </tr>
            </thead>
            <tbody id="clientTableBody">
                <!-- Data will be populated by the server-side script or JavaScript -->
            </tbody>
        </table>
        </div>
        </div>

		<!-- Client Info Modal -->
        <div id="clientInfoModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Client Information</h2>
                <p><strong>Client ID:</strong> <span id="modal-client-id"></span></p>
                <p><strong>License Plate:</strong> <span id="modal-license-plate"></span></p>
                <p><strong>Client Name:</strong> <span id="modal-client-name"></span></p>
                <p><strong>Client Type:</strong> <span id="modal-client-type"></span></p>
                <p><strong>Parking Slot:</strong> <span id="modal-parking-slot"></span></p>
                <p><strong>Start Time:</strong> <span id="modal-start-time"></span></p>
                <p><strong>End Time:</strong> <span id="modal-end-time"></span></p>
                <p><strong>Parking Fee:</strong> <span id="modal-parking-fee"></span></p>
                <p><strong>Total(Tax included):</strong> <span id="modal-total"></span></p>
                <p><strong>Payment:</strong> <span id="modal-pay"></span></p>
                <p><strong>Payment Status:</strong> <span id="modal-payment-status"></span></p>
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
    <script src="script/out-client.js"></script>
    <script src="script/dark-mode.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script src="script/nav.js"></script>
      <script src="script/account.js"></script>
  
  
</body>
</html>
