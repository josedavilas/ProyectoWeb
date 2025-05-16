document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el formulario de login
  const loginForm = document.getElementById("login-form");

  // Escucha el evento submit del formulario
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el recargo de la pagina

    // Obtiene los valores ingresados por el usuario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Envia la peticion POST al backend para hacer login
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      // Si hay error en la respuesta, muestra mensaje
      if (!response.ok) {
        alert(data.message || "Error al iniciar sesion");
        return;
      }

      // Guarda token y datos del usuario en sessionStorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      alert("Inicio de sesion exitoso");
      window.location.href = "sessions.html"; // Redirige a sesiones
    } catch (error) {
      alert("Error de conexion"); // Error si el servidor no responde
    }
  });
});
