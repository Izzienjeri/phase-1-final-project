// Function to fetch breed data from the server and display the first breed
function fetchAndDisplayFirstBreed() {
    // GET request to retrieve the first breed data
    fetch('http://localhost:3000/cats/1')
        .then(response => response.json())
        .then(data => {
            document.getElementById('picture').src = data.picture;
            document.getElementById('Breed-name').textContent = data.name;
            document.getElementById('price').textContent = `Price: $${data.price}`;
            document.getElementById('description').textContent = `Description: ${data.description}`;
            displayBreedDetails(data);
        })
        .catch(error => {
            console.error('Error fetching first breed data:', error);
        });
}

// Function to handle the "Buy Cat" button click event
function handleBuyMe(breedName, price) {
    console.log(`You have purchased a purely bred ${breedName} for $${price}. Please input your delivery details to facilitate transportation.`);
    // Disable the "Buy Me" button after purchase and change its appearance
    const buyCatButton = document.getElementById('buy-cat');
    buyCatButton.disabled = true;
    buyCatButton.classList.add('disabled-button'); // Add the disabled style
}

function displayBreedDetails(data) {
    document.getElementById('picture').src = data.picture;
    document.getElementById('Breed-name').textContent = data.name;
    document.getElementById('price').textContent = `Price: $${data.price}`;
    document.getElementById('description').textContent = `Description: ${data.description}`;

    // Remove any existing click event listener and then add it
    const buyCatButton = document.getElementById('buy-cat');
    buyCatButton.removeEventListener('click', handleBuyMe); // Remove existing listener
    buyCatButton.addEventListener('click', function () {
        handleBuyMe(data.name, data.price);
    });
}

// Function to populate the breed menu with titles
function populateBreedMenu() {
    // Make a GET request to retrieve the list of breeds
    fetch('http://localhost:3000/cats')
        .then(response => response.json())
        .then(data => {
            const breedsList = document.getElementById('Breeds');
            // Clear any existing menu items
            breedsList.innerHTML = '';
            // Populate the menu with breed names
            data.forEach(breed => {
                const listItem = document.createElement('li');
                listItem.className = 'breed item';
                listItem.textContent = breed.name;
                // Click event listener to handle breed selection
                listItem.addEventListener('click', () => handleBreedSelection(breed.id));
                breedsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching breed menu data:', error);
        });
}

// Function to handle breed selection
function handleBreedSelection(breedId) {
    // Make a GET request to retrieve the selected breed's data based on the breedId
    fetch(`http://localhost:3000/cats/${breedId}`)
        .then(response => response.json())
        .then(data => {
            // Update HTML elements with the selected breed's details
            document.getElementById('picture').src = data.picture;
            document.getElementById('Breed-name').textContent = data.name;
            document.getElementById('price').textContent = `Price: $${data.price}`;
            document.getElementById('description').textContent = `Description: ${data.description}`;
        })
        .catch(error => {
            console.error('Error fetching selected breed data:', error);
        });
}

fetchAndDisplayFirstBreed();
populateBreedMenu();
