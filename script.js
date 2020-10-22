const formEl = document.getElementById("loginForm");
const showUsersButtonEl = document.querySelector(".showUsersButton");
const usersListEl = document.querySelector(".usersList");
const apiUrl = "https://reqres.in/";
const userInfoContainer = document.querySelector(".userInfoContainer");

// Fetching login API with "submit" button.
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(apiUrl + "api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  }).then((res) =>
    res.json().then((jsonData) => {
      // Checks if logininformation is correct. Displaying "errormessage" if not correct.
      if (jsonData.error) {
        const errorMessageEl = document.querySelector("#loginErrorMessage");
        errorMessageEl.innerText = jsonData.error;
        errorMessageEl.classList.remove("hide");
      } else {
        // If login is successful - Displays the "show users button".
        showUsersButtonEl.classList.remove("hide");
      }
    })
  );
});
// Fetches user information and display names on list-item.
showUsersButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "api/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;
      const usersList = users
        .map((user) => {
          return `<li class="user" data-userid="${user.id}">${user.first_name}</li>`;
        })
        .join("");
      usersListEl.innerHTML = usersList;
    });
});

// Clicking on displayed name -- Fetches full information and displays it.
usersListEl.addEventListener("click", (e) => {
  let userid = e.target.dataset.userid;

  // fetch single user.
  fetch(`${apiUrl}api/users/${userid}`)
    .then((res) => res.json())
    .then((jsonData) => {
      const user = jsonData.data;
      userInfoContainer.innerHTML = "";
      const name = document.createElement("p");
      name.innerText = user.first_name + " " + user.last_name;
      userInfoContainer.appendChild(name);

      const avatarImg = document.createElement("img");
      avatarImg.src = user.avatar;
      userInfoContainer.appendChild(avatarImg);

      const email = document.createElement("p");
      email.innerText = user.email;
      userInfoContainer.append(name, avatarImg, email);
    });
});
