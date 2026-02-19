async function searchBooks() {
    const query = document.getElementById('query').value;
    if (!query) {
        alert('Veuillez entrer un titre de livre');
        return;
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
    const data = await response.json();
    displayResults(data.items || []);
}

async function searchByAuthor() {
    const query = document.getElementById('authorQuery').value;
    if (!query) {
        alert('Veuillez entrer un nom d\'auteur');
        return;
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(query)}&maxResults=10`);
    const data = await response.json();
    displayResults(data.items || []);
}

function displayResults(books) {
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';
    
    if (books.length === 0) {
        resultDiv.innerHTML = '<p style="text-align:center; color:#666;">Aucun livre trouvé. Réessayez!</p>';
        return;
    }
    
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        const title = book.volumeInfo.title || 'Titre inconnu';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Auteur inconnu';
        const poster = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null;
        
        let posterHtml = '';
        if (poster) {
            posterHtml = `<img src='${poster}' alt='${title}'>`;
        }
        
        bookDiv.innerHTML = `
            ${posterHtml}
            <div class="book-info">
                <h3>${title}</h3>
                <p><strong>Auteur(s):</strong> ${authors}</p>
                <button class="btn-create" onclick="createPoster('${title.replace(/'/g, "\\'")}', '${authors.replace(/'/g, "\\'")}', '${poster}')">Créer l'Affiche</button>
            </div>
        `;
        resultDiv.appendChild(bookDiv);
    });
}

function createPoster(title, authors, imageUrl) {
    document.getElementById('posterImage').src = imageUrl || 'https://via.placeholder.com/200x300?text=Pas%20d\'image';
    document.getElementById('posterTitle').textContent = title;
    document.getElementById('posterAuthor').textContent = 'par ' + authors;
    document.getElementById('posterContainer').style.display = 'block';
    document.getElementById('posterContainer').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            html2canvas(document.getElementById('poster'), {
                backgroundColor: '#ffffff',
                scale: 2
            }).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download = 'affiche-livre.png';
                link.click();
            }).catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors du téléchargement');
            });
        });
    }
});
