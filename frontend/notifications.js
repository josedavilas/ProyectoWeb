// Script para manejar la pagina de notificaciones

document.addEventListener("DOMContentLoaded", () => {
  // Verifica si hay token para permitir acceso
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("Debes iniciar sesion para acceder a esta pagina");
    window.location.href = "login.html";
    return;
  }

  // Contenedor donde se mostraran las notificaciones
  const notificationList = document.getElementById("notifications");

  // Funcion para mostrar las notificaciones en el DOM
  const renderNotifications = (notifications) => {
    notificationList.innerHTML = "";

    // Si no hay notificaciones, muestra mensaje vacio
    if (!notifications.length) {
      notificationList.innerHTML = "<p class='text-muted'>No hay notificaciones disponibles.</p>";
      return;
    }

    // Crea un bloque visual para cada notificacion
    notifications.forEach((notification) => {
      const div = document.createElement("div");
      div.classList.add("alert", "alert-success", "d-flex", "align-items-center", "mt-3");
      div.setAttribute("role", "alert");
      div.innerHTML = `
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
          <use xlink:href="#check-circle-fill" />
        </svg>
        <div>
          ${notification.message}<br>
          <small class="text-muted">${new Date(notification.date).toLocaleString()}</small>
        </div>
      `;

      notificationList.appendChild(div);
    });
  };

  // Funcion para obtener las notificaciones desde el backend
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/notifications");
      const data = await res.json();
      renderNotifications(data); // Muestra las notificaciones
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      notificationList.innerHTML = "<p class='text-danger'>No se pudieron cargar las notificaciones.</p>";
    }
  };

  // Llama a la funcion para obtener las notificaciones al cargar la pagina
  fetchNotifications();
});
