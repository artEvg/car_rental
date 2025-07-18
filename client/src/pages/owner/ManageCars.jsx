import React, { useEffect, useState } from "react"
import { assets } from "../../assets/assets"
import Title from "../../components/owner/Title"
import { useAppContext } from "../../context/AppContext.jsx"
import toast from "react-hot-toast"

const ManageCars = () => {
	const { isOwner, axios, currency } = useAppContext()
	const [cars, setCars] = useState([])
	const fetchOwnerCars = async () => {
		try {
			const { data } = await axios.get("/api/owner/cars")
			if (data.success) {
				setCars(Array.isArray(data.message) ? data.message : [])
			} else {
				setCars([])
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}
	const toggleAvailability = async carId => {
		try {
			const { data } = await axios.post("/api/owner/toggle-car", { carId })
			if (data.success) {
				toast.success(data.message)
				fetchOwnerCars()
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	const deleteCar = async carId => {
		try {
			const confirm = window.confirm("Вы уверены что хотите удалить авто?")
			if (!confirm) return null
			const { data } = await axios.post("/api/owner/delete-car", { carId })
			if (data.success) {
				toast.success(data.message)
				fetchOwnerCars()
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		isOwner && fetchOwnerCars()
	}, [isOwner])
	return (
		<div className='px-4 pt-10 md:px-10 w-full'>
			<Title
				title='Управление Машинами'
				subTitle='Просмотрите все представленные автомобили, обновите их характеристики или удалите их с платформы бронирования.'
			/>
			<div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
				<table className='w-full border-collapse text-left text-sm text-gray-600'>
					<thead className='text-gray-500'>
						<tr>
							<th className='p-3 font-medium'>Машины</th>
							<th className='p-3 font-medium max-md:hidden'>Кузов</th>
							<th className='p-3 font-medium'>Цена</th>
							<th className='p-3 font-medium max-md:hidden'>Статус</th>
							<th className='p-3 font-medium'>Действия</th>
						</tr>
					</thead>
					<tbody>
						{cars.map((car, index) => (
							<tr
								className='border-t border-borderColor'
								key={index}>
								<td className='p-3 flex items-center gap-3'>
									<img
										className='h-12 w-12 aspect-square rounded-md object-cover'
										src={car.image}
										alt='car image'
									/>
									<div className='max-md:hidden'>
										<p className='font-medium'>
											{car.brand} {car.model}
										</p>
										<p className='font-xs text-gray-500'>
											{car.seating_capacity} • {car.transmission}
										</p>
									</div>
								</td>
								<td className='p-3 max-md:hidden'>{car.category}</td>
								<td className='p-3'>
									{car.pricePerDay} {currency}/день
								</td>
								<td className='p-3 max-md:hidden'>
									<span
										className={`px-3 py-1 rounded-full text-sm ${
											car.isAvailable
												? "bg-green-100 text-green-500"
												: "bg-red-100 text-red-500"
										}`}>
										{car.isAvailable ? "Свободна" : "Забронирована"}
									</span>
								</td>
								<td className='flex items-center p-3'>
									<img
										onClick={() => toggleAvailability(car._id)}
										className='cursor-pointer'
										src={
											car.isAvailable ? assets.eye_close_icon : assets.eye_icon
										}
										alt='eye icon'
									/>
									<img
										onClick={() => deleteCar(car._id)}
										className='cursor-pointer'
										src={assets.delete_icon}
										alt='delete icon'
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ManageCars
