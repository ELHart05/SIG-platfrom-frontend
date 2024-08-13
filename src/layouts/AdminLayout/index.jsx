import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <main className='px-10 min-h-screen'>
            <Outlet />
        </main>
    )
}
