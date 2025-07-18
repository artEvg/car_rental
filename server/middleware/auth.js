import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = async (req, res, next) => {
	const token = req.headers.authorization
	if (!token) {
		return res.json({
			success: false,
			message: "Не авторизованы",
		})
	}
	try {
		const userId = jwt.decode(token, process.env.JWT_SECRET)
		if (!userId) {
			return res.json({
				success: false,
				message: "Не авторизованы",
			})
		}
		req.user = await User.findById(userId).select("-password")
		next()
	} catch (error) {
		console.log(error, message.error)
		return res.json({
			success: false,
			message: error.message,
		})
	}
}

export default protect
