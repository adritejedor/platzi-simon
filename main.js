const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(() => {
            this.siguienteNivel()
        }, 500);
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toogleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarClicks()
    }

    transformarNumeroColor(num) {
        switch (num) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
            default:
                break;
        }
    }

    transformarColorNumero(col) {
        switch (col) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
            default:
                break;
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroColor(this.secuencia[i])
            setTimeout(() => {
                this.iluminarColor(color)
            }, i * 1000);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => {
            this.apagarColor(color)
        }, 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarClicks() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarClicks() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(event) {
        const nombreColor = event.target.dataset.color;
        const numColor = this.transformarColorNumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarClicks()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(() => {
                        this.siguienteNivel()
                    }, 1500);
                }
            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal('Has ganado', '', 'success').then(this.inicializar())
    }

    perdioElJuego() {
        swal('Has perdido', '', 'error').then(
            () => {
                this.eliminarClicks()
                this.inicializar()
            }
        )
    }

    toogleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }
}

function empezarJuego() {
    window.juego = new Juego()
}