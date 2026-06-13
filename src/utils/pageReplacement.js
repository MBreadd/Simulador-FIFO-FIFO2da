// Algoritmo FIFO (Representación en Pila/Desplazamiento)
export function simulateFIFO(sequence, framesCount) {
  // Inicializamos los marcos vacíos
  let frames = Array(framesCount).fill(null);
  let steps = [];

  sequence.forEach((page) => {
    let isFault = false;

    // Si la página no está en memoria, es un fallo
    if (!frames.includes(page)) {
      isFault = true;
      
      // 1. Insertamos la nueva página en el Marco Menor (índice 0 / arriba)
      frames.unshift(page);
      
      // 2. Eliminamos la página que se cae por el fondo para mantener el límite de marcos
      frames.pop();
    }

    steps.push({
      page,
      isFault,
      frames: [...frames]
    });
  });

  return steps;
}


// Algoritmo Solicitado (Aciertos se suben al marco menor / Comportamiento LRU)
export function simulateSecondChance(sequence, framesCount) {
  let frames = Array(framesCount).fill(null);
  let steps = [];

  sequence.forEach((page) => {
    let isFault = false;
    let index = frames.indexOf(page);

    if (index !== -1) {
      // ACIERTO (HIT): La página ya está en memoria
      // 1. La sacamos de su posición actual
      frames.splice(index, 1);
      
      // 2. La subimos hasta el marco menor (índice 0 / arriba)
      frames.unshift(page);
      
      // 3. Mantenemos el tamaño del arreglo añadiendo null al final si es necesario
      while(frames.length < framesCount) {
        frames.push(null);
      }
      
    } else {
      // FALLO (FAULT): La página no está
      isFault = true;
      
      // Entra directamente por el marco menor (arriba)
      frames.unshift(page);
      
      // Expulsa a la más antigua (la que quedó hasta abajo)
      frames.pop();
    }

    steps.push({
      page,
      isFault,
      frames: [...frames]
    });
  });

  return steps;
}