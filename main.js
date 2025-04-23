// Do your work here...
let books = [];
const keyLocalStorage = '_BOOKS';

let bookTitle = document.getElementById('bookFormTitle');
let bookAuthor = document.getElementById('bookFormAuthor');
let bookYear = document.getElementById('bookFormYear');
let isCompleteBook = document.getElementById('bookFormIsComplete');

document.addEventListener('DOMContentLoaded', () => {
    addBook();
})

const bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookId = generateId();
    const numberYear = Number(bookYear.value);
    const bookObj = generateBookObj(bookId, bookTitle.value, bookAuthor.value, numberYear, isCompleteBook.checked);
    saveBookToLocal(bookObj);
    addBook();

    bookTitle.value = '';
    bookAuthor.value = '';
    bookYear.value = '';
    isCompleteBook.checked = false;
})

function addBook() {
    const getBookFromLocal = localStorage.getItem(keyLocalStorage);
    
    if (getBookFromLocal !== null) {
        const bookParse = JSON.parse(getBookFromLocal);
        books = bookParse;

        const containerIncompleteBook = document.getElementById('incompleteBookList');
        const containerCompleteBook = document.getElementById('completeBookList');
        containerIncompleteBook.innerHTML = '';
        containerCompleteBook.innerHTML = '';

        for (let book of books) {
            makeBookCard(book);
        }
    }
    return [];
}

function generateId() {
    return +new Date
}

function generateBookObj(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete,
    }
}

function saveBookToLocal(book) {
    books = [...books, book];
    const stringBook = JSON.stringify(books);
    localStorage.setItem(keyLocalStorage, stringBook);
}

function makeBookCard(bookObj) {
    const containerIncompleteBook = document.getElementById('incompleteBookList');
    const containerCompleteBook = document.getElementById('completeBookList');
    
    const cardBook = document.createElement('div');
    cardBook.classList.add('bookCard');
    const id = `book-${bookObj.id}`;
    cardBook.setAttribute('id', id);

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObj.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = `Penulis: ${bookObj.author}`;

    const bookYear = document.createElement('p');
    bookYear.innerText = `Tahun: ${bookObj.year}`;
    
    const buttonContainer = document.createElement('div');
    const completedButton = document.createElement('button');
    completedButton.innerText = 'Selesai dibaca';
    completedButton.classList.add('undoButton');
    const deletedButton = document.createElement('button');
    deletedButton.innerText = 'Hapus Buku';
    const editBookButton = document.createElement('button');
    editBookButton.innerText = 'Edit buku';
    buttonContainer.append(completedButton, deletedButton, editBookButton);

    cardBook.append(bookTitle, bookAuthor, bookYear, buttonContainer);

    if (!bookObj.isComplete) {
        containerIncompleteBook.append(cardBook);
    } else {
        completedButton.innerText = 'Belum selesai dibaca';
        containerCompleteBook.append(cardBook);
    }

    completedButton.addEventListener('click', () => {
        undoButton(bookObj);
    });

    deletedButton.addEventListener('click', () => {
        deleteButton(bookObj);
    })
}

function undoButton(bookObj) {
    const index = books.findIndex((book) => book.id === bookObj.id);
    if (index !== -1) {
        books[index].isComplete = !books[index].isComplete;
        const bookString = JSON.stringify(books);
        localStorage.setItem(keyLocalStorage, bookString);
        addBook(); 
    }
}

function deleteButton(bookObj) {
    const filterBook = books.filter((book) => book.id !== bookObj.id);
    if (filterBook) {
        books = filterBook;
        const stringBook = JSON.stringify(books);
        localStorage.setItem(keyLocalStorage, stringBook);
        addBook();
    }   
}


