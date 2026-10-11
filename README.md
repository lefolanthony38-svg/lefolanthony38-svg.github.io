# Portfolio — Anthony Lefol

Portfolio personnel de **Anthony Lefol**, développeur web et web mobile en formation (Titre Professionnel DWWM — Centre Européen de Formation), basé dans la Drôme (26).

Il s'adresse à deux publics :
- les **recruteurs / maîtres de stage**, qui y trouvent mon parcours, mes compétences et mes projets ;
- les **associations, TPE et indépendants**, qui y trouvent les services que je propose.

🔗 **Démo en ligne :** _https://votre-domaine.fr_ (à compléter)

---

## Aperçu

| Section | Contenu |
|---|---|
| Accueil | Présentation + terminal animé en JavaScript |
| À propos | Parcours : agent de sécurité SSIAP 1 → technicien informatique → développeur |
| Compétences | Front-end, back-end, design, savoir-être |
| Projets | 7 projets filtrables (clients, formation, perso) |
| Services | Offre pour les futurs clients |
| Parcours | Frise chronologique |
| Contact | Formulaire validé en JavaScript (ouverture de la messagerie) |

## Technologies

- **HTML5** sémantique
- **CSS3** : variables CSS, Flexbox, Grid, responsive mobile-first, `prefers-reduced-motion`
- **JavaScript** vanilla (sans framework) : manipulation du DOM, `IntersectionObserver`, filtres, validation de formulaire

Aucune dépendance, aucune étape de compilation : le site est 100 % statique.

## Accessibilité

- Structure sémantique (`header`, `nav`, `main`, `section`, `footer`)
- Menu mobile avec `aria-expanded` / `aria-controls`
- Focus visible au clavier
- Messages d'erreur du formulaire annoncés (`aria-live`)
- Animations désactivées si l'utilisateur le demande dans son système

## Structure

```
Portfolio/
├── index.html          # page unique
├── 404.html            # page d'erreur
├── style.css           # styles (couleurs dans :root)
├── script.js           # interactions
├── favicon.svg
├── robots.txt
├── README.md
├── .gitignore
└── deploy/             # non publié sur le serveur
    ├── nginx.conf      # configuration du site sur le VPS
    ├── deploy.ps1      # mise à jour du VPS depuis Windows
    └── DEPLOIEMENT.md  # guide pas à pas
```

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou avec VS Code : extension **Live Server** → clic droit sur `index.html` → *Open with Live Server*.

## Déploiement

Le site est hébergé sur un VPS Linux avec **Nginx**. Le serveur clone ce dépôt et se met à jour avec `git pull`.
Voir le guide complet : [`deploy/DEPLOIEMENT.md`](deploy/DEPLOIEMENT.md).

## Contact

📧 lefol.anthony.38@gmail.com

---

© Anthony Lefol — Tous droits réservés.
