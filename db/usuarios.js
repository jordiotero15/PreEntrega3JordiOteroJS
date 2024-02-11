export let usuarioDb = [{
    id: 1,
    user: "Jordi",
    pass: "coderhouse",
    email: "jordiotero15@gmail.com",
    admin: true,
}];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(usuarioDb));