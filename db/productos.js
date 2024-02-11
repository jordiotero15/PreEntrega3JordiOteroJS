export const productos = [
    { id: 1, nombre: "Margaritas", categorias: "Bizcochos dulces", precio: 490, img: "../img/tienda/bizcochosMargarita.jpeg", alt: "Bizcochos Dulces Margarita" },
    { id: 2, nombre: "Croissant dulce", categorias: "Bizcochos dulces", precio: 490, img: "../img/tienda/croissant.jpg", alt: "Bizcochos Dulces Croissant" },
    { id: 3, nombre: "Croissant rellenos de chocolate", categorias: "Bizcochos dulces", precio: 490, img: "../img/tienda/croissantDulces.jpg", alt: "Bizchochos Dulces Croissant Relleno de Chocolate" },
    { id: 4, nombre: "Palmitas", categorias: "Bizcochos dulces", precio: 490, img: "../img/tienda/palmitas.jpg", alt: "Palmitas dulces" },
    { id: 5, nombre: "Croissant Salado", categorias: "Bizcochos salados", precio: 490, img: "../img/tienda/croissantSalado.jpg", alt: "Bizcocho Croissant salado" },
    { id: 6, nombre: "Croissant relleno de queso", categorias: "Bizcochos salados", precio: 490, img: "../img/tienda/croissantQueso.jpg", alt: "Bizcochos salados Croissant relleno de queso" },
    { id: 7, nombre: "Pan c/grasa", categorias: "Bizcochos salados", precio: 490, img: "../img/tienda/bizcochoPanConGrasa.jpg", alt: "Bizcochos pan con grasa" },
    { id: 8, nombre: "Pan c/grasa c/chicharrones", categorias: "Bizcochos salados", precio: 490, img: "../img/tienda/bizcochosPanGrasaChicha.jpg", alt: "Bizcochos pan con grasa con chicharrones" },
    { id: 9, nombre: "Pan Flauta", categorias: "Panes", precio: 58, img: "../img/tienda/panFlauta.webp", alt: "Pan Flauta" },
    { id: 10, nombre: "Pan Porteño", categorias: "Panes", precio: 263, img: "../img/tienda/panPorteno.webp", alt: "Pan Porteño" },
    { id: 11, nombre: "Tortuga Clásica", categorias: "Panes", precio: 263, img: "../img/tienda/panTortuga.webp", alt: "Tortuga Clásica" },
    { id: 12, nombre: "Tortuga c/sésamo", categorias: "Panes", precio: 330, img: "../img/tienda/panTortugaSesamo.webp", alt: "Tortuga c/sésamo" },
    { id: 13, nombre: "Galletas bañadas en chocolate", categorias: "Galleteria", precio: 590, img: "../img/tienda/galletasChocolate.jpeg", alt: "Galletas bañadas en chocolate" },
    { id: 14, nombre: "Galletas dulces surtidas", categorias: "Galleteria", precio: 590, img: "../img/tienda/galletasDulcesSurtidas.jpg", alt: "Galletas dulces surtidas" },
    { id: 15, nombre: "Galletas de Polvoron", categorias: "Galleteria", precio: 590, img: "../img/tienda/galletasPolvoron.jpeg", alt: "Galletas de Polvoron" },
    { id: 16, nombre: "Galletas de Queso", categorias: "Galleteria", precio: 590, img: "../img/tienda/galletasQueso.png", alt: "Galletas de Queso" },
];

JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));



