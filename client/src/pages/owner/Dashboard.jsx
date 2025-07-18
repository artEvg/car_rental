import React, { useEffect, useState } from "react"
import { assets, dummyDashboardData } from "../../assets/assets"
import Title from "../../components/owner/Title"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const Dashboard = () => {
	const { axios, isOwner, currency } = useAppContext()
	const [data, setData] = useState({
		totalCars: 0,
		totalBookings: 0,
		pendingBooking: 0,
		completedBooking: 0,
		recentBookings: [],
		monthlyRevenue: 0,
	})

	const dashboardCards = [
		{
			title: "Машины",
			value: data.totalCars,
			icon: assets.carIconColored,
		},
		{
			title: "Аренды",
			value: data.totalBookings,
			icon: assets.listIconColored,
		},
		{
			title: "Проверка",
			value: data.pendingBooking,
			icon: assets.cautionIconColored,
		},
		{
			title: "Успешные",
			value: data.completedBooking,
			icon: assets.listIconColored,
		},
	]

	const fetchDashboardData = async () => {
		try {
			const { data } = await axios.get("/api/owner/dashboard")
			if (data.success) {
				setData(data.dashboardData)
			} else {
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (isOwner) {
			fetchDashboardData()
		}
	}, [isOwner])
	return (
		<div className='px-4 pt-10 md:px-10 flex-1'>
			<Title
				title='Панель управления'
				subTitle='Отслеживайте общую эффективность платформы, включая количество автомобилей, бронирований, выручку и недавние действия.'
			/>
			<div className='grid sm:grid-cols-2 items-center justify-center md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
				{dashboardCards.map((card, index) => (
					<div
						className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'
						key={index}>
						<div>
							<h1 className='text-sm text-gray-500'>{card.title}</h1>
							<p className='text-lg font-semibold'>{card.value}</p>
						</div>
						<div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
							<img
								className='w-4 h-4'
								src={card.icon}
								alt='card icon'
							/>
						</div>
					</div>
				))}
			</div>

			<div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
				<div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
					<h1 className='text-lg font-medium'>Последние Аренды</h1>
					<p className='text-gray-500'>Последние Аренды Клиентов</p>
					{data.recentBookings.map((booking, index) => (
						<div
							key={index}
							className='mt-4 flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
									<img
										src={assets.listIconColored}
										alt='list icon'
										className='h-5 w-5'
									/>
								</div>
								<div>
									<p>
										{booking.car.brand} {booking.car.model}
									</p>
									<p className='text-sm text-gray-500'>
										{booking.createdAt
											? booking.createdAt
													.split("T")[0]
													.split("-")
													.reverse()
													.join(".")
											: "Дата отсутствует"}
									</p>
								</div>
							</div>
							<div className='flex items-center gap-2 font-medium'>
								<p className='text-sm text-gray-500'>
									{booking.price} {currency}
								</p>
								<p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>
									{booking.status}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
					<h1 className='text-lg font-medium'>Ежемесячный Доход</h1>
					<p className='text-gray-500'>Выручка за текущий месяц</p>
					<p className='text-3xl mt-6 font-semibold text-primary'>
						{data.monthlyRevenue} {currency}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
