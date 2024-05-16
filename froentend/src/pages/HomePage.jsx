import React, { useCallback, useEffect, useState } from 'react'
import Search from '../component/Search'
import SortRepoButtons from '../component/SortRepoButtons'
import Profile from '../component/Profile'
import Repositries from '../component/Repositries'
import toast from 'react-hot-toast'
import Spinner from '../component/Spinner'
const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState();
  const [sortType, setSortType] = useState("resent");

  const getUserProfileAndRepos = useCallback( async (username="Rehman-Babar") => {
    setLoading(true)
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`,{
        headers:{
          authorization:`token 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`,
        }
      });
      const userProfile = await userRes.json();
      setUserProfile(userProfile);
      const userRepos = await fetch(userProfile.repos_url);
      const userRepo = await userRepos.json();
      userRepo.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      setRepos(userRepo);
      return {userProfile, repos}
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  }, [])
  useEffect(() => {
    getUserProfileAndRepos();
  },[getUserProfileAndRepos])

  const onSearch = async (e, username) => {
		e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null);

		// const { userProfile} = await getUserProfileAndRepos(username);
		// setUserProfile(userProfile);
    const userRes = await fetch(`https://api.github.com/users/${username}`,{
        headers:{
          authorization:`token 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`,
        }
      });
      const userProfile = await userRes.json();
      setUserProfile(userProfile);
      const searchRepos = await fetch(userProfile.repos_url)

      const searchRepo = await searchRepos.json();
      setRepos(searchRepo);
		setLoading(false);
    setSortType("resent")
	};

  
  const onSort = (sortType)=> {
    if(sortType === "resent") {
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)) // resent will b first
    } else if (sortType === "stars") {
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count)
    } else if(sortType === "forks") {
      repos.sort((a,b) => b.forks_count - a.forks_count)
    }
    setSortType(sortType)
    setRepos([...repos])
  }
  
  return (
    <div className='m-4'>
      <Search onSearch={onSearch}/>
      {repos.length > 0 && <SortRepoButtons onSort={onSort} sortType={sortType}/>}
      <div className='flex flex-col lg:flex-row justify-center items-start gap-4'>
        
        {userProfile && !loading && <Profile userProfile={userProfile}/>}
        {!loading && repos.length > 0 &&  <Repositries repos={repos}/>}
        
        {loading && <Spinner/>}
      </div>  
    </div>
  )
}

export default HomePage