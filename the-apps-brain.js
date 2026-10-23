function checkCredentials() {
  const correctUser = "admin";
  const correctPass = "12345";

  const userInput = document.getElementById("username").value;
  const passInput = document.getElementById("password").value;
  const messageEl = document.getElementById("message");

  if (userInput === correctUser && passInput === correctPass) {
    messageEl.style.color = "green";
    messageEl.innerText = "Login successful!";
    window.location.href = "home.html";
  } else {
    messageEl.style.color = "red";
    messageEl.innerText = "Incorrect username or password.";
  }
}

// https://icanhazdadjoke.com/

const cardDetails = [
  {
    id: 1,
    imgSrc: "image/image-1.jpg",
    title: "Biscuit",
  },
  {
    id: 2,
    imgSrc: "image/image-2.jpg",
    title: "Luna",
  },
  {
    id: 3,
    imgSrc: "image/image-3.jpg",
    title: "Pebble",
  },
  {
    id: 4,
    imgSrc: "image/image-4.jpg",
    title: "Churro",
  },
  {
    id: 5,
    imgSrc: "image/image-5.jpg",
    title: "Nugget",
  },
  {
    id: 6,
    imgSrc: "image/image-6.jpg",
    title: "Bean",
  },
];
const cardDetailContainer = document.getElementById("card-details");

// The login page shares this script but has no card container
if (cardDetailContainer) {
  cardDetailContainer.innerHTML = cardDetails
  .map((cardDetail) => {
    return `
    <div class="col-sm">
            <div class="card" style="width: 18rem" key="${cardDetail.id}">
              <img
                class="card-img-top card-img"
                src="${cardDetail.imgSrc}"
                alt="cute fur baby"
              />
              <div class="card-body">
                <h5 class="card-title">${cardDetail.title}</h5>
                <p id="the-line-${cardDetail.id}" class="card-text">
                  Would you like ${cardDetail.title} to tell you a joke?
                </p>
                <button class="btn button-light" onclick="getPickUpLine(${cardDetail.id})">Yes</button>
              </div>
            </div>
          </div>
    `;
  })
  .join("");
}

async function getPickUpLine(id) {
  const theCardText = document.getElementById(`the-line-${id}`);

  theCardText.innerText = "Loading...";

  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Eish there was a problem fetching the jokes");
    }

    const data = await response.json();

    theCardText.innerText = data.joke;
  } catch (error) {
    theCardText.innerText = error.message;
  }
}
