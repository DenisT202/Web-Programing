function fetchSurveyQuestions(status) {
    const surveyId = status === "Student" ? 1 : 2;
    const surveyUrl = `https://my-json-server.typicode.com/depth0/survey1/surveys/${surveyId}`;

    fetch(surveyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(survey => {
            console.log("Survey data:", survey); 
            const questionContainer = document.getElementById('questionsContainer');
            questionContainer.innerHTML = ''; 
            const questionPromises = survey.qs.map(qId => {
                return fetch(`https://my-json-server.typicode.com/depth0/survey1/questions/${qId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error ${response.status}: ${response.statusText}`);
                        }
                        return response.json();
                    });
            });

            return Promise.all(questionPromises);
        })
        .then(questions => {
            console.log("Questions data:", questions); 
            const questionContainer = document.getElementById('questionsContainer');

            questions.forEach(question => {
                const questionElement = document.createElement('div');
                questionElement.innerHTML = `
                    <label for="question${question.id}">
                        <strong>${question.title}</strong><br>
                        <em>${question.description}</em>
                    </label>
                    <input type="text" id="question${question.id}" name="question${question.id}" required>
                `;
                questionContainer.appendChild(questionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching survey or questions:', error);
        });
}
function handleFormSubmit(event) {
    event.preventDefault();

    const questionContainer = document.getElementById('questionsContainer');
    const inputs = questionContainer.querySelectorAll('input');
    const commentsSection = document.getElementById('commentsSection');

    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    let commentContent = '<div class="comment-name">Submitted Answers:</div>';

    inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`).innerHTML;
        commentContent += `<p><strong>${label}:</strong> ${input.value}</p>`;
    });

    commentElement.innerHTML = commentContent;
    commentsSection.appendChild(commentElement);

    alert('Your answers have been submitted!');
    document.getElementById('feedbackForm').reset();
    questionContainer.innerHTML = '';
}
document.getElementById('userStatus').addEventListener('change', function () {
    const status = this.value;
    if (status) {
        fetchSurveyQuestions(status);
    } else {
        document.getElementById('questionsContainer').innerHTML = '';
    }
});
document.getElementById('feedbackForm').addEventListener('submit', handleFormSubmit);

