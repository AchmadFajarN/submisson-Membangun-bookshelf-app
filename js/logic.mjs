import { makeBookCard } from "./dom.mjs";

const keyLocalStorage = '_BOOKS';
let books = [];

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

function undoButton(bookObj) {
    const index = books.findIndex((book) => book.id === bookObj.id);
    if (index !== -1) {
        books[index].isComplete = !books[index].isComplete;
        const bookString = JSON.stringify(books);
        localStorage.setItem(keyLocalStorage, bookString);
        addBook(); 
    }
}

function editBook(bookObj, newTitile, newAuthor, newYear) {
    const index = books.findIndex((book) => book.id === bookObj.id);
    if (index !== -1) {
        books[index].title = newTitile;
        books[index].author = newAuthor;
        books[index].year = newYear;
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

export {generateBookObj, generateId, saveBookToLocal, undoButton, deleteButton, addBook, books, editBook };