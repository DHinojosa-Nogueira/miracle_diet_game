document.addEventListener("DOMContentLoaded", () => {
    let porcentajeFinal = localStorage.getItem("porcentajeFinal") || "0";
    let canvas = document.getElementById("resultadoCanvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = "./images/porcentaje.png"; // Imagen de fondo

    // --- Google Form config ---
    const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSf1ljfbgAeKRc6Be7dH8QI4EpwPdStVGri_67ksa9EH5fjOPQ/formResponse";
    const ENTRY_IDS = {
        edad: "entry.55287229",
        sexo: "entry.559264993",
        altura: "entry.965160659",
        peso: "entry.264947172",
        ocupacion: "entry.2020182973",
        puntuacion: "entry.135680467"
    };

    function enviarGoogleFormResultado(puntuacion, callback) {
        const formData = JSON.parse(localStorage.getItem("formData") || "{}");
        const data = new FormData();
        data.append(ENTRY_IDS.edad, formData.edad || "");
        data.append(ENTRY_IDS.sexo, formData.sexo || "");
        data.append(ENTRY_IDS.altura, formData.altura || "");
        data.append(ENTRY_IDS.peso, formData.peso || "");
        data.append(ENTRY_IDS.ocupacion, formData.ocupacion || "");
        data.append(ENTRY_IDS.puntuacion, puntuacion);

        fetch(GOOGLE_FORM_ACTION, {
            method: "POST",
            mode: "no-cors",
            body: data
        }).finally(() => {
            // Espera un poco para asegurar el envío antes de redirigir
            setTimeout(callback, 500);
        });
    }

    function resizeCanvasAndDraw() {
        // Solo redimensiona si la imagen está cargada correctamente
        if (!img.naturalWidth || !img.naturalHeight) return;

        // Usa el ancho CSS actual y calcula el alto real según la imagen
        const width = canvas.clientWidth;
        const height = width * (img.naturalHeight / img.naturalWidth);

        // Ajusta el tamaño real del canvas
        canvas.width = width;
        canvas.height = height;

        // Dibuja la imagen de fondo ajustada
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Estilizar el texto del porcentaje
        ctx.font = `${Math.floor(height * 0.10)}px Arial`; 
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Posicionar el porcentaje sobre la imagen
        ctx.fillText(`${porcentajeFinal}%`, width / 2, height * 0.78);
    }

    img.onload = function() {
        resizeCanvasAndDraw();
    };

    window.addEventListener('resize', () => {
        if (img.complete) resizeCanvasAndDraw();
    });    // Evento para enviar datos y redirigir según el porcentaje
    canvas.addEventListener("click", () => {
        let porcentajeNum = parseFloat(porcentajeFinal);
        let tiempoAgotado = localStorage.getItem("tiempoAgotado") === "true";

        // Envía los datos al Google Form y luego redirige
        enviarGoogleFormResultado(porcentajeFinal, () => {
            if (tiempoAgotado) {
                // Si se agotó el tiempo, ir a sintiempo.html
                localStorage.removeItem("tiempoAgotado"); // Limpiar el flag
                window.location.href = "sintiempo.html";
            } else if (porcentajeNum >= 50) {
                window.location.href = "ganar.html";
            } else {
                window.location.href = "perder.html";
            }
        });
    });
});