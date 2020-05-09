var Iniciar = {
    preload: function(){
        juego.load.image("nave", "imagenes/nave.png");
        juego.load.image("bala", "imagenes/bala.png");
        juego.load.image("asteroide", "imagenes/asteroide.png");
        juego.load.image("fondo", "imagenes/fondo.png");
    },
    create: function(){
        //Mostrar en pantalla
        juego.add.tileSprite(0, 0, 400, 540, "fondo");
    },
    update: function(){

    }
}