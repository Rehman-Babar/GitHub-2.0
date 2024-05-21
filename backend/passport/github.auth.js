import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github2';
import dotenv from 'dotenv';
import { User } from '../models/user.models.js';

dotenv.config();

passport.serializeUser(function (user,done) {
    done(null, user)
})

passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:"https://github-2-0.onrender.com/api/auth/github/callback"
},
async function(accessToken, refreshToken, profile, done) {
    const user = await User.findOne({username:profile.username}); 
    if(!user) { // For SignUp
        const newUser = new User({
            name:profile.displayName,
            username:profile.username,
            avatarUrl:profile.photos[0]?.value,
            likedProfiles:[],
            likedBy:[]
        });
        await newUser.save();
        done(null, newUser)
    } else{ // For Login
        done(null, user)
        }
    }
))
