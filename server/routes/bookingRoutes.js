import express from "express"
import {
	checkAvailability,
	changeBookingsStatus,
	checkAvailabilityOfCar,
	createBooking,
	getOwnerBookings,
	getUserBookings,
} from "../controllers/bookingController.js"
import protect from "../middleware/auth.js"

const bookingRouter = express.Router()

bookingRouter.post("/change-availability", checkAvailabilityOfCar)
bookingRouter.post("/create", protect, createBooking)
bookingRouter.get("/user", protect, getUserBookings)
bookingRouter.get("/owner", protect, getOwnerBookings)
bookingRouter.post("/change-status", protect, changeBookingsStatus)
bookingRouter.post("/check-availability", protect, checkAvailability)

export default bookingRouter
