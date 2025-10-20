# Grupo 14 (InforMatías++)

Este es el repositorio del Grupo 14, cuyos integrantes son:

-  Matías García Silva - 202373599-k - paralelo 200
-  Matías Vicente Rojas Nahuelcura - 202373617-1 - paralelo 200
-  Martín Alonso Grandon Coronado - 202373588-4 - paralelo 201
-  Felipe Santiago Parra Díaz - 202373568-k - paralelo 200
-  **Tutor**: Benjamín Daza
-  **Profesor**: Ricardo Salas - paralelo 200
-  **Profesora**: Luz Chourio - paralelo 201

## Wiki

Puede acceder a la Wiki mediante el siguiente [enlace](https://github.com/ShadierPrune/GRUPO14-2025-PROYINF/wiki)

## Videos

* [Video presentación cliente](https://aula.usm.cl/pluginfile.php/7621199/mod_resource/content/2/video1352931478.mp4)

Se podrá acceder al video del cliente suponiendo que tiene su cuenta de la USM iniciada, pues está dentro de AULA
* [Video Hito 3](https://drive.google.com/file/d/1kEOuHAIVFrE400mrRyK2SCqOSBCsE3Sf/view?usp=sharing)


## Aspectos técnicos relevantes

_Todo aspecto relevante cuando para poder usar el proyecto o consideraciones del proyecto base a ser entregado_


# Aplicación Node.js con Docker y PostgreSQL

Este es un ejemplo de una aplicación Node.js usando Express, Docker y PostgreSQL. Incluye configuración para desarrollo y producción.

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Node.js](https://nodejs.org/) (opcional, solo para desarrollo local)
- `curl` o cliente HTTP (para probar endpoints)

## Instalación

### 1. Clonar el repositorio
git clone https://github.com/ShadierPrune/GRUPO14-2025-PROYINF.git
(debe tener docker-desktop abierto en todo momento)
Ejecutar en terminal:

1. Deben navegar hasta la carpeta del repositorio

2. (les instalará las dependencias se suele demorar un poco la primera vez con esto levantan el proyecto)  
docker compose up --build

(para detener los contenedores)  
docker compose down -v

si no les ejecuta asegurense de estar en la carpeta correcta  
si trabajan desde windows deben tener instalado WSL2 y tenerlo activado en docker desktop  
esto se puede verificar en  
Configuración   
-Resources  
  -Configure which WSL 2 distros you want to access Docker from. (esto debe estar activo)  
  -Enable integration with additional distros:(esto debe estar activo)  

# Comandos útiles 

Pueden levantar el proyecto sin volver a construir las imágenes con el siguiente comando:
  - docker compose up
Si quieren levantar el proyecto en segundo plano pueden usar:
  - docker compose up -d
Para ver el estado de los servicios que están corriendo:
  - docker compose ps
Para ver los logs en tiempo real de todos los servicios:
  - docker compose logs -f
O de un servicio específico:
  - docker compose logs -f nombre_servicio
Para reiniciar un servicio específico:
  - docker compose restart nombre_servicio
Para detener todos los contenedores sin eliminar volúmenes:
  - docker compose down



