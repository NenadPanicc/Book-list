// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

    // UI Class: Handle UI Tasks
    class UI {
       static displayBooks(){
         const books = Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
       }
       static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
       }
       static clearFields(){
        document.querySelector(".title").value = '';
        document.querySelector(".author").value = '';
        document.querySelector(".isbn").value = '';
       }
       static removeBook(el){
         if(el.classList.contains("delete")){
         el.parentElement.parentElement.remove();
       }}

       static showAlert(message, className){
         var div = document.createElement('div');
         div.style.width="100%";
         div.className = `alert alert-${className}`;
         div.appendChild(document.createTextNode(message))
         div.style.marginLeft='50%';
         var form = document.querySelector('.form-div');
         var container = document.querySelector('.main-div');
         container.insertBefore(div, form);
         setTimeout(()=>document.querySelector('.alert').remove(), 3000);
       }
      }

       // Event: Display Books
  
      document.addEventListener("DOMContentLoaded", UI.displayBooks);
   // Event: Add a Book
      document.querySelector(".add-book-btn").addEventListener('click', (e)=>{
        // Get the values
        var title = document.querySelector(".title").value;
        var author = document.querySelector(".author").value;
        var isbn = document.querySelector(".isbn").value;
        // Validate the form
        if(title === '' || author === '' || isbn === ''){
          UI.showAlert("Please fill out the form", "danger");
        }else{
          // instatiate a Book
        const book = new Book(title, author, isbn);
        // Add book to list
        UI.addBookToList(book);
        // Add book to store
      Store.addBook(book);
        // Clear fields
        UI.clearFields();
        // Show book added alert
        UI.showAlert("Book added", "success");
        }
      });
      
      //Remove a Book
      document.querySelector("#book-list").addEventListener("click", (e) => {
        UI.removeBook(e.target);
         // Remove book from store
         Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        //Book removed alert
        UI.showAlert("Book removed", "success");
       
      })

 
   
  // Store class
  class Store{
    static getBooks(){
      let books;
      if(localStorage.getItem('books')=== null) {
        books = [];  
      }else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    static addBook(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
      const books = Store.getBooks();

      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
    
 

     
    
