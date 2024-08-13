export const SERVER_URL = {
    development: "http://localhost:8000/",
    production: "my-prod-api",
}

export const LIBRARIES = ["places"];

export const INITIAL_CENTER = {
    longitude: 3.1668862252356007,
    latitude: 36.70678724723581,
}

export const STATUS_COLORS = {
    received: "gray",
    "in-progress": "orange",
    resolved: "green",
    unknown: "red",
}

export const STATUS_LIST = [
    'received', 'in-progress', 'resolved'
]

export const REPORTS = [
    {
        "id": 1,
        "clarification": "Besoin d'informations supplémentaires.",
        "location": {
            "longitude": 3.1683495431990707,
            "latitude": 36.6977162052582,
            "label": "M5X9+976, Oued Smar, Algeria"
        },
        "description": "Route fortement endommagée avec plusieurs nids-de-poule. Difficulté pour les véhicules à passer.",
        "anomalie": "Trous dans la voirie",
        "date": "13/08/2024, 18:24",
        "status": "in-progress",
        "photos": [
            "https://lecourrier-dalgerie.com/wp-content/uploads/2021/10/vehiculep5.jpg",
            "https://elwatan-dz.com/storage/15189/TRANSPORT.png",
            "https://images.pexels.com/photos/15733202/pexels-photo-15733202.jpeg",
            "https://www.algerie-eco.com/wp-content/uploads/2021/07/plastique.jpg"
        ],
        "user": {
            "first_name": "Abdelkader",
            "last_name": "BENZID",
            "email": "abdelkader.benzid@esi-sba.dz",
            "phone": "+213660123456"
        },
        "history": [
            {
                "status": {
                    "from": "received",
                    "to": "in-progress"
                },
                "date": "15/08/2024, 09:24",
                "clarification": "Début des travaux."
            },
            {
                "status": {
                    "from": "in-progress",
                    "to": "in-progress"
                },
                "date": "16/08/2024, 10:16",
                "clarification": "Difficulté d'accès à la zone."
            },
            {
                "status": {
                    "from": "in-progress",
                    "to": "in-progress"
                },
                "date": "17/08/2024, 11:24",
                "clarification": "Problème temporaire résolu."
            }
        ]
    },
    {
        "id": 2,
        "clarification": "Signalisation à revoir.",
        "location": {
            "longitude": 3.1693722340789066,
            "latitude": 36.70521078707006,
            "label": "P549+6M6, Oued Smar, Algeria"
        },
        "description": "Absence de signalisation sur une route très fréquentée. Danger pour les conducteurs.",
        "anomalie": "Signalisation routière défectueuse",
        "date": "26/07/2024, 22:19",
        "status": "resolved",
        "photos": [
            "https://elwatan-dz.com/storage/15189/TRANSPORT.png",
            "https://images.pexels.com/photos/15733202/pexels-photo-15733202.jpeg",
            "https://lecourrier-dalgerie.com/wp-content/uploads/2021/10/vehiculep5.jpg",
            "https://www.algerie-eco.com/wp-content/uploads/2021/07/plastique.jpg"
        ],
        "user": {
            "first_name": "Khaled",
            "last_name": "BOUSSAD",
            "email": "khaled.boussad@esi-sba.dz",
            "phone": "+213669789456"
        },
        "history": [
            {
                "status": {
                    "from": "received",
                    "to": "in-progress"
                },
                "date": "29/07/2024, 09:00",
                "clarification": "Travaux en cours."
            },
            {
                "status": {
                    "from": "in-progress",
                    "to": "resolved"
                },
                "date": "29/07/2024, 15:09",
                "clarification": "Problème résolu."
            }
        ]
    },
    {
        "id": 3,
        "clarification": "Aucune action immédiate nécessaire.",
        "location": {
            "longitude": 3.1668862252356007,
            "latitude": 36.70678724723581,
            "label": "P566+8FX, Oued Smar, Algeria"
        },
        "description": "Érosion des berges causant des glissements de terrain.",
        "anomalie": "Érosion des berges",
        "date": "19/06/2024, 06:09",
        "status": "in-progress",
        "photos": [
            "https://www.algerie-eco.com/wp-content/uploads/2021/07/plastique.jpg",
            "https://images.pexels.com/photos/15733202/pexels-photo-15733202.jpeg",
            "https://elwatan-dz.com/storage/15189/TRANSPORT.png",
            "https://lecourrier-dalgerie.com/wp-content/uploads/2021/10/vehiculep5.jpg"
        ],
        "user": {
            "first_name": "Sofia",
            "last_name": "BELLAL",
            "email": "sofia.bellal@esi-sba.dz",
            "phone": "+213551789632"
        },
        "history": [
            {
                "status": {
                    "from": "received",
                    "to": "in-progress"
                },
                "date": "19/06/2024, 12:00",
                "clarification": "Inspection en cours."
            },
            {
                "status": {
                    "from": "in-progress",
                    "to": "in-progress"
                },
                "date": "20/06/2024, 13:00",
                "clarification": "Attente d'une solution technique."
            }
        ]
    },
    {
        "id": 4,
        "clarification": "",
        "location": {
            "longitude": 3.1603280310729076,
            "latitude": 36.71463334016717,
            "label": "P575+RMJ, Oued Smar, Algeria"
        },
        "description": "Débordement des égouts après fortes pluies.",
        "anomalie": "Débordement des égouts",
        "date": "25/02/2024, 18:30",
        "status": "received",
        "photos": [],
        "user": {
            "first_name": "Amine",
            "last_name": "ZAIDI",
            "email": "amine.zaidi@esi-sba.dz",
            "phone": "+213550123987"
        },
        "history": []
    }
];


export const ANOMALIES = [
    { value: 10, title: "Trous dans la voirie" },
    { value: 20, title: "Éclairage défectueux" },
    { value: 30, title: "Fuites d'eau" },
    { value: 40, title: "Signalisation routière défectueuse" },
    { value: 50, title: "Nids-de-poule" },
    { value: 60, title: "Débordement des égouts" },
    { value: 70, title: "Bouches d'égout obstruées" },
    { value: 80, title: "Dégradations des trottoirs" },
    { value: 90, title: "Absence ou insuffisance de passages piétons" },
    { value: 100, title: "Érosion des berges" },
    { value: 110, title: "Dépôts sauvages d'ordures" },
    { value: 120, title: "Arrêts de bus dégradés ou non abrités" },
    { value: 130, title: "Végétation envahissante" },
    { value: 140, title: "Graffiti et vandalisme" },
    { value: 150, title: "Absence de mobilier urbain" },
    { value: 160, title: "Systèmes de drainage insuffisants" },
    { value: 170, title: "Poteaux électriques ou téléphoniques endommagés" },
    { value: 180, title: "Barrières de sécurité manquantes ou abîmées" },
    { value: 190, title: "Absence de pistes cyclables sécurisées" },
    { value: 200, title: "Réseaux de câbles aériens en mauvais état" },
]