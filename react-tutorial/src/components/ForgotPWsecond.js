import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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

export default function ForgotPWsecond({ history }) {
    const classes = useStyles();

    const [confirm, setConfirm] = useState('');

    const location = useLocation();

    console.log(location.state['re'])
    console.log('confirm ', confirm)

    const eHandler = (e) => {
        e.preventDefault()

        if (confirm === location.state['re']) {
            alert('success, 메일로 임시 비밀번호가 발송됩니다.')
            axios.post('auth' + '/find_password/phone_auth', location.state['email'])
                .then(function (response) {
                    console.log(response.data)
                    if (response.data["success"] === true) {
                        // 성공 창 출력
                        console.log('success', response.data)
                        history.push("/")
                    } else {
                        // 오류 창 출력
                        alert('아이디 혹은 비밀번호를 확인해주세요!')
                    }
                })
            history.push('/')
        } else {
            alert("fail");
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone (-를 제외한 숫자만 입력)"
                            type="phone"
                            id="phone"
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="input confirm number"
                                    id="confirm"

                                    value={confirm}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setConfirm(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    size='large'
                                    className={classes.submit}
                                    onClick={eHandler}
                                >
                                    인증번호 입력
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => history.push('/')}
                        >
                            go to signin
                        </Button>
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2"
                                onClick={history.push('/')}>
                                    Go to Signin
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2"
                                onClick={history.push('/SignUp')}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}