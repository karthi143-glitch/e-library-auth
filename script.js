// Check login status on page load
document.addEventListener("DOMContentLoaded", checkLogin);

function signup() {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(user => user.email === email);
    if (userExists) {
        alert("User already exists!");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Now login.");
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem("loggedInUser", email);
        checkLogin();
    } else {
        alert("Invalid credentials!");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

function checkLogin() {
    let user = localStorage.getItem("loggedInUser");

    if (user) {
        document.getElementById("authSection").style.display = "none";
        document.getElementById("librarySection").style.display = "block";
        displayBooks();
    } else {
        document.getElementById("authSection").style.display = "block";
        document.getElementById("librarySection").style.display = "none";
    }
}

function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;

    if (!title || !author) {
        alert("Enter all fields");
        return;
    }

    let user = localStorage.getItem("loggedInUser");

    let books = JSON.parse(localStorage.getItem(user + "_books")) || [];
    books.push({ title, author });

    localStorage.setItem(user + "_books", JSON.stringify(books));

    displayBooks();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
}

function displayBooks() {
    let user = localStorage.getItem("loggedInUser");
    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    let books = JSON.parse(localStorage.getItem(user + "_books")) || [];

    books.forEach((book, index) => {
        bookList.innerHTML += `
            <div class="book">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <button onclick="deleteBook(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteBook(index) {
    let user = localStorage.getItem("loggedInUser");
    let books = JSON.parse(localStorage.getItem(user + "_books")) || [];

    books.splice(index, 1);
    localStorage.setItem(user + "_books", JSON.stringify(books));
    displayBooks();
}
