#!/bin/bash

# baixando as dependencias

cd ./1-erp
npm install

cd ../4-G
npm install

cd ../5-front
npm install

if ! docker-compose ps | grep -q "Up"; then
    sudo docker-compose up -d
fi

sudo docker exec -it testpostgres psql -U postgres -c "\i /bd/criar.sql"
sudo docker exec -it testpostgres psql -U postgres -c "\i /bd/insert.sql"
