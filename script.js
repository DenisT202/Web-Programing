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
