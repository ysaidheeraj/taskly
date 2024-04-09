import { useEffect, useState } from "react"
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../apis/UserRegister";
import { AppDispatch } from "../store";
import { USER_REGISTER_RESET } from "../constants/UserConstants";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("");
    const dispatch: AppDispatch  = useDispatch();
    const handleRegister = () =>{
        dispatch(register({
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'password': password
        }))
    }
    
    const userDetailsVal = useSelector((state: RootState) => state.userDetails);
    const { user: userObj } = userDetailsVal;

    const userRegister = useSelector((state: RootState) => state.userRegister)
    const { loading, user} = userRegister;

    useEffect(() => {
        if(userObj){
            navigate("../");
        }
        if(user){
            dispatch({
                type: USER_REGISTER_RESET
            });
            navigate('../login');
        }
    }, [userObj, user, loading])
    return (
        <>
            <div className="container border rounded p-4 w-50 h-100">
                <h2>Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name*</label>
                        <input type="text" className="form-control" id="firstName"  value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="middleName"  value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name*</label>
                        <input type="text" className="form-control" id="lastName" value={lastName}
                        onChange={(e) => setLastName(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address*</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
                        onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password*</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-dark w-100" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </>
    )
}
