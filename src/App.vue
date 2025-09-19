<script setup>
import { ref } from 'vue';
import CountrySelect from './components/CountrySelect.vue';

const selectedCountry = ref(''); 
</script>

<template>

  <div id="app-container">
    <CountrySelect v-model="selectedCountry" placeholder="Elige un país de origen" theme="dark" />

  </div>
</template>

<style>
body {
  font-family: sans-serif;
  background-color: #ffffff;
  color: #333;
}

#app-container {
  width: 50vw;
  margin: 50px auto;
  padding: 2rem;
  border-radius: 8px;
}

.result {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #eef7ff;
  border-left: 4px solid #007bff;
}
</style>
