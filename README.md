# NewsScraper 

NewsScraper is a web scraping application designed to aggregate news articles from predefined websites like Ycombinator. The project is structured with multiple containers using Node, React, Postgres, and Redis.

## Features

- **Automated Scraping**: Automatically scrapes predefined websites for the latest news articles.
- **Database Storage**: Stores scraped articles in a Postgres database.
- **Frontend Visualization**: Allows users to visualize the scraped articles via a React frontend.
- **Containerized Environment**: Each component runs in its own Docker container for easy management and scalability.

<div align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"  alt="docker" width="50" height="50"/>
</div>

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/gelutz/newscraper.git
    cd newscraper
    ```

2. Start the Docker containers:
    ```sh
    docker-compose up --build
    ```

### Usage

To scrape the predefined websites, send a GET request to the webscraper container's endpoint:
```sh
curl http://<webscraper-container-ip>:<port>/scrape
```

## Main commands:

1. **make env** copies the .env in the root folder to all folders inside `app/`.

2. **make log** shows the logs of the containers.

3. **make clean** removes all `node_modules/` and `dist/` folders, and all `.env` files inside `app/`.

4.  **make env** copies the .env in the root folder to all folders inside `app/`.

### This service runs 5 different containers:
1. Front-end container, running React JS.
2. Back-end container, running a Node JS api connected with the database.
3. PostgreSQL database.
4. Webscraper service, running a Node JS api that fetches the news through an API route.
5. Redis service with jwt token's allow/block lists.
