import { Outlet } from 'react-router-dom'

export default function ClientLayout() {
    return (
        <main className='px-10 min-h-screen'>
            <Outlet />
        </main>
    )
}
