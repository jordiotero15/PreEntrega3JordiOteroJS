//Importamos funciones
import { comprarProductos } from "./cart.js";

export let productosDisponibles;


//////Pruebbaaa
const prueba = document.getElementById("prueba");

const pruebaDos = document.getElementById("prueba__dos");


//Traemos el div para la card de productos
const divProductos = document.getElementById("productos");

//Traemos el div para usuario login
const userLogin = document.getElementById("userLogin");

//Traemos el buscador para filtrar productos
const filterInput = document.getElementById("filter__input");

//Filtro por categorias segun pick en lista
const filterLista = document.getElementById("filter__lista");

//Filtro por nombre segun pick en la lista
const filterNombre = document.getElementById("filter__nombre");

//Filtro por precio segun pick en la lista
const filterPrecio = document.getElementById("filter__precio");

//Llamamos al usuario logueado
let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario"));

////////////
//Funciones

//1-Modelo de la carta de los productos
const generarCartaProducto = (producto) => {
    const { id, nombre, categorias, precio, img, alt } = producto;

    let card = document.createElement("div");
    card.className = "card col-xl-4 col-md-6 col-sm-12 cardCategorias";
    card.innerHTML = `
         <div class="card col-xl-2 col-md-6 col-sm-12 ">
             <img src="${img}" class="card-img-top" alt="${alt}">
             <div class="card-body textoCards">
                 <h4 class="card-title">${nombre}</h4>
                 <p class="card-text"> ${categorias} </p>
                 <p class="card-text">$${precio} </p>
                 <button id="btnComprar${id}" class="btn btn-primary">Comprar</button>
             </div>
         </div>
        `;
    const btnComprar = card.querySelector(`#btnComprar${id}`);
    btnComprar.addEventListener("click", () => comprarProductos(id));

    return card;
};
//2-Generamos función para mostrar el modelo y las cartas de productos
const generarCartasProductos = (productos) => {
    // Limpiamos el contenido anterior
    divProductos.innerHTML = "";
    productos.forEach(producto => {
        const carta = generarCartaProducto(producto);
        divProductos.appendChild(carta);
    });
}

//Generamos una Funcion para mostrar las cards de los productos utilizando asincronia y fetch
const generarCardsProductos = async () => {
    try {
        // Limpiamos el contenido anterior de divProductos
        divProductos.innerHTML = "";
        const response = await fetch("../db/productos.json");
        productosDisponibles = await response.json();
        // productosDisponibles = productos;
        //Llamamos a la funcion para mostrar las cartas de los productos disponibles
        generarCartasProductos(productosDisponibles);
    } catch (error) {
        console.log(error);
    }
}

//////////////////////////
//Creamos Evento en el DOM para generar el siguiente documento
document.addEventListener("DOMContentLoaded", () => {
    //Declaramos la varible de user para poder utilizar el nombre de usuario
    if (usuarioLogueado === null) {
        //Creamos el enlace para ingresar en caso de no estar logueado
        const a = document.createElement("a");
        // Verificamos si el usuario está en index.html
        if (window.location.pathname.includes("index.html")) {
            // Si está en index.html, redirigimos a otra página
            a.href = "./html/ingreso.html";
        } else {
            a.href = "./ingreso.html";
        }
        a.innerHTML = `Ingresar`;
        userLogin.append(a);
    } else {
        prueba.classList.add("nuevaClase");
        pruebaDos.classList.add("nuevaClaseDos");
        // Quitar una clase del elemento
        prueba.classList.remove("containerGoogle");
        pruebaDos.classList.remove("separadorHeader");


        //En caso contrario aparece nombre de usuario
        //Y creamos boton para cierre de sesión
        const p = document.createElement("p");
        const close = document.createElement("button");
        close.classList.add("btnCerrar");
        p.classList.add("userName");
        p.innerHTML = `${usuarioLogueado.user}`;
        close.id = "cerrar__session";
        close.innerHTML = `Cerrar sesión`;
        close.addEventListener("click", () => {
            //Hacemos que se elimine de la sessionStorage ese usuario logueado
            sessionStorage.removeItem("usuario");
            //Recargamos la pag
            location.reload();
        })
        //Agregamos a ambos
        userLogin.appendChild(p);
        userLogin.appendChild(close);
    }

    //Llamamos a la funcion para mostrar los productos
    generarCardsProductos();
});

/////////////////////
//FILTROS
//1-Filter Input
filterInput.addEventListener("keyup", (e) => {
    // Seteamos que en productosDisponible filtre el producto con el valor.nombre, hacerlo minuscula y que incluya el target value
    const productosFilter = productosDisponibles.filter((producto) => producto.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
    generarCartasProductos(productosFilter);

});

//////////////////////////
//2-Filter por lista
filterLista.addEventListener("click", (e) => {
    e.preventDefault(); // Evitamos que se ejecute el comportamiento predeterminado del enlace
    const categoriaSeleccionada = e.target.innerHTML;
    console.log("Categoría seleccionada:", categoriaSeleccionada); // Verificar que se está capturando la categoría correcta

    let productosFiltrados;

    if (categoriaSeleccionada.toLowerCase() !== "todos") {
        productosFiltrados = productosDisponibles.filter((producto) => producto.categorias.includes(categoriaSeleccionada));
    } else {
        productosFiltrados = productosDisponibles;
    }
    generarCartasProductos(productosFiltrados);
});

//////////////////////////
//3-Filter por Nombre
filterNombre.addEventListener("click", (e) => {
    filtrarPorNombre(e.target.innerHTML);
});

////Creamos funcion para descriminar por nombre
const filtrarPorNombre = (orden) => {
    //Creamos esta variable para decirle que copie el orden que le dimos al array
    let productos;
    //Utilizamos el sort para que ordene sobre el array existente
    if (orden === "Nombre (Ascendente)") {
        productos = productosDisponibles.sort((a, b) => {
            //Si el nombre por el que empieza tiene un grado mayor que la del otro nombre me devuelve un valor(Bolean) y sigue con el sig.
            if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                return 1;
            } else if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    } else if (orden === "Nombre (Descendente)") {
        productos = productosDisponibles.sort((a, b) => {
            if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                return 1;
            } else if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    generarCartasProductos(productos);
};

//////////////////////////
//4-Filter por precio
filterPrecio.addEventListener("click", (e) => {
    const orden = e.target.innerHTML;
    let productos;
    if (orden === "Precio (Menor a Mayor)") {
        productos = productosDisponibles.sort((a, b) => a.precio - b.precio);
    } else if (orden === "Precio (Mayor a Menor)") {
        productos = productosDisponibles.sort((a, b) => b.precio - a.precio);
    }
    generarCartasProductos(productos);
});