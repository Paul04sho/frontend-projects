
# 🚀 Frontend Projects

Une collection de petits projets front-end (HTML, CSS, JavaScript vanilla) réalisés à partir de défis [roadmap.sh](https://roadmap.sh).  
Chaque dossier correspond à un projet indépendant, prêt à être ouvert dans ton navigateur ou via un serveur local.

---

## 📂 Structure du repo

```

.
├── 01-Basic_HTML_Website/
├── 02-Single_Page_CV/
├── 03-Well_Designed_Portfolio/
├── 04-Grid_Layout/
├── 05-Changelog_Component/
├── 06-Datepicker_UI/
└── README.md

```

Chaque projet contient un `index.html` (et éventuellement `styles.css`, `script.js`).

---

## 🛠️ Comment lancer les projets

 Option 1 : Ouvrir directement

1. Clone le repo :

```bash
  git clone https://github.com/Paul04sho/frontend-projects.git
  cd frontend-projects
```

2. Entre dans le dossier d’un projet, ex :

```bash
  cd 03-Well_Designed_Portfolio
```
3. Double-clique sur `index.html` → s’ouvre dans ton navigateur.

👉 Suffisant pour les projets statiques (HTML + CSS).

---

 Option 2 : Lancer via un serveur local (recommandé)

Utile si le projet utilise des modules JS.

* **Avec VS Code (extension Live Server)**
  Clique sur `Go Live`.

* **Avec Python**

  ```bash
  cd 04-Grid_Layout
  python3 -m http.server 8000
  ```

  Ouvre [http://localhost:8000](http://localhost:8000).

* **Avec Node.js (`http-server`)**

  ```bash
  npm install -g http-server
  http-server .
  ```

  Ouvre l’URL donnée (souvent [http://localhost:8080](http://localhost:8080)).

---

 📌 Liste des projets

| Projet                       | Description                                 | Challenge                                                     |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| 01 - Basic HTML Website      | Petit site statique basique                 | [roadmap.sh](https://roadmap.sh/projects/basic-html-website)  |
| 02 - Single Page CV          | CV simple sur une seule page                | [roadmap.sh](https://roadmap.sh/projects/single-page-cv)      |
| 03 - Well Designed Portfolio | Portfolio stylisé avec sections             | [roadmap.sh](https://roadmap.sh/projects/portfolio-website)   |
| 04 - Grid Layout             | Galerie responsive avec CSS Grid            | [roadmap.sh](https://roadmap.sh/projects/image-grid)          |
| 05 - Changelog Component     | Composant de changelog (historique updates) | [roadmap.sh](https://roadmap.sh/projects/changelog-component) |
| 06 - Datepicker UI           | Composant UI type calendrier                | [roadmap.sh](https://roadmap.sh/projects/datepicker-ui)       |

> 🔜 Screenshots à venir pour chaque projet.

---

 📖 Contribution

* Crée un dossier `0X-Nom_du_projet` pour un nouveau challenge.
* Garde la structure propre (`index.html`, `styles.css`, `script.js`).
* Commente ton code si besoin.
* Pull requests bienvenues 🚀.

---

 📜 Licence

Distribué sous licence **MIT**.
Tu es libre de réutiliser, modifier et partager ces projets.

---

 💡 Remerciements

Merci à [roadmap.sh](https://roadmap.sh) pour les idées de challenges !
