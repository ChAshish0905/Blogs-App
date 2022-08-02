import React,{useState} from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button';
import Card from '../UI/Card';

const Login = (props) => {
    let hardcodedcred = [
        {
            username : 'User1',
            password : '12345'
        },
        {
            username : 'User2',
            password : '67890'
        }
    ];

    const [enteredUsername , setEnteredUsername] = useState('');
    const [enteredPassword , setEnteredPassword] = useState('');
    const [usernameIsValid , setUsernameIsValid] = useState();
    const [passwordIsValid , setPasswordIsValid] = useState();
    const [formIsValid , setFormIsValid] = useState(false);

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);

        setFormIsValid(
            (event.target.value===hardcodedcred[0].username && enteredPassword===hardcodedcred[0].password) ||
            (event.target.value===hardcodedcred[1].username && enteredPassword===hardcodedcred[1].password))
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            (enteredUsername===hardcodedcred[0].username && event.target.value===hardcodedcred[0].password) ||
            (enteredUsername===hardcodedcred[1].username && event.target.value===hardcodedcred[1].password))
    }

    const validateUsernameHandler = () => {
        setUsernameIsValid(enteredUsername===hardcodedcred[0].username || enteredUsername===hardcodedcred[1].username )
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword===hardcodedcred[0].password || enteredPassword===hardcodedcred[1].password)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(enteredUsername,enteredPassword);
    }

    return(
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div className={`${classes.control} ${
                    usernameIsValid===false ? classes.invalid : ''}`}>
                    <label htmlFor='username'>Username</label>
                    <input id='username' onChange={usernameChangeHandler} onBlur={validateUsernameHandler} type='text' value={enteredUsername}></input>
                </div>
                <div className={`${classes.control} ${passwordIsValid===false ? classes.invalid : ''}`}>
                    <label htmlFor='password'>Password</label>
                    <input id='password' onChange={passwordChangeHandler} onBlur={validatePasswordHandler} type='password' value={enteredPassword}></input>
                </div>
                <div className={classes.actions}>
                    <Button type='submit' disabled={!formIsValid}>Login</Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;