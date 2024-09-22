package com.parking.system;

import org.json.JSONObject;

public class User {
    private int id;
    private String clientName;
    private String parkingSlot;
    private String startTime;
    private String endTime;

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User(int id, String clientName, String parkingSlot, String startTime, String endTime) {
        this.id = id;
        this.clientName = clientName;
        this.parkingSlot = parkingSlot;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getParkingSlot() {
        return parkingSlot;
    }

    public void setParkingSlot(String parkingSlot) {
        this.parkingSlot = parkingSlot;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    // Convert User to JSONObject
    public JSONObject toJSONObject() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", this.id);
        jsonObject.put("client_name", this.clientName);
        jsonObject.put("parking_slot", this.parkingSlot);
        jsonObject.put("start_time", this.startTime);
        jsonObject.put("end_time", this.endTime != null ? this.endTime : "In Progress");
        return jsonObject;
    }

    // Create a User from JSONObject
    public static User fromJSONObject(JSONObject jsonObject) {
        User user = new User();
        user.setId(jsonObject.getInt("id"));
        user.setClientName(jsonObject.getString("client_name"));
        user.setParkingSlot(jsonObject.getString("parking_slot"));
        user.setStartTime(jsonObject.getString("start_time"));
        user.setEndTime(jsonObject.has("end_time") ? jsonObject.getString("end_time") : "In Progress");
        return user;
    }
}
