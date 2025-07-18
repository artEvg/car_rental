import Booking from "../models/Booking.js"
import Car from "../models/Car.js"

// Check Availability fo Car for a given Date
export const checkAvailability = async (car, pickupDate, returnDate) => {
	const bookings = await Booking.find({
		car,
		pickupDate: { $lte: returnDate },
		returnDate: { $gte: pickupDate },
	})
	return bookings.length === 0
}

// API Check Availability fo Car for the given Date and location

export const checkAvailabilityOfCar = async (req, res) => {
	try {
		const { location, pickupDate, returnDate } = req.body

		// Fetch all available Cars for the given location
		const cars = await Car.find({ location, isAvailable: true })

		// Check Car Availability
		const availableCarPromises = cars.map(async car => {
			const isAvailable = await checkAvailability(
				car._id,
				pickupDate,
				returnDate
			)
			return { ...car._doc, isAvailable: isAvailable }
		})

		let availableCars = await Promise.all(availableCarPromises)
		availableCars = availableCars.filter(car => car.isAvailable === true)
		res.json({ success: true, availableCars })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Create Booking

export const createBooking = async (req, res) => {
	try {
		const { _id } = req.user
		const { car, pickupDate, returnDate } = req.body
		const isAvailable = await checkAvailability(car, pickupDate, returnDate)
		if (!isAvailable) {
			return res.json({ success: false, message: "Машина недоступна" })
		}
		const carData = await Car.findById(car)
		// Calculate price based on pickupDate and returnDate
		const picked = new Date(pickupDate)
		const returned = new Date(returnDate)
		const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
		const price = carData.pricePerDay * noOfDays

		await Booking.create({
			car,
			owner: carData.owner,
			user: _id,
			pickupDate,
			returnDate,
			price,
		})

		res.json({ success: true, message: "Аренда создана" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// List User Booking
export const getUserBookings = async (req, res) => {
	try {
		const { _id } = req.user
		const bookings = await Booking.find({ user: _id })
			.populate("car")
			.sort({ createdAt: -1 })
		res.json({ success: true, bookings })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// List Owner Booking

export const getOwnerBookings = async (req, res) => {
	try {
		if (req.user.role !== "owner") {
			return res.json({ success: false, message: "Не авторизованны" })
		}
		const bookings = await Booking.find({ owner: req.user._id })
			.populate("car user")
			.select("-user.password")
			.sort({ createdAt: -1 })
		res.json({ success: true, bookings })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Change Booking Status

export const changeBookingsStatus = async (req, res) => {
	try {
		const { _id } = req.user
		const { bookingId, status } = req.body
		const booking = await Booking.findById(bookingId)
		if (booking.owner.toString() !== _id.toString()) {
			return res.json({ success: false, message: "Не авторизованны" })
		}
		booking.status = status
		await booking.save()
		res.json({ success: true, message: "Статус обновлён" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}
