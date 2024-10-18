const express = require('express');
const app = express();
const port = 3000;

// Serve static files (CSS, JS, images, etc.)
app.use(express.static('public'));

// Coach data (could be stored in a database in a real app)
const coaches = [
  {
    id: 1,
    name: "John Smith",
    images: ["teszt1.jpg", "teszt2.jpg", "teszt3.jpg"],
    info: "John Smith is a certified personal trainer with 10 years of experience in fitness.",
    phone: "+123456789"
  },
  {
    id: 2,
    name: "Jane Doe",
    images: ["teszt1.jpg", "teszt2.jpg", "teszt3.jpg"],
    info: "Jane Doe is a professional fitness instructor specializing in yoga and pilates.",
    phone: "+987654321"
  },
  {
    id: 3,
    name: "Mark Taylor",
    images: ["teszt1.jpg", "teszt2.jpg", "teszt3.jpg"],
    info: "Mark Taylor is a strength and conditioning coach with expertise in weightlifting.",
    phone: "+192837465"
  }
];

// API route to get coach details by ID
app.get('/coach/:id', (req, res) => {
  const coachId = parseInt(req.params.id);
  const coach = coaches.find(c => c.id === coachId);
  if (coach) {
    res.json(coach);
  } else {
    res.status(404).send('Coach not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
