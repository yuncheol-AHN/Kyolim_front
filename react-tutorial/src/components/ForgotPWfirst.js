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
import axios from 'axios';

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

export default function ForgotPWfirst({history}) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmTo, setConfirmTo] = useState('');
    const [confirmFrom, setConfirmFrom] = useState('');

    const sendCert = (e) => {
        e.preventDefault();
        const _post ={
            email: email,
            phone: phone,
        }

        axios.post('auth' + '/find_password', _post)
            .then(function (response) {
                if (response.data["success"] === true) {
                    // 성공 창 출력

                    {/*history.push({
                        pathname: '/ForgotPWsecond',
                        state: { 
                            re: response.data["data"],
                            email: email,
                        }
                    })*/}
                    setConfirmFrom(response.data["data"]);
                    console.log('confirm number from server : ', response.data['data'])
                    alert('인증번호를 전송했습니다')

                } else {
                    // 오류 창 출력
                    alert('존재하지 않는 이메일과 휴대폰번호입니다')
                }
            })
    }

    const inputCert = (e) => {
        e.preventDefault();

        const _post = {
            email: email,
        }

        if (confirmTo === confirmFrom) {
            axios.post('auth' + '/find_password/phone_auth', _post)
                .then(function (response) {
                    if (response.data["success"] === true) {
                        // 성공 창 출력
                        alert('임시비밀번호를 입력하신 이메일로 전송했습니다')
                        // alert(response.data['message'])
                        console.log('return', response.data)
                    } else {
                        // 오류 창 출력
                        
                    }
                })
        } else {
            alert('인증번호를 확인해주세요')
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus

                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value);
                            }}
                        />
                        <Grid container>
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone (-를 제외한 숫자만 입력)"
                                    id="phone"

                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    size='small'
                                    className={classes.submit}

                                    onClick={sendCert}
                                >
                                    인증번호 전송
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={8}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="Input confirm number"
                                    id="confirm"

                                    value={confirmTo}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setConfirmTo(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    size='small'
                                    className={classes.submit}
                                    onClick={inputCert}
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
                                onClick={() => history.push('/')}>
                                    Go to Signin
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2"
                                onClick={() => history.push('/SignUp')}>
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