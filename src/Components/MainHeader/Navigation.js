import classes from './Navigation.module.css';

const Navigation = (props) => {
    return(
        <nav className={classes.nav}>
            {props.isLoggedIn && <button onClick={props.onLogout}>Logout</button>}
        </nav>
    );
};

export default Navigation;