class Atrativo {
    constructor(nome, tipo, descricao) {
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
    }
}

class Destino {
    constructor(id, nome, descricao, imagem, coordenadas, atrativos = []) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.coordenadas = coordenadas;
        this.atrativos = atrativos;
    }

    mostrarDetalhes() {
        const atrativosList = this.atrativos.map(atrativo => `
            <li><strong>${atrativo.nome} (${atrativo.tipo}):</strong> ${atrativo.descricao}</li>
        `).join('');

        Swal.fire({
            title: `<strong>${this.nome}</strong>`,
            html: `
                <img src="images/${this.imagem}" alt="${this.nome}" style="width: 100%; height: auto; margin-bottom: 10px;">
                <p>${this.descricao}</p>
                <ul>${atrativosList}</ul>
            `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Fechar',
            customClass: {
                popup: 'swal-wide'
            }
        });
    }
}

let destinos = [];


async function fetchDestinos() {
    try {
        const response = await fetch('/api/destinos');
        const data = await response.json();
        
        for (const obj of data) {
            const atrativosResponse = await fetch(`/api/destinos/${obj.id}/atrativos`);
            const atrativosData = await atrativosResponse.json();
            const atrativos = atrativosData.map(a => new Atrativo(a.nome, a.tipo, a.descricao));

            const destino = new Destino(obj.id, obj.nome, obj.descricao, obj.imagem, obj.coordenadas.split(','), atrativos);
            destinos.push(destino);
        }

        renderDestinos(destinos);
    } catch (error) {
        console.error('Erro ao buscar destinos:', error);
    }
}

function renderDestinos(destinos) {
    const destinosContainer = document.getElementById('destinos');
    destinosContainer.innerHTML = '';
    destinos.forEach(destino => {
        const destinoElement = document.createElement('div');
        destinoElement.classList.add('destino');
        destinoElement.innerHTML = `
            <img src="images/${destino.imagem}" alt="${destino.nome}">
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

async function initMap() {
    await fetchDestinos();
    const map = L.map('map').setView([-2.53073, -44.3068], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    destinos.forEach(destino => {
        L.marker(destino.coordenadas).addTo(map)
            .bindPopup(`<b>${destino.nome}</b><br>${destino.descricao}`);
    });
}

window.onload = initMap;






