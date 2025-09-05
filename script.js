// Bijtellingstabellen elektrisch
const bijtellingElektrisch = {
  2019: { pct: 0.04, cap: 50000 },
  2020: { pct: 0.08, cap: 45000 },
  2021: { pct: 0.12, cap: 40000 },
  2022: { pct: 0.16, cap: 35000 },
  2023: { pct: 0.16, cap: 30000 },
  2024: { pct: 0.16, cap: 30000 },
  2025: { pct: 0.17, cap: 30000 },
  2026: { pct: 0.22, cap: null } // geen cap
};

// Init dropdown jaren
window.onload = () => {
  const jaarSelect = document.getElementById("jaar");
  Object.keys(bijtellingElektrisch).forEach(jaar => {
    const opt = document.createElement("option");
    opt.value = jaar;
    opt.text = jaar;
    jaarSelect.add(opt);
  });
};

// Functie om de bijtelling te berekenen
function berekenBijtelling() {
  const jaar = parseInt(document.getElementById("jaar").value);
  const type = document.getElementById("type").value;
  const catalogus = parseFloat(document.getElementById("catalogus").value);
  const inkomen = parseFloat(document.getElementById("inkomen").value);
  const bijdrage = parseFloat(document.getElementById("bijdrage").value);

  if (isNaN(catalogus) || isNaN(inkomen)) {
    alert("Voer alle verplichte velden in!");
    return;
  }

  let brutoBijtelling = 0;

  if (type === "elektrisch") {
    const { pct, cap } = bijtellingElektrisch[jaar];
    if (cap) {
      brutoBijtelling = cap * pct + (catalogus - cap) * 0.22;
    } else {
      brutoBijtelling = catalogus * pct;
    }
  } else {
    // Benzine: altijd 22%
    brutoBijtelling = catalogus * 0.22;
  }

  brutoBijtelling -= bijdrage; // eigen bijdrage aftrekken

  // Simpele benadering: schijftarief toepassen (hier koppel je straks de witte tabel!)
  let tarief = 0.3748; // default tweede schijf
  if (inkomen <= 38441) tarief = 0.3585;
  if (inkomen > 76816) tarief = 0.4950;

  const nettoBijtelling = brutoBijtelling * tarief / 12;

  document.getElementById("resultaat").innerHTML =
    `Bruto bijtelling: € ${brutoBijtelling.toFixed(2)} per jaar<br>
     Netto bijtelling: € ${nettoBijtelling.toFixed(2)} per maand (schatting)`;
}
