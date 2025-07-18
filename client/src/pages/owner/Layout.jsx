import React, { useEffect } from "react"
import NavbarOwner from "../../components/owner/NavbarOwner.jsx"
import Sidebar from "../../components/owner/Sidebar.jsx"
import { Outlet } from "react-router-dom"
import { useAppContext } from "../../context/AppContext.jsx"

const Layout = () => {
	const { isOwner, navigate } = useAppContext()

	useEffect(() => {
		if (!isOwner) {
			navigate("/")
		}
	}, [isOwner])
	return (
		<div className='flex flex-col min-h-screen'>
			<NavbarOwner />
			<div className='flex flex-1'>
				<Sidebar />
				<main className='flex-1 p-4 overflow-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default Layout
