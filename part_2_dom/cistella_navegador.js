// Classe Producte
class Producte {
    constructor(descripcio, preu, quantitat) {
        this.descripcio = descripcio;
        this.preu = parseFloat(preu);
        this.quantitat = parseInt(quantitat);
    }

    // Calcula el subtotal del producte
    calculaSubtotal() {
        return this.preu * this.quantitat;
    }

    // Genera la fila HTML per a aquest producte
    generaHTML() {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${this.descripcio}</td>
            <td>${this.preu.toFixed(2)} €</td>
            <td>${this.quantitat}</td>
            <td>${this.calculaSubtotal().toFixed(2)} €</td>
        `;
        return fila;
    }
}

// Classe Cistella
class Cistella {
    constructor() {
        this.productes = []; // Llista de productes
    }

    // Afegir producte a la cistella
    afegirProducte(producte) {
        this.productes.push(producte);
        this.actualitzaTaula();
    }

    // Calcula el total
    calcularTotal() {
        return this.productes.reduce((total, producte) => total + producte.calculaSubtotal(), 0);
    }

    // Actualitza la taula i el total
    actualitzaTaula() {
        const tbody = document.querySelector('#taula tbody');
        tbody.innerHTML = ''; // Netejar la taula

        // Afegir totes les files
        this.productes.forEach((producte) => {
            tbody.appendChild(producte.generaHTML());
        });

        // Actualitzar el total
        document.getElementById('total').textContent = `${this.calcularTotal().toFixed(2)} €`;
    }
}

// Inicialitzar cistella
const cistella = new Cistella();

// Event Listener per afegir productes
document.getElementById('afegir').addEventListener('click', () => {
    const desc = document.getElementById('desc').value;
    const preu = parseFloat(document.getElementById('preu').value);
    const quantitat = parseInt(document.getElementById('quantitat').value);

    if (!desc || isNaN(preu) || isNaN(quantitat) || quantitat <= 0 || preu < 0) {
        alert('Si us plau, introdueix dades vàlides.');
        return;
    }

    // Crear un nou producte i afegir-lo a la cistella
    const producte = new Producte(desc, preu, quantitat);
    cistella.afegirProducte(producte);

    // Reset del formulari
    document.getElementById('formulari').reset();
});

