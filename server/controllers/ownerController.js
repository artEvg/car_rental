import imagekit from "../configs/imageKit.js"
import Booking from "../models/Booking.js"
import Car from "../models/Car.js"
import User from "../models/User.js"
import fs from "fs"

// Change Role User
export const changeRoleToOwner = async (req, res) => {
	try {
		const { _id } = req.user
		await User.findByIdAndUpdate(_id, { role: "owner" })
		res.json({ success: true, message: "Вы стали владельцем" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Add New Car
export const addCar = async (req, res) => {
	try {
		const { _id } = req.user
		let car = JSON.parse(req.body.carData)
		const imageFile = req.file

		// Upload Image to ImageKit
		const fileBuffer = fs.readFileSync(imageFile.path)
		const response = await imagekit.upload({
			file: fileBuffer,
			fileName: imageFile.originalname,
			folder: "/cars",
		})

		// Optimization through ImageKit URL Transformation
		const imageURL = imagekit.url({
			path: response.filePath,
			transformation: [
				{ width: "1280" }, // Width resize
				{ quality: "auto" }, // Auto compression
				{ format: "webp" }, // Convert to modern format
			],
		})
		const image = imageURL
		await Car.create({ ...car, owner: _id, image })

		res.json({ success: true, message: "Машина Добавлена" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Owner Cars
export const getOwnerCars = async (req, res) => {
	try {
		const { _id } = req.user
		const cars = await Car.find({ owner: _id })
		res.json({ success: true, message: cars })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
	try {
		const { _id } = req.user
		const { carId } = req.body
		const car = await Car.findById(carId)

		if (!car) {
			return res.json({ success: false, message: "Машина не найдена" })
		}

		// Проверяем, что машина принадлежит текущему пользователю
		if (car.owner.toString() !== _id.toString()) {
			return res.json({ success: false, message: "Не авторизованны" })
		}

		car.isAvailable = !car.isAvailable
		await car.save()

		res.json({ success: true, message: "Переключение доступности" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Delete a Car
export const deleteCar = async (req, res) => {
	try {
		const { _id } = req.user
		const { carId } = req.body
		const car = await Car.findById(carId)

		if (!car) {
			return res.json({ success: false, message: "Машина не найдена" })
		}

		// Проверяем, что машина принадлежит текущему пользователю
		if (car.owner.toString() !== _id.toString()) {
			return res.json({ success: false, message: "Не авторизованны" })
		}

		car.owner = null
		car.isAvailable = false
		await car.save()

		res.json({ success: true, message: "Машина удалена" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Dashboard data
export const getDashboardData = async (req, res) => {
	try {
		const { _id, role } = req.user
		if (role !== "owner") {
			return res.json({ success: false, message: "Не авторизованны" })
		}

		const cars = await Car.find({ owner: _id })
		const bookings = await Booking.find({ owner: _id })
			.populate("car")
			.sort({ createdAt: -1 })
		const pendingBooking = await Booking.find({
			owner: _id,
			status: "рассматривается",
		})
		const completedBooking = await Booking.find({
			owner: _id,
			status: "подтверждено",
		})

		// Calculate monthlyRevenue from booking where status is confirmed
		const monthlyRevenue = bookings
			.filter(booking => booking.status === "подтверждено")
			.reduce((acc, booking) => acc + booking.price, 0)

		const dashboardData = {
			totalCars: cars.length,
			totalBookings: bookings.length,
			pendingBooking: pendingBooking.length,
			completedBooking: completedBooking.length,
			recentBookings: bookings.slice(0, 3),
			monthlyRevenue,
		}
		res.json({ success: true, dashboardData })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}

// Update User Image
export const updateUserImage = async (req, res) => {
	try {
		const { _id } = req.user
		const imageFile = req.file

		// Upload Image to ImageKit
		const fileBuffer = fs.readFileSync(imageFile.path)
		const response = await imagekit.upload({
			file: fileBuffer,
			fileName: imageFile.originalname,
			folder: "/users",
		})

		// Optimization through ImageKit URL Transformation
		const imageURL = imagekit.url({
			path: response.filePath,
			transformation: [
				{ width: "1280" }, // Width resize
				{ quality: "auto" }, // Auto compression
				{ format: "webp" }, // Convert to modern format
			],
		})
		const image = imageURL

		await User.findByIdAndUpdate(_id, { image })
		res.json({ success: true, message: "Изображение обновлено" })
	} catch (error) {
		console.log(error.message)
		res.json({ success: false, message: error.message })
	}
}
