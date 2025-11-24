document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const boton = document.querySelector('button[type="submit"]');
  const mensajeError = document.getElementById('warnings');

  // Deshabilitar botón al inicio
  deshabilitarBoton();

  // -------------------------------
  // VALIDACIONES
  // -------------------------------

  // Validar email: formato válido y terminación .com, .org, .net
  function validarEmail(email) {
    const patron = /^[^@]+@[^@]+\.(com|org|net)$/i;
    return patron.test(email);
  }

  // Validar contraseña: 8–12 caracteres, mayúscula, minúscula, número y #?!%$
  function validarPassword(password) {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
    return patron.test(password);
  }

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

  // -------------------------------
  // CAMBIO DE BORDES + HABILITAR / DESHABILITAR
  // -------------------------------

  function verificarCampos() {
    const emailValido = validarEmail(emailInput.value.trim());
    const passValida = validarPassword(passwordInput.value.trim());

    // Limpiar mensajes de error al escribir
    mensajeError.innerHTML = "";

    // Borde email
    if (emailInput.value === "") {
      emailInput.style.borderColor = "";
    } else {
      emailInput.style.borderColor = emailValido ? "#ff007f" : "red";
    }

    // Borde password
    if (passwordInput.value === "") {
      passwordInput.style.borderColor = "";
    } else {
      passwordInput.style.borderColor = passValida ? "#ff007f" : "red";
    }

    // Habilitar botón si todo está correcto
    if (emailValido && passValida) {
      habilitarBoton();
    } else {
      deshabilitarBoton();
    }
  }

  // -------------------------------
  // INICIO DE SESIÓN
  // -------------------------------

  function iniciarSesion(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      mensajeError.innerHTML = "Email o contraseña incorrectos";
      return;
    }

    // Sesión correcta
    window.location.href = "../index.html";
  }

  // -------------------------------
  // EVENTOS
  // -------------------------------
  emailInput.addEventListener("input", verificarCampos);
  passwordInput.addEventListener("input", verificarCampos);
  boton.addEventListener("click", iniciarSesion);
});
