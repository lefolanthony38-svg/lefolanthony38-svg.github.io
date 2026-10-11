# =========================================================
# Met à jour le portfolio sur le VPS (à lancer depuis Windows)
#
# Utilisation, dans le terminal de VS Code (PowerShell) :
#   .\deploy\deploy.ps1
#
# Prérequis : avoir fait "git push" de tes modifications sur GitHub,
# et avoir suivi deploy/DEPLOIEMENT.md une première fois.
# =========================================================

# ---- À personnaliser ----
$Utilisateur = "anthony"            # ton utilisateur SSH sur le VPS
$Serveur     = "123.45.67.89"       # IP ou nom de domaine du VPS
$Port        = 22                   # port SSH
$Dossier     = "/var/www/portfolio" # dossier du site sur le VPS
$Branche     = "main"
# -------------------------

Write-Host "Mise à jour du portfolio sur $Serveur..." -ForegroundColor Cyan

# 1. Vérifie qu'il ne reste rien de non envoyé sur GitHub
$nonCommite = git status --porcelain
if ($nonCommite) {
    Write-Host "Attention : des modifications ne sont pas commitées. Fais 'git add', 'git commit' puis 'git push' avant." -ForegroundColor Yellow
    exit 1
}
git push origin $Branche

# 2. Sur le VPS : récupère la dernière version depuis GitHub
ssh -p $Port "$Utilisateur@$Serveur" "cd $Dossier && git fetch origin && git reset --hard origin/$Branche"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Portfolio en ligne à jour !" -ForegroundColor Green
} else {
    Write-Host "Échec de la mise à jour. Vérifie la connexion SSH et le dossier $Dossier." -ForegroundColor Red
}
