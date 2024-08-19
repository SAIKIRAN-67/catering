// controllers/paymentController.js
import crypto from 'crypto';
import { Cashfree } from 'cashfree-pg';
import dotenv from 'dotenv';
dotenv.config();

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);
    const orderId = hash.digest('hex');
    return orderId.substr(0, 12);
}

export const createPaymentOrder = async (req, res) => {
    try {
        const requestData = req.body;
        requestData.order_id = await generateOrderId();
        requestData.order_amount = parseFloat(requestData.order_amount); // Ensure order_amount is a number

        console.log("Sending request to Cashfree:", requestData);

        const response = await Cashfree.PGCreateOrder("2023-08-01", requestData);
        console.log("Cashfree response:", response.data);
        res.json({ ...response.data, order_id: requestData.order_id });

    } catch (error) {
        console.error("Error creating payment order:", error.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred while creating the payment order.' });
    }
};

export const verifyPaymentOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
        res.json(response.data);

    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        res.status(500).json({ error: 'An error occurred while verifying the payment order.' });
    }
};
