import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { userDetails } from "../apis/UserDetails";
import { logout } from "../apis/UserLogout";
import { AppDispatch } from "../store";
export const Header = () => {
    const dispatch: AppDispatch = useDispatch();

    const userDetailsVal = useSelector((state: RootState) => state.userDetails);
    const { error, loading, user } = userDetailsVal;

    useEffect(() =>{
        if(!user && !error && !loading){
            dispatch(userDetails());
        }
    }, [error, user, loading])

    const handleLogout = ()=>{
        dispatch(logout());
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand mx-auto" to="/">
                    Taskly
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                    >
                    {user && user.email ? (
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {user.first_name + ' ' + user.last_name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        )
                        : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Signup
                            </Link>
                            </li>
                        </ul>)
                    }
                </div>
            </div>
        </nav>
  );
};
