
<center>
<h1>Newscraper</h1>
<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="30" height="30"/></a><a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="30" height="30"/> </a>
<a href="https://redis.io" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="30" height="30"/> </a>
<a href="https://www.docker.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"  alt="docker" width="30" height="30"/> </a>
</center>

## Main commands:
<h5>from the source dir:</h5>

1. **make env** copies the .env in the root folder to all folders inside `app/`.

2. **make install** runs `npm install` inside each folder in `app/`

2. **make up** builds and starts all containers in the docker-compose file

3.  **make down** takes down all running containers from the docker-compose file. Volumes are not removed.

### This service runs 5 different containers:
1. Front-end container, running React JS.
2. Back-end container, running a Node JS api connected with the database.
3. PostgreSQL database.
4. Webscraper service, running a Node JS api that fetches the news through an API route.
5. Redis service with jwt token's allow/block lists.
