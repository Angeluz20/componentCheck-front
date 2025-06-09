FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build da sua máquina para dentro do container
COPY build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
