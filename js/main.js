

//Div de Productos
const divProductos = document.getElementById("productos");
//Traemos el buscador para filtrar productos


//Mostramos productos Disponibles ... y la exportamos a otros archivos .js
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));



//Creamos Evento Para generar el documento siguiente (Son eventos que comienzan ni bien se abre la pagina)
document.addEventListener("DOMContentLoaded", () => {
    // if (usuarioLogueado === null) {
    //     const a = document.createElement("a");
    //     //Le colocamos la reedirigirse
    //     a.href = "./html/usuarios.html";
    //     a.innerHTML = `Login`;
    //     userLogin.append(a);
    // } else {
    //     const p = document.createElement("p");
    //     const close = document.createElement("button");

    //     p.innerHTML = `Bienvenido ${usuarioLogueado.user}`;

    //     close.id = "cerra__session";
    //     close.innerHTML = `Cerrar session`;
    //     close.addEventListener("click", () => {
    //         alert(`Gracias por comprar en nuestra tienda ${usuarioLogueado.user}. Usuario deslogueado`);
    //         //Hacemos que se elimine de la sessionStorage ese usuario logueado
    //         sessionStorage.removeItem("usuario");
    //         //Recargamos la pag
    //         location.reload();
    //     })

    //     //Agregamos ambas cosas del nodo de antes
    //     userLogin.appendChild(p);
    //     userLogin.appendChild(close);
    // }


    generarCardsProductos(productosDisponibles);
});

//Generamos una Funcion para los productos
export const generarCardsProductos = (productos) => {
    // Limpiar el contenido anterior de divProductos
    divProductos.innerHTML = "";
    productos.forEach(productos => {
        //Utilizamos la propiedad de desestructuracion la cual llamamos del array de los productos
        //Esto te libera a borrar el producto de cada variable ${producto.nombre} ahora ${nombre}
        const { id, nombre, categorias, precio, img, alt } = productos;

        //Creamos el formato de la carta
        let card = document.createElement("div");

        card.className = "producto";
        card.innerHTML = `
         <div class="card" style="width: 18rem;">
         <img src="${img}" class="card-img-top" alt="${alt}">
         <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
         <p class="card-text">${categorias} </p>
         <p class="card-text">$${precio} </p>
         <button id="btnComprar${id}" class="btn btn-primary">Comprar</button>
        </div>
        </div>
        `;
        //Mostramos las cards
        divProductos.appendChild(card);
        // //Debemos declarar el id del elemento para obtener cual es el producto seleccionado por eso el ${productos.id}
        // const btnComprar = document.getElementById(`btnComprar${productos.id}`);
        // //Evento al hacer click y llamamos a la funcion de comprar producto declarada en cart.js
        // btnComprar.addEventListener("click", () => comprarProductos(id));

    });
console.log(divProductos);

};

