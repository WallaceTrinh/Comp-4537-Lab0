// Import the Firebase configuration
const { app, analytics } = require("./firebase-config");

class Button {
    constructor(color, width, height, order) {
      this.order = order;
      this.btn = document.createElement('button');
      this.btn.style.backgroundColor = color;
      this.btn.style.width = width;
      this.btn.style.height = height;
      this.btn.style.position = 'absolute';
      this.btn.textContent = order;
      document.body.appendChild(this.btn);
      this.setLocation(0, order * 110); // initial position in a row
    }
  
    setLocation(top, left) {
      this.btn.style.top = `${top}px`;
      this.btn.style.left = `${left}px`;
    }
  }
  
  const colors = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'cyan'];
  let buttons = [];
  let orderClicked = [];
  
  document.getElementById('startGame').addEventListener('click', () => {
    console.log('Start button clicked');
    const num = parseInt(document.getElementById('numButtons').value);
    if (num < 3 || num > 7) {
      alert('Please enter a number between 3 and 7.');
      return;
    }
  
    // Clear existing game
    buttons.forEach(button => button.btn.remove());
    buttons = [];
    orderClicked = [];
  
    // Create buttons
    for (let i = 0; i < num; i++) {
      buttons.push(new Button(colors[i % colors.length], '10em', '5em', i + 1));
    }
  
    // Wait for n seconds before scrambling
    setTimeout(() => scrambleButtons(num), num * 1000);
  });
  
  function scrambleButtons(num) {
    let moves = num;
    const intervalId = setInterval(() => {
      if (moves > 0) {
        buttons.forEach(button => {
          const randomTop = Math.random() * (window.innerHeight - 130);
          const randomLeft = Math.random() * (window.innerWidth - 130);
          button.setLocation(randomTop, randomLeft);
        });
        moves--;
      } else {
        clearInterval(intervalId);
        makeButtonsClickable();
      }
    }, 2000);
  }
  
  function makeButtonsClickable() {
    buttons.forEach(button => {
      button.btn.textContent = ''; // Hide the number
      button.btn.addEventListener('click', () => checkOrder(button.order));
    });
  }
  
  function checkOrder(order) {
    orderClicked.push(order);
    if (orderClicked.length <= buttons.length) {
      for (let i = 0; i < orderClicked.length; i++) {
        if (orderClicked[i] !== buttons[i].order) {
          alert(messages.wrongOrder);
          showCorrectOrder();
          return;
        }
      }
      buttons[order - 1].btn.textContent = order; // Reveal the number
      if (orderClicked.length === buttons.length) {
        alert(messages.excellentMemory);
      }
    }
  }
  
  function showCorrectOrder() {
    buttons.forEach(button => {
      button.btn.textContent = button.order;
    });
  }
  