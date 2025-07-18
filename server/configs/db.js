import mongoose from "mongoose"

const connectDB = async () => {
	try {
		mongoose.connection.on("connected", () => console.log("MongoDB подключена"))
		await mongoose.connect(`${process.env.MONGODB_URI}/CarRental`)
	} catch (error) {
		console.log(error.message)
	}
}

export default connectDB
