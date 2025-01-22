package com.parking.system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/client-type")
public class ClientType extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Database configuration
    private static final String DB_URL = "jdbc:mysql://localhost:3306/user_data";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "W7301@jqir#";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try (PrintWriter out = response.getWriter();
             Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

            // Retrieve individual client details
            PreparedStatement stmt = conn.prepareStatement("SELECT id, license_plate, client_name, client_type FROM out_clients");
            ResultSet rs = stmt.executeQuery();

            JSONArray clientDetailsArray = new JSONArray();
            while (rs.next()) {
                JSONObject client = new JSONObject();
                client.put("id", rs.getInt("id"));
                client.put("license_plate", rs.getString("license_plate"));
                client.put("client_name", rs.getString("client_name"));
                client.put("client_type", rs.getString("client_type"));
                clientDetailsArray.put(client);
            }

            // Initialize counts
            int totalVip = 0;
            int totalGuests = 0;
            int totalMember = 0;

            // Count VIPs and Guests
            PreparedStatement countStmt = conn.prepareStatement("SELECT client_type, COUNT(*) AS count FROM out_clients GROUP BY client_type");
            ResultSet countRs = countStmt.executeQuery();
            while (countRs.next()) {
                String type = countRs.getString("client_type").toLowerCase();
                int count = countRs.getInt("count");
                if (type.equals("vip")) {
                    totalVip = count;
                } else if (type.equals("guest")) {
                    totalGuests = count;
                }else if(type.equals("member")) {
                	totalMember = count;
                }
            }

            // Create the final JSON response
            JSONObject responseJson = new JSONObject();
            responseJson.put("client_details", clientDetailsArray);
            responseJson.put("total_vip", totalVip);
            responseJson.put("total_guests", totalGuests);
            responseJson.put("total_member", totalMember); 

            // Write the JSON object to the response
            out.print(responseJson);

        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try (PrintWriter out = response.getWriter()) {
                out.print("{\"error\": \"Database access error\"}");
            }
        }
    }
}
