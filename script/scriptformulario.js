document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const btn = document.getElementById('comenzarBtn');

    // Habilita el botón solo si el formulario es válido
    form.addEventListener('input', function() {
        btn.disabled = !form.checkValidity();
    });

    // Guarda los datos en localStorage al enviar el formulario
    form.addEventListener('submit', function(e) {
        // Guarda los datos solo si el formulario es válido
        if (form.checkValidity()) {
            localStorage.setItem('edad', document.getElementById('edad').value);
            localStorage.setItem('sexo', document.querySelector('input[name="sexo"]:checked').value);
            localStorage.setItem('altura', document.getElementById('altura').value);
            localStorage.setItem('peso', document.getElementById('peso').value);
            localStorage.setItem('ocupacion', document.querySelector('input[name="ocupacion"]:checked').value);
            // El formulario se enviará normalmente a juego.html
        } else {
            e.preventDefault();
        }
    });
});