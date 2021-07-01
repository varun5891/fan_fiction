import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { getUsers } from '../../Services/User/User_Service';
import Swal from 'sweetalert2';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AllWork from '../AllWork/AllWork';
import Ratings from '../Ratings/Ratings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard(props) {

  const {
    loggedInUser,
    isUserAuthenticated
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const onMount = () => {
    isUserAuthenticated();
  };

  useEffect(onMount,[]);

  return (
    <div className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        { loggedInUser.username !== null ? 
        <div>
          <Button variant="contained" color="primary" style={{ float: 'right',marginLeft: '10px' }}>
            My Work
          </Button>
          <Button variant="contained" color="primary" style={{ float: 'right', marginLeft: '10px' }}>
           Settings
          </Button>
          </div>
          : null }
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <AllWork />
        </Grid>
      </Grid>
    </div>
  );
}