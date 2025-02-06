const express = require('express');
const app = express();
const port = 3000;
const surveys = [
  {
    "id": 1,
    "title": "New student survey",
    "desc": "Questions for first year students",
    "nq": 2,
    "qs": ["3", "4"]
  },
  {
    "id": 2,
    "title": "Student survey",
    "desc": "Questions for master program students",
    "nq": 4,
    "qs": ["1", "2", "3", "4"]
  }
];

const questions = [
  {
    "id": 1,
    "type": "rate",
    "title": "Where you satisfied with the organisation of the course?",
    "description": "On the scale between 1 (lowest) and 5 (highest) please rate organisation of the course",
    "options": ["1", "2", "3", "4", "5"]
  },
  {
    "id": 2,
    "type": "rate",
    "title": "Were you satisfied with the content you got at the course?",
    "description": "On the scale between 1 (lowest) and 5 (highest) please rate content of the course",
    "options": ["1", "2", "3", "4", "5"]
  },
  {
    "id": 3,
    "type": "rate",
    "title": "Rate our education center",
    "description": "On the scale between 1 (lowest) and 5 (highest) please rate our education center",
    "options": ["1", "2", "3", "4", "5"]
  },
  {
    "id": 4,
    "type": "free",
    "title": "Why did you select this course?",
    "description": "Please describe the reasons why you selected the course",
    "options": []
  }
];
const cors = require('cors');
app.use(cors());
app.get('/surveys', (req, res) => {
  res.json(surveys);
});
app.get('/surveys/:id', (req, res) => {
  const survey = surveys.find(s => s.id == req.params.id);
  survey ? res.json(survey) : res.status(404).send("Survey not found");
});

app.get('/questions', (req, res) => {
  res.json(questions);
});
app.get('/questions/:id', (req, res) => {
  const question = questions.find(q => q.id == req.params.id);
  question ? res.json(question) : res.status(404).send("Question not found");
});
app.get('/', (req, res) => {
  res.send('Welcomo to the Backend');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
