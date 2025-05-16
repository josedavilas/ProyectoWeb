function checkAuth(options = {}) {
  // Obtiene el token del usuario desde sessionStorage
  const token = sessionStorage.getItem("token");

  // Define la ruta de redireccion (por defecto es login.html)
  const redirect = options.redirect || "login.html";

  // Indica si se debe mostrar una alerta (por defecto es false)
  const showAlert = options.alert || false;

  // Si no hay token, se bloquea el acceso
  if (!token) {
    if (showAlert) alert("Debes iniciar sesion para ver esta seccion");
    window.location.href = redirect; // Redirige al login u otra pagina
    return false; // Retorna false si no esta autorizado
  }

  return true; // Retorna true si el token existe
}
