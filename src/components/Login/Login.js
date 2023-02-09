import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import IMAGES from '../../images';
import { fetchUsers } from "../../store/slices/users/usersAPI";
import { selectUsers, toggleCurrentUser } from "../../store/slices/users/usersSlice";
import './Login.css'

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser, usersData} = useSelector(selectUsers)
    const formRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const {login: {value: login}, password: {value: password}} = formRef.current
        // console.log(login, ',', password);
        dispatch(toggleCurrentUser({login, password}))
       
        formRef.current.reset()
    }

    useEffect(() => {
        // console.log(currentUser);
        if(currentUser){
            navigate('/')
        }
    }, [currentUser])

    useEffect(() => {
        if(!usersData.length){
            dispatch(fetchUsers())
        }
    }, [])

    return(
        <div>
            <div className="loginBody">
                <div className="loginForm">
                    <div className="formLogin">
                         <img src={IMAGES.logo} />
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <input name='login' defaultValue={'bret'} type={'text'} placeholder='name' /> <br/><br/>
                                <input name="password" defaultValue={'gwenborough'} type={'password'} placeholder='password' /><br/><br/>
                                <button>Log in</button>
                            </form>
                            <p>Forgot your login details? <span>Get help signing in.</span> </p> <br/>
                            <button>Continue with FaceBook</button><br/><br/>
                            <h3>Don't have an account? <NavLink>Sign Up.</NavLink> </h3>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Login