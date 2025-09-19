<template>
    <div class="country-select" ref="selectElement">
        <div class="selected-option" @click="toggleDropdown">
            <div v-if="selectedCountry" class="option-content">
                <img :src="selectedCountry.flagUrl" :alt="'Bandera de ' + selectedCountry.label" class="flag-icon"
                    @error="onImageError" />
                <span class="option-label">{{ selectedCountry.value + ' - ' + selectedCountry.label }}</span>
            </div>
            <div v-else class="placeholder">
                {{ placeholder }}
            </div>
            <span class="arrow" :class="{ open: isOpen }"></span>
        </div>
        <div v-if="isOpen" class="options-container">
            <div class="search-box">
                <input ref="searchInput" type="text" v-model="searchTerm" placeholder="Buscar país..."
                    class="search-input" @click.stop />
            </div>
            <div v-for="pais in filteredCountries" :key="pais.value" class="option" @click="selectOption(pais)">
                <div class="option-content">
                    <img :src="pais.flagUrl" :alt="'Bandera de ' + pais.label" class="flag-icon"
                        @error="onImageError" />
                    <span class="option-label">{{ pais.value + ' - ' + pais.label }}</span>
                </div>
            </div>
            <div v-if="filteredCountries.length === 0" class="no-results">
                No se encontraron resultados
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { countries } from '../data/countries.js';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Seleccione un país'
    }
});

const emit = defineEmits(['update:modelValue']);

const paises = ref(countries);
const selectedCountry = ref(null);
const isOpen = ref(false);
const selectElement = ref(null);
const searchTerm = ref('');
const searchInput = ref(null);

const onImageError = (event) => {
    console.error("Error al cargar la imagen de la bandera:", event.target.src);
    event.target.style.visibility = 'hidden';
};

const filteredCountries = computed(() => {
    if (!searchTerm.value) {
        return paises.value;
    }
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    return paises.value.filter(pais =>
        pais.label.toLowerCase().includes(lowerCaseSearch)
    );
});

watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        selectedCountry.value = paises.value.find(p => p.value === newValue) || null;
    } else {
        selectedCountry.value = null;
    }
}, { immediate: true });

const toggleDropdown = async () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        searchTerm.value = '';
        await nextTick();
        if (searchInput.value) {
            searchInput.value.focus();
        }
    }
};

const selectOption = (pais) => {
    selectedCountry.value = pais;
    emit('update:modelValue', pais.value);
    isOpen.value = false;
};

const handleClickOutside = (event) => {
    if (selectElement.value && !selectElement.value.contains(event.target)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.country-select {
    position: relative;
    width: 100%;
    font-family: sans-serif;
    color: #333;
}

.selected-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    background-color: #fff;
}

.option-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.flag-icon {
    width: 24px;
    height: 18px;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    object-fit: cover;
    background-color: #f0f0f0;
}

.option-label {
    font-size: 1rem;
}

.placeholder {
    color: #888;
}

.arrow {
    border: solid #555;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
}

.arrow.open {
    transform: rotate(-135deg);
}

.options-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 6px 6px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.search-box {
    padding: 8px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
}

.search-input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 0.95rem;
}

.option {
    padding: 10px 12px;
    cursor: pointer;
}

.option:hover {
    background-color: #f0f0f0;
}

.no-results {
    padding: 10px 12px;
    color: #888;
    text-align: center;
}
</style>
