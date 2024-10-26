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

### Project Structure

- **src/**: Contains the main application files and folders.
  - **controllers/**: Business logic for data processing, rollups, and alerting.
  - **models/**: Data models and schema definitions for MongoDB.
  - **services/**: External API integration for OpenWeatherMap.
  - **utils/**: Helper functions (e.g., temperature conversion, alert checks).
  - **routes/**: REST API endpoints.
  - **visualization/**: UI for displaying summaries and trends.

### Processing and Analysis

- **Data Collection**: The system retrieves weather data for the cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
- **Temperature Conversion**: All temperature values are converted from Kelvin to Celsius or Fahrenheit.
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
- **Nodemailer**: For email alerts (optional).
- **Echarts**: For visualizations (optional).

### Docker Usage

MongoDB container setup:

```bash
docker run -d -p 27017:27017 --name weather-db mongo
```

### Design Choices

- **Configurable Intervals**: Allows users to set data polling intervals based on their preferences.
- **Database**: Utilizes MongoDB for real-time data storage and quick aggregation operations, enhancing performance.
- **Temperature Conversion**: Implemented as a user preference, enabling flexibility in displaying temperature units (Celsius/Fahrenheit).

### Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

### License

This project is licensed under the MIT License.

