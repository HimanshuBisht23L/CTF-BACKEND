import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    email: String,
    Marks : Number,
   submittedAt: {
        type: String,
        default: () => dayjs().tz(TIMEZONE).format("DD MMM YYYY, hh:mm A")
    }
})


export default mongoose.model("Result", resultSchema);