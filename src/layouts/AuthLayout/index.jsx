import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <main className='px-10 flex-1'>
            <Outlet />
        </main>
    )
}
