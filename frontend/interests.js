// Script para manejar la página de temas de interés

document.addEventListener("DOMContentLoaded", () => {
  const interestForm = document.getElementById("interest-form");
  const selectedInterestsList = document.getElementById("selected-interests");

  // Simulación de temas seleccionados previamente
  const userInterests = ["Matemáticas", "Programación"];

  // Renderizar temas seleccionados
  const renderSelectedInterests = () => {
    selectedInterestsList.innerHTML = ""; // Limpiar lista
    userInterests.forEach((interest) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.textContent = interest;
      selectedInterestsList.appendChild(listItem);
    });
  };

  // Cargar temas seleccionados en el formulario
  const loadInterestsToForm = () => {
    const checkboxes = interestForm.elements["interests"];
    Array.from(checkboxes).forEach((checkbox) => {
      if (userInterests.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  };

  // Manejar el envío del formulario
  interestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener temas seleccionados
    const selectedInterests = Array.from(interestForm.elements["interests"])
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // Actualizar temas seleccionados
    userInterests.length = 0; // Vaciar el arreglo
    userInterests.push(...selectedInterests);

    // Actualizar la lista de temas seleccionados
    renderSelectedInterests();

    alert("Tus temas de interés han sido actualizados.");
  });

  // Inicializar la página
  renderSelectedInterests();
  loadInterestsToForm();
});
