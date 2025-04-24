import { generateBookObj, generateId, saveBookToLocal, undoButton, deleteButton, addBook, books, editBook } from "./logic.mjs";

let bookTitle = document.getElementById('bookFormTitle');
let bookAuthor = document.getElementById('bookFormAuthor');
let bookYear = document.getElementById('bookFormYear');
let isCompleteBook = document.getElementById('bookFormIsComplete');
const bookForm = document.getElementById('bookForm');
const searchForm = document.getElementById('searchBook');
const searchBook = document.getElementById('searchBookTitle');

document.addEventListener('DOMContentLoaded', () => {
    addBook();
})

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

    console.log(books)
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookName = searchBook.value;

    if (bookName === '') {
        addBook();
        alertSearch('Inputan kosong');
        return;
    }

    const filterBook = books.filter((book) => book.title === bookName);
    if (filterBook.length > 0) {
        const containerIncompleteBook = document.getElementById('incompleteBookList');
        const containerCompleteBook = document.getElementById('completeBookList');

        containerCompleteBook.innerHTML = '';
        containerIncompleteBook.innerHTML = '';

        for (let book of filterBook) {
            makeBookCard(book);
        }
    } else {
        alertSearch('Buku tidak ditemukan');
    }
})

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
    });

    editBookButton.addEventListener('click', () => {
        editForm(bookObj);
    });
}

function editForm(bookObj) {
    const mainElement = document.querySelector('main');
    const containerInputEdit = document.createElement('div');
    containerInputEdit.classList.add('editFormContainer');

    const divRelative = document.createElement('div');
    divRelative.classList.add('relative');

    const textInfo = document.createElement('h3');
    textInfo.innerText = 'Edit Buku';
    textInfo.setAttribute('align', 'center');

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.classList.add('closeButton');
    
    const formEdit = document.createElement('form');
    formEdit.setAttribute('id', 'formEdit');
    
    const labelTitle = document.createElement('label');
    labelTitle.innerText = 'Judul';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'titleInputEdit');

    const labelAuthor = document.createElement('label');
    labelAuthor.innerText = 'Author';
    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('id', 'authorInputEdit');

    const labelYear = document.createElement('label');
    labelYear.innerText = 'Tahun';
    const yearInput = document.createElement('input');
    yearInput.setAttribute('type', 'number');
    yearInput.setAttribute('id', 'yearInputEdit');

    const buttonSubmitEdit = document.createElement('button');
    buttonSubmitEdit.setAttribute('type', 'submit');
    buttonSubmitEdit.innerText = 'Edit buku'

    formEdit.append(labelTitle, titleInput, labelAuthor, authorInput,labelYear, yearInput, buttonSubmitEdit);
    divRelative.append(textInfo, closeButton, formEdit);
    containerInputEdit.append(divRelative);
    mainElement.append(containerInputEdit);

    closeButton.addEventListener('click', () => {
        containerInputEdit.classList.add('hidden');
    });

    formEdit.addEventListener('submit', (e) => {
        e.preventDefault();
        editBook(bookObj, titleInput.value, authorInput.value, Number(yearInput.value));
        containerInputEdit.classList.add('hidden');
    });
}

function alertSearch(text) {
    const mainElement = document.querySelector('main');
    const containerInputEdit = document.createElement('div');
    containerInputEdit.classList.add('editFormContainer');

    const divRelative = document.createElement('div');
    divRelative.classList.add('relative');

    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.classList.add('closeButton');

    const alertText = document.createElement('p');
    alertText.innerText = text;

    divRelative.append(closeButton, alertText);
    containerInputEdit.append(divRelative);
    mainElement.append(containerInputEdit);

    closeButton.addEventListener('click', () => {
        containerInputEdit.classList.add('hidden');
    });
}
export {makeBookCard}