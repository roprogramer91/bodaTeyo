const API_BASE = "http://localhost:3000/api/panel"; //Esta ruta es para el local

//const API_BASE = "https://babyshower-ashy.vercel.app/api/panel"; Esta linea funciona para produccion

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginContainer = document.getElementById("login-container");
    const panelContainer = document.getElementById("panel-container");
    const invitadosList = document.getElementById("invitados-list");
    const logoutButton = document.getElementById("logout-button");
    const loginError = document.getElementById("login-error");

    const token = localStorage.getItem("token");

    // Check if user is already logged in
    if (token) {
        showPanel();
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error("Login failed");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            showPanel();
        } catch (error) {
            loginError.classList.remove("hidden");
        }
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        showLogin();
    });

    async function showPanel() {
        loginContainer.classList.add("hidden");
        panelContainer.classList.remove("hidden");

        try {
            const res = await fetch(`${API_BASE}/invitados`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch invitados");
            }

            const invitados = await res.json();
            renderInvitados(invitados);
            fetchConteoInvitadosConfirmados(); 
        } catch (error) {
            console.error("Error fetching invitados:", error);
        }
    }

    function showLogin() {
        loginContainer.classList.remove("hidden");
        panelContainer.classList.add("hidden");
    }

    function renderInvitados(invitados) {
        invitadosList.innerHTML = ""; // Limpiar la lista
        invitados.forEach((invitado) => {
            const div = document.createElement("div");
            div.textContent = `${invitado.firstName} ${invitado.lastName} - ${invitado.attendance}`;
            invitadosList.appendChild(div);
        });
    }    

    async function fetchConteoInvitadosConfirmados() {
        try {
            const res = await fetch(`${API_BASE}/invitados/confirmados`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
    
            if (!res.ok) {
                throw new Error("Error al obtener el conteo de invitados confirmados");
            }
            const data = await res.json();
            const counterElement = document.getElementById("confirmados");
            counterElement.textContent = `Invitados confirmados: ${data.invitadosConfirmados}`;
        } catch (error) {
            console.error(error);
        }
    }
    
    
});
