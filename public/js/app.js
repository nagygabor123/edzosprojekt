const stripe = Stripe('pk_test_51PtWWNRsbWzuHhS7ydYmijEwc2NMkPOnnwfBrfgWlEpQ3suR0KazdhiwBred2okjvghJXqESoeKORwyrlfTlngom00gP3EZfWZ'); // Add your Stripe Publishable Key here

document.getElementById('checkout-button-fogyas').addEventListener('click', () => {
    createCheckoutSession('Fogyás Program');
});

document.getElementById('checkout-button-izomepito').addEventListener('click', () => {
    createCheckoutSession('Izomépítő Program');
});

document.getElementById('checkout-button-allokepesseg').addEventListener('click', () => {
    createCheckoutSession('Állóképesség Fejlesztő Program');
});

function createCheckoutSession(plan) {
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
    })
        .then(res => res.json())
        .then(session => {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(result => {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
