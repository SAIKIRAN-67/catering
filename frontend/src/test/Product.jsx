import React from 'react'

const Product = () => {

    const paymentHandler = async (e) => {
        const orderUrl = "http://localhost:1001/order";
        const response = await fetch(orderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: 500,
                currency: "INR",
                receipt: "qwesp"
            }),
        });
        const data = await response.json();
        console.log(data);

        const options = {
            key: "rzp_test_MxNJIWJVHAPnkJ",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            name: "Shirt",
            description: "A blue shirt",
            image: "https://images.unsplash.com/photo-1557683316-973673baf926",
            handler: async function (response) {
                const body = { ...response };
                const validateResponse = await fetch("http://localhost:1001/order/validate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                const data = await validateResponse.json();
                console.log("data : ", data);
                if(data.msg === "Success"){
                    alert("Payment Successfull");
                }
            },

            prefill: {
                name: "Vishnu ",
                email: "vishnu@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();


    }
    return (
        <div style={{ "display": "flex", "flexDirection": "column", "border": "2px solid black", "width": "300px" }} >
            <h1>Product</h1>
            <h1>Shirt</h1>
            <p>A blue shirt</p>
            <img style={
                {
                    "width": "100px",
                    "height": "100px"
                }
            } src="https://images.unsplash.com/photo-1557683316-973673baf926" alt="Shirt" />
            <p>$20.00</p>
            <button onClick={paymentHandler}>Pay</button>
        </div >
    )
}

export default Product