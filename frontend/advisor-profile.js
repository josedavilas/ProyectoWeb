// Script para manejar la página de perfil del asesor

document.addEventListener("DOMContentLoaded", () => {
  const ratingElement = document.getElementById("rating");
  const reviewCountElement = document.getElementById("review-count");
  const reviewsList = document.querySelector(".list-group");

  // Simulación de datos de reseñas
  const reviews = [
    {
      student: "Juan Pérez",
      rating: 5,
      comment: "¡Gran asesor! Explicaciones claras y muy paciente.",
      date: "2025-04-25",
    },
    {
      student: "María Gómez",
      rating: 4,
      comment: "Buena sesión, aunque podría ser un poco más dinámica.",
      date: "2025-04-20",
    },
    {
      student: "Carlos Ramírez",
      rating: 5,
      comment:
        "Me ayudó a entender conceptos que llevaba semanas intentando aprender.",
      date: "2025-04-15",
    },
  ];

  // Calcular calificación promedio
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Renderizar calificación promedio
  const averageRating = calculateAverageRating(reviews);
  ratingElement.textContent = `${averageRating} / 5.0`;
  reviewCountElement.textContent = reviews.length;

  // Renderizar reseñas
  const renderReviews = (reviews) => {
    reviewsList.innerHTML = ""; // Limpiar lista
    reviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("list-group-item");

      reviewItem.innerHTML = `
                <h5>${review.student}</h5>
                <p><strong>Calificación:</strong> ${review.rating} / 5</p>
                <p>${review.comment}</p>
                <small class="text-muted">Fecha: ${review.date}</small>
            `;

      reviewsList.appendChild(reviewItem);
    });
  };

  // Mostrar reseñas al cargar la página
  renderReviews(reviews);
});
