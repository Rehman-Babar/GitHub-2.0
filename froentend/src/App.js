import {Navigate, Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExplorePage from './pages/ExplorePage.jsx';
import LikesPage from './pages/LikesPage';
// Components
import SideBar from './component/SideBar';
import { useAuthContext } from './context/AuthContext.jsx';

function App() {
	const {authUser, loading} = useAuthContext()
	if(loading) return null
	return (
		<div className='flex'>
			<SideBar/>
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'} /> } />
					<Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={'/'} /> } />
					<Route path='/explore' element={authUser ? <ExplorePage /> : <Navigate to={'/login'} /> } />
					<Route path='/likes' element={authUser ? <LikesPage /> : <Navigate to={'/login'} /> } />
				</Routes>
				<Toaster/>
			</div>
		</div>
	);
}

export default App;
