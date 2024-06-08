document.addEventListener("DOMContentLoaded", function() {
    const categoriasUrl = "https://apirecetas.iacst.space/categoria/";
    const recetasUrlBase = "https://apirecetas.iacst.space/recetas/";
    const categoriasDiv = document.getElementById("categorias");
    const recetasDiv = document.getElementById("recetas");
    const nombreCategoria = document.getElementById("nombreCategoria"); // Seleccionar el elemento del título
    const categoriaPredeterminada = "Dessert"; // Categoría predeterminada en caso de no recibir parámetros

    // Función para cargar categorías
    function cargarCategorias() {
        fetch(categoriasUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.data)) {
                    data.data.forEach((categoria, index) => {
                        const categoriaDiv = document.createElement("div");
                        categoriaDiv.classList.add("col-md-3", "mb-4");
                        
                        const categoriaImg = document.createElement("img");
                        categoriaImg.classList.add("img-fluid", "img-thumbnail", "categoria-img");
                        categoriaImg.src = categoria.url_imagen;
                        categoriaImg.alt = categoria.nombre;
                        categoriaDiv.appendChild(categoriaImg);

                        const categoriaBtn = document.createElement("button");
                        categoriaBtn.classList.add("btn", "w-100", "mt-2", "bg-naranjo", "tx-blanco");
                        categoriaBtn.textContent = `Ir a ${categoria.nombre}`;
                        categoriaBtn.addEventListener("click", function() {
                            cargarRecetas(categoria.nombre);
                            nombreCategoria.textContent = categoria.nombre; // Actualizar el título con el nombre de la categoría
                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazar hacia arriba
                        });
                        categoriaDiv.appendChild(categoriaBtn);

                        categoriasDiv.appendChild(categoriaDiv);
                    });
                } else {
                    categoriasDiv.innerHTML = `<p>Formato de datos inesperado</p>`;
                }
            })
            .catch(error => {
                categoriasDiv.innerHTML = `<p>Error al cargar las categorías: ${error.message}</p>`;
            });
    }

    // Función para cargar recetas
    function cargarRecetas(categoria) {
        const recetasUrl = recetasUrlBase + (categoria ? "categoria/" + categoria : ""); // Si no se proporciona categoría, se cargan todas las recetas

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
                            <div class="card mb-4" style="width: 18rem;">
                                <img src="${receta.url_imagen}" class="card-img-top img-thumbnail" alt="${receta.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${receta.nombre}</h5>
                                    <p class="card-text">Categoria: ${receta.nombre_cat}
                                    <br> País: ${receta.nombre_pais}
                                    </p>
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
                    nombreCategoria.textContent = categoria ? categoria : "Todas las Recetas"; // Actualizar el título con el nombre de la categoría o "Todas las Recetas" si no se proporciona categoría
                } else {
                    recetasDiv.innerHTML = `<p>No hay recetas disponibles para esta categoría.</p>`;
                }
            })
            .catch(error => {
                recetasDiv.innerHTML = `<p>Error al cargar las recetas: ${error.message}</p>`;
            });
    }

    // Leer el parámetro de la consulta "categoria" de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');

    // Cargar las recetas de la categoría si se proporciona un parámetro "categoria" en la URL, de lo contrario, cargar la categoría predeterminada
    cargarRecetas(categoria ? categoria : categoriaPredeterminada);
    cargarCategorias()

    // Actualizar el año en el texto
});
