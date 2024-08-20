import { Outlet } from 'react-router-dom'
import LayoutHeader from '../../components/LayoutHeader'

export default function AdminLayout() {
    return (
        <main className='px-10 flex-1'>
            <LayoutHeader />
            <Outlet />
        </main>
    )
}
