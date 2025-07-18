# Pokédex Profesional

Buscador de Pokémon desarrollado con **Next.js**, **TypeScript**, **Material UI** y **Jest**.  
Permite buscar Pokémon por nombre, filtrar por tipo, ver detalles, y cuenta con música de fondo.

---

## 📋 Descripción

Esta aplicación muestra los primeros 151 Pokémon con sus imágenes, tipos, habilidades y estadísticas.  
Incluye búsqueda por nombre, filtro por tipo, detalles con modal, música de fondo y tests automáticos con Jest.

---

## 🛠 Tecnologías usadas

- [Next.js](https://nextjs.org/) (Framework de React)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/) (Componentes de interfaz)
- [Axios](https://axios-http.com/) (Llamadas HTTP)
- [Jest](https://jestjs.io/) (Testing)
- API pública de [PokéAPI](https://pokeapi.co/)

---

## 🚀 Funcionalidades

- 🔍 Buscar Pokémon por nombre.
- 🎯 Filtrar Pokémon por tipo.
- 📋 Ver detalles: tipos, habilidades y estadísticas.
- 📊 Estadísticas visuales con barras.
- 🔊 Reproductor de música de fondo con control.
- 📱 Responsive y accesible.
- 🧪 Tests automatizados con Jest.

---

## 📁 Estructura del proyecto

- `/app/page.tsx`: Página principal con lógica de filtrado.
- `/components/PokemonCard.tsx`: Card individual con modal de detalle.
- `/poke/getPokemons.ts`: Función para obtener listado con tipos.
- `/poke/getPokemonDetail.ts`: Función para obtener detalles por ID.
- `/styles/global.css`: Estilos globales con fondo y overlay.
- `/__tests__/`: Carpeta con tests unitarios.

---

## ⚙️ Instalación y ejecución local

```bash
# Clonar repositorio
git clone <url-del-repo>

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
