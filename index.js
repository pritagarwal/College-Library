//Constructor for book object
//console.log("hii there");

function Book(name, author, type) {
  this.name = name;
  this.type = type;
  this.author = author;
}

// Constructor for display method

function display() {}

//prototype of display constuctor

//Validate whether entries are correctly inputed by the user

display.prototype.validate = (book) => {
  // console.log("In validate");
  if (book.name.length >= 3 && book.author >= 3) {
    return true;
  } else {
    return false;
  }
};

//Adding the book in the table of BookList

display.prototype.add = function (book) {
  //console.log("in add");

  let Book_arr = localStorage.getItem("Book_arr");
  let listOfBook = [];
  //  console.log(Book_arr);
  if (Book_arr == null) {
    console.log("in push");
    listOfBook.push(book);
    // console.log(listOfBook);
    localStorage.setItem("Book_arr", JSON.stringify(listOfBook));
  } else {
    listOfBook = JSON.parse(Book_arr);
    listOfBook.push(book);
    localStorage.setItem("Book_arr", JSON.stringify(listOfBook));
  }

  this.show();
};

display.prototype.show = () => {
  let Book_arr = localStorage.getItem("Book_arr");
  if (Book_arr == null) return;

  let tablebody = document.getElementById("BookList");
  let list = JSON.parse(Book_arr);
  let ans = list.reduce((acc, element, index) => {
    let rowdata = `<tr class ="listOfBook">
                        <td class ="book_name">${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button class="btn btn-outline-success" id ="${index}" onclick = "remove(${index})"type="submit">
                        Remove
                        </button></td>

                    </tr>`;
    return (acc += rowdata);
  }, "");

  tablebody.innerHTML = ans;
};

//clearning the input of form as soon as you press Add button

display.prototype.clear = () => {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

//Showing whether the book has succesfully saved or not

display.prototype.alert = (type, Message) => {
  let message = document.getElementById("message");

  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            ${Message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
};

let disObj = new display();
disObj.show();


function remove(index){

    let Book_arr = JSON.parse(localStorage.getItem("Book_arr"));
    Book_arr.splice(index,1);
    localStorage.setItem("Book_arr",JSON.stringify(Book_arr));
    disObj.show();

}




//Getting address of form

const libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", submitForm);

function submitForm(e) {
  let bookName = document.getElementById("BookName").value;
  let authorName = document.getElementById("AuthorName").value;
  let type;

  let fiction = document.getElementById("Fiction");
  let computer = document.getElementById("Computer");
  let science = document.getElementById("Science");

  if (fiction.checked) {
    type = fiction.value;
  } else if (computer.checked) {
    type = computer.value;
  } else {
    type = science.value;
  }

  let book = new Book(bookName, authorName, type);

  if (disObj.validate(book)) {
    disObj.add(book);
    disObj.clear();
    disObj.alert("success", "Book Saved to Book list");
  } else {
    disObj.alert("danger", "Enter a Valid Book and Author name");
  }

  e.preventDefault();
}

let search = document.getElementById("searchBook");

search.addEventListener("input",searchList);

function searchList(){

    let search_val = search.value;
    let class_list = document.getElementsByClassName("listOfBook");

    Array.from(class_list).forEach((element)=>{

        let book_name = element.getElementsByClassName("book_name")[0];
        let name = book_name.innerHTML;
        if(name.includes(search_val)){
            element.style.display = "";
         
        }
        else{
            element.style.display = "none";
        }
     //   disObj.show();
    });
}


