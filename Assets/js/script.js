let librosCargados = [];
let libros_defecto = ["el señor de los anillos", "juego de tronos","sherlock holmes","don quijote","crepusculo"]


/* ------------------------------------------ */
/* FUNCIONES GRANDES */


// Función para buscar y mostrar libros
function buscarLibros(termino) {
    /* VARIABLE DE LA URL DE LA API */
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}&limit=12`;
    /* PIDIENDOLE DATOS A LA URL */
  fetch(url)
    /* CONVIERTE EL VALOR DE LA API A JSON PARA QUE SEA MAS FACIL Y LEGIBLE EN JS */
    .then(response => response.json())
    
    .then(data => {
      /* DATA.DOCS ES UNA LISTA DE LOS LIBROS ENCONTRADOS */
      
      /* ACA VERIFICA SI DATA ENCONTRO ALGO 
      (SI EN EL ARREGLO ES 0 TAMBIEN ES PORQUE NO SE ENCONTRO NADA :P) */
      
      if (!data.docs || data.docs.length === 0) {
        document.getElementById("libros").innerHTML = "<p>No se encontraron libros.</p>";
        return;
      }

      librosCargados = data.docs; /* ACA GUARDAMOS LOS LIBROS PARA FUTUROS FILTROS */
      mostrarLibros(librosCargados); /* ACA EJECUTAMOS LA FUNCION AL MOMENTO DE CARGAR LA PAGINA */
    })
    /* CATCH ES UNA FUNCION QUE SE EJECUTA SI HAY ALGUN ERROR*/
    .catch(error => {
      /* SI HAY UN ERROR, SE MUESTRA EN LA CONSOLA QUE HUBO UN ERROR */
      console.error("Error al buscar libros:", error);
      /* y SE MUESTRA EN EL HTML EN EL CONTENEDOR DE LOS LIBROS QUE HUBO UN ERROR*/
      document.getElementById("libros").innerHTML = "<p>Error cargando libros.</p>";
    });
}




// Función para renderizar los libros (se puede reutilizar)
function mostrarLibros(libros) {
  const contenedor = document.getElementById("libros");
  contenedor.innerHTML = "";
    /* SI NO HAY NADA EN EL ARREGLO DE LOS LIBROS MOSTRAMOS EL MENSAJE*/
  if (libros.length === 0) {
    contenedor.innerHTML = "<p>No hay libros para mostrar con ese filtro.</p>";
    return;
  }
  /* AQUI RECORREMOS LA LISTA DE CADA LIBRO*/
  libros.forEach(libro => {
    const portada = libro.cover_i
      ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
      : "https://via.placeholder.com/128x193?text=Sin+portada";

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card h-100">
      
        <img src="${portada}" class="card-img-fluid" style="border-radius: 10%; height: 300px; width: 200px;  margin-left: 20%; margin-right:25%;" alt="Portada de ${libro.title}">
        <div class="card-body">
          <h5 class="card-title">${libro.title}</h5>
          <p class="card-text">Autor: ${libro.author_name ? libro.author_name.join(", ") : "Desconocido"}</p>
          <p class="card-text"><small class="text-muted">Publicado en ${libro.first_publish_year || "Desconocido"}</small></p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}






/* ----------------------------------------- */
/* FUNCIONES PEQUEÑAS */


// Filtro: libros publicados antes del año dado
function filtrarPorAño(limite) {
  const filtrados = librosCargados.filter(libro =>
    libro.first_publish_year && libro.first_publish_year < limite
  );
  mostrarLibros(filtrados);
}

// Filtro: solo libros con portada
function filtrarConPortada() {
  const filtrados = librosCargados.filter(libro => libro.cover_i);
  mostrarLibros(filtrados);
}

// Botón de búsqueda
document.getElementById("button-addon2").addEventListener("click", () => {
  const termino = document.getElementById("input-busqueda").value.trim();
  /* SI  TERMINO TIENE UN VALOR, OSEA NO ESTA VACIO*/
  if (termino !== "") {
  /*  SE EJECUTA LA FUNCION CON EL PARAMETRO QUE ESCRIBIMOS*/
    buscarLibros(termino);
  }
});

/* FUNCION QUE ME PERMITE OBTENER UN NUMERO ALEATORIO CON UN PARAMETRO*/
function obtenerLibroAleatorio(lista) {

  /* LA VARIABLE INDICE ALMACENA EL VALOR OBTENIDO DEL NUMERO ALEATORIO ENTRE 0 Y EL TOTAL DE LA LISTA
   LA CANTIDAD TOTAL DE LA CANTIDAD DE LA LISTA */
  const indice = Math.floor(Math.random() * lista.length);


  /* LUEGO LO RETORNA PARA QUE NO SE PIERDA EL VALOR 
  SI FUERA UNA VARIABLE QUE NO ESTA EN LA FUNCION, NO SERIA NECESARIO RETORNAR */
  return lista[indice];
}


// BUSCA UNO ALEATORIO DE LA LISTA LIBROS_DEFECTOS
buscarLibros(obtenerLibroAleatorio(libros_defecto));