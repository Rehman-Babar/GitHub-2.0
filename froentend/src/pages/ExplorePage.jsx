import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../component/Spinner';
import Repositries from '../component/Repositries';

const ExplorePage = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const exploreRepose = async(language) => {
		setLoading(true);
		setRepos([]);
		
		try {
			const res = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
				headers:{
				authorization:`token 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`,
				}
			});
			const data=await res.json();
			setRepos(data.items)
			setSelectedLanguage(language)
		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}
	console.log(repos);
	return (
		<div className='px-4'>
			<div className='bg-glass max-w-2xl mx-auto rounded-md p-4'>
				<h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
				<div className='flex flex-wrap gap-2 my-2 justify-center'>
					<img onClick={() => exploreRepose("javascript")} src='/javascript.svg' alt='JavaScript' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={() => exploreRepose("typescript")} src='/typescript.svg' alt='TypeScript logo' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={() => exploreRepose("c++")} src='/c++.svg' alt='C++ logo' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={() => exploreRepose("python")} src='/python.svg' alt='Python logo' className='h-11 sm:h-20 cursor-pointer' />
					<img onClick={() => exploreRepose("java")} src='/java.svg' alt='Java logo' className='h-11 sm:h-20 cursor-pointer' />
				</div>
				
				{repos.length > 0 && (
					<h2 className='text-lg font-semibold text-center my-4'>
						<span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
							{selectedLanguage.toUpperCase()}{" "}
						</span>
						Repositories
					</h2>
				)}
				{!loading && repos?.length > 0 && <Repositries repos={repos} alwaysFullWidth/>}
				{
					loading && <Spinner/>
				}
			</div>
		</div>
	);
};

export default ExplorePage