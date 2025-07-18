import React, { useState } from "react"
import Title from "../../components/owner/Title"
import { assets } from "../../assets/assets"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const AddCar = () => {
	const { axios, currency } = useAppContext()
	const [image, setImage] = useState(null)
	const [car, setCar] = useState({
		brand: "",
		model: "",
		year: 0,
		pricePerDay: 0,
		category: "",
		transmission: "",
		fuel_type: "",
		seating_capacity: 0,
		location: "",
		description: "",
	})

	const [isLoading, setIsLoading] = useState(false)

	const onSubmitHandler = async e => {
		e.preventDefault()
		if (isLoading) return null

		setIsLoading(true)
		try {
			const formData = new FormData()
			formData.append("image", image)
			formData.append("carData", JSON.stringify(car))

			const { data } = await axios.post("/api/owner/add-car", formData)
			if (data.success) {
				toast.success(data.message)
				setImage(null)
				setCar({
					brand: "",
					model: "",
					year: 0,
					pricePerDay: 0,
					category: "",
					transmission: "",
					fuel_type: "",
					seating_capacity: 0,
					location: "",
					description: "",
				})
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='px-4 py-10 md:px-10 flex-1'>
			<Title
				title='Добавить Новую Машину'
				subTitle='Заполните поля, чтобы добавить новый автомобиль в список для бронирования, указав цену, наличие и технические характеристики.'
			/>
			<form
				className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
				onSubmit={onSubmitHandler}>
				{/* Car Image */}
				<div className='flex items-center gap-2 w-full'>
					<label htmlFor='car-image'>
						<img
							src={image ? URL.createObjectURL(image) : assets.upload_icon}
							alt='image or upload icon'
							className='h-14 rounded cursor-pointer'
						/>
						<input
							type='file'
							id='car-image'
							accept='image/*'
							hidden
							onChange={e => setImage(e.target.files[0])}
						/>
					</label>
					<p className='text-sm text-gray-500'>Загрузите изображение машины</p>
				</div>
				{/* Car Brand and Model */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex flex-col w-full'>
						<label>Марка</label>
						<input
							type='text'
							placeholder='Audi, Toyota и т.д.'
							required
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
							value={car.brand}
							onChange={e => setCar({ ...car, brand: e.target.value })}
						/>
					</div>
					<div className='flex flex-col w-full'>
						<label>Модель</label>
						<input
							type='text'
							placeholder='Supra, X5 и т.д.'
							required
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
							value={car.model}
							onChange={e => setCar({ ...car, model: e.target.value })}
						/>
					</div>
				</div>
				{/* Car Year, Price, Category */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					<div className='flex flex-col w-full'>
						<label>Год выпуска</label>
						<input
							type='number'
							placeholder='2020'
							required
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
							value={car.year}
							onChange={e => setCar({ ...car, year: e.target.value })}
						/>
					</div>
					<div className='flex flex-col w-full'>
						<label>Цена в сутки ({currency})</label>
						<input
							type='number'
							placeholder='10000'
							required
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
							value={car.pricePerDay}
							onChange={e => setCar({ ...car, pricePerDay: e.target.value })}
						/>
					</div>
					<div className='flex flex-col w-full'>
						<label>Вид кузова</label>
						<select
							onChange={e => setCar({ ...car, category: e.target.value })}
							value={car.category}
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
							<option value=''>Выберите кузов</option>
							<option value='Седан'>Седан</option>
							<option value='Купе'>Купе</option>
							<option value='SUV'>SUV</option>
							<option value='Фургон'>Фургон</option>
						</select>
					</div>
				</div>
				{/* Car Transmission, Fuel Type, Seating Capacity */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					<div className='flex flex-col w-full'>
						<label>Коробка Передач</label>
						<select
							onChange={e => setCar({ ...car, transmission: e.target.value })}
							value={car.transmission}
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
							<option value=''>Выберите КПП</option>
							<option value='ПАКП'>ПАКП</option>
							<option value='РКП'>РКП</option>
							<option value='АКПП'>АКПП</option>
							<option value='МКПП'>МКПП</option>
						</select>
					</div>
					<div className='flex flex-col w-full'>
						<label>Тип Топлива</label>
						<select
							onChange={e => setCar({ ...car, fuel_type: e.target.value })}
							value={car.fuel_type}
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
							<option value=''>Выберите Топлива</option>
							<option value='Бензин'>Бензин</option>
							<option value='Дизель'>Дизель</option>
							<option value='Гибрид'>Гибрид</option>
							<option value='Газ'>Газ</option>
							<option value='Электричество'>Электричество</option>
						</select>
					</div>
					<div className='flex flex-col w-full'>
						<label>Кол-во Мест</label>
						<input
							type='number'
							placeholder='4'
							required
							className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
							value={car.seating_capacity}
							onChange={e =>
								setCar({ ...car, seating_capacity: e.target.value })
							}
						/>
					</div>
				</div>
				{/* Car Location */}
				<div className='flex flex-col w-full'>
					<label>Город</label>
					<select
						onChange={e => setCar({ ...car, location: e.target.value })}
						value={car.location}
						className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
						<option value=''>Выберите Город</option>
						<option value='Владивосток'>Владивосток</option>
						<option value='Уссурийск'>Уссурийск</option>
						<option value='Спасск'>Спасск</option>
						<option value='Арсеньев'>Арсеньев</option>
						<option value='Артём'>Артём</option>
					</select>
				</div>
				{/* Car Description */}
				<div className='flex flex-col w-full'>
					<label>Описание</label>
					<textarea
						rows={5}
						type='text'
						placeholder='Мощный мотор, Интерьер, Салон и т.д.'
						required
						className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
						value={car.description}
						onChange={e =>
							setCar({ ...car, description: e.target.value })
						}></textarea>
				</div>
				<button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
					{isLoading ? "Загрузка..." : "Сдать Авто"}
					<img
						src={assets.tick_icon}
						alt='save icon'
					/>
				</button>
			</form>
		</div>
	)
}

export default AddCar
