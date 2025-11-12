document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const boton = document.querySelector('button[type="submit"]');

  // Deshabilitar botón al inicio
  boton.disabled = true;
  boton.style.opacity = "0.5";
  boton.style.cursor = "not-allowed";

  // Función para validar EMAIL: formato válido de mail (un @ en el medio) y que termine con .com, .org o .net 
  function validarEmail(email) {
    const patron = /^[^@]+@[^@]+\.(com|org|net)$/i;
    return patron.test(email);
  }

  // Función para validar CONTRASEÑA: longitud de al menos 8 y máxima de 12 caracteres, y que contenga al menos
  //una mayúscula, una minúscula, un número, y cualquiera de los siguientes caracteres
  //especiales: # ? ! % $ 

  function validarPassword(password) {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
    return patron.test(password);
  }

  // Función para revisar si todos los campos son válidos
  function verificarCampos() {
    const emailValido = validarEmail(emailInput.value.trim());
    const passValida = validarPassword(passwordInput.value.trim());

    // Cambiar color del borde según validez
    emailInput.style.borderColor = emailInput.value === "" || !emailValido ? "red" : "#ff007f";
    passwordInput.style.borderColor = passwordInput.value === "" || !passValida ? "red" : "#ff007f";

    // Si los dos son válidos, habilitar el botón
    if (emailValido && passValida) {
      boton.disabled = false;
      boton.style.opacity = "1";
      boton.style.cursor = "pointer";
    } else {
      boton.disabled = true;
      boton.style.opacity = "0.5";
      boton.style.cursor = "not-allowed";
    }
  }

  // Escuchar cambios en los inputs
  emailInput.addEventListener("input", verificarCampos);
  passwordInput.addEventListener("input", verificarCampos);
})   