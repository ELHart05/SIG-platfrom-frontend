export default {
    "/my-reports": {
        title: "Mes signalements",
        links: [
            {
                to: "/report",
                text: "Signaler une anomalie"
            }
        ]
    },
    "/report": {
        title: "Signalement une Anomalies",
        links: [
            {
                to: "/my-reports",
                text: "Mes signalements"
            }
        ]
    },
    "/admin/reports-list": {
        title: "Liste des signalements",
        links: [
            {
                to: "/admin/stats",
                text: "Voir les statistiques"
            }
        ]
    },
    "/admin/stats": {
        title: "Statistiques",
        links: [
            {
                to: "/admin/reports-list",
                text: "Liste des signalements"
            }
        ]
    }
}