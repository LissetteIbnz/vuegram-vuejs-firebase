# VUEGRAM

Un proyecto construido sobre Vue, Typescript y Firebase.

## Construir el proyecto

### Paso 1: inicializa tu proyecto con Vue CLI

Hemos iniciado el proyecto mediante `vue-cli` con la plantilla *webpack*.
El comando ejecutado ha sido `vue init webpack vue-app-vuegram` con la configuración por defecto, incluyendo `vue-router` y como gestor de paquetes `NPM`.

### Paso 2: instalar dependencias

Primero, instale Vuex. Esto será importante para la administración estatal.

`npm i vuex`

Luego instale sass-loaders; ellos manejarán el transpiling de SCSS para este proyecto.

`npm i node-sass sass-loader --save-dev`

Ahora instalaremos las dependencias de Typescript necesarias.

`npm i -D typescript@2 ts-loader@3`

Ahora tendremos que crear en el raíz de nuestra aplicación el archivo de configuración para Typescript. Este archivo tendrá el siguiente formato:

```json
{
  "compilerOptions": {
    "outDir": "./wwwroot/dist/",
    "sourceMap": true,
    "strict": true,
    "declaration": false,
    "noImplicitReturns": true,
    "noImplicitAny": false,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es6",
    "suppressImplicitAnyIndexErrors": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}

```

### Paso 3: ejecuta el proyecto inicial

`npm run dev`

Abra un navegador y vaya a http://localhost:8080/. Agregue la extensión Vue Devtools a su navegador si aún no lo ha hecho.

### Paso 4: elimine los archivos de inicio y limpia el proyecto

Elimine los archivos de inicio, aunque asegúrese de mantener la carpeta de componentes (src/components). Limpie el archivo App.vue eliminando la imagen y el estilo del logotipo de Vue.js. Su código limpio debería verse así:

```js
<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {

    }
</script>
```