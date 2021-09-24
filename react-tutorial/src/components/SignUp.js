import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DaumPostcode from 'react-daum-postcode';
import Axios from'axios'
import { RepeatOneSharp } from '@material-ui/icons';
import axios from 'axios';
{/* import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_actions';
import { ContactSupportOutlined } from '@material-ui/icons';
*/}


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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 332,
    },
}));


const id = "daum-postcode"; // script가 이미 rending 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export default function SignUp({history}) {
    const classes = useStyles();
    const postcodeRef = useRef < HTMLDivElement | null > (null);

    const loadLayout = () => {
        window.daum.postcode.load(() => {
            const postcode = new window.daum.Postcode({
                oncomplete: function (data) {
                    console.log(data);
                }
            });
            postcode.open();
        });
    };

    useEffect(() => {
        const isAlready = document.getElementById(id);

        if (!isAlready) {
            const script = document.createElement("script");
            script.src = src;
            script.id = id;
            document.body.append(script);
        }
    }, []);
    
    const [users, setUsers] = useState([
        {
        user_id: 0,
        email: "abc",
        password: "09",
        name: "미미",
        phone: " ",
        accessToken: " ",
        refreshToken: " ",
        salt: " "
        },
    ]);

    {/*const { user_id, email, password, name, phone, accessToken, refreshToken, salt } = users;*/}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordconfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const eHandler = (e) => {
        e.preventDefault()
        if (email) {
            console.log(email)
        }
        if (password) {
            console.log(password)
        }
        if (passwordconfirm) {
            console.log(passwordconfirm)
        }
        if (name) {
            console.log(name)
        }

        if (password !== passwordconfirm) {
            alert('비밀번호와 비밀번호 확인이다릅니다 !')
        } else {
            let temp = {
                email: email,
                password: password,
                phone: phone,
                name: name,
            }

            setUsers(users.push(temp))
            console.log(users)

            axios.post('/api', temp)
            .then(function (response){
                console.log(response);
            })
            
            // const request = 
            {/*
            Axios.post('http://3.36.50.0:3000/auth/signup', temp)
                //성공시 then 실행
                .then(function (response) {
                    console.log(response);
                })
                //실패 시 catch 실행
                .catch(function (error) {
                    console.log(error);
                });
            */}
            

                // console.log(request);
        }

    }

    {/*
    const onDataChange = (e) => {
        const { email, values } = e.target;

        setUsers({
            ...users,
            [email]: values
        });
    }
    */}
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="xs" onSubmit={eHandler}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            회원가입
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                {/* 아이디 */}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        value={email}
                                        label="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        // id="email"
                                        // name="email"
                                        // autoComplete="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </Grid>
                                { /* 아이디 중복확인 버튼 */}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    중복확인
                                </Button>
                                {/* 비밀번호 */}
                                <Grid item xs={12}>
                                    <TextField
                                        type="password"
                                        value={password}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="비밀번호(8-18자)"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    {/* 비밀번호 확인 */}
                                    <Grid item xs={12}>
                                        <TextField
                                            type="password"
                                            value={passwordconfirm}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="passwordconfirm"
                                            label="비밀번호 확인"
                                            id="passwordconfirm"
                                            autoComplete="confirm-password"
                                            onChange={(e)=>{
                                                setPasswordconfirm(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* 이름 */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={name}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="이름"
                                        autoFocus
                                        onChange={(e)=>{
                                            setName(e.target.value)
                                        }}
                                    />
                                </Grid>
                                {/* 성 */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="성"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                {/* 생년월일 */}
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="birthday"
                                        label="생년월일"
                                        type="birthday"
                                        defaultValue="1950-01-01"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                                {/* 전화번호 */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={phone}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="phone"
                                        name="phone"
                                        autoComplete="phone"
                                        onChange={(e)=> {
                                            setPhone(e.target.value)
                                        }}
                                    />
                                </Grid>
                                {/* 주소 */}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="주소"
                                        name="address"
                                        autoComplete="address"
                                    />
                                </Grid>
                                { /* 주소검색 버튼 */}
                                <Button
                                    onClick={loadLayout}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    주소검색
                                </Button>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address_detail"
                                        label="상세주소"
                                        name="address_detail"
                                        autoComplete="address_detail"
                                    />
                                </Grid>
                                {/* IOT 넘버 */}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="iotNum"
                                        label="IOT 번호입력"
                                        name="iotNum"
                                        autoComplete="iotNum"
                                    />
                                </Grid>
                                { /* IOT 인증 버튼 */}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    IOT 인증
                                </Button>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="개인정보 수집에 동의 한다 ~~"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                // onClick={()=> history.push('/')}
                            >
                                회원 가입 완료
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}