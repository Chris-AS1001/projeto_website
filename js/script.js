// Função para calcular a fase da Lua baseada na data
function calcularFaseDaLua(data) {
    // Baseado em algoritmos simplificados para cálculo da fase lunar
    const lunarCycle = 29.530588853; // duração média do ciclo lunar em dias
    const newMoon = new Date(2000, 0, 6, 18, 14); // uma lua nova conhecida (6 jan 2000)

    const diff = (data - newMoon) / 1000 / 60 / 60 / 24; // diferença em dias
    const phase = (diff % lunarCycle + lunarCycle) % lunarCycle;

    if (phase < 1.84566) return "Lua Nova";
    if (phase < 5.53699) return "Lua Crescente";
    if (phase < 9.22831) return "Quarto Crescente";
    if (phase < 12.91963) return "Lua Gibosa Crescente";
    if (phase < 16.61096) return "Lua Cheia";
    if (phase < 20.30228) return "Lua Gibosa Minguante";
    if (phase < 23.99361) return "Quarto Minguante";
    if (phase < 27.68493) return "Lua Minguante";
    return "Lua Nova";
}

// Manipulação do input de data da Lua
const dataLua = document.getElementById("dataLua");
const resultadoLua = document.getElementById("resultadoLua");

dataLua.addEventListener("change", () => {
    const date = new Date(dataLua.value + "T00:00:00");
    if (isNaN(date)) {
        resultadoLua.textContent = "Data inválida.";
        return;
    }
    const fase = calcularFaseDaLua(date);
    resultadoLua.textContent = `Fase da Lua: ${fase}`;
});


// --- Dados das constelações (exemplo simples) ---
const constelacoes = [
    {
        nome: "Orion",
        descricao: "Uma das constelações mais brilhantes, visível durante o inverno.",
        imagem: "images/orion.jpg",
    },
    {
        nome: "Ursa Major",
        descricao: "Conhecida como o Grande Carro, fácil de encontrar no hemisfério norte.",
        imagem: "images/ursa_major.jpg",
    },
    {
        nome: "Cassiopeia",
        descricao: "Forma um W no céu, visível quase o ano todo no hemisfério norte.",
        imagem: "images/cassiopeia.jpg",
    },
];

// Renderiza as constelações na página
const listaConstelacoes = document.getElementById("listaConstelacoes");

constelacoes.forEach((c) => {
    const card = document.createElement("div");
    card.className = "col";

    card.innerHTML = `
      <div class="card bg-secondary text-light h-100 shadow">
        <img src="${c.imagem}" class="card-img-top" alt="Imagem da constelação ${c.nome}">
        <div class="card-body">
          <h5 class="card-title">${c.nome}</h5>
          <p class="card-text">${c.descricao}</p>
        </div>
      </div>
    `;

    listaConstelacoes.appendChild(card);
});


// --- Próximos eventos astronômicos ---
const eventos = [
    {
        data: "2025-10-17",
        evento: "Eclipse lunar parcial",
    },
    {
        data: "2025-11-04",
        evento: "Eclipse solar híbrido",
    },
    {
        data: "2025-12-14",
        evento: "Chuva de meteoros Geminídeos",
    },
];

// Renderiza eventos na página
const listaEventos = document.getElementById("listaEventos");

eventos.forEach((e) => {
    const li = document.createElement("li");
    li.className = "list-group-item bg-dark text-light border-light";
    li.textContent = `${e.data} - ${e.evento}`;
    listaEventos.appendChild(li);
});


// --- Conversor de unidades astronômicas ---

const formConversor = document.getElementById("formConversor");
const resultadoConversor = document.getElementById("resultadoConversor");

// Fatores de conversão para km
const fatoresParaKm = {
    ly: 9.4607e12, // ano-luz em km
    pc: 3.0857e13, // parsec em km
    ua: 1.4959787e8, // unidade astronômica em km
    km: 1,
};

formConversor.addEventListener("submit", (e) => {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valorEntrada").value);
    const entrada = document.getElementById("unidadeEntrada").value;
    const saida = document.getElementById("unidadeSaida").value;

    if (isNaN(valor) || !entrada || !saida) {
        resultadoConversor.textContent = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    // converte valor para km
    const valorKm = valor * fatoresParaKm[entrada];

    // converte km para unidade de saída
    const valorFinal = valorKm / fatoresParaKm[saida];

    resultadoConversor.textContent = `${valor} ${entrada.toUpperCase()} equivalem a ${valorFinal.toFixed(6)} ${saida.toUpperCase()}`;
});
