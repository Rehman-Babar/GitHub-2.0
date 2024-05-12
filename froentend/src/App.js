import {Route, Routes} from 'react-router-dom'
// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExplorePage from './pages/ExplorePage.jsx';
import LikesPage from './pages/LikesPage';
// Components
import SideBar from './component/SideBar';

function App() {
	return (
		<div className='flex'>
			<SideBar/>
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
					<Route path='/explore' element={<ExplorePage />} />
					<Route path='/likes' element={<LikesPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
