// Espera a que el contenido del documento este completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el formulario de registro por su ID
  const registerForm = document.getElementById("register-form");

  // Agrega un evento cuando se envia el formulario
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la pagina

    // Obtiene los valores de los campos del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      // Realiza una peticion POST al servidor para registrar al usuario
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      // Convierte la respuesta en formato JSON
      const data = await response.json();

      // Si la respuesta no es exitosa, muestra un mensaje de error
      if (!response.ok) {
        alert(data.message || "Error al registrarse");
        return;
      }

      // Si el registro fue exitoso, muestra un mensaje y redirige a login
      alert("Registro exitoso, ahora inicia sesion.");
      window.location.href = "login.html";
    } catch (err) {
      // Si hay error de conexion o red, muestra mensaje de error
      alert("Error de red o conexion con el servidor");
    }
  });
});
