# trongleposting

Trongleposting is websocket chat.

Built to show off the power of Docker in a presentation!

## Building

```
cp .env.example .env
sudo docker-compose up --build
```

## Migrating

Find the backend docker container id and run `sequelize-cli db:migrate`:

```bash
$ sudo docker ps
CONTAINER ID   IMAGE               COMMAND                  CREATED          STATUS          PORTS                                       NAMES
b2c38fe1ae8b   sochat_nginx        "/docker-entrypoint.…"   29 seconds ago   Up 28 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp           sochat_nginx_1
4a500eed3528   sochat_backend      "docker-entrypoint.s…"   38 seconds ago   Up 34 seconds   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp   backend
71fe86e5b215   sochat_ssh-client   "/usr/sbin/sshd -D -e"   40 seconds ago   Up 37 seconds   0.0.0.0:2222->22/tcp, :::2222->22/tcp       sochat_ssh-client_1
671e3585edce   sochat_frontend     "docker-entrypoint.s…"   40 seconds ago   Up 29 seconds   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   sochat_frontend_1
a5606fe14f05   postgres:13         "docker-entrypoint.s…"   40 seconds ago   Up 37 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   db
$ sudo docker exec -it 4a500eed3528 sequelize-cli db:migrate
```
