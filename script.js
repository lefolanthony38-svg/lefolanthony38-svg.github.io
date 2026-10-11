/* =========================================================
   PORTFOLIO — Anthony Lefol
   JavaScript "vanilla" (sans framework), découpé en petites
   fonctions commentées pour être facile à relire et modifier.
   ========================================================= */

// ---------- 1. Menu burger (mobile) ----------
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen);
  burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

// Ferme le menu quand on clique sur un lien
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// ---------- 2. Bordure du header au scroll ----------
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// ---------- 3. Terminal animé (effet "machine à écrire") ----------
// Chaque ligne : le texte + une classe CSS pour la couleur
const lignes = [
  { texte: "$ whoami", classe: "prompt" },
  { texte: "anthony_lefol", classe: "" },
  { texte: "$ cat profil.json", classe: "prompt" },
  { texte: "{", classe: "" },
  { texte: '  "metier": "Développeur Web & Web Mobile",', classe: "key" },
  { texte: '  "stack": ["HTML", "CSS", "JS", "Node.js"],', classe: "key" },
  { texte: '  "atout": "expérience terrain IT & sécurité",', classe: "key" },
  { texte: '  "dispo": "stage + projets clients"', classe: "str" },
  { texte: "}", classe: "" },
  { texte: "$ ", classe: "prompt" },
];

const terminal = document.getElementById("terminal");
const reduireAnimations = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ecrireTerminal() {
  // Si l'utilisateur préfère moins d'animations : on affiche tout d'un coup
  if (reduireAnimations) {
    lignes.forEach((l) => ajouterLigne(l.texte, l.classe));
    return;
  }

  let indexLigne = 0;
  let indexLettre = 0;
  let span = null;

  function taper() {
    if (indexLigne >= lignes.length) {
      // Fin : on ajoute un curseur clignotant
      const curseur = document.createElement("span");
      curseur.className = "cursor";
      curseur.innerHTML = "&nbsp;";
      span.appendChild(curseur);
      return;
    }

    const ligne = lignes[indexLigne];

    // Nouvelle ligne : on crée un <span> vide
    if (indexLettre === 0) {
      span = ajouterLigne("", ligne.classe);
    }

    span.textContent += ligne.texte.charAt(indexLettre);
    indexLettre++;

    if (indexLettre < ligne.texte.length) {
      setTimeout(taper, 35);
    } else {
      indexLigne++;
      indexLettre = 0;
      setTimeout(taper, 250);
    }
  }

  taper();
}

// Crée une ligne dans le terminal et la renvoie
function ajouterLigne(texte, classe) {
  if (terminal.childNodes.length > 0) terminal.appendChild(document.createTextNode("\n"));
  const span = document.createElement("span");
  if (classe) span.className = classe;
  span.textContent = texte;
  terminal.appendChild(span);
  return span;
}

ecrireTerminal();

// ---------- 4. Apparition des sections au scroll ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // une seule fois
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

// ---------- 5. Filtres des projets ----------
const boutonsFiltre = document.querySelectorAll(".filter");
const projets = document.querySelectorAll(".project");

boutonsFiltre.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    // Met à jour le bouton actif
    boutonsFiltre.forEach((b) => b.classList.remove("active"));
    bouton.classList.add("active");

    const filtre = bouton.dataset.filter;

    // Affiche ou cache chaque projet selon sa catégorie
    projets.forEach((projet) => {
      const visible = filtre === "tous" || projet.dataset.category === filtre;
      projet.classList.toggle("hidden", !visible);
    });
  });
});

// ---------- 6. Formulaire de contact ----------
// Pas de serveur : après validation, on ouvre la messagerie du visiteur (mailto).
// Plus tard, tu pourras brancher un back-end Node/Express ou un service type Formspree.
const form = document.getElementById("contact-form");
const messageSucces = document.getElementById("form-success");
const MON_EMAIL = "lefol.anthony.38@gmail.com";

function afficherErreur(champ, message) {
  const bloc = champ.closest(".field");
  bloc.classList.toggle("invalid", message !== "");
  bloc.querySelector(".error").textContent = message;
}

function validerFormulaire() {
  let valide = true;
  const nom = form.nom;
  const email = form.email;
  const message = form.message;

  if (nom.value.trim().length < 2) {
    afficherErreur(nom, "Merci d'indiquer votre nom.");
    valide = false;
  } else afficherErreur(nom, "");

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value.trim())) {
    afficherErreur(email, "Adresse email invalide.");
    valide = false;
  } else afficherErreur(email, "");

  if (message.value.trim().length < 10) {
    afficherErreur(message, "Votre message doit contenir au moins 10 caractères.");
    valide = false;
  } else afficherErreur(message, "");

  return valide;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageSucces.textContent = "";

  if (!validerFormulaire()) return;

  const sujet = `[Portfolio] ${form.sujet.value} — ${form.nom.value.trim()}`;
  const corps = `${form.message.value.trim()}\n\n${form.nom.value.trim()}\n${form.email.value.trim()}`;

  window.location.href =
    `mailto:${MON_EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;

  messageSucces.textContent = "Votre messagerie va s'ouvrir avec le message prêt à envoyer. Merci !";
  form.reset();
});

// ---------- 7. Année automatique dans le footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
