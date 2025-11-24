// ===============================
//   VALIDACIONES GENERALES
// ===============================

const regexEmail = /^[^@]+@[^@]+\.(com|org|net)$/i;
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ' -]+$/;
const regexContra = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
const regexDocumento = /^\d+$/;
const regexTelefono = /^[0-9()+-]+$/;

// ---- Inputs formulario Mi Usuario ----
const emailPrincipal = document.getElementById("email-principal");
const btnUsuario = document.getElementById("btn-usuario");

// ---- Inputs Datos Personales ----
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const tipo = document.getElementById("tipo");
const documento = document.getElementById("documento");
const fecha = document.getElementById("fecha");
const telefono = document.getElementById("telefono");
const emailSecundario = document.getElementById("email-sec");
const btnDatos = document.getElementById("btn-datos");

// ===============================
//  VALIDAR EMAIL PRINCIPAL
// ===============================

function validarFormUsuario() {
    const emailValido = regexEmail.test(emailPrincipal.value.trim());
    btnUsuario.disabled = !emailValido;
}

emailPrincipal.addEventListener("input", validarFormUsuario);

// ===============================
//   VALIDAR FECHA ≥ 16 AÑOS
// ===============================

function validarFechaNacimiento() {
    const valor = fecha.value;
    if (!valor) return false;

    const nacimiento = new Date(valor);
    const hoy = new Date();

    const edadMin = new Date();
    edadMin.setFullYear(hoy.getFullYear() - 16);

    return nacimiento <= edadMin;
}

// ===============================
//   VALIDAR DATOS PERSONALES
// ===============================

function validarFormDatos() {
    const nombreValido = regexNombre.test(nombre.value.trim());
    const apellidoValido = regexNombre.test(apellido.value.trim());
    const tipoValido = tipo.value !== "";
    const docValido = regexDocumento.test(documento.value.trim());
    const fechaValida = validarFechaNacimiento();
    const telValido = regexTelefono.test(telefono.value.trim());
    const emailSecValido =
        emailSecundario.value.trim() === "" ||
        regexEmail.test(emailSecundario.value.trim());

    const todoBien =
        nombreValido &&
        apellidoValido &&
        tipoValido &&
        docValido &&
        fechaValida &&
        telValido &&
        emailSecValido;

    btnDatos.disabled = !todoBien;
}

[nombre, apellido, tipo, documento, fecha, telefono, emailSecundario].forEach(i =>
    i.addEventListener("input", validarFormDatos)
);

// ===============================
//   MOSTRAR/OCULTAR CONTRASEÑA
// ===============================

const passwordInput = document.getElementById("password");
const btnCambiar = document.querySelector(".btn-secundario");

btnCambiar.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        btnCambiar.textContent = "OCULTAR";
    } else {
        passwordInput.type = "password";
        btnCambiar.textContent = "mostrar contraseña";
    }
});

// ===============================
//    VALIDACIÓN DE CONTRASEÑA
// ===============================

passwordInput.addEventListener("input", () => {
    const esValida = regexContra.test(passwordInput.value);

    passwordInput.style.borderColor = esValida ? "#4CAF50" : "#FF1493";
});
