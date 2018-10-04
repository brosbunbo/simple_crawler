#!/bin/bash

echo "================================"
echo "Reverting db..."
./node_modules/.bin/db-migrate down --config ./config/database.json
