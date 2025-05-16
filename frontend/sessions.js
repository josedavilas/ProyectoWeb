document.addEventListener("DOMContentLoaded", () => {
  // Referencia al contenedor de sesiones
  const sessionsList = document.querySelector(".list-group");
  const searchForm = document.getElementById("search-form");
  const API_URL = "http://localhost:4000/api/sessions";

  // Se obtiene el token y usuario actual del sessionStorage
  const token = sessionStorage.getItem("token");
  const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");

  // Funcion para mostrar mensajes breves en pantalla
  const showMessage = (message, type = "info") => {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertBox.role = "alert";
    alertBox.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector("main")?.prepend(alertBox);
    setTimeout(() => alertBox.remove(), 3000); // Mensaje desaparece luego de 3 segundos
  };
  
  // Funcion para obtener las sesiones desde el backend
  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/sessions");
      const sessions = await res.json();
      renderSessions(sessions); // Se llama a renderizado
    } catch (err) {
      alert("Error al cargar sesiones públicas");
    }
  };

  // Funcion para mostrar las sesiones en pantalla
  const renderSessions = (sessions) => {
    const message = document.getElementById("no-sessions-message");

    if (!sessions || sessions.length === 0) {
      message.style.display = "block"; // Muestra mensaje si no hay sesiones
      return;
    } else {
      message.style.display = "none"; // Oculta el mensaje
    }

    sessions.forEach((session) => {
      // Verifica si el usuario ya esta registrado
      const isRegistered = session.students?.includes(currentUser.id);

      const item = document.createElement("div");
      item.classList.add("list-group-item");

      // Muestra los datos de la sesion
      item.innerHTML = `
        <h5>${session.topic}</h5>
        <p>Asesor: ${session.advisor?.name || "Desconocido"}</p>
        <p>Fecha: ${session.date} - Hora: ${session.time}</p>
        <button class="btn ${isRegistered ? "btn-secondary" : "btn-primary"} mt-2 register-btn"
          data-id="${session._id}" ${isRegistered ? "disabled" : ""}>
          ${isRegistered ? "Registrado" : "Registrarse"}
        </button>
      `;

      sessionsList.appendChild(item);
    });
  };

  // Evento para buscar sesiones por tema
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = document.getElementById("search").value.trim().toLowerCase();
    const query = searchValue ? `?topic=${encodeURIComponent(searchValue)}` : "";
    fetchSessions(query); // Intenta buscar con filtro (aunque query no se usa en fetchSessions)
  });

  // Evento para registrar al estudiante en una sesion
  sessionsList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("register-btn") && !e.target.disabled) {
      const sessionId = e.target.getAttribute("data-id");

      try {
        const res = await fetch(`${API_URL}/${sessionId}/register`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();

        if (!res.ok) {
          showMessage(data.message || "Error al registrarse", "danger");
          return;
        }

        showMessage("Registro exitoso a la sesion", "success");
        fetchSessions(); // Actualiza las sesiones para reflejar el cambio
      } catch (err) {
        showMessage("Error de conexion al registrarse", "danger");
      }
    }
  });

  // Se cargan las sesiones al iniciar
  fetchSessions();
});
