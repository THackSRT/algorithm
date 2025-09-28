# Algorithm - Collection d'Algorithmes et Intelligence Artificielle

## 🎯 Vue d'ensemble

Ce projet est une collection complète d'implémentations d'algorithmes d'intelligence artificielle, de structures de données, et de moteurs graphiques. Il comprend des réseaux de neurones, des algorithmes génétiques, des visualisations 3D, et des applications pratiques comme des jeux utilisant l'IA.

## 🚀 Fonctionnalités principales

### 🧠 Intelligence Artificielle

- **Réseaux de Neurones** : Implémentation complète avec rétropropagation
- **Algorithme NEAT** : Evolution de topologies de réseaux augmentées
- **Algorithmes Génétiques** : Sélection, mutation, et reproduction
- **Perceptron** : Classification linéaire simple
- **Classification** : Applications pratiques de machine learning

### 🎮 Applications et Jeux

- **Flappy Bird avec IA** : Jeu contrôlé par réseaux de neurones évolutifs
- **Classification visuelle** : Interface interactive pour tester les algorithmes
- **Tests NEAT** : Démonstrations des capacités d'évolution des réseaux

### 📊 Structures de Données

- **Arbres binaires** : Implémentation complète avec parcours
- **Graphes** : Représentation et algorithmes associés
- **Matrices** : Opérations mathématiques optimisées
- **Listes, Piles, Files** : Structures fondamentales
- **Population** : Gestion des populations pour algorithmes génétiques

### 🎨 Moteur Graphique 3D

- **Rendu 3D** : Moteur de rendu avec projection perspective
- **Formes géométriques** : Cubes, sphères, lignes, points
- **Animation** : Système d'animation fluide
- **Caméra** : Contrôle de la vue 3D
- **Effets visuels** : Feux d'artifice et particules

## 📁 Structure du projet

```text
algorithm/
├── modules/                    # Modules principaux
│   ├── utils/                 # Utilitaires et algorithmes
│   │   ├── NeuralNetwork.js   # Réseau de neurones
│   │   ├── Genetic.js         # Algorithmes génétiques
│   │   ├── BinaryTree.js      # Arbres binaires
│   │   ├── Matrix.js          # Opérations matricielles
│   │   ├── Perceptron.js      # Perceptron simple
│   │   ├── Population.js      # Gestion des populations
│   │   └── neuralNetwork/     # Implémentations NEAT
│   ├── services/              # Applications et jeux
│   │   ├── FlappyBird/        # Jeu Flappy Bird avec IA
│   │   ├── SimpleClassification.js # Interface de classification
│   │   └── testNEAT/          # Tests des algorithmes NEAT
│   └── views/                 # Composants d'interface
│       ├── Canvas.js          # Gestion du canvas
│       ├── DOM.js             # Manipulation DOM
│       ├── Button.js          # Composants boutons
│       └── Section.js         # Sections d'interface
├── newYear/                   # Moteur graphique 3D
│   ├── canvas.js              # Canvas 3D
│   ├── scene.js               # Gestion de scène
│   ├── camera.js              # Contrôle caméra
│   ├── cube.js                # Objets 3D cubes
│   ├── sphere.js              # Objets 3D sphères
│   ├── firework.js            # Effets feux d'artifice
│   └── point.js               # Points 3D
├── shared/                    # Ressources partagées
├── index.html                 # Point d'entrée principal
├── index.js                   # Application principale
├── test.js                    # Tests du moteur 3D
└── testTree.js                # Tests des arbres binaires
```

## 🛠️ Installation et Utilisation

### Prérequis

- Navigateur web moderne supportant ES6 modules
- Serveur web local (pour éviter les problèmes CORS)

### Lancement

1. Clonez le dépôt
2. Ouvrez un serveur web local dans le dossier du projet
3. Accédez à `index.html` pour l'application principale

### Exemples d'utilisation

#### Réseau de Neurones

```javascript
import NeuralNetwork from './modules/utils/NeuralNetwork.js';

// Créer un réseau 2-4-1
const nn = new NeuralNetwork(2, 4, 1);

// Entraîner avec des données
const inputs = [0, 1];
const targets = [1];
nn.train(inputs, targets);

// Faire une prédiction
const output = nn.predict(inputs);
```

#### Arbre Binaire

```javascript
import BinaryTree from './modules/utils/BinaryTree.js';

const tree = new BinaryTree(10);
tree.root.addChild(new BinaryTree(5));
tree.root.addChild(new BinaryTree(15));
tree.traverse();
```

#### Moteur 3D

```javascript
import Scene from './newYear/scene.js';
import Cube from './newYear/cube.js';

const scene = new Scene();
const cube = new Cube(0, 0, 0, 100, 10, 'red');
scene.addObject(cube);
```

## 🎯 Applications disponibles

### 1. Flappy Bird avec IA

- Entraînement de populations d'oiseaux avec NEAT
- Évolution automatique des stratégies
- Visualisation du cerveau de l'oiseau

### 2. Classification Interactive

- Interface graphique pour dessiner des patterns
- Entraînement en temps réel avec Perceptron
- Visualisation de la frontière de décision

### 3. Tests NEAT

- Démonstration des capacités d'évolution
- Génération automatique de topologies
- Benchmarks de performance

### 4. Visualisations 3D

- Rendu de formes géométriques complexes
- Animations fluides et interactions
- Effets visuels avancés

## 📚 Algorithmes implémentés

### Machine Learning

- **Perceptron** : Classification binaire linéaire
- **Réseau de Neurones multicouches** : Classification et régression
- **NEAT** : Evolution de topologies augmentées
- **Algorithmes génétiques** : Optimisation évolutive

### Structures de données

- **Arbres binaires** : Insertion, recherche, parcours
- **Graphes** : Représentation par matrice d'adjacence
- **Files et piles** : Implémentations optimisées
- **Matrices** : Opérations vectorielles et matricielles

### Graphiques et visualisation

- **Moteur 3D** : Projection perspective et rendu
- **Animations** : Interpolation et transitions fluides
- **Canvas 2D/3D** : Abstraction pour le rendu graphique

## 🔧 Architecture technique

### Modularité

- Code organisé en modules ES6
- Séparation claire des responsabilités
- Composants réutilisables

### Performance

- Optimisations pour les calculs matriciels
- Gestion efficace de la mémoire
- Rendu graphique optimisé

### Extensibilité

- Architecture orientée objet
- Interfaces bien définies
- Facilité d'ajout de nouveaux algorithmes

## 🎓 Objectifs éducatifs

Ce projet sert d'outil d'apprentissage pour :

- Comprendre les algorithmes d'IA fondamentaux
- Visualiser le comportement des réseaux de neurones
- Expérimenter avec l'évolution artificielle
- Apprendre la programmation graphique 3D

## 🚀 Extensions possibles

- Ajout d'algorithmes d'apprentissage par renforcement
- Implémentation de réseaux convolutionnels (CNN)
- Intégration de WebGL pour le rendu 3D
- Support multi-threading avec Web Workers
- Interface utilisateur plus avancée

## 📝 Licence

Projet éducatif open-source. Libre d'utilisation et de modification.

