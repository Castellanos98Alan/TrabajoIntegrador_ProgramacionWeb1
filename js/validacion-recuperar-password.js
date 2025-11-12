document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[type="email"]');
  const boton = document.querySelector('button[type="submit"]');

  // Estado inicial: botón deshabilitado
  boton.disabled = true;
  boton.style.opacity = "0.5";
  boton.style.cursor = "not-allowed";

  // Función para validar EMAIL: formato válido de mail (un @ en el medio) y que termine con .com, .org o .net 
  function validarEmail(email) {
    const patron = /^[^@]+@[^@]+\.(com|org|net)$/i;
    return patron.test(email);
  }

  // Verificar campo y actualizar botón
  function verificarCampo() {
    const emailValido = validarEmail(emailInput.value.trim());
    const campoLleno = emailInput.value.trim() !== "";

    // Cambiar color del borde según estado
    if (campoLleno && emailValido) {
      emailInput.style.borderColor = "#ff007f";
      boton.disabled = false;
      boton.style.opacity = "1";
      boton.style.cursor = "pointer";
    } else {
      emailInput.style.borderColor = "red";
      boton.disabled = true;
      boton.style.opacity = "0.5";
      boton.style.cursor = "not-allowed";
    }
  }

  // Escuchar cambios en el input
  emailInput.addEventListener("input", verificarCampo);
});
