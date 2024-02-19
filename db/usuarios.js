export let usuarioDb = [{
    id: 1,
    user: "Jordi",
    email: "jordiotero15@gmail.com",
    pass: "coderhouse",
    admin: true,
}];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(usuarioDb));