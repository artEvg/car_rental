import React, { useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext.jsx"
import Title from "../../components/owner/Title"
import toast from "react-hot-toast"

const ManageBookings = () => {
	const { currency, axios } = useAppContext()

	const [bookings, setBookings] = useState([])
	// Состояние, в котором хранится id бронирования, где открыт селект редактирования статуса
	const [editingBookingId, setEditingBookingId] = useState(null)

	const fetchOwnerBookings = async () => {
		try {
			const { data } = await axios.get("/api/bookings/owner")
			data.success ? setBookings(data.bookings) : toast.error(data.message)
		} catch (error) {
			toast.error(error.message)
		}
	}

	const changeBookingsStatus = async (bookingId, status) => {
		try {
			const { data } = await axios.post("/api/bookings/change-status", {
				bookingId,
				status,
			})
			if (data.success) {
				toast.success(data.message)
				setEditingBookingId(null) // Закрываем селект после смены статуса
				fetchOwnerBookings()
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		fetchOwnerBookings()
	}, [])

	return (
		<div className='px-4 pt-10 md:px-10 w-full'>
			<Title
				title='Управление Арендой'
				subTitle='Отслеживайте все аренды клиентов, обновляйте, управляйте или удаляйте их с платформы бронирования.'
			/>
			<div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
				<table className='w-full border-collapse text-left text-sm text-gray-600'>
					<thead className='text-gray-500'>
						<tr>
							<th className='p-3 font-medium'>Машины</th>
							<th className='p-3 font-medium max-md:hidden'>Диапазон дат</th>
							<th className='p-3 font-medium'>Итого</th>
							<th className='p-3 font-medium max-md:hidden'>Оплата</th>
							<th className='p-3 font-medium'>Действия</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking, index) => (
							<tr
								className='border-t border-borderColor text-gray-500'
								key={booking._id || index}>
								<td className='p-3 flex items-center gap-3'>
									<img
										className='h-12 w-12 aspect-square rounded-md object-cover'
										src={booking.car.image}
										alt='car image'
									/>
									<p className='font-medium max-md:hidden'>
										{booking.car.brand} {booking.car.model}
									</p>
								</td>
								<td className='p-3 max-md:hidden'>
									{booking.pickupDate
										.split("T")[0]
										.split("-")
										.reverse()
										.join(".")}{" "}
									-{" "}
									{booking.returnDate
										.split("T")[0]
										.split("-")
										.reverse()
										.join(".")}
								</td>
								<td className='p-3'>
									{booking.price} {currency}
								</td>
								<td className='p-3 max-md:hidden'>
									<span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>
										Недоступно
									</span>
								</td>
								<td className='p-3 relative'>
									{/* Кнопка "три точки" для открытия селекта */}
									{editingBookingId === booking._id ? (
										<select
											onChange={e =>
												changeBookingsStatus(booking._id, e.target.value)
											}
											value={booking.status}
											onBlur={() => setEditingBookingId(null)} // Закрыть селект при выходе фокуса
											autoFocus
											className='px-2 py-1.5 text-gray-500 border border-borderColor rounded-md outline-none'>
											<option value='рассматривается'>Проверка</option>
											<option value='отменено'>Отменено</option>
											<option value='подтверждено'>Успешно</option>
										</select>
									) : (
										<>
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold ${
													booking.status === "подтверждено"
														? "bg-green-100 text-green-500"
														: booking.status === "отменено"
														? "bg-red-100 text-red-500"
														: "bg-yellow-100 text-yellow-500"
												}`}>
												{booking.status}
											</span>
											<button
												onClick={() => setEditingBookingId(booking._id)}
												className='ml-2 px-2 py-1.5 rounded hover:bg-gray-200 focus:outline-none'
												aria-label='Изменить статус'>
												&#x22EE; {/* Вертикальные три точки */}
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ManageBookings
