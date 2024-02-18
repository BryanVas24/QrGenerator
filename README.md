
Este proyecto se realizó utilizando React con Vite, Node.js y hojas de estilo en cascada (CSS).

En el backend, se utilizaron diversos paquetes de npm en el proyecto. Se utilizó uno para la
creación del código QR, además de CORS para permitir la comunicación entre el frontend y el backend. 
Se utilizo body-parser  para poder leer JSON y Express  . Además, se implementó un built-in (fs) 
para la creación de una carpeta estática que fue configurada para servir imágenes en el frontend.

En el frontend, se utilizaron hojas de estilo en cascada, hooks y componentes. El frontend toma una 
URL de un input y la envía en formato JSON mediante una solicitud POST utilizando fetch. Además de 
mostrar el código QR generado, el frontend permite realizar la descarga de un PDF con el código generado.
