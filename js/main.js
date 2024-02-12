//Importamos funciones
import { comprarProductos } from "./cart.js";


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

//Mostramos productos Disponibles ... y la exportamos a otros archivos .js
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));

//Llamamos al usuario logueado
let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario"));


//////////////////////////
//Creamos Evento Para generar el documento siguiente (Son eventos que comienzan ni bien se abre la pagina)
document.addEventListener("DOMContentLoaded", () => {
    if (usuarioLogueado === null) {
        //Creamos el enlace para ingresar en caso de no estar logueado
        const a = document.createElement("a");
        a.href = "./html/ingreso.html";
        a.innerHTML = `Ingresar`;
        userLogin.append(a);
    } else {
        //En caso contrario aparece nombre de usuario
        //Y creamos boton para cierre de sesión
        const p = document.createElement("p");
        const close = document.createElement("button");
        p.innerHTML = `${usuarioLogueado.user}`;
        close.id = "cerrar__session";
        close.innerHTML = `Cerrar sesión`;
        close.addEventListener("click", () => {
            alert(`Gracias por comprar en nuestra tienda ${usuarioLogueado.user}.`);
            //Hacemos que se elimine de la sessionStorage ese usuario logueado
            sessionStorage.removeItem("usuario");
            //Recargamos la pag
            location.reload();

        })

        //Agregamos a ambos
        userLogin.appendChild(p);
        userLogin.appendChild(close);
    }


    generarCardsProductos(productosDisponibles);
});

/////////////////////////
//Generamos una Funcion para mostrar las cards de los productos
export const generarCardsProductos = (productos) => {
    // Limpiamos el contenido anterior de divProductos
    divProductos.innerHTML = "";
    productos.forEach(productos => {
        //Utilizamos la propiedad de desestructuracion
        const { id, nombre, categorias, precio, img, alt } = productos;

        //Creamos el formato de la carta
        let card = document.createElement("div");

        card.className = "producto";
        card.innerHTML = `
         <div class="card" style="width: 18rem;">
         <img src="${img}" class="card-img-top" alt="${alt}">
         <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
         <p class="card-text"> ${categorias} </p>
         <p class="card-text">$${precio} </p>
         <button id="btnComprar${id}" class="btn btn-primary">Comprar</button>
        </div>
        </div>
        `;
        //Mostramos las cards
        divProductos.appendChild(card);
        // //Debemos declarar el id del elemento para obtener cual es el producto seleccionado por eso el ${productos.id}
        const btnComprar = document.getElementById(`btnComprar${productos.id}`);
        //Evento al hacer click y llamamos a la funcion de comprar producto declarada en cart.js
        btnComprar.addEventListener("click", () => comprarProductos(id));

    });

};

/////////////////////
// Filter Input
filterInput.addEventListener("keyup", (e) => {
    //Seteamos que en productosDisponible filtre el producto con el valor.nombre hacerlo minuscula y que incluya el target value
    const productosFilter = productosDisponibles.filter((producto) => producto.nombre.toLowerCase().includes(e.target.value));

    //Una vez tengo el nuevo arreglo, sobre escribo para generar la carta
    productosDisponibles = productosFilter;

    if (e.target.value !== "") {
        generarCardsProductos(productosFilter);
    } else {
        productosDisponibles = JSON.parse(localStorage.getItem("productos"));
        generarCardsProductos(productosDisponibles);

    }

});

//////////////////////////
//Filtro por categoria segun pick en lista
filterLista.addEventListener("click", (e) => {
    const productosFilter = productosDisponibles.filter((producto) => producto.categorias.toLowerCase().includes(e.target.innerHTML.toLowerCase()));

    //Una vez tengo el nuevo arreglo, sobre escribo para generar la carta
    productosDisponibles = productosFilter;

    if (e.target.innerHTML !== "Todos") {
        generarCardsProductos(productosFilter);
    } else {
        productosDisponibles = JSON.parse(localStorage.getItem("productos"));
        generarCardsProductos(productosDisponibles);

    }

});

//////////////////////////
//Filter por Nombre
filterNombre.addEventListener("click", (e) => {
    filtrarPorNombre(e.target.innerHTML);
});

//Creamos Funcion
const filtrarPorNombre = (orden) => {
    //Creamos esta variable para decirle que copia el orden que le dimos al array
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

    generarCardsProductos(productos);
}

//////////////////////////
//Filtro por precio

filterPrecio.addEventListener("click", (e) => {
    const orden = e.target.innerHTML;
    let productos;
    if (orden === "Precio (Menor a Mayor)") {
        productos = productosDisponibles.sort((a, b) => a.precio - b.precio);
    } else if (orden === "Precio (Mayor a Menor)") {
        productos = productosDisponibles.sort((a, b) => b.precio - a.precio);
    }

    generarCardsProductos(productos)
})