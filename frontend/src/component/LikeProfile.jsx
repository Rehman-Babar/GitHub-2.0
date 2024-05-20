// import React, { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const LikeProfile = ({userProfile}) => {
  const {authUser} = useAuthContext()
  const ownProfile = authUser?.username === userProfile.login
  // console.log(authUser);
  // console.log("userProfile", userProfile);
  
        const getLikes = async() => {
          try {
            const res = await fetch(`/api/users/like/${userProfile.login}`,{
              method:"POST",
              credentials:'include'
            })
            const data = await res.json();
            if (data.error) {
              throw new Error(data.error)
            }
            toast.success(data.message)
          } catch (error) {
            toast.error(error.message)
            return
          }
        }
  
  if(!authUser || ownProfile) return null
  return (
    <button onClick={getLikes} className='bg-glass font-medium w-full text-xs p-2 rounded-md cursor-pointer border border-blue-400 flex items-center gap-2'>
        <FaHeart size={16}/> Like Profile
    </button>
  )
}

export default LikeProfile