# How to run a project
1. Make sure you are running docker.
2. After opening the project, in root, write `docker-compose up`. It will run a docker container with postgreSQL
3. In separate console, write `npm run start:dev`. It will run the application. (There is already provided nessessary env variables, but you can change them)
4. Open `http://localhost:3001/docs` to see swagger of the project.
5. First of all use, `sign up` or `sign in` endpoint, there in response, you will have accessToken, use it for protected endpoints
6. To refresh a token, use `refresh` endpoint.
7. Make a request to `Get users` endpoint with token.

### Setup environment variables
#### .env file
```
PORT=3001
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=nestjs-basic-auth

JWT_ACCESS_SECRET=
```
#### docker.env file
```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=nestjs-basic-auth
```
