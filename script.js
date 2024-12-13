// Fecha del evento
const eventDate = new Date("2024-12-08T10:00:00");

// Actualiza el contador dinámicamente
function updateCountdown() {
  const now = new Date();
  const timeDiff = eventDate - now;

  if (timeDiff <= 0) {
    document.getElementById("countdown").innerText = "¡Es el día del evento!";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

// Ejecuta el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Llama inmediatamente para evitar el retraso inicial

// Despliega el formulario y hace scroll al hacer clic en el enlace
document.querySelector("a[href='#confirmation-section']").addEventListener("click", (event) => {
  event.preventDefault(); // Previene el comportamiento por defecto del enlace (el salto automático)
  
  const confirmationSection = document.getElementById("confirmation-section");

  // Muestra la sección del formulario
  confirmationSection.classList.remove("hidden");

  // Hace scroll suave hasta la sección del formulario
  confirmationSection.scrollIntoView({ behavior: "smooth" });
});

// Despliega el formulario al hacer clic en el botón de confirmar
document.getElementById("confirm-button").addEventListener("click", () => {
  const confirmationSection = document.getElementById("confirmation-section");
  confirmationSection.classList.remove("hidden");
  confirmationSection.scrollIntoView({ behavior: "smooth" });
});

// Maneja el envío del formulario
document.getElementById("confirmation-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita el envío tradicional del formulario

  // Recoge los datos del formulario
  const formData = new FormData(e.target);
  const data = {
    attendance: formData.get("attendance"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    guess: formData.get("guess"),
  };

  try {
    // Envía los datos al backend
    const response = await fetch("http://localhost:3000/api/invitaciones/confirmar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("¡Gracias por confirmar tu asistencia!");
      e.target.reset(); // Resetea el formulario
    } else {
      alert("Ocurrió un error al enviar tu confirmación. Inténtalo nuevamente.");
    }
  } catch (error) {
    alert("Error de conexión con el servidor. Por favor, intenta más tarde.");
  }
});
