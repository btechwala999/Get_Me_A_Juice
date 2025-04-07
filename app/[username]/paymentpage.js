const pay = async () => {
    try {
        setLoading(true);
        
        // Validate amount
        if (!amount || amount < 1) {
            toast.error('Please enter a valid amount', {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            setLoading(false);
            return;
        }

        const response = await initiate(amount * 100, params.username, paymentform);
        
        if (!response || !response.id) {
            toast.error('Invalid Razorpay credentials', {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            setLoading(false);
            return;
        }

        const options = {
            key: user.razorpayid,
            amount: response.amount,
            currency: "INR",
            name: "Get Me A Juice",
            description: "Support your favorite creator",
            image: user.profilepic || "/logo.png",
            order_id: response.id,
            handler: function (response) {
                const form = document.createElement('form');
                document.body.appendChild(form);
                form.method = 'POST';
                form.action = '/api/razorpay';

                const formData = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                Object.keys(formData).forEach(key => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = formData[key];
                    form.appendChild(input);
                });

                form.submit();
            },
            prefill: {
                name: paymentform.name,
                email: session?.user?.email || "",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        
        rzp1.on('payment.failed', function (response) {
            toast.error('Payment failed. Please try again', {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        });

    } catch (error) {
        console.error('Payment error:', error);
        toast.error('Invalid Razorpay credentials', {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    } finally {
        setLoading(false);
    }
}; 