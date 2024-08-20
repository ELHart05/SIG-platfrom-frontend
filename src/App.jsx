import { Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import layouts from "./layouts/index"
import pages from "./pages/index"

function App() {
  return (
    <Routes>
      <Route element={<layouts.MainLayout />} >
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
        <Route path="/auth" element={<layouts.AuthLayout />}>
          <Route index path="/auth" element={<Navigate to={"login"} />} />
          <Route path="login" element={<pages.Login />} />
          <Route path="register" element={<pages.Register />} />
        </Route>
        <Route path="*" element={<pages.Error />} />
      </Route>
    </Routes>
  )
}

export default App
