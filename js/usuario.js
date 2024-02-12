const formLogin = document.getElementById("user__login");
const btnLogin = document.getElementById("btn__login");
//Declaramos el btn para registrarnos
const btnRegister = document.getElementById("btn__register");
//Declaramos los formularios de registro y login
const formRegister = document.getElementById("user__register");
//creamos la vareable para el usuario
//nos va a traer desde el localStorage el usuario que se encuentre actualmente
let usuarios = JSON.parse(localStorage.getItem("usuarios"));

//Utilizamos la funcion constructor para el New User con una clase
//(Admin por defecto es false)
class newUser {
    constructor(user, pass, email) {
        this.id = usuarios.length + 1;
        this.user = user;
        this.pass = pass;
        this.email = email;
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

    if ((userExiste === undefined) || (userExiste.pass !== pass)) {
        alert("Error en su usuario o en la constraseña.");
    } else {
        alert(`Bienvenido ${userExiste.user}`);
        //Creamos el usuario que se va a cargar en nuestra sessionStorage
        //Siempre y cuando pase la prueba de validacion
        let usuario = {
            user: userExiste.user,
            pass: userExiste.pass,
            email: userExiste.email,
            admin: userExiste.admin
        };

        //Ingresamos los datos de dicho usuario a la sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(usuario));

        //Automaticamente luego nos va a llevar a la pagina de inicio
        location.href = "../index.html";
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
    //Tomamos la info de si ese usuario(array) exite o no
    const userNuevo = usuarios.find((usuario) => usuario?.email === nuevoUsuario.email);
    // Comprobamos si el usuario existe y si la contraseña coincide
    if (userNuevo === undefined) {
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        //Mandamos al local storage ese nuevo usuario
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        alert(`Bienvenido ${nuevoUsuario.user}, a continuación será redirigido a la página principal.`);
        location.href = "../index.html";
    } else {
        alert("El usuario ya existe!");
    }
};