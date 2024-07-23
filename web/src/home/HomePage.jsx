import { Box, Drawer, Fab, Grid, Paper, Toolbar, Typography, colors } from "@mui/material"
import { useNavigate } from "react-router"
import AddIcon from '@mui/icons-material/Add';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ElectionForm from "../election/ElectionForm";
import { useState } from "react";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);


const HomePage = ({elections}) => {
  const navitage = useNavigate()
  const [isElectionFormOpen, setIsElectionFormOpen] = useState(false)

  return (
    <Box p={2} >
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          Mes Élections
        </Typography>
      </Toolbar>

      <Grid container justifyContent="center" my={6} gap={4} sx={{ overflowY: 'hidden'}}>
        {elections.map((election, index) => {
          function getElectionStatus(votingStartDatetime, votingEndDatetime) {
            const currentDate = dayjs();

            if (currentDate.isBefore(votingStartDatetime)) {
              return 'NOT_STARTED';
            } else if (currentDate.isAfter(votingStartDatetime) && currentDate.isBefore(votingEndDatetime)) {
              return 'ONGOING';
            } else {
              return 'ENDED';
            }
          }
          

          const startDate = dayjs(election.voting_start_datetime);
          const endDate = dayjs(election.voting_end_datetime);
          const status = getElectionStatus(startDate, endDate);
        
          let statusObject = {};
          switch (status) {
            case 'NOT_STARTED':
              statusObject["text"] = 'Pas encore commencé';
              statusObject["color"] = 'black';
              statusObject["redirect"] = '/';
              break;
            case 'ONGOING':
              statusObject["text"] =  'En cours';
              statusObject["color"] = 'green';
              statusObject["redirect"] = `/election/${election.id}`;
              break;
            case 'ENDED':
              statusObject["text"] =  'Terminé';
              statusObject["color"] = 'red';
              statusObject["redirect"] = `/election/${election.id}/result`;
              break;
            default:
              statusObject["text"] =  'Statut inconnu';
          }

          return (
            <Grid item key={index} xs={12}>
              <Paper elevation={3} sx={{ 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: colors.grey[200],
                  transform: 'translateY(-2px)', // Add a slight upward movement
                }
              }}
                onClick={() => navitage(statusObject.redirect)}
              >
                <Box p={4}>
                  
                  <Typography variant="h6" sx={{ color: statusObject.color}}>{statusObject.text}</Typography>
                  <Typography variant="h4">Nom: {election.name}</Typography>
                  <br />
                  <Typography >Participants: {election.participants?.length}</Typography>
                  <br />
                  <Typography>Fin du vote: {endDate.format('YYYY-MM-DD HH:mm')}</Typography>
                </Box>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: "24px", right: "24px" }} onClick={() => setIsElectionFormOpen(true)}>
        <AddIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isElectionFormOpen}
        onClose={() => setIsElectionFormOpen(false)}
      >
        <ElectionForm />
      </Drawer>
      
   
    </Box>

  )
}

export default HomePage