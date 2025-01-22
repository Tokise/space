
<%
if (session.getAttribute("name") == null) {
	response.sendRedirect("login.jsp");
}
%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Space - Home</title>
<link
	href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="css/index-style.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

	<div class="hamburger-menu">
		<span></span> <span></span> <span></span>
	</div>

	<div class="sidebar" id="sidebar">
		<div class="logo">
			<h1>
				<a href="index.jsp"><img alt="" src="assets/1.png"></a>
			</h1>
		</div>

		<a href="index.jsp" class="sidebar-link active"><i class="fas fa-home"></i> <span>Home</span></a>
		 <a href="addClient.jsp" id="add-client-btn" class="sidebar-link"><i class="fa-solid fa-plus"></i> <span>Create</span></a>
		  <a href="client-type.jsp" class="sidebar-link"><i	class="fas fa-users"></i> <span>Client Type</span></a> 
		  <a href="vehicle-type.jsp" class="sidebar-link"><i class="fas fa-car"></i> <span>Vehicle Type</span></a>
		   <a href="payment.jsp" class="sidebar-link"><i class="fas fa-credit-card"></i> <span>Payment</span></a>
		    <a href="out-client.jsp" class="sidebar-link"><i class="fa-solid fa-receipt"></i> <span>Transactions</span></a>

	</div>

	<div class="main-wrapper">

		<div class="top-bar">
			<div class="nav">
				Welcome Back,
				<%=session.getAttribute("name") != null ? session.getAttribute("name").toString().substring(0, 1).toUpperCase()
		+ session.getAttribute("name").toString().substring(1) : "Guest"%>
			</div>

			<div class="account-icon">
				<img src="assets/icon.png" alt="Profile Icon"
					onclick="toggleDropdown()">

				<div id="account-dropdown-menu" class="dropdown-menu">
					<div class="sub-menu">
						<div class="user-info">
							<img src="assets/icon.png">
							<h3><%=session.getAttribute("name") != null ? session.getAttribute("name").toString().substring(0, 1).toUpperCase()
		+ session.getAttribute("name").toString().substring(1) : "Guest"%></h3>
						</div>
						<hr>

						<a href="profile.jsp" class="dropdown-item">Change Profile</a> 
						<a href="change-password.jsp" class="dropdown-item">Change
							Password</a> 
						<a href="logout" class="dropdown-item" onclick="handleLogout()">Logout</a>

						<div class="dropdown-item dark-mode-toggle-wrapper">
							<button class="dark-mode-toggle" id="dark-mode-toggle"
								onclick="toggleModeText()">
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
					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fas fa-user-check"></i>
						</div>
						<div class="dashboard-details">
							<h3>
								<a href="#records">Online Clients</a>
							</h3>
							<p id="online-clients">0</p>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fas fa-car"></i>
						</div>
						<div class="dashboard-details">
							<h3>
								<a href="vehicle-type.jsp">Vehicle Type</a>
							</h3>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fas fa-users"></i>
						</div>
						<div class="dashboard-details">
							<h3>
								<a href="client-type.jsp">Clients Type</a>
							</h3>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fas fa-parking"></i>
						</div>
						<div class="dashboard-details">
							<h3>Available Slots</h3>
							<p id="available-slots">0</p>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fas fa-money-bill-wave"></i>
						</div>
						<div class="dashboard-details">
							<h3>
								<a href="payment.jsp">Unpaid Clients</a>
							</h3>
							<p id="unpaid-client">0</p>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fa-solid fa-money-check"></i>
						</div>
						<div class="dashboard-details">
							<h3>
								<a href="out-client.jsp">Transactions</a>
							</h3>
							<p id="completed-clients">0</p>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fas fa-peso-sign"></i>
						</div>
						<div class="dashboard-details">
							<h3>Total Revenue</h3>
							<p id="total-revenue">0</p>
						</div>
					</div>

					<div class="dashboard-item">
						<div class="dashboard-icon">
							<i class="fa-solid fa-clock"></i>
						</div>
						<div class="dashboard-details">
							<h3>Total Durations (Min)</h3>
							<p id="total-duration">0</p>
						</div>
					</div>
				</div>

				<div class="records-section">
					<h2 class="section-title">Online Clients Records</h2>
					<div class="table-responsive">
						<table id="completed-parking-table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Client Name</th>
									<th>License Plate</th>
									<th>Parking Slot</th>
									<th>Start Time</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody id="clientTableBody"></tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<script src="script/main.js"></script>
		<script src="script/dark-mode.js"></script>
		<script src="script/nav.js"></script>
		<script src="script/account.js"></script>
</body>
</html>
