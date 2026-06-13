# 🖥️ Simulador de Algoritmos de Reemplazo de Páginas

Un simulador interactivo y visual desarrollado para ilustrar la gestión de memoria en Sistemas Operativos. Esta herramienta permite ingresar una secuencia de referencia de páginas web y visualizar, paso a paso, cómo los diferentes algoritmos asignan los marcos de memoria, calculando automáticamente los aciertos (hits) y los fallos de página (page faults).

## 🎓 Contexto Académico

- **Universidad:** Universidad Nacional Mayor de San Marcos (UNMSM)
- **Facultad:** Ingeniería de Sistemas e Informática
- **Ciclo:** V Ciclo
- **Curso:** Sistemas Operativos
- **Equipo:** Grupo 3
  - Luis Mario Saldaña Sánchez (24200038)
  - Sebastian Emanuel Quezada Pairazaman (24200030)
  - Ariana Milagros Cardenas Huaman (24200093)

## ✨ Características Principales

- **Interfaz Minimalista (Glassmorphism):** Diseño moderno, oscuro y formal enfocado en la legibilidad de los datos.
- **Simulación Paso a Paso:** Tabla dinámica que muestra la evolución del contenido de la memoria (marcos) en cada instante de tiempo $(t)$.
- **Algoritmos Implementados:**
  - **FIFO (First-In, First-Out):** Representación visual mediante una estructura de cola con desplazamiento vertical.
  - **Algoritmo de Reloj / LRU:** Implementación gráfica donde las páginas referenciadas (aciertos) se priorizan ascendiendo al marco superior, empujando a las menos usadas hacia el fondo para su eventual reemplazo.
- **Configuración Dinámica:**
  - Soporte para secuencias de referencia de longitud variable.
  - Selección de cantidad de marcos de memoria (3 a 6 marcos).
- **Cálculo en Tiempo Real:** Contabilización automática de la tasa de aciertos y la cantidad total de fallos de página.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando herramientas modernas de desarrollo frontend:

- **React (v18):** Librería principal para la construcción de la interfaz de usuario mediante componentes funcionales y manejo de estados.
- **Vite:** Herramienta de _build_ y servidor de desarrollo local extremadamente rápido.
- **Tailwind CSS (v4):** Framework de CSS _utility-first_ utilizado para el diseño responsivo, las animaciones y el efecto _glassmorphism_ sin necesidad de escribir CSS tradicional.
- **JavaScript (ES6+):** Lógica pura para el procesamiento de los arreglos y la matemática de los algoritmos de reemplazo.

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU-USUARIO/simulador-memoria-so.git](https://github.com/TU-USUARIO/simulador-memoria-so.git)
   cd simulador-memoria-so
   ```
