// Web app's Firebase Configuration API key
const firebaseConfig = {
  apiKey: "AIzaSyA1MNSGhQaaUN7IcIINWOmcaTkcjMpgn6E",
  authDomain: "wallacetrinh-comp4537-la-67efb.firebaseapp.com",
  projectId: "wallacetrinh-comp4537-la-67efb",
  storageBucket: "wallacetrinh-comp4537-la-67efb.appspot.com",
  messagingSenderId: "91192378604",
  appId: "1:91192378604:web:20a0ba15facf04459f91c9",
  measurementId: "G-LFHKFMRF8K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Button Class Definitions
class Button {
    // Constructor for Button class and the setting properties for each button
    constructor(color, width, height, order) {
      this.order = order; // Order of the button
      this.btn = document.createElement('button'); // Creating a button element
      this.btn.style.backgroundColor = color; // Setting button color, currently only 7 colors
      this.btn.style.width = width; // button width
      this.btn.style.height = height; // button height
      this.btn.style.position = 'absolute'; // button's position
      this.btn.textContent = order; // Setting text content as the order number (1, 2, 3, etc)
      document.body.appendChild(this.btn); // Appending the button to the body of the document
      document.getElementById('buttonArea').appendChild(this.btn); // Setting up the extra buttons that appear
      this.setLocation(document.getElementById('buttonArea').offsetHeight, order * 115); // initial position in a row under the input and start button
    }
    
    // Method to set the location of the button
    setLocation(top, left) {
      this.btn.style.top = `${top}px`;
      this.btn.style.left = `${left}px`;
    }
  }
  
  // Colors of the buttons, only 7 buttons.
  const colors = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'cyan'];
  // Array to store the button objects
  let buttons = [];
  // Array to keep track of the order in which buttons are clicked
  let orderClicked = [];
  
  // Event listener for the 'Start' button click
  document.getElementById('startGame').addEventListener('click', () => {
    // console.log('Start button clicked'); // Testing if the button was clicked
    // Get the number of buttons from the input field
    const num = parseInt(document.getElementById('numButtons').value);
    // Validate the number of buttons (must be between 3 and 7)
    if (num < 3 || num > 7) {
      alert('Please enter a number between 3 and 7.'); // Alerts the player of condition
      return;
    }
  
    // Clear existing game from the previous game
    buttons.forEach(button => button.btn.remove());
    buttons = [];
    orderClicked = [];
  
    // Create buttons based on what the input number is
    for (let i = 0; i < num; i++) {
      buttons.push(new Button(colors[i % colors.length], '8em', '5em', i + 1));
    }
  
    // Wait for n seconds before scrambling
    setTimeout(() => scrambleButtons(num), num * 1000);
  });
  
  // Function to scramble the positions of the buttons
  function scrambleButtons(num) {
    let moves = num;
    const intervalId = setInterval(() => {
      if (moves > 0) {
        // Randomly position each button
        buttons.forEach(button => {
          const randomTop = Math.random() * (window.innerHeight - 130);
          const randomLeft = Math.random() * (window.innerWidth - 130);
          button.setLocation(randomTop, randomLeft);
        });
        moves--;
      } else {
         // Stop the scrambling and make buttons clickable
        clearInterval(intervalId);
        makeButtonsClickable();
      }
    }, 2000);
  }
  
  // Make the buttons clickable and hide their order number after scrambling
  function makeButtonsClickable() {
    buttons.forEach(button => {
      button.btn.textContent = ''; // Hides the number
      button.btn.addEventListener('click', () => checkOrder(button.order));
    });
  }
  
  // Function to check the order in which buttons are clicked
  function checkOrder(order) {
    orderClicked.push(order);
    if (orderClicked.length <= buttons.length) {
      for (let i = 0; i < orderClicked.length; i++) {
        if (orderClicked[i] !== buttons[i].order) {
          alert(messages.wrongOrder); // Alert if clicked in the wrong order, takes from user.js
          showCorrectOrder(); // Show the correct order, gameover for player
          return;
        }
      }
      // Reveal the number on the buttons if clicked in the correct order
      buttons[order - 1].btn.textContent = order; // Reveals the number
      if (orderClicked.length === buttons.length) {
        alert(messages.excellentMemory); // Alerts the player of the win
      }
    }
  }
  
  // Shows the correct order
  function showCorrectOrder() {
    buttons.forEach(button => {
      button.btn.textContent = button.order;
    });
  }
  