import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <main className='p-10 flex-1 flex items-center justify-center w-full'>
            <Box
                maxWidth={'550px'}
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                textAlign={"center"}
            >
                <Outlet />
            </Box>
        </main>
    )
}
