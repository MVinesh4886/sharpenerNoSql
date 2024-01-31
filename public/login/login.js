async function loginUser(event) {
  event.preventDefault();

  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginUser = {
      email,
      password,
    };
    const response = await axios.post(
      "http://localhost:3000/user/loginUser",
      loginUser
    );
    // console.log(response.data);
    // console.log(response.data.message);
    alert(response.data.message);

    // console.log(response.data.token);
    if (response.data.token === undefined) {
      alert("Please enter valid credentials");
    } else {
      localStorage.setItem("userDetails", JSON.stringify(response.data.token));
      window.location.href = "../shop/shop.html";
    }
  } catch (error) {
    console.log(error);
    // console.log(error.response.data);
    alert(error.response.data.message);
  }
}
