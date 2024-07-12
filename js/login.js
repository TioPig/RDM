document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async function () {
      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("https://apirecetas.iacst.space/auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo: email,
            password: password,
          }),
        });

        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          console.log(data)
          /** window.location.href = "index.html"; */
        } else {
          console.log(data)
          alert("Login failed!");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in.");
      }
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", async function () {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("https://apirecetas.iacst.space/usuario/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: firstName,
            apellido: lastName,
            correo: email,
            password: password,
            activo: 1,
          }),
        });

        const data = await response.json();
        if (data.ok) {
          alert("Registration successful!");
          window.location.href = "login.html";
        } else {
          alert("Registration failed!");
        }
      } catch (error) {
        console.error("Error registering:", error);
        alert("An error occurred while registering.");
      }
    });
  }
});

  


    /** Cuentas 
- POST  https://apirecetas.iacst.space/usuario/  {
    "nombre" : "Claudio",
    "apellido" : "Sanz",
    "correo" : "csanz@duocuc.cl",
    "password" : "cast1301",
    "activo" : 1
}   -  GET https://apirecetas.iacst.space/usuario/correo/psalas@duocuc.cl - POST  https://apirecetas.iacst.space/usuario/password/ {
    "correo" : "csanz@duocuc.cl",
    "password" : "cast1301"
} -

*/