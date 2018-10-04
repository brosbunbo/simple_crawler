#!/bin/bash

echo "================================"
echo "Migrating database..."
./node_modules/.bin/db-migrate up --config ./config/database.json
