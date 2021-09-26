import React, { useEffect, useState, useRef } from 'react';
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

    //회원가입 필요한 변수객체
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        cPassword: '',
        name: '',
        birth: '',
        address: '',
        addressDetail:'',
        phone: '',
        gAuthCode: '',
        iAuthCode: '',
        pMessage: '비밀번호 확인',
        iotNum: '',
        confirmCheck: "false"
    });

    const [messages, setMessages] = useState({
        email_msg: '',
        pass_msg: '',
        cpass_msg: '',
        name_msg: '',
        add_msg: '',
        add_detail_msg: '',

    })

    const show = () => {
        console.log(inputs.email)
        console.log(inputs.password)
        console.log(inputs.name)
        console.log(inputs.birth)
        console.log(inputs.address)
        console.log(inputs.addressDetail)
        console.log(inputs.iAuthCode)
        console.log(inputs.iotNum)

    }

    const { email, password, cPassword, name, birth, address, addressDetail, phone, pMessage } = inputs;

    //이메일 중복확인 함수
    const CheckDuplicateEmail = () => {

        axios.post('auth' + '/check_duplicate_email', inputs.email)
      .then(function (response) {
        console.log(response)
        console.log(response.data)
        if (response.data["success"] === true) {
          alert('중복된 이메일이 없습니다!')
        } else {
          // 오류 창 출력
          alert('이메일이 중복 됩니다!')
        }
      })

    };

    //입력되는 변수들을 최신화 해주는 함수.
    const handleChange = (e) => {
        const {value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    //비밀번호 유효성 체크 함수
    const checkPassword = (e) => {
        handleChange(e)
        // 8 ~15자 영무, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        // 맞는 형식이면 true를 리턴
        if(regExp.test(e.target.value)){
            console.log("true")
        }
        else{
            console.log("false")
        }

    }


    // 비밀번호 확인 비교 함수.
    const handleConfirmPassword = (e) => {
        handleChange(e);

        if(e.target.value !== inputs.password){
            console.log("비밀번호 불일치")
        }
        else {
            console.log("비밀번호 일치")
        }
    };


    const selfAuth = () => {
        axios.post('auth' + '/signup_phone=auth', inputs.phone)
            .then(function (response) {
                console.log(response)
                console.log(response.data)
                if (response.data["success"] === true) {
                alert('인증번호를 전송했습니다!')

                setInputs({
                    gAuthCode: response.data["data"]
                })
                } else {
                // 오류 창 출력
                alert('핸드폰 번호를 확인해주세요!')
                }
            })
    }

    //입력받은 인증번호 비교 함수
    const checkAuthCode = () => {
        if(inputs.iAuthCode === inputs.gAuthCode){
            alert("인증 완료")
        }
        else{
            alert("인증번호가 다릅니다!")
        }
    }

    //IoT 중복확인 함수
    const CheckIot = () => {

        axios.post('auth' + '/checkIot', inputs.iotNum)
      .then(function (response) {
        console.log(response)
        console.log(response.data)
        if (response.data["success"] === true) {
          alert('IoT 기기가 인증 되었습니다! ')
        } else {
          // 오류 창 출력
          alert('이미 사용중인 IoT기기 입니다. 번호를 확인해주세요!')
        }
      })

    };

    const classes = useStyles();
    const postcodeRef = useRef < HTMLDivElement | null > (null);

    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substring(0,10);


    const loadLayout = (e) => {
        window.daum.postcode.load(() => {
            const postcode = new window.daum.Postcode({
                oncomplete: function (data) {
                    setInputs({
                        ...inputs,
                        address: data.address
                    });
                    console.log(address)
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

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="xs">
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
                                        onChange={handleChange}
                                        name="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="아이디"
                                        autoComplete="current-email"
                                    />
                                </Grid>
                                { /* 아이디 중복확인 버튼 */}
                                <Button
                                    onClick={CheckDuplicateEmail}
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
                                        onChange={checkPassword}
                                        name="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="비밀번호(8-15자)"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                    {/* 비밀번호 확인 */}
                                <Grid item xs={12}>
                                    <TextField
                                        className="invalid-feedback"
                                        onChange={handleConfirmPassword}
                                        name="cPassword"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="비밀번호 확인"
                                        type="password"
                                        id="cPassword"
                                        autoComplete="confirm-password"
                                    />
                                </Grid>

                                {/* 이름 */}
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="이름"
                                        autoFocus
                                    />
                                </Grid>

                                {/* 휴대폰 번호 */}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        autoComplete="current-phone"
                                        name="phone"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="전화번호('-'자 없이)"
                                        autoFocus
                                    />
                                </Grid>

                                { /* 본인인증 확인 버튼 */}
                                <Button
                                    onClick={selfAuth}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    본인인증
                                </Button>


                                {/* 본인인증 번호 입력 텍스트*/}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        onChange={handleChange}
                                        autoComplete="current-authCode"
                                        name="iAuthCode"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="authCode"
                                        label="인증번호"
                                        autoFocus
                                    />
                                </Grid>

                                { /* 인증번호 확인 버튼 */}
                                <Button
                                    onClick={checkAuthCode}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    인증확인
                                </Button>


                                {/* 생년월일 */}
                                <Grid item xs={12} sm={12}>
                                    <form className={classes.container} noValidate>
                                        <TextField
                                            onChange={handleChange}
                                            name="birth"
                                            id="birth"
                                            label="생년월일"
                                            type="date"
                                            defaultValue={date}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </Grid>

                                {/* 주소 */}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        onClick={loadLayout}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        value= {address}
                                        label="주소"
                                        name="address"
                                        autoComplete="current-address"
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
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="addressDetail"
                                        label="상세주소"
                                        name="addressDetail"
                                        autoComplete="addressDetail"
                                    />
                                </Grid>

                                {/* IoT넘버 */}
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        onChange={handleChange}
                                        name="iotNum"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="iotNum"
                                        label="IoT넘버"
                                        autoComplete="current-iotNum"
                                    />
                                </Grid>
                                { /* IoT 중복확인 버튼 */}
                                <Button
                                    onClick={CheckIot}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    className={classes.margin}
                                >
                                    중복확인
                                </Button>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="개인정보 수집에 동의 한다 ~~"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                // onClick={reqSignUp}
                                onClick={show}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={()=> history.push('/')}
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
