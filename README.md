# Next.js Teslo Shop App

Para correr localmente, se necesita la base de datos

```

docker-compose up -d
```

- El -d, significa **detached**

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Reconstruir los módulos de node

```
yarn install
o
npm i
```

## LLenar la base de datos con información de pruebas

llamar a :

```
http://localhost:300/api/seed
```
