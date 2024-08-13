import { Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import layouts from "./layouts/index"
import pages from "./pages/index"

function App() {
  return (
    <Routes>
      <Route path="/" element={<layouts.ClientLayout />}>
        <Route index path="/" element={<Navigate to={"/report"} />} />
        <Route path="report/" element={<pages.ReportIssue />} />
        <Route path="my-reports/" element={<pages.ClientReports />} />
      </Route>
      <Route path="/admin" element={<layouts.AdminLayout />}>
        <Route index element={<Navigate to="/admin/stats" />} />
        <Route path="stats" element={<pages.AdminStats />} />
        <Route path="reports-list" element={<pages.AdminReportList />} />
      </Route>
      <Route path="*" element={<pages.Error />} />
    </Routes>
  )
}

export default App
