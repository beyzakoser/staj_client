import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../components/Copyright";
import {useHistory} from "react-router";
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {

    const history = useHistory();

    const classes = useStyles();

    const [Mail, setMail] = React.useState("");
    const [Sifre, setSifre] = React.useState("");
    const giris={
        mail:Mail,
        sifre:Sifre
    }
    const [id,setId] = useState("");

    return (
        <Container style={{marginTop:'15vh'}} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sisteme Giriş
                </Typography>
                
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        //onChange={setId}
                        onChange={e => setMail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Şifre"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setSifre(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={ () => {history.push('/dashboard',true)} }
                        onClick={
                            () => {
                                const { mail, sifre } = giris
                                axios.post('http://localhost:3004/giris', { mail, sifre })
                                    .then(response => {
                                        console.log(response);
                                        history.push('/dashboard',response.data)
                                    }).catch(err => console.log(err))
                            }
                        }
                    >
                        Giriş Yap
                    </Button>
                    <Grid container>

                    </Grid>
                
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
