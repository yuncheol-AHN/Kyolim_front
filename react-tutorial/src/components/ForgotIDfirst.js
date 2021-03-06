import React, { useState } from 'react';
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
import {useHistory} from 'react-router-dom'

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

export default function ForgotIDfirst() {
    const classes = useStyles();
    const history = useHistory();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const eHandler = (e) => {
        e.preventDefault();

        let _post = {
            name: name,
            phone: phone,
        }
        
        // [name, phone] -> email
        axios.post('auth' + '/findId', _post)
            .then(function (response) {
                if (response.data["success"] === 1) {
                    // 성공 창 출력
                    alert('email : ' + response.data["email"]["email"] + "\n로그인화면으로 이동합니다")
                    history.push('/')
                    {/*history.push({
                        pathname: '/ForgotIDsecond',
                        state: {res: response.data["email"]["email"]}
                    })*/}
                } else {
                    // 오류 창 출력
                    alert('이름과 휴대폰번호에 해당하는 가입자가 존재하지 않습니다')
                }
            })
    }
    return (
        <Grid container component="main" className={classes.root} onSubmit={eHandler}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot ID
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

                            value={name}
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                        <Grid container>
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone (-를 제외한 숫자만 입력)"
                                    type="phone"
                                    id="phone"

                                    value={phone}
                                    onChange={(e)=>{
                                        setPhone(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    size='large'
                                    className={classes.submit}
                                >
                                    인증번호 전송
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
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}