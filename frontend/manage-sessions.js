document.addEventListener("DOMContentLoaded", () => {
  // Obtener usuario y token desde sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const token = sessionStorage.getItem("token");

  // Elementos del DOM
  const sessionsList = document.querySelector(".list-group");
  const createSessionForm = document.getElementById("create-session-form");

  const API_URL = "http://localhost:4000/api/sessions";

  // Verifica que el usuario sea asesor o admin
  if (!user || !user.role || (user.role !== "advisor" && user.role !== "admin")) {
    alert("Debes iniciar sesion como asesor o administrador para acceder a esta pagina");
    window.location.href = "login.html";
    return;
  }

  console.log("Token:", token); // Solo para depuracion

  // Obtener sesiones desde el backend
  const fetchSessions = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      renderSessions(data); // Muestra las sesiones
    } catch (err) {
      console.error("Error al cargar sesiones:", err);
      alert("Error al cargar sesiones");
    }
  };

  // Mostrar sesiones en la interfaz
  const renderSessions = (sessions) => {
    sessionsList.innerHTML = "";
    sessions.forEach((session) => {
      const sessionItem = document.createElement("div");
      sessionItem.classList.add("list-group-item");

      sessionItem.innerHTML = `
        <h5>${session.topic}</h5>
        <p>Fecha: ${session.date} - Hora: ${session.time}</p>
        <p><strong>Imparte:</strong> ${session.advisor?.name || "Desconocido"}</p>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-warning btn-sm edit-btn" data-id="${session._id}">Editar</button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${session._id}">Eliminar</button>
        </div>
      `;

      sessionsList.appendChild(sessionItem);
    });
  };

  // Crear nueva sesion
  createSessionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const topic = document.getElementById("topic").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ topic, date, time })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al crear sesion");
      }

      alert("Sesion creada exitosamente");
      createSessionForm.reset();
      fetchSessions(); // Recarga lista
    } catch (err) {
      alert(err.message);
    }
  });

  // Manejo de eventos para editar o eliminar
  sessionsList.addEventListener("click", async (e) => {
    const sessionId = e.target.getAttribute("data-id");

    // Eliminar sesion
    if (e.target.classList.contains("delete-btn")) {
      try {
        const res = await fetch(`${API_URL}/${sessionId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error al eliminar sesion");
        }

        alert("Sesion eliminada");
        fetchSessions(); // Refresca lista
      } catch (err) {
        alert(err.message);
      }
    }

    // Editar sesion (se simula eliminando la anterior)
    if (e.target.classList.contains("edit-btn")) {
      const sessionCard = e.target.closest(".list-group-item");
      const topic = sessionCard.querySelector("h5").textContent;
      const [fechaText, horaText] = sessionCard.querySelector("p").textContent.split(" - ");
      const date = fechaText.replace("Fecha: ", "").trim();
      const time = horaText.replace("Hora: ", "").trim();

      document.getElementById("topic").value = topic;
      document.getElementById("date").value = date;
      document.getElementById("time").value = time;

      const confirmEdit = confirm("¿Deseas editar esta sesion?");
      if (confirmEdit) {
        await fetch(`${API_URL}/${sessionId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSessions(); // Recarga lista despues de eliminar
      }
    }
  });

  // Cargar sesiones al iniciar
  fetchSessions();
});
