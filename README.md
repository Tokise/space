# Space Parking System

A web-based parking management system built with Java Servlets and MySQL that helps manage and monitor parking operations efficiently.

## Features

- **Real-time Parking Management**
  - Track active parking sessions
  - Monitor available parking slots
  - View occupied spaces in real-time

- **Client Management**
  - Register new clients
  - Support for different client types (VIP, Member, Guest)
  - Track client parking history

- **Payment Processing**
  - Automatic fee calculation based on parking duration
  - Payment recording and tracking
  - Support for different payment amounts

- **Dashboard Analytics**
  - View total revenue
  - Monitor parking space utilization
  - Track completed parking sessions
  - View unpaid client records

## Technical Stack

- **Backend**
  - Java Servlets
  - Jakarta EE
  - MySQL Database

- **Frontend**
  - JSP (JavaServer Pages)
  - HTML/CSS
  - JavaScript

- **Server**
  - Apache Tomcat 10.1.24

## Prerequisites

- JDK 22
- MySQL Server
- Apache Tomcat 10.1.24
- Eclipse IDE (or any Java IDE)

## Database Setup

1. Create a MySQL database named `user_data`
2. Required tables:
   - `users` (active parking sessions)
   - `completed_parking_records` (finished parking sessions)
   - `out_clients` (client history)
   - `floors` (parking space configuration)

## Installation

1. Clone the repository
2. Import the project into Eclipse as a Dynamic Web Project
3. Configure your MySQL connection settings in the servlet files:
   ```java
   private static final String DB_URL = "jdbc:mysql://localhost:3306/user_data";
   private static final String DB_USER = "root";
   private static final String DB_PASSWORD = "your_password";
   ```
4. Deploy the application to Tomcat server

## Usage

1. Start the Tomcat server
2. Access the application through: `http://localhost:8080/parkingsystem`
3. Use the dashboard to:
   - Register new parking clients
   - Monitor active parking sessions
   - Process payments
   - View analytics

## Features in Detail

### Parking Management
- Real-time tracking of available parking slots
- Automatic assignment of parking spaces
- Duration tracking for each parking session

### Client Types
- VIP: Premium parking privileges
- Member: Regular registered clients
- Guest: Temporary parking clients

### Payment Processing
- Automatic fee calculation based on duration
- Support for different rate types
- Payment status tracking

### Reporting
- Revenue analytics
- Occupancy reports
- Client history tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Jakarta EE Community
- MySQL Community
- Apache Tomcat Team 