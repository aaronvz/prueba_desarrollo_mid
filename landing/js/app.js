const form = document.getElementById("formRegistro");
const inputs = form.querySelectorAll("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valid = true;

  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const password = form.password.value.trim();
  const fecha = form.fecha.value;

  // validar nombre
  if (nombre.length < 3) {
    mostrarError("nombre", "El nombre debe tener al menos 3 caracteres");
    valid = false;
  } else ocultarError("nombre");

  // validar correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    mostrarError("correo", "El correo no es válido");
    valid = false;
  } else ocultarError("correo");

  // validar contraseña
  const regexPass = /^(?=(?:.*[A-Z]){2,})(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regexPass.test(password)) {
    mostrarError("password", "Debe tener 8 caracteres, 2 mayúsculas, 1 número y 1 símbolo");
    valid = false;
  } else ocultarError("password");

  // validar edad
  const edad = calcularEdad(fecha);
  if (edad < 18) {
    mostrarError("fecha", "Debes ser mayor de 17 años");
    valid = false;
  } else ocultarError("fecha");

  // Si las validaciones fallan, detener envío
  if (!valid) return;

  // Enviar datos al backend
  try {
    alert("Formulario válido, enviando datos al servidor...");

    const response = await fetch("api/registro.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password, fecha }),
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (data.success) {
      alert("Registro exitoso: " + data.message);
      form.reset();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    alert("No se pudo conectar con el servidor.");
  }
});

function mostrarError(id, mensaje) {
  const input = document.getElementById(id);
  const small = input.nextElementSibling;
  small.textContent = mensaje;
  small.style.display = "block";
  input.style.borderColor = "red";
}

function ocultarError(id) {
  const input = document.getElementById(id);
  const small = input.nextElementSibling;
  small.textContent = "";
  small.style.display = "none";
  input.style.borderColor = "#cbd5e1";
}

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const cumple = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) edad--;
  return edad;
}

// el collpse de los productos
const toggles = document.querySelectorAll(".toggle");
toggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const detalle = btn.nextElementSibling;
    detalle.style.display =
      detalle.style.display === "block" ? "none" : "block";
  });
});