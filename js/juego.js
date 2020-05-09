// Corrección 1: Uncaught ReferenceError: fondoJuego is not defined
// ----------------------------------------------------------------
// Programador: Juan Fernández Sepúlveda
// Fecha Corrección: 9 de Mayo, 2020, 15:12
var fondoJuego;
// Fin Corrección 1
// ----------------
var nave;
var balas;
var timer = 0;
var delay = 400;
var Iniciar = {
    preload: function(){
        juego.load.image("nave", "imagenes/nave.png");
        juego.load.image("bala", "imagenes/bala.png");
        juego.load.image("asteroide", "imagenes/asteroide.png");
        juego.load.image("fondo", "imagenes/fondo.png");
    },
    create: function(){
        //Mostrar en pantalla
        //Ver Corrección 1 
        fondoJuego = juego.add.tileSprite(0, 0, 400, 540, "fondo");
        //Agregar al canvas la nave
        nave = juego.add.sprite(40, juego.height / 2, "nave");
        //Punto de apoyo centrado
        nave.anchor.setTo(0.5);
        //Agrega funciones al juego de física de tipo ARCADE
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        //Activar física para la nave
        juego.physics.arcade.enable(nave, true);
        //Limitar el giro de la nave
        nave.body.allowRotation = false;
        //Crear balas
        balas = juego.add.group();
        balas.enableBody = true;
        balas.setBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, "bala");
        balas.setAll("anchor.x", 0.5);
        balas.setAll("anchor.y", 1);
        balas.setAll("checkWorldBounds", true);
        balas.setAll("outOfBoundsKill", true);
    },
    update: function(){
        //Animar juego
        fondoJuego.tilePosition.x -= 3;
        nave.rotation = juego.physics.arcade.angleToPointer(nave);
        // Disparar balas
        if (juego.input.activePointer.isDown) {
            console.log("->DISPARO");
            this.disparar();
        }
        else {
            console.log("->EN MIRA");
        }
    },
    //Función disparar una sola bala
    disparar: function() {
        timer = juego.time.now + delay;
        var bala = balas.getFirstDead();
        console.log("->bala" + bala);
        if (juego.time.now > timer && balas.countDead() > 0) {
            bala.anchor.setTo(0.5);
            bala.reset(nave.x, nave.y);
            bala.rotation = juego.physics.arcade.angleToPointer(bala);
            juego.physics.arcade.moveToPointer(bala, 300);
        }
    }
};