// Lista de imágenes y respuestas correctas
let elementoTiempo = document.getElementById("tiempo");
let preguntas = [
    { imagen: "./images/dietavegana.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietagourmet.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietavegetariana.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietaastronautas.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietajaponesa.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietamediterranea.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietadash.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietanordica.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietaatlantica.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietaflexitariana.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietagruposanguineo.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietaalcalina.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietaorina.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietahoroscopo.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietatenia.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietafastfood.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietadetox.png", respuestaCorrecta: "no" },
    { imagen: "./images/dietaplanetaria.png", respuestaCorrecta: "si" },
    { imagen: "./images/dieta5factores.png", respuestaCorrecta: "si" },
    { imagen: "./images/dietapina.png", respuestaCorrecta: "no" }
];

// Textos para mostrar sobre cada imagen
const textosPorImagen = {
    "./images/dietavegana.png": "DIETA VEGANA",
    "./images/dietagourmet.png": "DIETA GOURMET",
    "./images/dietavegetariana.png": "DIETA VEGETARIANA",
    "./images/dietaastronautas.png": "DIETA ASTRONAUTAS",
    "./images/dietajaponesa.png": "DIETA JAPONESA",
    "./images/dietamediterranea.png": "DIETA MEDITERRANEA",
    "./images/dietadash.png": "DIETA DASH",
    "./images/dietanordica.png": "DIETA NORDICA",
    "./images/dietaatlantica.png": "DIETA ATLANTICA",
    "./images/dietaflexitariana.png": "DIETA FLEXITARIANA",
    "./images/dietagruposanguineo.png": "DIETA DEL GRUPO SANGUINEO",
    "./images/dietaalcalina.png": "DIETA ALCALINA",
    "./images/dietaorina.png": "DIETA DE LA ORINA",
    "./images/dietahoroscopo.png": "DIETA DEL HOROSCOPO",
    "./images/dietatenia.png": "DIETA DE LA TENIA",
    "./images/dietafastfood.png": "DIETA FAST FOOD",
    "./images/dietadetox.png": "DIETA DETOX",
    "./images/dietaplanetaria.png": "DIETA PLANETARIA",
    "./images/dieta5factores.png": "DIETA DE LOS 5 FACTORES",
    "./images/dietapina.png": "DIETA DE LA PIÑA"
};

// Variables globales
let puntuacion = 0;
let indicePregunta = 0;
let tiempoRestante = 60; // Duración del juego en segundos
let intervalo; // Variable para el temporizador

// **FUNCION PARA INICIAR LA CUENTA ATRÁS**
function iniciarCuentaAtras() {
    if (!elementoTiempo) {
        console.error("No se encontró el elemento #tiempo en el DOM.");
        return;
    }

    elementoTiempo.innerText = `${tiempoRestante}`;

    // **Asegurar que no haya múltiples temporizadores activos**
    clearInterval(intervalo);

    // **Iniciar la cuenta atrás**
    intervalo = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            elementoTiempo.innerText = `${tiempoRestante}`;
            console.log(`Tiempo: ${tiempoRestante}s`); // Debug para verificar que funciona
        } else {
            clearInterval(intervalo);
            finalizarJuego();
        }
    }, 1000);
}

// **FUNCION PARA ACTUALIZAR LA PREGUNTA**
function actualizarPregunta() {
    let imagenElement = document.getElementById("imagen");
    let textoSobreImagen = document.getElementById("texto-sobre-imagen");

    if (indicePregunta < preguntas.length) {
        imagenElement.src = preguntas[indicePregunta].imagen;
        // Cambia el texto según la imagen
        if (textoSobreImagen) {
            textoSobreImagen.textContent = textosPorImagen[preguntas[indicePregunta].imagen] || "";
        }
    } else {
        finalizarJuego();
    }
}

function respuestaUsuario(respuesta) {
    if (indicePregunta < preguntas.length) {
        if (respuesta === preguntas[indicePregunta].respuestaCorrecta) {
            puntuacion++;
            localStorage.setItem("puntuacion", puntuacion);
        }

        indicePregunta++;
        localStorage.setItem("indicePregunta", indicePregunta);
        actualizarPregunta();

        // El temporizador NO se reinicia aquí
        // clearInterval(intervalo);
        // tiempoRestante = 60;
        // iniciarCuentaAtras();
    }
}

function finalizarJuego() {
    let elementoTiempo = document.getElementById("tiempo");

    if (tiempoRestante === 0) { 
        // **Si el tiempo se agotó, establecer puntuación 0 y marcar como tiempo agotado**
        puntuacion = 0;
        localStorage.setItem("puntuacion", puntuacion);
        localStorage.setItem("porcentajeFinal", "0");
        localStorage.setItem("tiempoAgotado", "true");
        window.location.href = "resultado.html";
    } else {
        // **Si el juego terminó porque se respondieron todas las preguntas, ir a resultado.html**
        let porcentajeFinal = Math.round((puntuacion / preguntas.length) * 100); // Sin decimales
        localStorage.setItem("porcentajeFinal", porcentajeFinal);
        localStorage.removeItem("tiempoAgotado"); // Asegurar que no esté marcado como tiempo agotado
        window.location.href = "resultado.html";
    }
}

// **INICIAR EL JUEGO Y LA CUENTA ATRÁS CUANDO SE CARGUE EL DOM**
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página del juego lista, iniciando cuenta atrás...");

    localStorage.removeItem("puntuacion");
    localStorage.removeItem("indicePregunta");

    puntuacion = 0;
    indicePregunta = 0;

    actualizarPregunta();
    setTimeout(() => { iniciarCuentaAtras(); }, 500); 
});