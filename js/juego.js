// Corrección 1: Uncaught ReferenceError: fondoJuego is not defined
// ----------------------------------------------------------------
// Programador: Juan Fernández Sepúlveda
// Fecha Corrección: 9 de Mayo, 2020, 15:12
// Fin Corrección 1
// ----------------
// Corrección 2: no dispara
// ----------------------------------------------------------------
// Programador: Juan Fernández Sepúlveda
// Solución:
// https://phaser.io/examples/v2/input/mouse-buttons
// https://phaser.io/examples/v2/arcade-physics/shoot-the-pointer
// https://www.html5gamedevs.com/topic/26467-phaser-js-weapon-plugin/
// https://www.html5gamedevs.com/topic/16065-what-is-anchor-xy-used-for/
// Ejemplos:
// http://juanfernandez.cl/team-jg-ng-jf/Galaga/
// http://juanfernandez.cl/team-jg-ng-jf/Galaga/shoot_the_pointer.html
// Fecha Corrección: 10 de Mayo, 2020, 16:30
// Fin Corrección 2
// ----------------
var fondoJuego;
var nave;
var balas;
var malos;
var aparecer;
var delay = 400;
var timer = 0;
var fireRate = delay;//delay
var nextFire = timer;//timer

var Iniciar = {
    preload: function () {
        juego.load.image("nave", "imagenes/nave.png");
        juego.load.image("LASER", "imagenes/bala.png");
        juego.load.image("asteroide", "imagenes/asteroide.png");
        juego.load.image("fondo", "imagenes/fondo.png");
    },
    create: function () {
        //Agrega funciones al juego de física de tipo ARCADE
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        //Mostrar en pantalla
        fondoJuego = juego.add.tileSprite(0, 0, 400, 540, "fondo");

        //Crear balas
        balas = juego.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;

        balas.createMultiple(20, 'LASER');
        balas.setAll('checkWorldBounds', true);
        balas.setAll('outOfBoundsKill', true);

        //Crear enemigos individuales
        malos = juego.add.group();
        malos.enableBody = true;
        malos.physicsBodyType = Phaser.Physics.ARCADE;

        malos.createMultiple(20, 'asteroide');
        malos.setAll('checkWorldBounds', true);
        malos.setAll('outOfBoundsKill', true);

        //Agregar al canvas la nave
        nave = juego.add.sprite(40, juego.height / 2, "nave");
        //Punto de apoyo centrado
        nave.anchor.setTo(0.5);
        //Activar física para la nave
        juego.physics.enable(nave, Phaser.Physics.ARCADE);
        //Limitar el giro de la nave
        nave.body.allowRotation = false;

        //Ciclo de enemigos
        aparecer = juego.time.events.loop(1500, this.crearEnemigo, this);
    },
    update: function () {
        //Animar juego
        fondoJuego.tilePosition.x -= 3;

        nave.rotation = juego.physics.arcade.angleToPointer(nave);

        // Disparar balas
        if (juego.input.activePointer.isDown) {
            this.disparar();
        }

        //Colisión de rocas y balas
        juego.physics.arcade.overlap(balas, malos, this.colision, null, this);
    },
    //Función disparar una sola bala
    disparar: function () {
        if (juego.time.now > nextFire && balas.countDead() > 0) {
            nextFire = juego.time.now + fireRate;
            var bala = balas.getFirstDead();
            bala.reset(nave.x - 8, nave.y - 8);
            bala.rotation = juego.physics.arcade.angleToPointer(bala);
            juego.physics.arcade.moveToPointer(bala, 300);
        }
    },
    //Función para la aparición de los enemigos
    crearEnemigo: function () {
        var enem = malos.getFirstDead();
        var num = Math.floor(Math.random() * 10 + 1);
        enem.reset(400, num * 55);
        enem.anchor.setTo(0.5);
        enem.body.velocity.x = -100;
        enem.checkWorldBounds = true;
        enem.outOfBoundsKill = true;
    },
    //Función para la colisión de balas y enemigos
    colision: function (bala, malo) {
        bala.kill();
        malo.kill();
    }
};