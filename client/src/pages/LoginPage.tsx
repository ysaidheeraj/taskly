import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../apis/UserLogin';
import { RootState } from '../store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '';
    
    const userDetailsVal = useSelector((state: RootState) => state.userDetails);
    const { user: userObj } = userDetailsVal;

    const userLogin = useSelector((state: RootState) => state.userLogin)
    const {user} = userLogin;

    const handleLogin = () => {
        dispatch(login(email, password));
    };   
    
    useEffect(() => {
        if(userObj || user){
            navigate("../"+redirect);
        }
    }, [user, userObj])
    return (
        <>
            <div className="container border rounded p-4 w-50 h-100">
                <h2>Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-dark w-100" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </>
    )
}
