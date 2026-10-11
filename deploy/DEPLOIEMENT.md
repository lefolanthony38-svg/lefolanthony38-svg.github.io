# Guide de déploiement — GitHub + VPS Linux

Principe : le code vit sur **GitHub**. Le **VPS** clone le dépôt et Nginx sert les fichiers.
Pour mettre à jour le site : `git push` sur ton PC, puis `git pull` sur le VPS (fait automatiquement par `deploy.ps1`).

> Dans les commandes, remplace `anthony`, `123.45.67.89` et `votre-pseudo` par tes vraies valeurs.

---

## Étape 1 — Mettre le portfolio sur GitHub (sur ton PC)

1. Sur github.com : **New repository** → nom `portfolio` → **Public** → ne coche rien (ni README, ni .gitignore) → *Create repository*.
2. Dans VS Code, ouvre le dossier `Portfolio`, puis le terminal (`Ctrl + ù`) :

```bash
git init
git add .
git commit -m "Première version du portfolio"
git branch -M main
git remote add origin https://github.com/votre-pseudo/portfolio.git
git push -u origin main
```

3. Rafraîchis la page GitHub : tes fichiers et le README s'affichent.

---

## Étape 2 — Préparer le VPS (une seule fois)

Connecte-toi en SSH depuis le terminal :

```bash
ssh anthony@123.45.67.89
```

Installe Nginx et Git (Debian / Ubuntu) :

```bash
sudo apt update
sudo apt install -y nginx git
```

Clone le dépôt dans le dossier du site :

```bash
sudo mkdir -p /var/www/portfolio
sudo chown $USER:$USER /var/www/portfolio
git clone https://github.com/votre-pseudo/portfolio.git /var/www/portfolio
```

---

## Étape 3 — Configurer Nginx (une seule fois)

```bash
sudo cp /var/www/portfolio/deploy/nginx.conf /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio     # remplace votre-domaine.fr (ou mets l'IP)
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default        # désactive la page par défaut
sudo nginx -t                                      # doit afficher "syntax is ok"
sudo systemctl reload nginx
```

Ouvre `http://123.45.67.89` (ou ton domaine) : le portfolio s'affiche. 🎉

Si le pare-feu UFW est actif :

```bash
sudo ufw allow 'Nginx Full'
```

---

## Étape 4 — HTTPS gratuit (si tu as un nom de domaine)

Ton domaine doit d'abord pointer vers l'IP du VPS (enregistrement **A** chez ton registrar).

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.fr -d www.votre-domaine.fr
```

Certbot ajoute le HTTPS et renouvelle le certificat tout seul.

---

## Mettre à jour le site ensuite

Sur ton PC, après chaque modification :

```bash
git add .
git commit -m "Description de la modification"
```

Puis lance le script, qui fait le `git push` et met le VPS à jour :

```powershell
.\deploy\deploy.ps1
```

> Pense à remplir une fois les variables en haut de `deploy.ps1`.
> Si Windows bloque le script : `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

**Astuce :** crée une clé SSH (`ssh-keygen`, puis `ssh-copy-id` ou copie de `~/.ssh/id_ed25519.pub` dans `~/.ssh/authorized_keys` sur le VPS) pour ne plus taper ton mot de passe à chaque déploiement.

---

## Vérifications après la mise en ligne

- [ ] La page s'affiche sur ordinateur et téléphone
- [ ] `/deploy/nginx.conf` et `/README.md` renvoient bien une **404**
- [ ] Une adresse inventée (`/test`) affiche la page 404 personnalisée
- [ ] Le formulaire de contact ouvre bien la messagerie
- [ ] Les liens `href="#"` ont été remplacés par les vrais (GitHub, LinkedIn, projets, CV)
