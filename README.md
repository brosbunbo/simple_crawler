# Simple Crawler
1. [Server Requirements](#server-requirements)
2. [First time deployment](#first-time-deployment)
3. [NPM scripts](#npm-scripts)
4. [Crawler module](#crawler-module)

## Server Requirements
- NodeJS v8.9.4
- MySQL 5.6 / MariaDB 10.1.x

## First time deployment
  - Update npm libs by running:
    ```bash
    npm i
    ```

  - Copy ```config/database.json.example``` -> ```config/database.json```
  - Edit ```config/database.json``` to match your local config
  - Migrate datababase by run:
    ```bash
    npm run db-up
    ```

## NPM scripts:
  - ```npm run db-up```: migrate db
  - ```npm run db-down```: revert db
  - ```npm run db-create ${file_name} ```: create db migration file

## Crawler module
  - The main modules are located at dist/api/services