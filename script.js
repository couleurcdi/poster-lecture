// script.js

// Function to generate a book poster
function generateBookPoster(title, author, image) {
    const poster = document.createElement('div');
    poster.classList.add('poster');

    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    poster.appendChild(titleElement);

    const authorElement = document.createElement('h2');
    authorElement.textContent = author;
    poster.appendChild(authorElement);

    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        poster.appendChild(imgElement);
    }

    document.body.appendChild(poster);
}

// Function to download the poster as an image
function downloadPoster() {
    html2canvas(document.querySelector('.poster')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'book-poster.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Example usage:
// generateBookPoster('The Great Gatsby', 'F. Scott Fitzgerald', 'image-url');
// downloadPoster();