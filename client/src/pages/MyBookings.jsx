import React, { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import Title from "../components/Title"
import { useAppContext } from "../context/AppContext.jsx"
import toast from "react-hot-toast"
import { motion } from "motion/react"

const MyBookings = () => {
	const { axios, user, currency } = useAppContext()

	const [bookings, setBookings] = useState([])

	const fetchMyBookings = async () => {
		try {
			const { data } = await axios.get("/api/bookings/user")
			if (data.success) {
				setBookings(data.bookings)
			} else {
				toast.error(data.message || "Ошибка при получении бронирований")
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (user) fetchMyBookings()
	}, [user])

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
			<Title
				title='Мои аренды'
				subTitle='Просмотр и управление всеми бронированиями автомобилей'
				align='left'
			/>

			<div>
				{bookings.length > 0 ? (
					bookings.map((booking, index) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							key={booking._id || index}
							className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'>
							<div className='md:col-span-1'>
								{booking.car ? (
									<>
										<div className='rounded-md overflow-hidden mb-3'>
											<img
												className='w-full h-auto aspect-video object-cover'
												src={booking.car.image}
												alt='car image'
											/>
										</div>
										<p className='text-lg font-medium mt-2'>
											{booking.car.brand} {booking.car.model}
										</p>
										<p className='text-gray-500'>
											{booking.car.year} • {booking.car.category} •{" "}
											{booking.car.location}
										</p>
									</>
								) : (
									<p>Данные о машине недоступны</p>
								)}
							</div>

							<div className='md:col-span-2'>
								<div className='flex items-center gap-2'>
									<p className='px-3 py-1.5 bg-light rounded'>
										Бронь #{index + 1}
									</p>
									<p
										className={`px-3 py-1 text-xs rounded-full ${
											booking.status === "подтверждено"
												? "bg-green-400/15 text-green-600"
												: "bg-red-400/15 text-red-600"
										}`}>
										{booking.status}
									</p>
								</div>
								<div className='flex items-start gap-2 mt-3'>
									<img
										className='w-4 h-4 mt-1'
										src={assets.calendar_icon_colored}
										alt='calendar icon'
									/>
									<div>
										<p className='text-gray-500'>Срок аренды</p>
										<p>
											С{" "}
											{booking.pickupDate
												?.split("T")[0]
												.split("-")
												.reverse()
												.join(".")}{" "}
											По{" "}
											{booking.returnDate
												?.split("T")[0]
												.split("-")
												.reverse()
												.join(".")}
										</p>
									</div>
								</div>
								<div className='flex items-start gap-2 mt-3'>
									<img
										className='w-4 h-4 mt-1'
										src={assets.location_icon_colored}
										alt='location icon'
									/>
									<div>
										<p className='text-gray-500'>Город аренды</p>
										<p>{booking.car?.location || "неизвестен"}</p>
									</div>
								</div>
							</div>

							<div className='md:col-span-1 flex flex-col justify-between gap-6'>
								<div className='text-sm text-gray-500 text-right'>
									<p>Итоговая Цена</p>
									<h1 className='text-2xl font-semibold text-primary'>
										{booking.price} {currency}
									</h1>
									<p>
										Забронирован{" "}
										{booking.createdAt
											? new Date(booking.createdAt).toLocaleDateString("ru-RU")
											: "Дата отсутствует"}
									</p>
								</div>
							</div>
						</motion.div>
					))
				) : (
					<p className='mt-10 text-center text-gray-500'>
						Нет активных бронирований
					</p>
				)}
			</div>
		</motion.div>
	)
}

export default MyBookings
