# Vue Country Flag Selector

![Demostración del componente](https://raw.githubusercontent.com/camilaarce/vue-country-flag-selector/main/assets/demo.gif)

Un componente de **Vue 3**, simple y personalizable, para seleccionar un país de una lista completa, mostrando su respectiva bandera y con funcionalidad de búsqueda integrada.

---

## ✨ Características

- 🌍 **Lista completa de países**: Incluye todos los países del mundo.  
- 🚩 **Banderas en SVG**: Imágenes de alta calidad que se adaptan a cualquier tamaño.  
- 🔍 **Buscador integrado**: Filtra la lista de países escribiendo en un campo de búsqueda.  
- 🎨 **Totalmente personalizable**: Estilos `scoped` para adaptarse fácilmente al diseño de tu proyecto.  
- 🔄 **Soporte para `v-model`**: Se integra con el sistema de reactividad de Vue.  
- ⚡ **Cero dependencias**: Componente ligero, sin añadir librerías extra.  

---

## 📦 Instalación

Instala el paquete en tu proyecto usando **npm**:

```bash
npm install @camila-arce/vue-country-flag-selector
```

🚀 Uso

Ejemplo básico de cómo importar y usar el componente en tu aplicación Vue 3:

```bash
<script setup>
import { ref } from 'vue';
// 1. Importa el componente y sus estilos
import { CountrySelect } from '@camila-arce/vue-country-flag-selector';
import '@camila-arce/vue-country-flag-selector/style.css';

const selectedCountry = ref(''); // Por ejemplo, 'AR' para Argentina
</script>

<template>
  <div>
    <h1>Selector de País</h1>
    <CountrySelect
      v-model="selectedCountry"
      placeholder="Elige tu país de origen"
      theme="light" // 'light' or 'dark'
    />
    <p v-if="selectedCountry">
      País seleccionado (código): <strong>{{ selectedCountry }}</strong>
    </p>
  </div>
</template>

<style>
/* Puedes añadir estilos globales para el contenedor si lo deseas */
#app {
  max-width: 400px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
</style>
```

## ⚙️ Props

| Prop          | Tipo   | Por defecto           | Descripción                                                                 |
|---------------|--------|-----------------------|-----------------------------------------------------------------------------|
| `modelValue`  | String | `''`                  | Valor del país seleccionado (código de 2 letras, ej: `AR`). Usar con `v-model`. |
| `placeholder` | String | `Seleccione un país`  | Texto mostrado cuando no hay país seleccionado.                             |
|    `theme`    | String | `light`  | Tema del componente ('light' o 'dark').                                       |
# vue-country-flag-selector
