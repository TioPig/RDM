document.addEventListener("DOMContentLoaded", function() {
    const paisesUrl = "https://apirecetas.iacst.space/pais/";
    const recetasUrlBase = "https://apirecetas.iacst.space/recetas/pais/";
    const paisesDiv = document.getElementById("paises");
    const recetasDiv = document.getElementById("recetas");
    const nombrePais = document.getElementById("nombrePais"); // Seleccionar el elemento del título
    const paisPredeterminado = "American"; // País predeterminado en caso de no recibir parámetros

    // Función para cargar países
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
                        paisBtn.textContent = `${pais.nombre}`;
                        paisBtn.addEventListener("click", function() {
                            cargarRecetas(pais.nombre);
                            nombrePais.textContent = pais.nombre; // Actualizar el título con el nombre del país
                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazar hacia arriba
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

    // Función para cargar recetas
    function cargarRecetas(pais) {
        const recetasUrl = recetasUrlBase + (pais ? pais : ""); // Si no se proporciona país, se cargan todas las recetas

        // Limpiar recetas anteriores
        recetasDiv.innerHTML = '';

        fetch(recetasUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.ok && Array.isArray(data.data)) {
                    data.data.forEach((receta, index) => {
                        const modalId = `modal${index}`;
                        const recetaElement = document.createElement("div");
                        recetaElement.classList.add("col-md-3");
                        recetaElement.innerHTML = `
                            <div class="card mb-4">
                                <img src="${receta.url_imagen}" class="card-img-top img-thumbnail" alt="${receta.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${receta.nombre}</h5>
                                    <p class="card-text">País: ${receta.nombre_pais}
                                    <br> Categoria: ${receta.nombre_cat}</p>
                                    <button class="btn bg-naranjo tx-blanco" type="button" data-bs-toggle="modal" data-bs-target="#${modalId}">Ver receta</button>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="${modalId}Label">${receta.nombre}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <img class="w-100 mb-3" src="${receta.url_imagen}" alt="${receta.nombre}">
                                            <p><strong>Ingredientes:</strong> ${receta.ingrediente.replace(/\\n/g, ', ')}</p>
                                            <p><strong>Preparación:</strong> ${receta.preparacion}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        recetasDiv.appendChild(recetaElement);
                    });
                    nombrePais.textContent = pais ? pais : "Todos los Países"; // Actualizar el título con el nombre del país o "Todos los Países" si no se proporciona país
                } else {
                    recetasDiv.innerHTML = `<p>No hay recetas disponibles para este país.</p>`;
                }
            })
            .catch(error => {
                recetasDiv.innerHTML = `<p>Error al cargar las recetas: ${error.message}</p>`;
            });
    }

    // Leer el parámetro de la consulta "pais" de la URL
    const params = new URLSearchParams(window.location.search);
    const pais = params.get('pais');

    // Cargar los países y las recetas del país si se proporciona un parámetro "pais" en la URL, de lo contrario, cargar el país predeterminado
    cargarPaises();
    cargarRecetas(pais ? pais : paisPredeterminado);

});
