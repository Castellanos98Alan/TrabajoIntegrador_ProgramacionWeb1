document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[type="email"]');
  const boton = document.querySelector('button[type="submit"]');

  // Estado inicial: botón deshabilitado
  deshabilitarBoton();

  // Validación del EMAIL
  function validarEmail(email) {
    const patron = /^[^@]+@[^@]+\.(com|org|net)$/i;
    return patron.test(email);
  }

  // Funciones para estado del botón
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

  // Verificar campo
  function verificarCampo() {
    const valor = emailInput.value.trim();
    const emailValido = validarEmail(valor);

    // Si está vacío → borde normal y botón off
    if (valor === "") {
      emailInput.style.borderColor = "";
      deshabilitarBoton();
      return;
    }

    // Si es válido
    if (emailValido) {
      emailInput.style.borderColor = "#ff007f";
      habilitarBoton();
    }
    // Si es inválido
    else {
      emailInput.style.borderColor = "red";
      deshabilitarBoton();
    }
  }

  // Escuchar cambios
  emailInput.addEventListener("input", verificarCampo);
});
