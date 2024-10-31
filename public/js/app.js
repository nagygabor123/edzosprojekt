const stripe = Stripe('pk_test_51PtWWNRsbWzuHhS7ydYmijEwc2NMkPOnnwfBrfgWlEpQ3suR0KazdhiwBred2okjvghJXqESoeKORwyrlfTlngom00gP3EZfWZ');

let selectedPlan = null; // Globális változó a kiválasztott tervhez

function openModal(title, description, planId) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    selectedPlan = planId; // A kiválasztott terv azonosítója

    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('modal-purchase-button').addEventListener('click', () => {
    if (selectedPlan) {
        handlePurchaseClick(selectedPlan);
    }
    closeModal(); // Modal bezárása vásárlás után
});

function handlePurchaseClick(planId) {
    if (planId === 'checkout-button-fogyas') {
        createCheckoutSession('Fogyás Program');
    } else if (planId === 'checkout-button-izomepito') {
        createCheckoutSession('Izomépítő Program');
    } else if (planId === 'checkout-button-allokepesseg') {
        createCheckoutSession('Állóképesség Fejlesztő Program');
    }
}

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
