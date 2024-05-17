
export const exploreRepos = async(req,res) => {
    const {language} = req.params;
   try {
     const randomRepos = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
         headers:{
         authorization:`token ${process.env.REACT_GUTHUB_API_KEY}`,
         }
     });
     if(!randomRepos) {
        res.status(404).json({message:"Repos not found"})
        return;
     }
     const randomRepo = await randomRepos.json();
    //  const randomrepo = randomRepo.items
     res.status(200).json(randomRepo)
   } catch (error) {
    res.status(404).json({error:error.message})
   }
}