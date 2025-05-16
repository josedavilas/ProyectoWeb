document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el usuario desde sessionStorage (si existe)
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  // Obtiene enlaces del menu
  const adminLink = document.getElementById("admin-link");
  const profileLink = document.querySelector('a[href="profile.html"]');
  const sessionsLink = document.querySelector('a[href="sessions.html"]');
  const notificationsLink = document.querySelector('a[href="notifications.html"]');
  const reviewsLink = document.querySelector('a[href="ratings-reviews.html"]');

  // Muestra el enlace de administracion solo si el usuario es admin
  if (adminLink) {
    adminLink.style.display = user.role === "admin" ? "block" : "none";
  }

  const manageSessionsLink = document.getElementById("manage-sessions-link");

  // Muestra el enlace de administrar sesiones si el usuario es asesor o admin
  if (user && (user.role === "advisor" || user.role === "admin")) {
    if (manageSessionsLink) manageSessionsLink.style.display = "block";
  }

  // Verifica si hay un usuario logueado
  const isLoggedIn = !!user.role;

  // Si no esta logueado, oculta enlaces del menu
  if (!isLoggedIn) {
    if (profileLink) profileLink.style.display = "none";
    if (sessionsLink) sessionsLink.style.display = "none";
    if (notificationsLink) notificationsLink.style.display = "none";
    if (reviewsLink) reviewsLink.style.display = "none";
  }
});
