package com.parking.system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Servlet implementation class FloorMgt
 */
@WebServlet("/dash-floor")
public class FloorMgt extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 @Override
	    protected void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
	        response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");

	        Connection conn = null;
	        PreparedStatement stmt = null;
	        ResultSet rs = null;

	        try {
	            Class.forName("com.mysql.cj.jdbc.Driver");
	            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/user_data", "root", "W7301@jqir#");
	             
	            // Query to count online clients
	            stmt = conn.prepareStatement("SELECT COUNT(*) AS addFloor FROM floors");
	            rs = stmt.executeQuery();
	            int addedFloor = rs.next() ? rs.getInt("addFloor") : 0;

	            stmt = conn.prepareStatement("SELECT COUNT(*) AS newClient FROM users WHERE end_time IS NULL");
	            rs = stmt.executeQuery();
	            int newClient = rs.next() ? rs.getInt("newClient") : 0;
 	            
	            // Create a JSON object to send back the counts and available slots
	            String jsonResponse = String.format(
	                "{\"addFloor\": %d, \"newClient\": %d}", 
	                addedFloor, newClient
	            );
	            response.getWriter().write(jsonResponse);

	        } catch (Exception e) {
	            e.printStackTrace();
	            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	            response.getWriter().write("{\"error\": \"Unable to retrieve data: " + e.getMessage() + "\"}");
	        } finally {
	            try {
	                if (rs != null) rs.close();
	                if (stmt != null) stmt.close();
	                if (conn != null) conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	    }

}