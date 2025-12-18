# Description

- this is a bare bones fullstack vite-react-express template. follow the steps below for setup

# Setup

- create database

```
createdb some_db_name

OR

> psql
> CREATE DATABASE some_db_name;
```

- install dependencies

```
npm install && cd client && npm install
```

- start express server in root directory of repository

```
npm run start:dev
```

- start vite server in client directory

```
npm run dev
```

# to test deployment

```
cd client && npm run build
```

browse to localhost:3000 (or whatever server port you used)

# to deploy

- build script for deploy

```
npm install && cd client && npm install && npm run build

```

- start script for deploy

```
node server/index.js

```

- environment variables for deployed site

```
JWT for jwt secret
DATABASE_URL for postgres database
```

Steps for setting up:

1. Run npm install in terminal

2. Open Postgres and create local database:

   - Commands:

   -psql
   -CREATE DATABASE capstone_db;
   -\q

3. Copy the example env file:

   - Commands:

   - cp .env.example .env

   - Open the .env file and replace the username and password with your Postgres credentials.
     DATABASE_URL=postgres://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/capstone_db

   - Make sure .env file is listed in gitignore

4. Setup database schema

   - Commands:

   - npm run db:schema

5. Setup database seeding

   - Commands:

   -npm run db:seed

6. Start the server

   - Commands:

   - npm run start:dev
