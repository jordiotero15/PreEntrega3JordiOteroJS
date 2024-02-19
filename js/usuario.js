const formLogin = document.getElementById("user__login");
const btnLogin = document.getElementById("btn__login");
//Declaramos el btn para registrarnos
const btnRegister = document.getElementById("btn__register");
//Declaramos los formularios de registro y login
const formRegister = document.getElementById("user__register");
//creamos la vareable para el usuario
//nos va a traer desde el localStorage el usuario que se encuentre actualmente
let usuarios = JSON.parse(localStorage.getItem("usuarios"));

//Funciones
//Declaramos una funcion para realizar una accion en el tiempo deseado
function realizarAccion(accion, tiempo) {
    setTimeout(accion, tiempo);
}
//Redirecciona al index.html
function irInicio() {
    location.href = "../index.html";
}
//Redirecciona al ingreso.html
function irIngreso() {
    location.href = "./html/ingreso.html";
}

//Mensaje de bienvenida mediante SweetAlert
const bienvenidaUsuarios = (user) => {
    let timerInterval;
    Swal.fire({
        title: `Bienvenido ${user}!`,
        html: "Panadería París, tú segundo hogar.",
        timer: 2000,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
};


///////////////////////////

//Utilizamos la funcion constructor para el New User con una clase
//(Admin por defecto es false)
class newUser {
    constructor(user, email, pass) {
        this.id = usuarios.length + 1;
        this.user = user;
        this.email = email;
        this.pass = pass;
        this.admin = false;
    };
};

btnLogin.addEventListener("click", (e) => {
    //Mediante el paramatro "e" hacemos referencia al evento para evitar que se recargue la pag (debido al btn con funcion submit)
    e.preventDefault();
    //Seleccionamos del primero al ultimo hijo en este caso del form User Login para conocer los datos de usuario
    const email = formLogin.children[0].children[0].children[1].value;
    //Buscamos la info de la contraseña como el paso anterior
    const pass = formLogin.children[0].children[1].children[1].value;

    validarYLogin(email, pass);

});

const validarYLogin = (email, pass) => {
    //Tomamos la info de si ese usuario(array) exite o no
    const userExiste = usuarios.find((usuario) => usuario?.email === email);
    //Declaramos la varible de user para poder utilizar el nombre de usuario
    let user = userExiste.user;

    if ((userExiste === undefined) || (userExiste.pass !== pass)) {
        // Mensaje de Error usando SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error en su usuario o contraseña!",
        });
    } else {
        //Mensaje de bienvenida al usuario
        bienvenidaUsuarios(user);

        //Creamos el usuario que se va a cargar en nuestra sessionStorage
        //Siempre y cuando pase la prueba de validacion
        let usuario = {
            user: userExiste.user,
            email: userExiste.email,
            pass: userExiste.pass,
            admin: userExiste.admin
        };

        //Ingresamos los datos de dicho usuario a la sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(usuario));

        // Llamamos a la función para que ejectue la acción después de 2 segundos
        realizarAccion(irInicio, 2000);
    }
};

//Creamos evento para obtener los datos y registrar nuevo usuario
btnRegister.addEventListener("click", (e) => {
    //Mediante el paramatro "e" hacemos referencia al evento para evitar que se recargue la pag (debido al btn con funcion submit)
    e.preventDefault();
    //Seleccionamos del primero al ultimo hijo en este caso del form User Register para conocer los datos de usuario
    const user = formRegister.children[0].children[0].children[1].value;

    const email = formRegister.children[0].children[1].children[1].value;

    const pass = formRegister.children[0].children[2].children[1].value;

    // //Para crear nuevo usuario y le pasamos el constructor
    const nuevoUsuario = new newUser(user, email, pass);

    validarYRegistrar(nuevoUsuario);

});

const validarYRegistrar = (nuevoUsuario) => {
    //Declaramos la varible de user para poder utilizar el nombre de usuario
    let user = nuevoUsuario.user;
    //Tomamos la info de si ese usuario(array) exite o no
    const userNuevo = usuarios.find((usuario) => usuario?.email === nuevoUsuario.email);

    // Comprobamos si el usuario existe y si la contraseña coincide
    if (userNuevo === undefined) {
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        //Mandamos al local storage ese nuevo usuario
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        //Mensaje de bienvenida
        bienvenidaUsuarios(user);

        realizarAccion(irInicio, 3000);
    } else {
        // Mensaje de Error usando SweetAlert
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Error el usuario ya existe!",
        });
    }
};