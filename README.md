#


docker build -t appchat .

docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=AzureDiamond -e MONGO_INITDB_ROOT_PASSWORD=hunter2 -e MONGO_INITDB_DATABASE=simple-chat mongo

## Network
docker run --name mongodb -d --network chatapp -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=AzureDiamond -e MONGO_INITDB_ROOT_PASSWORD=hunter2 -e MONGO_INITDB_DATABASE=simple-chat mongo

docker network ls
docker network create --driver bridge chatapp

docker-compose up