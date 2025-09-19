<template>
    <div class="country-select" :class="[themeClass, { open: isOpen }]" ref="selectElement">
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
    },
    theme: {
        type: String,
        default: 'light',
        validator: (value) => ['light', 'dark'].includes(value),
    }
});

const emit = defineEmits(['update:modelValue']);

const paises = ref(countries);
const selectedCountry = ref(null);
const isOpen = ref(false);
const selectElement = ref(null);
const searchTerm = ref('');
const searchInput = ref(null);

const themeClass = computed(() => {
    return props.theme === 'dark' ? 'country-select--dark' : '';
});

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
    --cs-bg: #fff;
    --cs-text: #333;
    --cs-border: #ccc;
    --cs-border-focus: #007bff;
    --cs-placeholder: #888;
    --cs-dropdown-bg: #fff;
    --cs-dropdown-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    --cs-option-hover-bg: #f0f0f0;
    --cs-search-bg: #f9f9f9;
    --cs-search-border: #e0e0e0;
    --cs-arrow-color: #333;
    --cs-scrollbar-track-bg: #f1f1f1;
    --cs-scrollbar-thumb-bg: #888;
    --cs-scrollbar-thumb-hover-bg: #555;

    position: relative;
    width: 100%;
    font-family: sans-serif;
}

.country-select.country-select--dark {
    --cs-bg: #414141;
    --cs-text: #ececec;
    --cs-border: #646464;
    --cs-border-focus: #63b3ed;
    --cs-placeholder: #c6cfdb;
    --cs-dropdown-bg: #383838;
    --cs-dropdown-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    --cs-option-hover-bg: #4a5568;
    --cs-search-bg: #272727;
    --cs-search-border: #6b6b6b;
    --cs-arrow-color: #e2e8f0;
    --cs-scrollbar-track-bg: #444444;
    --cs-scrollbar-thumb-bg: #6e6e6e;
    --cs-scrollbar-thumb-hover-bg: #c5c5c5;
}

.country-select {
    position: relative;
    width: 100%;
    font-family: sans-serif;
    color: var(--cs-text);
    border-color: var(--cs-border);
}

.selected-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border: var(--cs-border);
    border-radius: 6px;
    cursor: pointer;
    background-color: var(--cs-bg);
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
    color: var(--cs-placeholder);
}

.arrow {
    border: solid var(--cs-arrow-color);
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
    background-color: var(--cs-dropdown-bg);
    border: 1px solid var(--cs-border);
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
    border-bottom: 1px solid var();
    background-color: var(--cs-bg);
}

.search-input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--cs-dropdown-bg);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 0.95rem;
    background-color: var(--cs-search-bg);
    color: var(--cs-text);
}

.search-input:focus {
    outline: none;
    border-color: var(--cs-border-focus);
}

.option {
    padding: 10px 12px;
    cursor: pointer;
}

.option:hover {
    background-color: var(--cs-option-hover-bg);
}

.no-results {
    padding: 10px 12px;
    color: #888;
    text-align: center;
}

.options-container::-webkit-scrollbar {
    width: 8px;
}

.options-container::-webkit-scrollbar-track {
    background: var(--cs-scrollbar-track-bg);
    border-radius: 0 5px 5px 0;
}

.options-container::-webkit-scrollbar-thumb {
    background: var(--cs-scrollbar-thumb-bg);
    border-radius: 4px;
}

.options-container::-webkit-scrollbar-thumb:hover {
    background: var(--cs-scrollbar-thumb-hover-bg);
}
</style>
