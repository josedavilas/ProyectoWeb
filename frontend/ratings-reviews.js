// Script para manejar la página de calificaciones y reseñas

document.addEventListener("DOMContentLoaded", () => {
  //const token = sessionStorage.getItem("token");
  //if (!token) {
  //  alert("Debes iniciar sesión para acceder a esta página");
  //  window.location.href = "login.html";
  //  return;
  //}
  const sessionSelect = document.getElementById("session");
  const reviewForm = document.getElementById("review-form");
  const submittedReviews = document.querySelector(".list-group");
  const stars = document.querySelectorAll(".star");
  let selectedRating = 0;

  // Simulación de datos de sesiones
  const sessions = [
    {
      id: 1,
      topic: "Álgebra Lineal",
      advisor: "Juan Pérez",
      date: "2025-05-01",
    },
    {
      id: 2,
      topic: "Programación en JavaScript",
      advisor: "Ana López",
      date: "2025-04-30",
    },
  ];

  // Simulación de datos de reseñas enviadas
  const reviews = [
    {
      sessionId: 1,
      topic: "Álgebra Lineal",
      advisor: "Juan Pérez",
      rating: 5,
      comment: "Excelente sesión, muy clara y bien estructurada.",
      date: "2025-05-01",
    },
  ];

  // Cargar sesiones en el selector
  sessionSelect.innerHTML = "";

  if (sessions.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("text-muted", "mt-2");
    emptyMessage.textContent = "No tienes sesiones disponibles para calificar.";
    sessionSelect.parentElement.appendChild(emptyMessage); // Muestra debajo del select
    return;
  }

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Selecciona una sesión";
  sessionSelect.appendChild(defaultOption);

  sessions.forEach((s) => {
    const option = document.createElement("option");
    option.value = s._id;
    option.textContent = `${s.topic} - ${s.advisor?.name || "Asesor"} (${s.date})`;
    sessionSelect.appendChild(option);
  });


  // Renderizar reseñas enviadas
  const renderReviews = () => {
    submittedReviews.innerHTML = ""; // Limpiar lista
    reviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("list-group-item");

      reviewItem.innerHTML = `
                <h5>${review.topic} - ${review.advisor}</h5>
                <p><strong>Calificación:</strong> ${"⭐".repeat(
                  review.rating
                )}</p>
                <p>${review.comment}</p>
                <small class="text-muted">Fecha: ${review.date}</small>
            `;

      submittedReviews.appendChild(reviewItem);
    });
  };

  // Manejar selección de estrellas para calificación
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-value"));

      // Actualizar visualización de estrellas
      stars.forEach((s) => {
        if (parseInt(s.getAttribute("data-value")) <= selectedRating) {
          s.classList.add("text-warning");
        } else {
          s.classList.remove("text-warning");
        }
      });
    });
  });

  // Manejar envío de reseña
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const sessionId = parseInt(sessionSelect.value);
    const comment = document.getElementById("comment").value;

    if (selectedRating === 0) {
      alert("Por favor selecciona una calificación.");
      return;
    }

    // Buscar sesión seleccionada
    const session = sessions.find((s) => s.id === sessionId);

    // Crear nueva reseña
    const newReview = {
      sessionId: session.id,
      topic: session.topic,
      advisor: session.advisor,
      rating: selectedRating,
      comment,
      date: new Date().toISOString().split("T")[0], // Fecha actual en formato ISO
    };

    reviews.push(newReview);
    renderReviews();
    reviewForm.reset();
    selectedRating = 0;

    // Resetear estrellas
    stars.forEach((s) => s.classList.remove("text-warning"));

    alert("Reseña enviada exitosamente.");
  });

  // Inicializar la página
  loadSessions();
  renderReviews();
});
