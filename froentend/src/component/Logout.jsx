import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
// TODO Implement Logout functionality

const Logout = () => {
	const {authUser, setAuthUser, loading} = useAuthContext()
	const handleLogout = async() => {
		try {
			const res = await fetch(`/api/auth/logout`, {credentials:"include"})
			const data = await res.json()
			toast.success(data.message)
			setAuthUser(null)

		} catch (error) {
			toast.error(error.message)
		}
	}
	return (
		<>
			<img alt="user"
				src={authUser?.avatarUrl}
				className='w-10 h-10 rounded-full border border-gray-800'
			/>

			<div className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'>
				{loading ? <Spinner/> : <MdLogout size={22} onClick={handleLogout} />}
				
			</div>
		</>
	);
};

export default Logout;