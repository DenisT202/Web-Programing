document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comments = document.getElementById('comments').value;
    const commentSection = document.getElementById('commentsSection');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <div class="comment-name">${name}</div>
        <p class="comment-text">${comments}</p>
    `;
    commentSection.appendChild(commentElement);
    alert('Comment added!');
    event.target.reset();
});
function fetchSurveys() {
    fetch('https://my-json-server.typicode.com/depth0/survey1/surveys')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const commentSection = document.getElementById('commentsSection');
            data.forEach(survey => {
                const surveyElement = document.createElement('div');
                surveyElement.classList.add('comment');
                surveyElement.innerHTML = `
                    <p><strong>ID:</strong> ${survey.id}</p>
                    <div class="comment-name">Survey: ${survey.title}</div>
                    <p class="comment-text">${survey.desc}</p>
                    <p><strong>Number of Questions:</strong> ${survey.nq}</p>
                    <p><strong>Question IDs:</strong> ${survey.qs.join(', ')}</p>
                `;
                commentSection.appendChild(surveyElement);
            });
        })
        .catch(error => {
            console.error('Error fetching surveys:', error);
        });
}
window.onload = fetchSurveys;

