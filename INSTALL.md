# CATALOGO DE SOFTWARE LIBRE

## Instalación de dependencias

**GIT**

> $ sudo apt-get install git

Para verificar la instalación: $ git --version

**CURL**

> $ sudo apt-get install curl

Para verificar la instalación: $ curl --version

**NODE mediante NVM**

> $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
>
> $ source ~/.bashrc
>
> Para verificar la instalación: nvm --version
>
> $ nvm install v8.11.2
>
> $ nvm use v8.11.2

Comprobar instalación: node -v

**ANGULAR CLI**

> $ npm install -g @angular/cli@1.7

Para verificar la instalación: $ ng --version

## Clonar el repositorio

Clonar el proyecto desde GitLab

> $ git clone https://gitlab.geo.gob.bo/psanchez/hub-software-frontend

Ingresar al directorio del proyecto clonado hub-software-frontend

> $ cd hub-software-frontend

## Configuracion del Proyecto

Ingresar al directorio config

> $ cd src/environments

Renombrar el archivo environment.sample.js a environment.js y environment.prod.sample.js a environment.prod.sample.js

> $ mv environment.sample.js environment.js

> $ mv environment.prod.sample.js environment.prod.js

Configuracion en desarrollo

> $ nano environment.js

Configuracion en produccion

> $ nano environment.prod.js

## Instalación en Desarrollo

Instalar las dependencias

> $ npm install

Iniciar aplicacion del frontend

> $ ng serve

Iniciar el proyecto

> $ cd ..

> $ node index.js

## Instalación en Produccion

Instalar las dependencias del proyecto

> $ npm install

Configuracion del frontend

> $ nano src/environments/environment.prod.ts

Compilar el proyecto

> $ npm install

> $ ng build --bh /softwarelibre/ --prod

La compilación creará la carpeta dist, lista para su publicación.

> $ cd ..

> $ mv dist softwarelibre/

_Configurar en NGINX_

```json
server {
	listen 80 default_server;
	server_name  test.adsib.gob.bo;
	root /home/[usuario]/hub-software-frontend;

	server_name _;

	location /softwarelibre/ {
            try_files $uri$args $uri$args/ $uri $uri/ /softwarelibre/index.html =4$
    }
}
```
