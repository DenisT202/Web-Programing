document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const comments = document.getElementById('comments').value;
    console.log(`Name: ${name}`);
    console.log(`Comments: ${comments}`);
    alert('Form submitted. Thank you for your feedback!');
    event.target.reset();
});