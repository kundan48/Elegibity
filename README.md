# Real-Time Weather Monitoring System

This project is a real-time weather monitoring system that fetches, processes, and provides summarized insights on weather conditions for selected metro cities in India. The system retrieves data from the OpenWeatherMap API and calculates daily rollups and aggregates for each city, triggers alerts based on user-defined thresholds, and provides visualizations for daily summaries and historical weather trends.

## Features

- **Real-Time Weather Data**: Continuously retrieves weather data from the OpenWeatherMap API at a configurable interval.
- **Daily Weather Summary**: Aggregates data into daily summaries with average, maximum, minimum temperatures, and dominant weather conditions.
- **Alerting System**: User-configurable alerts based on temperature or specific weather conditions.
- **Visualization**: Displays weather summaries, historical trends, and alerts.

## Requirements

### Prerequisites

1. [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
2. [MongoDB](https://www.mongodb.com/) or another compatible database system

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-weather-monitoring.git
   cd real-time-weather-monitoring

## Setup Instructions

### Install Dependencies

Run the following command to install the necessary dependencies for the project:

```bash
npm install
```

### Configure Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add your OpenWeatherMap API key and other configurations to the `.env` file:

```plaintext
OPENWEATHER_API_KEY=your_api_key_here
CONNECTION_STRING=your_mongodb_connection_string
PORT=3001
```

### Start the Application

Once the database is set up, you can start the application by running:

```bash
npm start
```

## Project Structure

### **src/**
Contains the main application files and folders responsible for the core functionalities of the Real-Time Weather Monitoring System.

- **models/**: This directory contains data models and schema definitions for MongoDB. It defines how weather data is structured and stored in the database, enabling easy interactions with the database through Mongoose.

- **index.js**: This file serves as the entry point for the application. It includes:
  - **Routes**: Defines the REST API endpoints for the application.
  - **Cron Jobs**: Implements scheduled tasks that fetch weather data at regular intervals (every 5 minutes).
  - **API Functionality**: Integrates with the OpenWeatherMap API to retrieve real-time weather data.

- **server.js**: This file is responsible for creating an instance of the backend server using Express.js. It configures middleware, establishes the connection to the database, and starts the application to listen for incoming requests.


### Processing and Analysis

- **Data Collection**: The system retrieves weather data for the cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
- **Daily Summaries**: Data is rolled up daily to calculate:
  - **Average Temperature**: Mean temperature across all data points for the day.
  - **Max/Min Temperature**: Highest and lowest temperature readings of the day.
  - **Dominant Weather Condition**: Determined based on the most frequently occurring weather condition (e.g., Clear, Rain).
- **Alerts**: User-defined thresholds trigger alerts if conditions are met for consecutive data updates.

### Testing

The following test cases are implemented:

- **System Setup**: Verifies the connection to the OpenWeatherMap API.
- **Data Retrieval**: Simulates API calls and checks data parsing for location-specific weather data.
- **Temperature Conversion**: Tests Kelvin to Celsius/Fahrenheit conversion.
- **Daily Summary**: Verifies calculations for average, max, min temperatures, and dominant weather condition.
- **Alerting**: Simulates data exceeding thresholds and ensures alerts are triggered accordingly.

### Bonus Features

- **Additional Weather Parameters**: (e.g., humidity, wind speed) are included in summaries.
- **Forecasts**: Extended functionality to retrieve and display forecasted conditions.

### Dependencies

- **Node.js**: Runtime environment.
- **MongoDB**: Database for data persistence.
- **Axios**: HTTP client for API requests.
- **Mongoose**: MongoDB object modeling.
- **Express.js**: Backend framework.
-**node-cron**:Time Resend of API Request.

## Design Choices

### Database
- **MongoDB**: Utilizes MongoDB for real-time data storage and efficient aggregation operations. This choice enhances performance by allowing quick read and write operations, which is crucial for handling frequent weather updates.

### Backend Framework
- **Express.js**: The application is built using Express.js, a minimal and flexible Node.js web application framework. Express.js simplifies the creation of robust APIs and server-side applications, enhancing development speed.

### Scheduling Tasks
- **node-cron**: This module is used to schedule tasks for resending API requests at regular intervals (every 5 minutes). It allows the application to automate the retrieval of weather data, ensuring that the information remains up-to-date without manual intervention.

These design choices collectively contribute to a responsive, efficient, and scalable weather monitoring system that effectively handles real-time data and user-defined requirements.


### Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

### License

This project is licensed under the MIT License.

