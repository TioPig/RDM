document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", async function () {
      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const errorAcceso = document.getElementById("errorAcceso");
      errorAcceso.classList.add("visually-hidden");


      let errorMessage = "";
      if (!email) errorMessage += "Por favor, ingrese su correo electrónico.<br>";
      if (!password) {
        errorMessage += "Por favor, ingrese una contraseña.<br>";
      } else if (password.length < 8 || password.length > 16) {
        errorMessage += "Contraseña Incorrecta.<br>";
      }

      if (errorMessage) {
        errorAcceso.innerHTML = errorMessage;
        errorAcceso.classList.remove("visually-hidden");
        return;
      }



      try {
        // const response = await fetch("https://api.recetasdelmundo.uno/auth/login", {
        const response = await fetch("http://localhost:3000/auth/login", {
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
          localStorage.setItem("isLoggedIn", "true");
          updateNavbar();
          alert("Acceso concedido!");
          window.location.href = "index.html";
        } else {
          if(data.msj === "usuario no existe en la base de datos"){
            errorAcceso.innerHTML = "Usuario no existe";
            errorAcceso.classList.remove("visually-hidden");
          }
          alert("Acceso denegado!");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Ah ha ocurrido un error al acceder.");
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
      const errorAcceso = document.getElementById("errorAcceso");
      errorAcceso.classList.add("visually-hidden");

      // Input validation
      let errorMessage = "";
      if (!firstName) errorMessage += "Por favor, ingrese su nombre.<br>";
      if (!lastName) errorMessage += "Por favor, ingrese su apellido.<br>";
      if (!email) errorMessage += "Por favor, ingrese su correo electrónico.<br>";
      if (!password) {
        errorMessage += "Por favor, ingrese una contraseña.<br>";
      } else if (password.length < 8 || password.length > 16) {
        errorMessage += "La contraseña debe tener entre 8 y 16 caracteres.<br>";
      }
      if (!confirmPassword) errorMessage += "Por favor, confirme su contraseña.<br>";
  
      if (errorMessage) {
        errorAcceso.innerHTML = errorMessage;
        errorAcceso.classList.remove("visually-hidden");
        return;
      }


    if (errorMessage) {
      errorAcceso.innerHTML = errorMessage;
      errorAcceso.classList.remove("visually-hidden");
      return;
    }

      if (password !== confirmPassword) {
        errorAcceso.innerHTML = 'Las contraseñas no coinciden';
        errorAcceso.classList.remove("visually-hidden");
        return;
      }

      try {
        const response = await fetch("https://api.recetasdelmundo.uno/usuario/", {
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
          alert("Registro Completado!");
          
          /** window.location.href = "login.html"; */
        } else {
          if (data.msj === "Error al agregar usuario.") {
            errorAcceso.innerHTML = '<p>Ya existe un usuario con ese correo</p>';
            errorAcceso.classList.remove("visually-hidden");
            return;
          }
        }
      } catch (error) {
        const data = await response.json();
        console.log(data)
        console.error("Error registering:", error);
        alert("Ah ocurrido un error al registrarse.");
      }
    });
  }
});

  


    /** Cuentas 
- POST  https://api.recetasdelmundo.uno/usuario/  {
    "nombre" : "Claudio",
    "apellido" : "Sanz",
    "correo" : "csanz@duocuc.cl",
    "password" : "cast1301",
    "activo" : 1
}   -  GET https://api.recetasdelmundo.uno/usuario/correo/psalas@duocuc.cl - POST  https://api.recetasdelmundo.uno/usuario/password/ {
    "correo" : "csanz@duocuc.cl",
    "password" : "cast1301"
} -

*/