import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import IMAGES from '../../images'
import { logOut, selectUsers } from '../../store/slices/users/usersSlice'
import Posts from '../Posts/Posts'
import Stories from '../Stories/Stories'

function Main() {
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const {currentUser} = useSelector(selectUsers)

  useEffect(() => {
    if(!currentUser){
        navigate('/login')
    }
  }, [currentUser])
  

    return (
    <section className="main">
        <div className="wrapper">
            <div className="left-col">
                <Stories/>
                <Posts />
            </div>
            <div className="right-col">
                <span  className="profile-card">
                    <div className="profile-pic">
                        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt=""/>
                    </div>
                    <div>
                        <p className="username">{currentUser?.username}</p>
                        <p className="sub-text">{currentUser?.name}</p>
                    </div>
                    <button onClick={() => dispatch(logOut())} className="action-btn">switch</button>
                </span>
                <p className="suggestion-text">Suggestions for you</p>
            </div>
        </div>
    </section>
  )
}

export default Main