document.addEventListener("DOMContentLoaded", function () {
  const annoDiv = document.getElementById("anno");
  const añoActual = new Date().getFullYear(); // Obtener el año actual
  annoDiv.innerHTML =
    añoActual +
    ", Recetas del mundo - un sitio donde podrás encontrar la receta perfecta para esa ocasión.";
});

/*-- Cargar Paises en NavDropdown --*/
document.addEventListener("DOMContentLoaded", function () {
  const paisesUrl = "https://api.recetasdelmundo.uno/pais/";
  const dropdownMenuId = "navbarDropdownPaisesMenu";
  const dropdownToggleId = "navbarDropdownPaises";

  function cargarPaisesDropdown(paisesUrl, dropdownMenuId, dropdownToggleId) {
    const dropdownMenu = document.getElementById(dropdownMenuId);
    const dropdownToggle = document.getElementById(dropdownToggleId);

    fetch(paisesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.ok && Array.isArray(data.data)) {
          data.data.forEach((pais) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.href = `comidas-por-pais.html?pais=${encodeURIComponent(
              pais.nombre
            )}`;
            a.textContent = pais.nombre;
            li.appendChild(a);
            dropdownMenu.appendChild(li);
          });
        } else {
          dropdownMenu.innerHTML = `<li><a class="dropdown-item">Formato de datos inesperado</a></li>`;
        }
      })
      .catch((error) => {
        dropdownMenu.innerHTML = `<li><a class="dropdown-item">Error al cargar los países: ${error.message}</a></li>`;
      });
  }

  cargarPaisesDropdown(paisesUrl, dropdownMenuId, dropdownToggleId);
});

/*-- Cargar Categorias en NavDropdown --*/
document.addEventListener("DOMContentLoaded", function () {
  const categoriasUrl = "https://api.recetasdelmundo.uno/categoria/";
  const dropdownMenuId = "navbarDropdownCategoriasMenu";
  const dropdownToggleId = "navbarDropdownCategorias";

  function cargarCategoriasDropdown(
    categoriasUrl,
    dropdownMenuId,
    dropdownToggleId
  ) {
    const dropdownMenu = document.getElementById(dropdownMenuId);
    const dropdownToggle = document.getElementById(dropdownToggleId);

    fetch(categoriasUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.ok && Array.isArray(data.data)) {
          data.data.forEach((categoria) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.href = `comidas-por-categoria.html?categoria=${encodeURIComponent(
              categoria.nombre
            )}`;
            a.textContent = categoria.nombre;
            li.appendChild(a);
            dropdownMenu.appendChild(li);
          });
        } else {
          dropdownMenu.innerHTML = `<li><a class="dropdown-item">Formato de datos inesperado</a></li>`;
        }
      })
      .catch((error) => {
        dropdownMenu.innerHTML = `<li><a class="dropdown-item">Error al cargar las categorías: ${error.message}</a></li>`;
      });
  }

  cargarCategoriasDropdown(categoriasUrl, dropdownMenuId, dropdownToggleId);
});

/* Cargar Paises en el Index */
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes('index.html') || (window.location.pathname === '/')) {
    const paisesUrl = "https://api.recetasdelmundo.uno/pais/";
    const paisesDiv = document.getElementById("pais");
    async function cargarPaises() {
      await fetch(paisesUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.ok && Array.isArray(data.data)) {
            data.data.forEach((pais, index) => {
              const paisDiv = document.createElement("div");
              paisDiv.classList.add("col-md-3", "mb-4");

              const paisImg = document.createElement("img");
              paisImg.classList.add(
                "img-fluid",
                "img-thumbnail",
                "pais-img"
              );
              paisImg.src = pais.url_imagen;
              paisImg.alt = pais.nombre;
              paisDiv.appendChild(paisImg);

              const paisBtn = document.createElement("button");
              paisBtn.classList.add(
                "btn",
                "w-100",
                "mt-2",
                "bg-naranjo",
                "tx-blanco"
              );
              paisBtn.textContent = `${pais.nombre}`;
              paisBtn.addEventListener("click", function () {
                // Redirigir a la página específica del país
                window.location.href = `comidas-por-pais.html?pais=${encodeURIComponent(
                  pais.nombre
                )}`;
              });
              paisDiv.appendChild(paisBtn);

              paisesDiv.appendChild(paisDiv);
            });
          } else {
            paisesDiv.innerHTML = `<p>Formato de datos inesperado</p>`;
          }
        })
        .catch((error) => {
          paisesDiv.innerHTML = `<p>Error al cargar los países: ${error.message}</p>`;
        });
    }

    cargarPaises();
  }
});


// Receta Aleatoria
document.addEventListener("DOMContentLoaded", function () {
  const recetasUrl = "https://api.recetasdelmundo.uno/recetas"; // Endpoint para obtener todas las recetas
  const recetaRandomLink = document.getElementById("recetaRandomLink");
  const recetaAleatoriaModal = new bootstrap.Modal(
    document.getElementById("recetaAleatoriaModal")
  );
  const recetaAleatoriaModalBody = document.getElementById(
    "recetaAleatoriaModalBody"
  );
  const recetaAleatoriaModalLabel = document.getElementById(
    "recetaAleatoriaModalLabel"
  );

  // Función para cargar todas las recetas y seleccionar una aleatoria
  async function cargarRecetaAleatoria() {
    await fetch(recetasUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.ok && Array.isArray(data.data)) {
          const recetas = data.data;
          const receta = recetas[Math.floor(Math.random() * recetas.length)];
          const modalId = `modalAleatoria`;

          recetaAleatoriaModalLabel.textContent = receta.nombre;
          recetaAleatoriaModalBody.innerHTML = `
                          <img class="w-100 mb-3" src="${
                            receta.url_imagen
                          }" alt="${receta.nombre}">
                          <p style="text-align: justify !important;"><strong>Ingredientes:</strong> ${receta.ingrediente.replace(
                            /\\n/g,
                            ", "
                          )}</p>
                          <p style="text-align: justify !important;"><strong>Preparación:</strong> ${
                            receta.preparacion
                          }</p>
                      `;

          // Mostrar el modal
          recetaAleatoriaModal.show();
        } else {
          recetaAleatoriaModalBody.innerHTML = `<p>No se pudo cargar una receta aleatoria.</p>`;
        }
      })
      .catch((error) => {
        recetaAleatoriaModalBody.innerHTML = `<p>Error al cargar la receta aleatoria: ${error.message}</p>`;
      });
  }

  // Asignar el evento click al enlace de receta aleatoria
  recetaRandomLink.addEventListener("click", function (event) {
    event.preventDefault();
    cargarRecetaAleatoria();
  });
});



// Receta del dia
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html') || window.location.pathname.includes('index.html') || window.location.pathname === '/') {
      const recetasUrl = "https://api.recetasdelmundo.uno/recetas"; // Endpoint para obtener todas las recetas
      const recetaRandomLink = document.getElementById("recetaRandomLink");
      const recetaDelDiaNombre = document.getElementById("recetaDelDiaNombre");
      const recetaDelDiaDescripcion = document.getElementById("recetaDelDiaDescripcion");
      const recetaDelDiaImg = document.getElementById("recetaDelDiaImg");
  
      function esMismaFecha(fecha1, fecha2) {
        return (
          fecha1.getFullYear() === fecha2.getFullYear() &&
          fecha1.getMonth() === fecha2.getMonth() &&
          fecha1.getDate() === fecha2.getDate()
        );
      }
  
      async function cargarRecetaAleatoria() {
        await fetch(recetasUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.ok && Array.isArray(data.data)) {
              const recetaAleatoria = data.data[Math.floor(Math.random() * data.data.length)];
  
              const recetaDelDia = {
                nombre: recetaAleatoria.nombre,
                ingrediente: recetaAleatoria.ingrediente,
                preparacion: recetaAleatoria.preparacion,
                url_imagen: recetaAleatoria.url_imagen,
                fecha: new Date().toISOString()
              };
  
              localStorage.setItem("recetaDelDia", JSON.stringify(recetaDelDia));
  
              mostrarRecetaDelDia(recetaDelDia);
            } else {
              recetaDelDiaDescripcion.textContent = "No hay recetas disponibles.";
            }
          })
          .catch((error) => {
            recetaDelDiaDescripcion.innerHTML = `<p>Error al cargar la receta aleatoria: ${error.message}</p>`;
          });
      }
  
      function mostrarRecetaDelDia(receta) {
        recetaDelDiaNombre.textContent = receta.nombre;
        recetaDelDiaDescripcion.innerHTML = `
          <p style="text-align: justify !important;"><strong>Ingredientes:</strong> ${receta.ingrediente.replace(
            /\\n/g,
            ", "
          )}</p>
          <p style="text-align: justify !important;"><strong>Preparación:</strong> ${receta.preparacion}</p>
        `;
        recetaDelDiaImg.src = receta.url_imagen;
        recetaDelDiaImg.classList.add("random-img");
        recetaDelDiaImg.alt = receta.nombre;
      }
  
      function inicializarRecetaDelDia() {
        const recetaGuardada = JSON.parse(localStorage.getItem("recetaDelDia"));
  
        if (recetaGuardada && esMismaFecha(new Date(recetaGuardada.fecha), new Date())) {
          mostrarRecetaDelDia(recetaGuardada);
        } else {
          cargarRecetaAleatoria();
        }
      }
  
      // Inicializar la receta del día al acceder a la página
      inicializarRecetaDelDia();
    }
  });

 
  document.addEventListener("DOMContentLoaded", function () {
    window.updateNavbar = function() {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const loginLink = document.getElementById("loginLink");
      const registerLink = document.getElementById("registerLink");
      const userAvatar = document.getElementById("userAvatar");
      
      if (loginLink && registerLink && userAvatar) {
        if (isLoggedIn) {
          loginLink.classList.add("visually-hidden");
          registerLink.classList.add("visually-hidden");
          userAvatar.classList.remove("visually-hidden");
        } else {
          loginLink.classList.remove("visually-hidden");
          registerLink.classList.remove("visually-hidden");
          userAvatar.classList.add("visually-hidden");
        }
      }
    }
    
    function getUserInfo() {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(token);
        localStorage.setItem("userInfo", JSON.stringify(decodedToken.usuario));
        return decodedToken;
      }
      return null;
    }
  

    updateNavbar();
    getUserInfo();

    const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.setItem("isLoggedIn", "false");
      updateNavbar();
      window.location.href = "index.html";
    });
  }

  });

  if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')){
  document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const userName = document.getElementById("userName");
    const userLastName = document.getElementById("userLastName");
    const userEmail = document.getElementById("userEmail");
    const userActive = document.getElementById("userActive");

    

    function updateSidebarWithUserInfo() {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        if (userName) userName.textContent = userInfo.nombre;
        if (userLastName) userLastName.textContent = userInfo.apellido;
        if (userEmail) userEmail.textContent = userInfo.correo;
        if (userActive) {
          userActive.textContent = userInfo.activo == 1 ? "Activo" : "Inactivo";
          userActive.className = userInfo.activo == 1 ? "badge bg-success" : "badge bg-secondary";
        }
      }
    }

    function openSidebar() {
      sidebar.style.width = "400px";
      updateSidebarWithUserInfo();
    }
  
    function closeSidebarFunc() {
      sidebar.style.width = "0";
    }
  
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", openSidebar);
    }
  
    if (closeSidebar) {
      closeSidebar.addEventListener("click", closeSidebarFunc);
    }
  
    updateSidebarWithUserInfo();
  });

}