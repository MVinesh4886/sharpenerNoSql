const addButton = document.getElementById("submit");
addButton.addEventListener("click", async () => {
  try {
    // Get the values from the input fields
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const description = document.getElementById("description").value;

    // Create an object with the form data
    const product = {
      title,
      price,
      imageUrl,
      description,
    };

    const token = JSON.parse(localStorage.getItem("userDetails"));

    const response = await axios.post(
      `http://localhost:3000/product/create`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    alert("Product added to shop Successfully");
    // Log the form data to the console
    console.log(product);
  } catch (error) {
    console.log(error);
    alert("Couldn't add product to the Shop");
  }
});

const logout = function () {
  const logoutUser = document.getElementById("logout");
  localStorage.clear();
  window.location.href = "./../login/login.html";
};
