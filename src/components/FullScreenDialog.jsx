import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Typography } from '@mui/material';
import { STATUS_COLORS } from '../../constants';
import { getReportStatus } from '../utils/getReportStatus';
import { DateTime } from 'luxon';

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  activeReport
}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar className='flex flex-wrap pb-2 items-center justify-between gap-x-2'>
          <Box className="flex items-center">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Historique des actions prises
            </Typography>
          </Box>
          <h3 className="text-xl font-bold">{activeReport.location.label} <span className="text-base font-normal">({activeReport.anomalie})</span></h3>
        </Toolbar>
      </AppBar>
      <List>
        {
          activeReport.histories.map((e, i) => (
            <React.Fragment key={i}>
              <ListItemButton className='flex flex-col w-full items-start'>
                <ListItemText primary={DateTime.fromISO(e?.created_at).toFormat('dd/MM/yyyy HH:mm:ss')} />
                <Box className="flex flex-col gap-2">
                  <Box>
                    {
                      !!e.clarification
                      &&
                      <p className='flex gap-0.5 font-bold'>Clarification mis à jour: <span className='contents line-clamp-4 font-normal'>{e.clarification}</span></p>
                    }
                  </Box>
                  <Box>
                    {
                      e?.status_from != e?.status_to
                      ?
                      <p className="font-bold">Etat mis à jour de <span className="font-bold contents" style={{color: STATUS_COLORS[e?.status_from]}}>{getReportStatus(e?.status_from)}</span> vers <span className="font-bold contents" style={{color: STATUS_COLORS[e?.status_to]}}>{getReportStatus(e?.status_to)}</span></p>
                      :
                      <p className="font-bold">Etat courant <span className="font-bold contents" style={{color: STATUS_COLORS[e?.status_from]}}>{getReportStatus(e?.status_from)}</span></p>
                    }
                  </Box>
                </Box>
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))
        }
      </List>
    </Dialog>
  );
}