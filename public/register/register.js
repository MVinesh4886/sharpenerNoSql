async function register(event) {
  event.preventDefault();
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const registerUser = {
      name,
      email,
      password,
    };

    const response = await axios.post(
      `http://localhost:3000/user/registerUser`,
      registerUser
    );

    console.log(response);
    alert("User registration successful");
  } catch (error) {
    console.log(error);
    alert("User registration failed");
  }
}
