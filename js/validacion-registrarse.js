document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const boton = document.querySelector('button[type="submit"]');
    const mensajeError = document.getElementById("warnings");

    // -------------------------------
    // ESTADOS DEL BOTÓN
    // -------------------------------
    function habilitarBoton() {
        boton.disabled = false;
        boton.style.opacity = "1";
        boton.style.cursor = "pointer";
    }

    function deshabilitarBoton() {
        boton.disabled = true;
        boton.style.opacity = "0.5";
        boton.style.cursor = "not-allowed";
    }

    // Deshabilitar botón al inicio
    deshabilitarBoton();

    // -------------------------------
    // VALIDACIONES
    // -------------------------------
    function validarEmail(email) {
        const patron = /^[^@]+@[^@]+\.(com|org|net)$/i;
        return patron.test(email);
    }

    function validarPassword(password) {
        const patron =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
        return patron.test(password);
    }

    // -------------------------------
    // VERIFICAR CAMPOS
    // -------------------------------
    function verificarCampos() {
        const emailValido = validarEmail(emailInput.value.trim());
        const passValida = validarPassword(passwordInput.value.trim());

        // Limpiar mensajes al escribir
        mensajeError.innerHTML = "";

        // Borde email
        emailInput.style.borderColor =
            emailInput.value === ""
                ? ""
                : emailValido
                    ? "#ff007f"
                    : "red";

        // Borde contraseña
        passwordInput.style.borderColor =
            passwordInput.value === ""
                ? ""
                : passValida
                    ? "#ff007f"
                    : "red";

        // Habilitar o deshabilitar el botón
        if (emailValido && passValida) {
            habilitarBoton();
        } else {
            deshabilitarBoton();
        }
    }

    // -------------------------------
    // GUARDAR REGISTRO (LocalStorage)
    // -------------------------------
    function guardarRegistro(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const existe = usuarios.some((u) => u.email === email);

        if (existe) {
            mensajeError.innerHTML =
                "El usuario ya está registrado. Por favor, inicie sesión.<br>";
            return;
        }

        // Guardar nuevo usuario
        usuarios.push({ email, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        window.location.href = "login.html";
    }

    // -------------------------------
    // EVENTOS
    // -------------------------------
    emailInput.addEventListener("input", verificarCampos);
    passwordInput.addEventListener("input", verificarCampos);
    boton.addEventListener("click", guardarRegistro);
});
