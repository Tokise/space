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

@WebServlet("/vehicle-type")
public class VehicleType extends HttpServlet {
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
             Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement("SELECT id, license_plate, client_name, vehicle_type FROM out_clients");
             ResultSet rs = stmt.executeQuery()) {

            JSONArray clientTypeArray = new JSONArray();

            while (rs.next()) {
                JSONObject client = new JSONObject();
                client.put("id", rs.getInt("id"));
                client.put("license_plate", rs.getString("license_plate"));
                client.put("client_name", rs.getString("client_name"));
                client.put("vehicle_type", rs.getString("vehicle_type"));

                clientTypeArray.put(client);
            }

            // Initialize counts
            int total2Wheel = 0;
            int total4Wheel = 0;
            int total8Wheel = 0;
            int total16Wheel = 0;

            // Count vehicle types
            PreparedStatement countStmt = conn.prepareStatement("SELECT vehicle_type, COUNT(*) AS count FROM out_clients GROUP BY vehicle_type");
            ResultSet countRs = countStmt.executeQuery();
            while (countRs.next()) {
                String type = countRs.getString("vehicle_type").toLowerCase();
                int count = countRs.getInt("count");
                if (type.equals("2-wheel")) {
                    total2Wheel = count;
                } else if (type.equals("4-wheel")) {
                    total4Wheel = count;
                } else if (type.equals("8-wheel")) {
                    total8Wheel = count;
                } else if (type.equals("16-wheel")) {
                    total16Wheel = count;
                }
            }

            // Create the final JSON response
            JSONObject responseJson = new JSONObject();
            responseJson.put("clients", clientTypeArray); // Add the client data array
            responseJson.put("total_2", total2Wheel);
            responseJson.put("total_4", total4Wheel);
            responseJson.put("total_8", total8Wheel);
            responseJson.put("total_16", total16Wheel);

            // Write the JSON object to the response
            out.print(responseJson);

        } catch (SQLException e) {
            // Log error and respond with an error message
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try (PrintWriter out = response.getWriter()) {
                out.print("{\"error\": \"Database access error\"}");
            }
        }
    }
}
