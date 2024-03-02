export let usuarioDb = [{
    id: 1,
    user: "Jordi",
    email: "jordiotero15@gmail.com",
    pass: "coderhouse",
}];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(usuarioDb));