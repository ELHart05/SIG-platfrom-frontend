import { Outlet } from 'react-router-dom'
import LayoutHeader from '../../components/LayoutHeader';

export default function ClientLayout() {

    return (
        <main className='px-10 flex-1'>
            <LayoutHeader />
            <Outlet />
        </main>
    )
}
