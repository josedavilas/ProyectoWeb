document.addEventListener("DOMContentLoaded", () => {
  // Obtiene usuario y token desde sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const token = sessionStorage.getItem("token");

  // Solo permite acceso a administradores
  if (!token || user.role !== "admin") {
    alert("Acceso restringido. Solo administradores.");
    window.location.href = "index.html";
    return;
  }

  const API_BASE = "http://localhost:4000/api";

  // Elementos del DOM
  const usersTableBody = document.querySelector("#manage-users tbody");
  const totalUsersElement = document.getElementById("total-users");
  const totalSessionsElement = document.getElementById("total-sessions");
  const totalReviewsElement = document.getElementById("total-reviews");

  // Cargar lista de usuarios desde la API
  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const users = await res.json();
      renderUsers(users); // Muestra los usuarios en tabla
    } catch (err) {
      alert("Error al cargar usuarios");
    }
  };

  // Cargar estadisticas generales desde la API
  const loadStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const stats = await res.json();
      renderStats(stats); // Muestra las estadisticas
    } catch (err) {
      alert("Error al cargar estadisticas");
    }
  };

  // Renderizar tabla de usuarios
  const renderUsers = (users) => {
    usersTableBody.innerHTML = ""; // Limpia la tabla antes de mostrar
    users.forEach((user) => {
      const row = document.createElement("tr");

      // Crea la fila con los datos del usuario
      row.innerHTML = `
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${capitalize(user.role)}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn btn-success btn-sm approve-btn" data-id="${user._id}"
            ${user.status === "Activo" ? "disabled" : ""}>
            Aprobar
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${user._id}">
            Eliminar
          </button>
        </td>
      `;

      usersTableBody.appendChild(row); // Agrega fila a la tabla
    });
  };

  // Convierte la primera letra en mayuscula
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Muestra estadisticas generales
  const renderStats = (stats) => {
    totalUsersElement.textContent = stats.totalUsers;
    totalSessionsElement.textContent = stats.totalSessions;
    totalReviewsElement.textContent = stats.totalReviews;
  };

  // Maneja los botones de aprobar y eliminar usuarios
  usersTableBody.addEventListener("click", async (event) => {
    const userId = event.target.getAttribute("data-id");

    // Aprobar usuario
    if (event.target.classList.contains("approve-btn")) {
      try {
        const res = await fetch(`${API_BASE}/users/${userId}/approve`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("No se pudo aprobar el usuario");

        alert("Usuario aprobado exitosamente");
        loadUsers(); // Recarga la lista de usuarios
      } catch (err) {
        alert(err.message);
      }
    }

    // Eliminar usuario
    if (event.target.classList.contains("delete-btn")) {
      const confirmDelete = confirm("¿Eliminar esta cuenta?");
      if (!confirmDelete) return;

      try {
        const res = await fetch(`${API_BASE}/users/${userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("No se pudo eliminar el usuario");

        alert("Usuario eliminado");
        loadUsers(); // Recarga la lista
        loadStats(); // Actualiza estadisticas
      } catch (err) {
        alert(err.message);
      }
    }
  });

  // Inicializa cargando usuarios y estadisticas
  loadUsers();
  loadStats();
});
