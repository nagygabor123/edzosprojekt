const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51PtWWNRsbWzuHhS7HgW7JE9tlvHePZaUoygd5qq0vG8I40ykxfrgQ76ONt54VrdaY1h58tlhbhkIVgd7l9r0CrHL00cpTojy9a'); // Add your Stripe Secret Key here

const app = express();
app.use(express.static('public')); 
app.use(bodyParser.json());

function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const prices = {
    'Fogyás Program': 500000, 
    'Izomépítő Program': 600000, 
    'Állóképesség Fejlesztő Program': 700000 
};

app.post('/create-checkout-session', async (req, res) => {
    const { plan } = req.body;

    const sanitizedPlanName = removeAccents(plan);
    const unitAmount = prices[plan]; 

    if (!unitAmount) {
        return res.status(400).json({ error: 'Invalid plan name' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'huf',
                        product_data: {
                            name: sanitizedPlanName,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success?plan=${encodeURIComponent(plan)}`,
            cancel_url: 'http://localhost:3000/',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.get('/success', (req, res) => {
    const plan = req.query.plan;
    const pdfFiles = {
        'Fogyás Program': 'fogyas_program.pdf',
        'Izomépítő Program': 'izomepito_program.pdf',
        'Állóképesség Fejlesztő Program': 'allokepesseg_program.pdf'
    };

    const pdfFile = pdfFiles[plan];
    if (pdfFile) {
      res.download(__dirname + '/public/pdfs/' + pdfFile);
    } else {
      res.status(404).send('PDF nem található');
    }
});

const coaches = [
  {
    id: 1,
    name: "John Smith",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg"],
    info: "John Smith is a certified personal trainer with 10 years of experience in fitness.",
    phone: "+123456789"
  },
  {
    id: 2,
    name: "Jane Doe",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Jane Doe is a professional fitness instructor specializing in yoga and pilates.",
    phone: "+987654321"
  },
  {
    id: 3,
    name: "Mark Taylor",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 4,
    name: "titok1",
    images: ["./img/teszt2.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 5,
    name: "Mark Taylor",
    images: ["./img/teszt2.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 6,
    name: "Mark Taylor",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 7,
    name: "Mark Taylor",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 8,
    name: "Mark Taylor",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 9,
    name: "Mark Taylor",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  },
  {
    id: 10,
    name: "Mark Taylor",
    images: ["./img/teszt1.jpg", "./img/teszt2.jpg", "./img/teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  }
];

app.get('/coaches', (req, res) => {
    res.json(coaches);
});

app.get('/coach/:id', (req, res) => {
    const coachId = parseInt(req.params.id);
    const coach = coaches.find(c => c.id === coachId);
    if (coach) {
        res.json(coach);
    } else {
        res.status(404).send('Coach not found');
    }
});

app.listen(3000, () => {
    console.log('Server running on port localhost:3000');
});
