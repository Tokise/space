package com.parking.system;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/user-data")
public class clientData extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	 response.setContentType("text/html; charset=UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Connect to the database
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        JSONArray userList = new JSONArray();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_data", "root", "W7301@jqir#");

            // Query to fetch clients with active parking sessions (end_time IS NULL)
            stmt = conn.prepareStatement("SELECT id, license_plate, client_name, client_type, vehicle_type, client_age, contact_number, parking_slot, start_time, end_time FROM users WHERE end_time IS NULL");
            rs = stmt.executeQuery();

            while (rs.next()) {
                JSONObject user = new JSONObject();
                user.put("id", rs.getInt("id"));
                user.put("license_plate", rs.getString("license_plate"));
                user.put("client_name", rs.getString("client_name"));
                user.put("client_type", rs.getString("client_type"));
                user.put("vehicle_type", rs.getString("vehicle_type"));
                user.put("client_age", rs.getInt("client_age"));
                user.put("contact_number", rs.getString("contact_number"));
                user.put("parking_slot", rs.getString("parking_slot"));

                // Handle null timestamps
                Timestamp startTime = rs.getTimestamp("start_time");
                Timestamp endTime = rs.getTimestamp("end_time");

                user.put("start_time", startTime != null ? startTime.toString() : "Not Started");
                user.put("end_time", endTime != null ? endTime.toString() : "In Progress");

                userList.put(user); // Add each user object to the userList array
            }

            // Send JSON response
            response.getWriter().print(userList.toString());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the form fields from the request
        String license_plate = request.getParameter("license_plate");
        String client_name = request.getParameter("client_name");
        String client_type = request.getParameter("client_type");
        String vehicle_type = request.getParameter("vehicle_type");
        String client_age = request.getParameter("client_age");
        String contact_number = request.getParameter("contact_number");
        String selected_slot = request.getParameter("parking_slot");

        // Connect to the database
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_data", "root", "W7301@jqir#");

            // Prepare the SQL statement to insert new client data
            stmt = conn.prepareStatement("INSERT INTO users (license_plate, client_name, client_type, vehicle_type, client_age, contact_number, parking_slot, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

            stmt.setString(1, license_plate); // Insert license plate number
            stmt.setString(2, client_name);
            stmt.setString(3, client_type);
            stmt.setString(4, vehicle_type);
            stmt.setString(5, client_age);
            stmt.setString(6, contact_number);
            stmt.setString(7, selected_slot);
            
            // Set start time to current timestamp
            stmt.setTimestamp(8, new Timestamp(new Date().getTime()));

            // Set end time to null (to be updated when the session ends)
            stmt.setTimestamp(9, null);

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error inserting data into the database: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("MySQL driver not found: " + e.getMessage());
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing database connection: " + e.getMessage());
            }
        }

        // Redirect to the home page or a success page
        response.sendRedirect("index.html");
        
        
    }
    
    public class DataUserServlet extends HttpServlet {
        private static final long serialVersionUID = 1L;

        // Handle GET request: Fetch active users from the database and return as JSON
        @Override
        protected void doGet(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {

            List<Client> clients = new ArrayList<>();
            Connection conn = null;
            PreparedStatement stmt = null;
            ResultSet rs = null;

            try {
                // Connect to the database
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_data", "root", "W7301@jqir#");

                // SQL query to fetch all active clients
                String sql = "SELECT * FROM users WHERE status = 'active'";
                stmt = conn.prepareStatement(sql);
                rs = stmt.executeQuery();

                // Loop through the result set and add each client to the list
                while (rs.next()) {
                    Client client = new Client();
                    client.setId(rs.getInt("id"));
                    client.setClient_name(rs.getString("client_name"));
                    client.setLicense_plate(rs.getString("license_plate"));
                    client.setContact_number(rs.getString("contact_number"));
                    client.setVehicle_type(rs.getString("vehicle_type"));
                    client.setParking_slot(rs.getString("parking_slot"));
                    client.setStart_time(rs.getTimestamp("start_time").toString());
                    client.setEnd_time(rs.getTimestamp("end_time") != null ? rs.getTimestamp("end_time").toString() : null);

                    // Calculate duration if end_time is not null
                    if (client.getEnd_time() != null) {
                        long durationInMinutes = calculateDuration(rs.getTimestamp("start_time"), rs.getTimestamp("end_time"));
                        client.setDuration(durationInMinutes);
                    } else {
                        client.setDuration(null); // Session still active, no duration yet
                    }

                    clients.add(client);
                }

                // Convert list of clients to JSON
                String json = new Gson().toJson(clients);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);

            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                try { if (rs != null) rs.close(); } catch (Exception e) { }
                try { if (stmt != null) stmt.close(); } catch (Exception e) { }
                try { if (conn != null) conn.close(); } catch (Exception e) { }
            }
        }
        
        // Method to calculate parking duration in minutes
        private Long calculateDuration(Timestamp start, Timestamp end) {
            if (start != null && end != null) {
                long milliseconds = end.getTime() - start.getTime();
                return milliseconds / (1000 * 60); // Convert to minutes
            }
            return null;
        }
    

        // Inner class representing a client
        public class Client {
            private int id;
            private String client_name;
            private String license_plate;
            private String contact_number;
            private String vehicle_type;
            private String parking_slot;
            private String start_time;
            private String end_time;
            private Long duration; // Duration in minutes

            // Getters and Setters
            public int getId() { return id; }
            public void setId(int id) { this.id = id; }
            public String getClient_name() { return client_name; }
            public void setClient_name(String client_name) { this.client_name = client_name; }
            public String getLicense_plate() { return license_plate; }
            public void setLicense_plate(String license_plate) { this.license_plate = license_plate; }
            public String getContact_number() { return contact_number; }
            public void setContact_number(String contact_number) { this.contact_number = contact_number; }
            public String getVehicle_type() { return vehicle_type; }
            public void setVehicle_type(String vehicle_type) { this.vehicle_type = vehicle_type; }
            public String getParking_slot() { return parking_slot; }
            public void setParking_slot(String parking_slot) { this.parking_slot = parking_slot; }
            public String getStart_time() { return start_time; }
            public void setStart_time(String start_time) { this.start_time = start_time; }
            public String getEnd_time() { return end_time; }
            public void setEnd_time(String end_time) { this.end_time = end_time; }
            public Long getDuration() { return duration; }
            public void setDuration(Long duration) { this.duration = duration; }
        }
    }

    
   
}
