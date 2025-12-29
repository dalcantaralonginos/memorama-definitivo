document.addEventListener("DOMContentLoaded", () => {

    const tablero = document.getElementById("tablero");
    const turnoTexto = document.getElementById("turno");
    const tiempoTexto = document.getElementById("tiempo");
    const p1Texto = document.getElementById("p1");
    const p2Texto = document.getElementById("p2");

    let turno = 1;
    let tiempo = 10;
    let timer;
    let seleccionadas = [];
    let bloqueo = false;
    let puntos = {1: 0, 2: 0};

    const conceptos = [
        "Valores","Principios","Normas","Conducta Humana","Diversidad",
        "Globalización","Tolerancia","Diálogo","Avances Tecnológicos","Confianza",
        "Justicia","Política","Responsabilidad","Compromiso","Participación",
        "Respeto","Honestidad","Solidaridad","Igualdad","Empatía",
        "Valores","Principios","Normas","Conducta Humana","Diversidad",
        "Globalización","Tolerancia","Diálogo","Avances Tecnológicos","Confianza",
        "Justicia","Política","Responsabilidad","Compromiso","Participación",
        "Respeto","Honestidad","Solidaridad","Igualdad","Empatía"
    ];

    conceptos.sort(() => Math.random() - 0.5);

    conceptos.forEach(texto => {
        const carta = document.createElement("div");
        carta.className = "carta";

        carta.innerHTML = `
            <div class="carta-inner">
                <div class="frente"></div>
                <div class="atras">${texto}</div>
            </div>
        `;

        carta.addEventListener("click", () => voltear(carta, texto));
        tablero.appendChild(carta);
    });

    function voltear(carta, texto) {
        if (bloqueo || carta.classList.contains("volteada")) return;

        carta.classList.add("volteada");
        seleccionadas.push({ carta, texto });

        if (seleccionadas.length === 2) {
            bloqueo = true;
            setTimeout(verificar, 800);
        }
    }

    function verificar() {
        const [a, b] = seleccionadas;

        if (a.texto === b.texto) {
            puntos[turno]++;
            actualizarPuntos();
            bloqueo = false;
        } else {
            setTimeout(() => {
                a.carta.classList.remove("volteada");
                b.carta.classList.remove("volteada");
                cambiarTurno();
            }, 700);
        }

        seleccionadas = [];
    }

    function cambiarTurno() {
        turno = turno === 1 ? 2 : 1;
        turnoTexto.textContent = `Jugador ${turno}`;
        reiniciarTiempo();
        bloqueo = false;
    }

    function actualizarPuntos() {
        p1Texto.textContent = puntos[1];
        p2Texto.textContent = puntos[2];
    }

    function iniciarTiempo() {
        timer = setInterval(() => {
            tiempo--;
            tiempoTexto.textContent = tiempo;
            if (tiempo === 0) cambiarTurno();
        }, 1000);
    }

    function reiniciarTiempo() {
        clearInterval(timer);
        tiempo = 10;
        tiempoTexto.textContent = tiempo;
        iniciarTiempo();
    }

    iniciarTiempo();
});
