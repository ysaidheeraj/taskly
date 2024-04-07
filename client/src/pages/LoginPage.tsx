import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../apis/UserLogin';
import { RootState } from '../store';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '';
    
    const userDetailsVal = useSelector((state: RootState) => state.userDetails);
    const { error: detailsError, loading: detailsLoading, user: userObj } = userDetailsVal;

    const userLogin = useSelector((state: RootState) => state.userLogin)
    const {error, loading, user} = userLogin;

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
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
        </>
    )
}
