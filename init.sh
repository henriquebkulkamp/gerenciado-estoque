#!/bin/bash

if ! docker-compose ps | grep -q "Up"; then
    # echo "Containers não estão rodando. Iniciando os containers..."
    # docker-compose up -d
    echo "tem que subir o compose e rodar o criar.sql e insert.sql"
    exit 1

else
    echo "Os containers já estão em execução."
fi


# Abrir o primeiro terminal e executar npm start no diretório 4-G
gnome-terminal -- bash -c "cd 4-G && node main.js; exec bash" &
pid1=$!  # Armazena o PID do primeiro terminal

# Abrir o segundo terminal e executar npm start no diretório 5-front
gnome-terminal -- bash -c "cd 5-front && npm start; exec bash" &
pid2=$!  # Armazena o PID do segundo terminal

# Abrir o terceiro terminal e executar npm start no diretório 1-erp
gnome-terminal -- bash -c "cd 1-erp && node index.js; exec bash" &
pid3=$!  # Armazena o PID do terceiro terminal