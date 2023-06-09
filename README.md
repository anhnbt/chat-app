# Hướng dẫn run với Docker

## Cách 1: run từ Dockerfile
### Tạo Image

```
docker build -t chat-app .
```

### Docker Network
Kiểm tra network:
```
docker network ls
```

Nếu chưa có thì tạo network:

```
docker network create --driver bridge chat-app
```

### Run image

```
docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_DATABASE=chat-app mongo
```


## Cách 2: run Docker Compose
docker-compose up

## Cau hinh cors

npm i cors
