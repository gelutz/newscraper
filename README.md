
<center>
<h1>Newscraper</h1>
<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="30" height="30"/></a><a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="30" height="30"/> </a>
<a href="https://redis.io" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="30" height="30"/> </a>
<a href="https://www.docker.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"  alt="docker" width="30" height="30"/> </a>
</center>

### This service runs 4 different containers:
1. Front-end container, running React JS.
2. Back-end container, running a Node JS api connected with the database.
3. PostgreSQL database.
4. Webscraper service, running a Node JS api that fetches the news through an API route.

## Main commands:
<h5>from the source dir:</h5>

1. **make env** replicates the .env in the `src/` folder to all folders inside the `src/app/`, creating a symbolic link inside each folder.

2. **make up** builds and starts all containers in the docker-compose file (client, server, webscraper and database)

3.  **make down** takes down all running containers from the docker-compose file.
