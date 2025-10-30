# Projet étudiant : personnalisation du slider

## Présentation du projet

Ce projet est une application web permettant de créer des **moodboards sous forme de sliders interactifs** à partir d’une recherche d’images.
L’utilisateur peut rechercher un thème, sélectionner les images qu’il souhaite conserver, les organiser dans un slider, et même demander à une **IA** des **suggestions de thèmes** ou une **reformulation de sa description**.

## Fonctionnalités principales

### Recherche d’images (API Unsplash)

* Intégration dynamique de l’API **Unsplash**.
* Les images sont mises à jour à chaque chargement de la page pour offrir de nouveaux résultats.
* Un **bouton interactif** permet de relancer la requête API à tout moment.
* Possibilité de **rechercher des images par mot-clé** via une barre de recherche.

### Création de sliders personnalisés

* L’utilisateur peut **sélectionner** les images issues de la recherche pour les ajouter à son **moodboard/slider**.
* Les images ajoutées peuvent être **supprimées** à tout moment.
* Les sélections sont **sauvegardées dans le `localStorage`** du navigateur, garantissant la persistance des choix.

### Intégration de l’IA (API puter.ai)

* L’utilisateur peut demander à l’IA :
  * des **suggestions de thèmes** similaires ou inspirants à partir de sa recherche initiale ;
  * une **reformulation automatique** de la description de son moodboard.

## Technologies utilisées

| Technologie                         | Rôle                                       |
| ----------------------------------- | ------------------------------------------ |
| **HTML5 / CSS3 / JavaScript (ES6)** | Structure, styles et interactivité         |
| **Unsplash API**                    | Recherche et affichage dynamique d’images  |
| **Puter.ai API**                    | Génération de texte assistée par IA        |
| **LocalStorage**                    | Sauvegarde locale des images sélectionnées |


## Difficultés rencontrées

* Trouver une **idée originale** alliant utilité et esthétique.
* **Intégration de plusieurs APIs** et gestion asynchrone des données.
* Maintenir un **design sobre et cohérent** tout en assurant une expérience fluide.


## Bilan et perspectives

Le projet actuel est **fonctionnel et satisfaisant**.
Les prochaines améliorations envisagées sont :

* Améliorer le **design visuel** du site (animations, transitions, typographie) ;
* Optimiser l’**expérience utilisateur** (drag & drop, tri, partage) ;
* Ajouter la **possibilité d’enregistrer ou d’exporter** le moodboard créé.

Développé dans le cadre d’un projet étudiant en M1 - ECV.
Cécile — 2025.

