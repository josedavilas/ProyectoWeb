// Script para manejar la pagina de perfil

document.addEventListener("DOMContentLoaded", () => {
    // Verifica si hay un token en sessionStorage
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesion para ver tu perfil");
      window.location.href = "login.html";
      return;
    }

    // Obtiene la informacion del usuario actual desde sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    // Cargar datos del usuario desde el backend
    const loadUserData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Error al obtener datos del usuario");
        }

        const user = await res.json();

        // Llena los campos del formulario con los datos del usuario
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("role").value = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      } catch (err) {
        alert(err.message);
      }
    };

    // Cargar historial de sesiones del usuario
    const loadUserSessions = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/sessions/history`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Error al cargar historial de sesiones");

        const sessions = await res.json();
        renderSessionHistory(sessions); // renderiza el historial
      } catch (err) {
        sessionHistory.innerHTML = "<p class='text-danger'>No se pudo cargar el historial.</p>";
        console.error(err.message);
      }
    };

    // Referencias a elementos del DOM
    const profileForm = document.getElementById("profile-form");
    const passwordForm = document.getElementById("password-form");
    const interestsForm = document.getElementById("interests-form");
    const sessionHistory = document.querySelector(".list-group");
    const profilePicture = document.getElementById("profile-picture");
    const uploadPicture = document.getElementById("upload-picture");

    // Funcion para mostrar el historial de sesiones
    const renderSessionHistory = (sessions = []) => {
      sessionHistory.innerHTML = "";

      if (!Array.isArray(sessions) || sessions.length === 0) {
        sessionHistory.innerHTML = "<p class='text-muted'>No tienes sesiones registradas.</p>";
        return;
      }

      // Crea elementos para cada sesion
      sessions.forEach((session) => {
        const item = document.createElement("div");
        item.classList.add("list-group-item");

        item.innerHTML = `
          <h5>${session.topic}</h5>
          <p>Fecha: ${session.date} - Hora: ${session.time}</p>
          <p>Asesor: ${session.advisor?.name || "Desconocido"}</p>
          <p>Estado: <strong>${session.status || "Pendiente"}</strong></p>
        `;

        sessionHistory.appendChild(item);
      });
    };

    // Llamadas iniciales al cargar la pagina
    renderSessionHistory(); // muestra mensaje por defecto
    loadUserData();         // carga datos del perfil
    loadUserSessions();     // carga historial de sesiones

    // Maneja el envio del formulario de perfil
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      alert(`Tu perfil ha sido actualizado:\nNombre: ${name}\nCorreo: ${email}`);
      // Aqui puedes agregar la logica para enviar los datos al backend
    });

    // Maneja la carga de una nueva imagen de perfil
    uploadPicture.addEventListener("change", (event) => {
      const file = uploadPicture.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profilePicture.src = e.target.result;
          alert("Foto de perfil cargada exitosamente.");
          // Aqui puedes agregar la logica para guardar la imagen en el backend
        };
        reader.readAsDataURL(file);
      }
    });

    // Configura el boton para cerrar sesion
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("¿Deseas cerrar sesion?");
        if (confirmLogout) {
          sessionStorage.clear(); // limpia el token y datos del usuario
          window.location.href = "login.html"; // redirige al login
        }
      });
    } else {
      console.warn("El boton logout no fue encontrado en el DOM");
    }
});
