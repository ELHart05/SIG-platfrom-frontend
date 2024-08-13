export function getReportStatus(status) {
    switch (status) {
        case "received":
            return "Reçu"
        case "in-progress":
            return "En cours"
        case "resolved":
            return "Résolu"
        default:
            return "Unknown"
    }
}