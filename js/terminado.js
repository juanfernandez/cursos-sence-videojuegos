var Terminado = {
    preload: function () {

    },
    create: function () {
        juego.add.text(40, 230, "FIN DEL JUEGO", { font: "50px Arial", fill: "#fff" });
        juego.stage.backgroundColor = "#962813";
        if (confirm("¿Desea continuar el juego?")) {
            juego.state.start("Iniciar");
        }
    }
}