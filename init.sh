# #!/bin/bash

# # Abrir o primeiro terminal e executar npm start no diretório 4-G
# gnome-terminal -- bash -c "cd 4-G && node main.js; exec bash" &
# pid1=$!  # Armazena o PID do primeiro terminal

# # Abrir o segundo terminal e executar npm start no diretório 5-front
# gnome-terminal -- bash -c "cd 5-front && npm start; exec bash" &
# pid2=$!  # Armazena o PID do segundo terminal

# # Abrir o terceiro terminal e executar npm start no diretório 1-erp
# gnome-terminal -- bash -c "cd 1-erp && node index.js; exec bash" &
# pid3=$!  # Armazena o PID do terceiro terminal

# # Mensagem para o terminal principal
# echo "Aperte Enter para encerrar os terminais..."
# read  # Aguarda o usuário pressionar Enter

# # Envia o sinal SIGINT (Ctrl+C) para os processos dos terminais
# kill -2 $pid1  # Envia o sinal SIGINT para o primeiro processo
# kill -2 $pid2  # Envia o sinal SIGINT para o segundo processo
# kill -2 $pid3  # Envia o sinal SIGINT para o terceiro processo

# echo "Terminais encerrados!"

#!/bin/bash

# Abrir o primeiro terminal e executar npm start no diretório 4-G
gnome-terminal -- bash -c "cd 4-G && node main.js; exec bash" &
pid1=$!  # Armazena o PID do primeiro terminal

# Abrir o segundo terminal e executar npm start no diretório 5-front
gnome-terminal -- bash -c "cd 5-front && npm start; exec bash" &
pid2=$!  # Armazena o PID do segundo terminal

# Abrir o terceiro terminal e executar npm start no diretório 1-erp
gnome-terminal -- bash -c "cd 1-erp && node index.js; exec bash" &
pid3=$!  # Armazena o PID do terceiro terminal

# Mensagem para o terminal principal
echo "Aperte Enter para encerrar os terminais..."
read  # Aguarda o usuário pressionar Enter

# Aguarda para garantir que os processos ainda estão rodando
sleep 1  # Pausa de 1 segundo

# Verifica se o processo existe antes de tentar matá-lo
if ps -p $pid1 > /dev/null; then
  kill -2 $pid1  # Envia o sinal SIGINT para o primeiro processo
  echo "Enviou SIGINT para o PID $pid1"
else
  echo "Processo $pid1 já foi encerrado."
fi

if ps -p $pid2 > /dev/null; then
  kill -2 $pid2  # Envia o sinal SIGINT para o segundo processo
  echo "Enviou SIGINT para o PID $pid2"
else
  echo "Processo $pid2 já foi encerrado."
fi

if ps -p $pid3 > /dev/null; then
  kill -2 $pid3  # Envia o sinal SIGINT para o terceiro processo
  echo "Enviou SIGINT para o PID $pid3"
else
  echo "Processo $pid3 já foi encerrado."
fi

echo "Terminais encerrados!"
