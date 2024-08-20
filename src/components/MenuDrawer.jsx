import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

export default function MenuDrawer({
    open,
    setOpen
}) {
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const authPages = [
        {
            name: 'Se connecter',
            link: '/auth/login'
        },
        {
            name: 'Registre',
            link: '/auth/register'
        }
    ]

    const clientPages = [
        {
            name: 'Signalement une Anomalies',
            link: '/report'
        },
        {
            name: 'Mes signalements',
            link: '/my-reports'
        }
    ]

    const adminPages = [
        {
            name: 'Statistiques',
            link: '/admin/stats'
        },
        {
            name: 'Liste des signalements',
            link: '/admin/reports-list'
        }
    ]

    const DrawerList = (
        <Box className="bg-blue-500 flex-1 h-auto !text-white border-transparent" sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            {
                [
                    adminPages,
                    clientPages,
                    authPages
                ]
                .map((page, index) => (
                    <Fragment key={index}>
                        <List sx={(index == 0) ? {mt: 8.5, borderTop: '1px solid #e0e0e0'} : {}}>
                            {
                                page.map((item, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton className='w-full'>
                                            <Link to={item.link} className='w-full'>
                                                <ListItemText primary={item.name} />
                                            </Link>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Divider sx={{bgcolor: '#e0e0e0'}} />
                    </Fragment>
                ))
            }
        </Box>
    );

    return (
        <Drawer className='!border-transparent' open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
}