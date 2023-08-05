class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        localStorage.setItem("myLibrary", JSON.stringify(this.books));
    }

    removeBook(index) {
        this.books.splice(index, 1);
        localStorage.setItem("myLibrary", JSON.stringify(this.books));
    }
 
    toggleReadStatus(index) {
        this.books[index].isRead = !this.books[index].isRead;
        localStorage.setItem("myLibrary", JSON.stringify(this.books));
    }
}

const library = new Library();

function createBookCard(book, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
        <div>
            <div class="card-header">
                <h3 class="title">${book.title}</h3>
                <h5 class="author">by ${book.author}</h5>
            </div>
            <div class="card-body">
                <p>${book.pages} pages</p>
                <p class="read-status ${book.isRead ? "read" : "not-read"}">${book.isRead ? "Read" : "Not Read Yet"}</p>
                <div class="button-group">
                    <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
                    <button class="read-btn" onclick="toggleReadStatus(${index})">${book.isRead ? "Mark Unread" : "Mark Read"}</button>
                </div>
            </div>
        </div>
    `;

    booksGrid.appendChild(bookCard);
}

function render() {
    booksGrid.innerHTML = "";
    library.books.forEach((book, index) => {
        createBookCard(book, index);
    });
}

function removeBook(index) {
    library.removeBook(index);
    render();
}

function toggleReadStatus(index) {
    library.toggleReadStatus(index);
    render();
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let isRead = document.getElementById("isRead").checked;
    let newBook = new Book(title, author, pages, isRead);
    library.addBook(newBook);

    // Clear input fields after adding a new book
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("isRead").checked = false;

    // Render the updated library with the new book
    render();
}

const addBookBtn = document.getElementById("add-Book-Btn");
addBookBtn.addEventListener("click", function () {
    let addBookForm = document.getElementById("add-Book-Form");
    addBookForm.style.display = "block";
});

window.addEventListener("load", () => {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
        library.books = JSON.parse(storedLibrary);
        render();                 // Refresh the book cards after loading data from localStorage
    }
});

 
// Update the event listener for the "Add book" button to toggle the modal

const overlay = document.getElementById("overlay");

// Update the event listener for the "Add book" button to toggle the modal

addBookBtn.addEventListener("click", toggleModal);

// Update the event listener for the form submission to toggle the modal and add the book to the library

document.getElementById("add-Book-Form").addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
    toggleModal();
});

// Add event listener to the overlay to close the modal when clicking outside of it

overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
        toggleModal();
    }
});

function toggleModal() {
    const addBookModal = document.getElementById("addBookModal");
    addBookModal.classList.toggle("active");
    overlay.classList.toggle("active");
}



