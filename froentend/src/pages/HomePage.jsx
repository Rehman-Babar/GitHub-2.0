import React from 'react'
import Search from '../component/Search'
import SortRepoButtons from '../component/SortRepoButtons'
import Profile from '../component/Profile'
import Repositries from '../component/Repositries'

const HomePage = () => {
  return (
    <div className='m-4'>
      <Search/>
      <SortRepoButtons/>
      <div className='flex flex-col lg:flex-row justify-center items-start gap-4'>
        <Profile/>
        <Repositries/>
      </div>
    </div>
  )
}

export default HomePage