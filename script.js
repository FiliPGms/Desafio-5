
class Atrativo {
    constructor(nome, tipo, descricao) {
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
    }
}

class Destino {
    constructor(nome, descricao, imagem, coordenadas, atrativos) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.coordenadas = coordenadas;
        this.atrativos = atrativos;
    }

    mostrarDetalhes() {
        alert(`
            Nome: ${this.nome}
            Descrição: ${this.descricao}
            Atrativos:
            ${this.atrativos.map(atrativo => `- ${atrativo.nome} (${atrativo.tipo}): ${atrativo.descricao}`).join('\n')}
        `);
    }
}

const destinos = [
    new Destino(
        "São Luís",
        "Capital do Maranhão, conhecida por seu centro histórico.",
        "imagens/sao-luis.jpg",
        [-2.53073, -44.3068],
        [
            new Atrativo("Centro Histórico", "Monumento", "Patrimônio Mundial da UNESCO."),
            new Atrativo("Praia de Calhau", "Praia", "Praia urbana popular.")
        ]
    ),
    new Destino(
        "Lençóis Maranhenses",
        "Parque Nacional famoso por suas dunas e lagoas.",
        "imagens/lencois-maranhenses.jpg",
        [-2.60256, -43.5962],
        [
            new Atrativo("Lagoa Azul", "Lagoa", "Uma das mais bonitas do parque."),
            new Atrativo("Lagoa Bonita", "Lagoa", "Famosa pela vista panorâmica.")
        ]
    ),
    new Destino(
        "Alcântara",
        "Cidade histórica com muitos monumentos coloniais.",
        "imagens/alcantara.jpg",
        [-2.40553, -44.4168],
        [
            new Atrativo("Igreja Matriz", "Monumento", "Um dos principais pontos turísticos."),
            new Atrativo("Praça da Matriz", "Praça", "Centro da cidade histórica.")
        ]
    )
];

function renderDestinos(destinos) {
    const destinosContainer = document.getElementById('destinos');
    destinosContainer.innerHTML = '';
    destinos.forEach(destino => {
        const destinoElement = document.createElement('div');
        destinoElement.classList.add('destino');
        destinoElement.innerHTML = `
            <img src="${destino.imagem}" alt="${destino.nome}">
            <div class="info">
                <h3>${destino.nome}</h3>
                <p>${destino.descricao}</p>
                <button onclick="mostrarDetalhes('${destino.nome}')">Ver detalhes</button>
            </div>
        `;
        destinosContainer.appendChild(destinoElement);
    });
}

function buscarDestinos() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultados = destinos.filter(destino => destino.nome.toLowerCase().includes(query));
    renderDestinos(resultados);
}

function mostrarDetalhes(nome) {
    const destino = destinos.find(d => d.nome === nome);
    if (destino) {
        destino.mostrarDetalhes();
    }
}

document.getElementById('searchInput').addEventListener('input', buscarDestinos);
renderDestinos(destinos);

function initMap() {
    const map = L.map('map').setView([-2.53073, -44.3068], 7); // Coordenadas de São Luís, Maranhão
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    destinos.forEach(destino => {
        L.marker(destino.coordenadas).addTo(map)
            .bindPopup(`<b>${destino.nome}</b><br>${destino.descricao}`);
    });
}

window.onload = initMap;
