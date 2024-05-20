import {User} from '../models/user.models.js'

export const getUserProfileAndRepos = async(req,res) => {
    const {username} = req.params;

    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`,{
        headers:{
            authorization:`token ${process.env.REACT_GUTHUB_API_KEY}`,
        }
    });
    const userProfile = await userRes.json();
    const userRepos = await fetch(userProfile.repos_url,{
        headers:{
            authorization:`token ${process.env.REACT_GUTHUB_API_KEY}`,
        }
    });
    const repos = await userRepos.json();
    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    
    res.status(200).json({userProfile, repos})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

export const likeProfile =async (req, res) => {
    const {username} = req.params;
    try {
        const user = await User.findById(req.user._id.toString()); // that is us. that is currently lotggedin
        const userToLike= await User.findOne({username}) 
        if(!userToLike){
            return res.status(404).json({error:"User is not member to this app."})
        }
        if(!user){
            return res.status(404).json({error:"Please login first to like a profile."})
        }
        if(user.likedProfiles.includes(userToLike.username)) {
            return res.status(200).json({error:"User already Liked"})
        } 
        userToLike.likedBy.push({username:user.username, avatarUrl:user.avatarUrl, likedDate:Date.now()})
        user.likedProfiles.push(userToLike.username)

        await Promise.all([user.save(), userToLike.save()]);
        res.status(200).json({message:"User liked"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
} 

export const getlikes = async(req, res) => {
    try {
        const user = await User.findById(req.user._id.toString())
        res.status(200).json({likedBy:user?.likedBy})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
}
