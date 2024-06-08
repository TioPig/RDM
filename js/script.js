document.addEventListener('DOMContentLoaded', function () {
  const recipesContainer = document.getElementById('contenedor-recetas');
  const annoDiv = document.getElementById("anno");
  const añoActual = new Date().getFullYear(); // Obtener el año actual

  annoDiv.innerHTML = añoActual + ", Recetas del mundo - un sitio donde podrás encontrar la receta perfecta para esa ocasión.";

//  fetch('https://apirecetas.iacst.space/recetas/25')
//  .then(function(response) {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Error en la respuesta de la API');
//     }
//   })
//   .then(function(data) {
//     // Hacer algo con los datos de respuesta
//   })
//   .catch(function(error) {
//     // Manejar el error
//   });

  fetch('https://apirecetas.iacst.space/recetas/25', {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(response => response.json())
  .then(data => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row', 'd-flex', 'justify-content-center', 'grid');
        for (let i = 0; i < data.data.length; i++) {
            const recipe = data.data[i];
            const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('col-md-3', 'mb-4'); // Ajuste para columnas en Bootstrap

          console.log(recipe.nombre);

          // Utilizar backticks para generar el contenido HTML
          recipeDiv.innerHTML = `
              <div class="card" style="width: 18rem;">
                  <img src="img/cheems-waso.png" class="card-img-top img-thumbnail" alt="${recipe.nombre}" style="width: 270px; height: 270px;">
                  <div class="card-body">
                    <h5 class="card-title">${recipe.nombre}</h5>
                    <p class="card-text">${recipe.ingrediente}</p>
                    <a href="#" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modal-${recipe.id}">Ver preparación</a>
                  </div>
              </div>
        
              <!-- Modal -->
              <div class="modal fade" id="modal-${recipe.id}" tabindex="-1" aria-labelledby="modalLabel-${recipe.id}" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h1 class="modal-title fs-5" id="modalLabel-${recipe.id}">${recipe.nombre}</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <img src="img/cheems-waso.png" alt="${recipe.nombre}" class="img-fluid">
                              <br>
                              ${recipe.preparacion}
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                          </div>
                      </div>
                  </div>
              </div>
          `;

          rowDiv.appendChild(recipeDiv);
        }
    //   data.forEach(recipe => {
    //       const recipeDiv = document.createElement('div');
    //       recipeDiv.classList.add('col-md-3', 'mb-4'); // Ajuste para columnas en Bootstrap

    //       console.log(recipe.nombre_receta);

    //       // Utilizar backticks para generar el contenido HTML
    //       recipeDiv.innerHTML = `
    //           <div class="card" style="width: 18rem;">
    //               <img src="img/cheems-waso.png" class="card-img-top img-thumbnail" alt="${recipe.nombre_receta}" style="width: 270px; height: 270px;">
    //               <div class="card-body">
    //                 <h5 class="card-title">${recipe.nombre_receta}</h5>
    //                 <p class="card-text">${recipe.ingrediente_receta}</p>
    //                 <a href="#" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modal-${recipe.id}">Ver preparación</a>
    //               </div>
    //           </div>
        
    //           <!-- Modal -->
    //           <div class="modal fade" id="modal-${recipe.id}" tabindex="-1" aria-labelledby="modalLabel-${recipe.id}" aria-hidden="true">
    //               <div class="modal-dialog">
    //                   <div class="modal-content">
    //                       <div class="modal-header">
    //                           <h1 class="modal-title fs-5" id="modalLabel-${recipe.id}">${recipe.nombre_receta}</h1>
    //                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                       </div>
    //                       <div class="modal-body">
    //                           <img src="img/cheems-waso.png" alt="${recipe.nombre_receta}" class="img-fluid">
    //                           <br>
    //                           ${recipe.preparacion_receta}
    //                       </div>
    //                       <div class="modal-footer">
    //                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    //                       </div>
    //                   </div>
    //               </div>
    //           </div>
    //       `;

    //       rowDiv.appendChild(recipeDiv);
    //   });

      recipesContainer.appendChild(rowDiv);
  })
  .catch(error => console.error('Hubo un error al obtener los datos:', error));
});



document.addEventListener("DOMContentLoaded", function() {
  const paisesUrl = "https://apirecetas.iacst.space/pais/";
  const dropdownMenuId = "navbarDropdownPaisesMenu";
  const dropdownToggleId = "navbarDropdownPaises";
  
  function cargarPaisesDropdown(paisesUrl, dropdownMenuId, dropdownToggleId) {
    const dropdownMenu = document.getElementById(dropdownMenuId);
    const dropdownToggle = document.getElementById(dropdownToggleId);

    fetch(paisesUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.ok && Array.isArray(data.data)) {
                data.data.forEach(pais => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.classList.add("dropdown-item");
                    a.href = `comidas-por-pais.html?pais=${encodeURIComponent(pais.nombre)}`;
                    a.textContent = pais.nombre;
                    li.appendChild(a);
                    dropdownMenu.appendChild(li);
                });
            } else {
                dropdownMenu.innerHTML = `<li><a class="dropdown-item">Formato de datos inesperado</a></li>`;
            }
        })
        .catch(error => {
            dropdownMenu.innerHTML = `<li><a class="dropdown-item">Error al cargar los países: ${error.message}</a></li>`;
        });
}


  cargarPaisesDropdown(paisesUrl, dropdownMenuId, dropdownToggleId);
});

document.addEventListener("DOMContentLoaded", function() {
  const categoriasUrl = "https://apirecetas.iacst.space/categoria/";
  const dropdownMenuId = "navbarDropdownCategoriasMenu";
  const dropdownToggleId = "navbarDropdownCategorias";
  
  function cargarCategoriasDropdown(categoriasUrl, dropdownMenuId, dropdownToggleId) {
    const dropdownMenu = document.getElementById(dropdownMenuId);
    const dropdownToggle = document.getElementById(dropdownToggleId);

    fetch(categoriasUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.ok && Array.isArray(data.data)) {
                data.data.forEach(categoria => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.classList.add("dropdown-item");
                    a.href = `comidas-por-categoria.html?categoria=${encodeURIComponent(categoria.nombre)}`;
                    a.textContent = categoria.nombre;
                    li.appendChild(a);
                    dropdownMenu.appendChild(li);
                });
            } else {
                dropdownMenu.innerHTML = `<li><a class="dropdown-item">Formato de datos inesperado</a></li>`;
            }
        })
        .catch(error => {
            dropdownMenu.innerHTML = `<li><a class="dropdown-item">Error al cargar las categorías: ${error.message}</a></li>`;
        });
}

  cargarCategoriasDropdown(categoriasUrl, dropdownMenuId, dropdownToggleId);
});


document.addEventListener("DOMContentLoaded", function() {
    const paisesUrl = "https://apirecetas.iacst.space/pais/";
    const paisesDiv = document.getElementById("pais");
    function cargarPaises() {
        fetch(paisesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.ok && Array.isArray(data.data)) {
                    data.data.forEach((pais, index) => {
                        const paisDiv = document.createElement("div");
                        paisDiv.classList.add("col-md-3", "mb-4");

                        const paisImg = document.createElement("img");
                        paisImg.classList.add("img-fluid", "img-thumbnail", "pais-img", "categoria-img");
                        paisImg.src = pais.url_imagen;
                        paisImg.alt = pais.nombre;
                        paisDiv.appendChild(paisImg);

                        const paisBtn = document.createElement("button");
                        paisBtn.classList.add("btn", "w-100", "mt-2", "bg-naranjo", "tx-blanco");
                        paisBtn.textContent = `Ver recetas de ${pais.nombre}`;
                        paisBtn.addEventListener("click", function() {
                            // Redirigir a la página específica del país
                            window.location.href = `comidas-por-pais.html?pais=${encodeURIComponent(pais.nombre)}`;
                        });
                        paisDiv.appendChild(paisBtn);

                        paisesDiv.appendChild(paisDiv);
                    });
                } else {
                    paisesDiv.innerHTML = `<p>Formato de datos inesperado</p>`;
                }
            })
            .catch(error => {
                paisesDiv.innerHTML = `<p>Error al cargar los países: ${error.message}</p>`;
            });
}

    cargarPaises()
});





document.addEventListener("DOMContentLoaded", function() {
    const recetasUrl = "https://apirecetas.iacst.space/recetas"; // Endpoint para obtener todas las recetas
    const recetaRandomLink = document.getElementById("recetaRandomLink");
    const recetaAleatoriaModal = new bootstrap.Modal(document.getElementById('recetaAleatoriaModal'));
    const recetaAleatoriaModalBody = document.getElementById("recetaAleatoriaModalBody");
    const recetaAleatoriaModalLabel = document.getElementById("recetaAleatoriaModalLabel");

    // Función para cargar todas las recetas y seleccionar una aleatoria
    function cargarRecetaAleatoria() {
        fetch(recetasUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.ok && Array.isArray(data.data)) {
                    const recetas = data.data;
                    const receta = recetas[Math.floor(Math.random() * recetas.length)];
                    const modalId = `modalAleatoria`;

                    recetaAleatoriaModalLabel.textContent = receta.nombre;
                    recetaAleatoriaModalBody.innerHTML = `
                        <img class="w-100 mb-3" src="${receta.url_imagen}" alt="${receta.nombre}">
                        <p><strong>Ingredientes:</strong> ${receta.ingrediente.replace(/\\n/g, ', ')}</p>
                        <p><strong>Preparación:</strong> ${receta.preparacion}</p>
                    `;

                    // Mostrar el modal
                    recetaAleatoriaModal.show();
                } else {
                    recetaAleatoriaModalBody.innerHTML = `<p>No se pudo cargar una receta aleatoria.</p>`;
                }
            })
            .catch(error => {
                recetaAleatoriaModalBody.innerHTML = `<p>Error al cargar la receta aleatoria: ${error.message}</p>`;
            });
    }

    // Asignar el evento click al enlace de receta aleatoria
    recetaRandomLink.addEventListener("click", function(event) {
        event.preventDefault();
        cargarRecetaAleatoria();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const recetasUrl = "https://apirecetas.iacst.space/recetas"; // Endpoint para obtener todas las recetas
    const recetaRandomLink = document.getElementById("recetaRandomLink");
    const recetaDelDiaNombre = document.getElementById("recetaDelDiaNombre");
    const recetaDelDiaDescripcion = document.getElementById("recetaDelDiaDescripcion");
    const recetaDelDiaImg = document.getElementById("recetaDelDiaImg");
    const verRecetaDelDiaLink = document.getElementById("verRecetaDelDiaLink");

    function cargarRecetaAleatoria() {
        fetch(recetasUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.ok && Array.isArray(data.data)) {
                    const recetaAleatoria = data.data[Math.floor(Math.random() * data.data.length)];

                    recetaDelDiaNombre.textContent = recetaAleatoria.nombre;
                    recetaDelDiaDescripcion.textContent = recetaAleatoria.preparacion;
                    recetaDelDiaImg.src = recetaAleatoria.url_imagen;
                    recetaDelDiaImg.classList.add("random-img");
                    recetaDelDiaImg.alt = recetaAleatoria.nombre;
                } else {
                    recetaDelDiaDescripcion.textContent = "No hay recetas disponibles.";
                }
            })
            .catch(error => {
                recetaDelDiaDescripcion.textContent = `Error al cargar la receta: ${error.message}`;
            });
    }

    // Cargar una receta aleatoria al acceder a la página
    cargarRecetaAleatoria();

    // Cargar una receta aleatoria al hacer clic en "Receta random"
    recetaRandomLink.addEventListener("click", function(event) {
        event.preventDefault();
        cargarRecetaAleatoria();
    });
});
