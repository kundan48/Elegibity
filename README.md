# Real-Time Weather Monitoring System

This project is a real-time weather monitoring system that fetches, processes, and provides summarized insights on weather conditions for selected metro cities in India. The system retrieves data from the OpenWeatherMap API and calculates daily rollups and aggregates for each city, triggers alerts based on user-defined thresholds, and provides visualizations for daily summaries and historical weather trends.

## Features

- **Real-Time Weather Data**: Continuously retrieves weather data from the OpenWeatherMap API at a configurable interval.
- **Temperature Conversion**: Converts temperatures from Kelvin to Celsius (or Fahrenheit based on user preference).
- **Daily Weather Summary**: Aggregates data into daily summaries with average, maximum, minimum temperatures, and dominant weather conditions.
- **Alerting System**: User-configurable alerts based on temperature or specific weather conditions.
- **Visualization**: Displays weather summaries, historical trends, and alerts.

## Requirements

### Prerequisites

1. [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
2. [MongoDB](https://www.mongodb.com/) or another compatible database system
3. [Docker](https://www.docker.com/) or [Podman](https://podman.io/) for containerizing services (optional)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-weather-monitoring.git
   cd real-time-weather-monitoring
