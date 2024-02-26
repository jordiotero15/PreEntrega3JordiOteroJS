import { productosDisponibles } from "./main.js";

//si carrito no existe(null) ... por ende se crea una sessionStorage de carrito
JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));

//Creamos evento en el DOM (igual que en el main donde mostramos los productos)
document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito();
});

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

//////////////////
//Llamamos a las tablas
const listaCarrito = document.getElementById("items");
const footCarrito = document.getElementById("totales");
const carritoTable = document.getElementById("carrito");

//////////////////
//Llamamos al btn del carrito y le asignamos un evento
const btnCarrito = document.getElementById("btnCarrito");
btnCarrito.addEventListener("click", () => {
    dibujarCarrito();
    //Cuando se cumpla la condicion del evento(click) lo vamos a ver
    if (carritoTable.style.display === "block") {
        carritoTable.style.display = "none";
    } else {
        carritoTable.style.display = "block"
    }
});

///////////////////////
// Declaramos variable para comprar productos
export const comprarProductos = (idProducto) => {
    //Buscar las propiedades de ese id (del producto a comprar)
    const productos = productosDisponibles.find((productos) => productos.id === idProducto);

    //Desestructuracion
    const { nombre, precio, img, id } = productos;

    //Verificamos si hay producto en el carrito
    const productoCarrito = carrito.find((productos) => productos.id === idProducto);
    //En caso que no exista (Se crea una nueva variable de cantidad y comenzamos con valor de 1)
    if (productoCarrito === undefined) {
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            img: img,
            cantidad: 1
        }
        //Guardamos el producto y lo subimos al storage
        carrito.push(nuevoProductoCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));

    } else {
        //Cuando ya tenemos el producto en el carrito
        //Buscamos el producto con findIndex y lo modificamos con las nuevas cantidades
        const indexProductoCarrito = carrito.findIndex((productos) => productos.id === idProducto);

        //Nos paramos en el lugar del producto y le vamos sumando cuantos productos se eligen
        carrito[indexProductoCarrito].cantidad++;

        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad;

        //Subimos el nuevo array modificado al storage
        sessionStorage.setItem("carrito", JSON.stringify(carrito));


    }
    //Actualizamos nuestro carrito original luego de las condicionales
    carrito = JSON.parse(sessionStorage.getItem("carrito"));

    //Mensaje de confirmacion para compra de productos
    Swal.fire({
        title: `Está a punto de comprar ${nombre}, ¿Deseas continuar?`,
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(`Usted compró con exito ${nombre}`, "", "success");
        } else if (result.isDenied) {
            Swal.fire("Operación cancelada.", "", "info");
        }
    });

};

///////////////////////////////////////////
//Llamamos a la funcion de Dibujar el carrito
const dibujarCarrito = () => {
    //limpiamos el carrito al poner objetos nuevos
    listaCarrito.innerHTML = ``;
    carrito.forEach(productos => {
        //Desestructuracion
        const { img, nombre, cantidad, precio, id } = productos;
        let body = document.createElement("tr");

        body.className = "productos_carrito";
        body.innerHTML = `
      <th><img id="fotoProductoCarrito" class="card-img-top" src="${img}" class="card-img-top"></th>
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>${precio / cantidad}</td>
      <td>${precio}</td>
      <td><button id="+${id}" class="btn btn-succes">+</button>
          <button id="-${id}" class="btn btn-danger">-</button>
      </td>
      `;
        //Lo agregamos a nuestro body
        listaCarrito.append(body);
        //llamamos a los btn de + y -
        const btnAgregar = document.getElementById(`+${id}`);
        const btnRestar = document.getElementById(`-${id}`);
        //Agregamos eventos
        btnAgregar.addEventListener("click", () => aumentarCantidad(id));
        btnRestar.addEventListener("click", () => restarCantidad(id));

    });
    dibujarFooter();
}

//////////////////////////
//Creamos funcion dibujar footer
const dibujarFooter = () => {
    //Debemos revisar si hay productos en el carro, en caso contrario dejar un mensaje
    if (carrito.length > 0) {
        //Limpiamos el total
        footCarrito.innerHTML = "";
        let footer = document.createElement("tr");

        footer.innerHTML = `
      <th><b>Total:</b></th>
      <td></td>
      <td>${generarTotales().cantidadTotal}</td>
      <td></td>
      <td>${generarTotales().costoTotal}</td>
      `;
        //Lo mostramos
        footCarrito.append(footer);
    } else {
        footCarrito.innerHTML = `<h3>No hay productos en carrito<h/3>`;
    }

}

///////////////////////////////////////////////
//Utilizamos funcion de orden superior(Reduce) para obtener los totales
const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0);
    const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0);

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
};

////////////////////////////////////////
//Hacemos funcionar a los botos del + y - del carrito
const aumentarCantidad = (id) => {
    //buscamos primero en el indice donde esta ese producto
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);
    //nos posicionamos en el lugar del producto y obtenemos su precio
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad;
    //conociendo su precio modificamos su cantidad
    carrito[indexProductoCarrito].cantidad++;
    //ahora modificamos su precio
    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad;

    //Guardamos y act. el carrito
    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    //Actualizamos carrito
    dibujarCarrito();

}

const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);

    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad;

    carrito[indexProductoCarrito].cantidad--;

    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad;

    if (carrito[indexProductoCarrito].cantidad === 0) {
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    dibujarCarrito();
};
/////////////////////////////////////////////////////////////////