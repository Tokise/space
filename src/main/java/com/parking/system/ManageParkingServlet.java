package com.parking.system;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/manage-parking")
public class ManageParkingServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private static final String DB_URL = "jdbc:mysql://localhost:3306/user_data";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "W7301@jqir#";

    // Handles POST request to add new floor and slots
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String newFloorNumber = request.getParameter("newFloorNumber");
        String newFloorSlots = request.getParameter("newFloorSlots");

        // Validate input
        if (newFloorNumber == null || newFloorSlots == null || newFloorNumber.isEmpty() || newFloorSlots.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Floor number and available slots are required.");
            return;
        }

        try {
            int floorNumber = Integer.parseInt(newFloorNumber);
            int availableSlots = Integer.parseInt(newFloorSlots);

            // Insert new floor data into the database
            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
                String sql = "INSERT INTO floors (floor_number, available_slots) VALUES (?, ?)";
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setInt(1, floorNumber);
                    ps.setInt(2, availableSlots);
                    ps.executeUpdate();
                }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error saving floor information: " + e.getMessage());
                return;
            }

            response.sendRedirect(request.getContextPath() + "/addClient.jsp"); // Redirect to addClient.jsp

        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid floor number or available slots.");
        }
    }

    // Handles GET request to fetch floor data
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Floor> floors = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT floor_number, available_slots FROM floors";
            try (PreparedStatement ps = conn.prepareStatement(sql);
                 ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    int floorNumber = rs.getInt("floor_number");
                    int availableSlots = rs.getInt("available_slots");
                    floors.add(new Floor(floorNumber, availableSlots));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching floor data: " + e.getMessage());
            return;
        }

       

        // Send the floors as a JSON response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        out.print(gson.toJson(floors));
        out.flush();
    }

    // Floor class to hold the floor data
    public static class Floor {
        private int floorNumber;
        private int availableSlots;

        public Floor(int floorNumber, int availableSlots) {
            this.floorNumber = floorNumber;
            this.availableSlots = availableSlots;
        }

        public int getFloorNumber() {
            return floorNumber;
        }

        public int getAvailableSlots() {
            return availableSlots;
        }

        @Override
        public String toString() {
            return "Floor{" +
                    "floorNumber=" + floorNumber +
                    ", availableSlots=" + availableSlots +
                    '}';
        }
    }
}