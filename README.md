# POS — Point of Sale System

A Spring Boot web application for managing point-of-sale operations, built by Astronity.

## Tech Stack

- **Java 21**
- **Spring Boot 4.0.5**
- **Spring Security** — authentication & authorization
- **Spring Data JPA** — data persistence
- **Thymeleaf** — server-side templating
- **MySQL** — relational database
- **Lombok** — boilerplate reduction
- **Maven** — build tool

## Prerequisites

- Java 21+
- MySQL running locally (or provide a remote `DB_URL`)
- Maven (or use the included `mvnw` wrapper)

## Getting Started

### 1. Set up the database

Create a MySQL database named `financial` (or configure a different one via environment variables):

```sql
CREATE DATABASE financial;
```

### 2. Configure environment variables (optional)

| Variable      | Default                              | Description          |
|---------------|--------------------------------------|----------------------|
| `DB_URL`      | `jdbc:mysql://localhost:3306/financial` | JDBC connection URL |
| `DB_USER_NAME`| `root`                               | Database username    |
| `DB_PASSWORD` | _(empty)_                            | Database password    |

### 3. Install Git hooks

```bash
sh scripts/setup-hooks.sh
```

This installs a `commit-msg` hook that enforces [Conventional Commits](https://www.conventionalcommits.org/) format:

```
# do
feat(auth): add JWT login        
fix: handle null pointer

# don't
added stuff                      
```

### 4. Run the application

```bash
./mvnw spring-boot:run
```

The app will be available at [http://localhost:8080](http://localhost:8080).

## Build

```bash
./mvnw clean package
```

The executable JAR will be generated in `target/`.

## Running Tests

```bash
./mvnw test
```