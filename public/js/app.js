console.log('Client side javascript file is loaded');

// Select the first specific element from the html we want to work with. # = id selector, . = classname selector
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


// Add event listener onto the element. Default behavior is refreshing the browser
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Value stores the input value
    const location = search.value;

    messageOne.textContent = "Loading...";

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
});