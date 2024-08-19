import express from "express"
import dotenv from "dotenv"
import orderroute from "./routes/order.route.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"
import Razorpay from "razorpay"
import crypto from "crypto"


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/order", orderroute);
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post("/api/admin/signin", (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log("Token ", token);
        res.status(200).json({ message: "Login Successful", token });
    } else {
        res.status(401).json({ error: "Invalid Credentials" });
    }
});

app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).json({ error: "Some error occurred" });
        }

        console.log("Order ", order);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Some error occurred" });
    }

});


app.post("/order/validate", (req, res) => {

    const {  razorpay_order_id,razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = hmac.digest('hex');

    if(digest !== razorpay_signature){
        return res.status(400).json({msg: "Transaction not legit"});
    }

    res.json({
        msg: "Success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id

    });


})





app.listen(process.env.PORT, () => {
    console.log(`app is listening in port ${process.env.PORT}`);
});

