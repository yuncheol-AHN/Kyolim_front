import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function MultilineTextFields() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordconfirm] = useState('');
    {/*
    const [users, setUsers] = useState({
        user_id: "",
        email: "",
        password: "",
    })

    
    
    const { user_id, email, password } = users;
    */}
    
    const [people, setPeople] = useState([
        {
            user_id:0,
            email:'abc',
            password:'123'
        },
    ])
    
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
        
        if (password !== passwordconfirm) {
            alert('비밀번호와 비밀번호 확인이다릅니다 !')
        } else {
            let temp = {
                user_id:people.length,
                email: email,
                password: password
            }

            setPeople(people.concat(temp))
            console.log(people)
        }
        
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={eHandler}>
            <TextField
                label="email"
                variant="outlined"
                value={email}
                required
                fullWidth
                // id="email"
                // name="email"
                // autoComplete="email"
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <TextField
                type="password"
                label="password"
                variant="outlined"
                value={password}
                required
                fullWidth
                // id="email"
                // name="email"
                // autoComplete="email"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <TextField
                type="password"
                label="passwordconfirm"
                variant="outlined"
                value={passwordconfirm}
                required
                fullWidth
                // id="email"
                // name="email"
                // autoComplete="email"
                onChange={(e) => {
                    setPasswordconfirm(e.target.value)
                }}
            />
            <Button
                type="submit"
                color="secondary"
                variant="contained"
            >
                Submit
            </Button>
        </form>
    );
}
