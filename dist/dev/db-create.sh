#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Please enter migration name!"
  exit 1
fi

echo "================================"
echo "Creating db migration..."

./node_modules/.bin/db-migrate create $1 --config ./config/database.json --sql-file
