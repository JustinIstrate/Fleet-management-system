# Fleet Management System
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/JustinIstrate/Fleet-management-system)

This repository contains a full-stack Fleet Management System built with a microservices architecture. It includes a Spring Boot backend for managing vehicles and their maintenance, and an Angular front-end for the user interface. The entire backend stack is containerized using Docker for easy setup and deployment.

## Architecture

The system is composed of several independent microservices that work together:

-   **`fleet-manager`**: The core backend service responsible for all business logic. It handles CRUD operations for cars, manages maintenance logs, and exposes a REST API.
-   **`discovery-service`**: A Eureka server that allows other microservices to register themselves and discover each other within the network.
-   **`api-gateway`**: Built with Spring Cloud Gateway, this service acts as the single entry point for all client requests. It routes traffic to the appropriate microservice and handles cross-origin resource sharing (CORS).
-   **`fleet-manager-ui`**: A standalone Angular application that provides the user interface for interacting with the system.
-   **`mysql-db`**: A MySQL database for data persistence, managed as a Docker container.

## Features

-   **Vehicle Management**: Full CRUD (Create, Read, Update, Delete) functionality for fleet vehicles.
-   **Soft Deletes**: Cars are soft-deleted to maintain data integrity and history.
-   **Maintenance Tracking**: Add and view maintenance logs for each vehicle, including description, date, and cost.
-   **Cost Analysis**: Automatically calculates the total maintenance cost for each car.
-   **Analytics**: Identifies the top 3 most expensive cars to maintain.
-   **Automatic Data Seeding**: Populates the database with 50 randomly generated cars and their maintenance logs on the first run using `DataFaker`.
-   **ITP Expiry Alerts**: A scheduled task runs every 10 seconds to check and log cars with technical inspections (ITP) expiring within the next 7 days.
-   **Interactive UI**: A responsive Angular front-end to display vehicle data and maintenance history in a user-friendly modal.

## Technologies Used

-   **Backend**: Java 21, Spring Boot, Spring Cloud (Gateway, Eureka), Spring Data JPA, Hibernate
-   **Frontend**: Angular, TypeScript, HTML, CSS
-   **Database**: MySQL
-   **Containerization**: Docker, Docker Compose
-   **API Documentation**: SpringDoc (OpenAPI 3)
-   **Testing**: JUnit, Mockito, H2 Database (Backend); Vitest (Frontend)

## Getting Started

### Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### 1. Running the Backend Infrastructure

The entire backend, including the database, is orchestrated with Docker Compose.

From the root directory of the project, run the following command:

```bash
docker compose up --build
```

This command will:
1.  Build the Docker images for the `api-gateway`, `discovery-service`, and `fleet-manager` services.
2.  Start all the necessary containers in the correct order.

The backend services will be available at the following ports:

-   **API Gateway**: `http://localhost:8080` (This is the main entry point for the application)
-   **Discovery Service (Eureka)**: `http://localhost:8761`
-   **Fleet Manager Service**: `http://localhost:9090`
-   **MySQL Database**: `localhost:3307`

### 2. Running the Frontend UI

The frontend is an Angular application that needs to be run separately.

1.  Navigate to the UI directory:
    ```bash
    cd fleet-manager-ui
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    ng serve
    ```

4.  Open your browser and navigate to `http://localhost:4200` to use the application.

## API Documentation

The `fleet-manager` service provides API documentation using SpringDoc and Swagger UI. Once the backend services are running, you can access the interactive API documentation at:

-   **Swagger UI**: `http://localhost:9090/swagger-ui.html`

All API requests from the frontend are routed through the API Gateway on port `8080`. The primary endpoints are:

-   `http://localhost:8080/api/cars`
-   `http://localhost:8080/api/maintenance`
