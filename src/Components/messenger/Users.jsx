import React from 'react'
import './Users.css'

const Users = ({user}) => {
    const {picture, _id, firstName, lastName} = user;
  return (
    <div>
        <img className='user-img' src={picture} alt="" />
        <p className='user-name'>{firstName + lastName}</p>
    </div>
  )
}

export default Users