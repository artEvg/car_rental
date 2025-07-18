import React, { useEffect, useState } from "react"
import Title from "../components/Title"
import { assets } from "../assets/assets"
import CarCard from "../components/CarCard"
import { useSearchParams } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"
import { motion } from "motion/react"

const Cars = () => {
	// Получаем параметры поиска из URL
	const [searchParams] = useSearchParams()
	const pickupLocation = searchParams.get("pickupLocation")
	const pickupDate = searchParams.get("pickupDate")
	const returnDate = searchParams.get("returnDate")

	const { cars, axios } = useAppContext()

	const [input, setInput] = useState("")
	const [filteredCars, setFilteredCars] = useState([])

	const isSearchData = pickupLocation && pickupDate && returnDate

	const applyFilter = async () => {
		if (input === "") {
			setFilteredCars(cars)
			return null
		}
		const filtered = cars.slice().filter(car => {
			return (
				car.brand.toLowerCase().includes(input.toLowerCase()) ||
				car.model.toLowerCase().includes(input.toLowerCase()) ||
				car.category.toLowerCase().includes(input.toLowerCase()) ||
				car.transmission.toLowerCase().includes(input.toLowerCase())
			)
		})
		setFilteredCars(filtered)
	}

	const searchCarAvailability = async () => {
		try {
			const { data } = await axios.post("/api/bookings/change-availability", {
				location: pickupLocation,
				pickupDate,
				returnDate,
			})
			if (data.success) {
				setFilteredCars(data.availableCars)
				if (data.availableCars.length === 0) {
					toast("Нет доступных авто")
				}
			} else {
				toast.error(data.message || "Ошибка при поиске доступных автомобилей")
			}
		} catch (error) {
			toast.error(
				error.response?.data?.message || error.message || "Ошибка сети"
			)
		}
	}

	useEffect(() => {
		isSearchData && searchCarAvailability()
	}, [isSearchData])

	useEffect(() => {
		if (cars.length > 0 && !isSearchData) {
			applyFilter()
		}
	}, [input, cars, isSearchData])

	// Фильтрация по текстовому запросу из input
	const displayedCars = filteredCars.filter(car => {
		const query = input.toLowerCase()
		return (
			car.brand.toLowerCase().includes(query) ||
			car.model.toLowerCase().includes(query) ||
			(car.category && car.category.toLowerCase().includes(query))
		)
	})

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className='flex flex-col items-center py-20 bg-light max-md:px-4'>
				<Title
					title='Доступные автомобили'
					subTitle='Ознакомьтесь с нашим ассортиментом автомобилей премиум-класса, доступных для ваших путешествий'
				/>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
					<img
						className='w-4.5 h-4.5 mr-2'
						src={assets.search_icon}
						alt='search icon'
					/>
					<input
						onChange={e => setInput(e.target.value)}
						value={input}
						className='w-full h-full outline-none text-gray-500'
						type='text'
						placeholder='Поиск автомобиля...'
					/>
					<img
						className='w-4.5 h-4.5 ml-2'
						src={assets.filter_icon}
						alt='filter icon'
					/>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
				<p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
					Найдено {displayedCars.length} авто
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
					{displayedCars.length > 0 ? (
						displayedCars.map((car, index) => (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								key={car._id || index}>
								<CarCard car={car} />
							</motion.div>
						))
					) : (
						<p className='col-span-full text-center text-gray-500 mt-10'>
							Нет автомобилей по вашему запросу
						</p>
					)}
				</div>
			</motion.div>
		</div>
	)
}

export default Cars
