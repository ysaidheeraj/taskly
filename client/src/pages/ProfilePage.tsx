import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { update } from "../apis/UserUpdate";
import { User } from "../models/User";
import { AppDispatch } from "../store";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("");
    const dispatch: AppDispatch = useDispatch();

    const userDetailsVal = useSelector((state: RootState) => state.userDetails);
    const { user: userObj } = userDetailsVal;

    useEffect(() =>{
        if(userObj){
            setEmail(userObj.email);
            setFirstName(userObj.first_name);
            setLastName(userObj.last_name);
            setMiddleName(userObj.middle_name);
        }else{
            navigate('../login');
        }
    }, [userObj])
    const handleUpdate = () =>{
        const userUpdateObj: User = {
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            email: email
        }
        if(password && password.length){
            userUpdateObj.password = password;
        }
        dispatch(update(userUpdateObj));
    }
  return (
    <>
        <h2>Profile</h2>
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
                disabled required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password*</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update</button>
        </form>
    </>
  )
}
