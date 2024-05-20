import React from 'react'
import Repo from './Repo'

const Repositries = ({repos, alwaysFullWidth=false}) => {
  // console.log("Repositries",repos);
  const className = alwaysFullWidth ? "w-full" : "lg:w-2/3 w-full";
  return (
    <div className={`${className} bg-glass px-8 py-6`}>
      <ol className="relative border-s border-gray-200">
        {repos.map((repo) => (
          <Repo key={repo.id} repo={repo} />
        ))}
        {repos.length === 0 && <p className="flex justify-center items-center h-32">Repos not found</p>}
      </ol>
    </div>
  );
}

export default Repositries