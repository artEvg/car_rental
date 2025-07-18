import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { assets, dummyCarData } from "../assets/assets"
import Loader from "../components/Loader"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"
import { motion } from "motion/react"

const CarDetails = () => {
	const { id } = useParams()
	const {
		cars,
		axios,
		pickupDate,
		setPickupDate,
		returnDate,
		setReturnDate,
		currency,
	} = useAppContext()
	const navigate = useNavigate()
	const [car, setCar] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const { data } = await axios.post("/api/bookings/create", {
				car: id,
				pickupDate,
				returnDate,
			})
			if (data.success) {
				toast.success(data.message)
				navigate("/my-bookings")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		const foundCar = cars.find(car => car._id === id)
		setCar(foundCar)
	}, [cars, id])

	if (!car) {
		return <Loader />
	}

	return (
		<div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
			<button
				onClick={() => navigate(-1)}
				className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
				<img
					className='rotate-180 opacity-65'
					src={assets.arrow_icon}
					alt='arrow icon'
				/>
				Все автомобили
			</button>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
				{/* Left Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='lg:col-span-2'>
					<motion.img
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						src={car.image}
						alt={`${car.brand} ${car.model}`}
						className='w-full h-auto md:max-h-100 object-cover items-center rounded-xl mb-6 shadow-md'
					/>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='space-y-6'>
						<div>
							<h1 className='text-3xl font-bold'>
								{car.brand} {car.model}
							</h1>
							<p className='text-gray-500 text-lg'>
								{car.category} • {car.year}
							</p>
						</div>

						<hr className='border-borderColor my-6' />

						<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
							{[
								{
									icon: assets.users_icon,
									text: `${car.seating_capacity} Местная`,
								},
								{
									icon: assets.fuel_icon,
									text: `${car.fuel_type}`,
								},
								{
									icon: assets.car_icon,
									text: `${car.transmission}`,
								},
								{
									icon: assets.location_icon,
									text: `${car.location}`,
								},
							].map(({ icon, text }) => (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4 }}
									key={text}
									className='flex flex-col items-center bg-light p-4 rounded-lg'>
									<img
										src={icon}
										alt='icon'
										className='h-5 mb-2'
									/>
									{text}
								</motion.div>
							))}
						</div>

						{/* Description */}
						<div>
							<h1 className='text-xl font-medium mb-3'>Описание</h1>
							<p className='text-gray-500'>{car.description}</p>
						</div>

						{/* Features */}
						<div>
							<h1 className='text-xl font-medium mb-3'>Особенности</h1>
							<ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
								{[
									"Камера 360°",
									"Bluetooth",
									"GPS",
									"Подогрев сидений",
									"Камера заднего вида",
								].map(item => (
									<li
										className='flex items-center text-gray-500'
										key={item}>
										<img
											src={assets.check_icon}
											alt='icon'
											className='h-4 mr-2'
										/>
										{item}
									</li>
								))}
							</ul>
						</div>
					</motion.div>
				</motion.div>

				{/* Right */}
				<motion.form
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					onSubmit={handleSubmit}
					className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
					<p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
						{car.pricePerDay} {currency}
						<span className='text-base text-gray-400 font-normal'>в день</span>
					</p>
					<hr className='border-borderColor my-6' />
					<div className='flex flex-col gap-2'>
						<label htmlFor='pickup-date'>Дата аренды</label>
						<input
							value={pickupDate}
							onChange={e => setPickupDate(e.target.value)}
							className='border border-borderColor px-3 py-2 rounded-lg'
							min={new Date().toISOString().split("T")[0]}
							type='date'
							id='pickup-date'
							required
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='return-date'>Дата возврата</label>
						<input
							value={returnDate}
							onChange={e => setReturnDate(e.target.value)}
							className='border border-borderColor px-3 py-2 rounded-lg'
							type='date'
							id='return-date'
							required
						/>
					</div>

					<button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>
						Забронировать
					</button>

					<p className='text-center text-sm'>
						Для бронирования не требуется оплата
					</p>
				</motion.form>
			</div>
		</div>
	)
}

export default CarDetails
