import React from 'react'

import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { formatDate } from '../utils/functions.js';
import { PROGRAMMING_LANGUAGES } from '../utils/constents.js';
import toast from 'react-hot-toast';

const Repo = ({repo}) => {
  // console.log("repo from repos", repo);

  const formateDate = formatDate(repo.created_at);
  const imgLanguage = PROGRAMMING_LANGUAGES;
  const handleCopyClone = async (repo) => {
    try {
      await navigator.clipboard.writeText(repo.clone_url);
      toast.success("Repo Url cloned in clipboard");
    } catch (error) {
      toast.error("Failed to clone Repo Url to clipboard");
    }
  };
  return (
    <li className="mb-10 ms-7">
      <span
        className="absolute flex items-center justify-center w-6 h-6 bg-blue-100
			rounded-full -start-3 ring-8 ring-white">
        <FaCodeBranch className="w-5 h-5 text-blue-800" />
      </span>
      <div className="flex gap-2 items-center flex-wrap">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-lg font-semibold">
          {repo.name}
        </a>
        <span
          className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
					py-0.5 rounded-full flex items-center gap-1">
          <FaRegStar /> {repo.stargazers_count}
        </span>
        <span
          className="bg-purple-100 text-purple-800 text-xs font-medium
					 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <FaCodeFork /> {repo.forks_count}
        </span>
        <span
          onClick={() => handleCopyClone(repo)}
          className="cursor-pointer bg-green-100 text-green-800 text-xs
					font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <FaCopy /> Clone
        </span>
      </div>

      <time
        className="block my-1 text-xs font-normal leading-none
			 text-gray-400">
        {formateDate}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500">
        {repo.description ? repo.description.slice(0, 450) : "No description provided"}
      </p>
      {/* <img src={"/javascript.svg"} alt='Programming language icon' className='h-8' /> */}
      {imgLanguage[repo.language] ? (
        <img src={imgLanguage[repo.language]} alt="Programming language icon" className="h-8" />
      ) : null}
    </li>
  );
};

export default Repo