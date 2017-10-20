var rgbDisplay = document.getElementById("rgbDisplay");
var squares = document.getElementsByClassName("square");
var header = document.getElementById("header");
var message = document.getElementById("message");
var hardBtn = document.getElementById("hardBtn");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");
var reset = document.getElementById("reset");
var colors = generateColors(6);
//assigning a winningColor with a random number from the colors array.
var winningColor = pickRandomNumber();
rgbDisplay.textContent = winningColor;
//function adds initial colors to the squares and adds event listeners for all squares
initial();
function initial(){
 	for(i = 0; i < squares.length; i++) {
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
		//addEvent listeners to squares
		squares[i].addEventListener("click", function(){
			if(this.style.backgroundColor === winningColor) {
				correctGuess();
			}else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again";
			  }
		});	
 	}
}
//generating random colors and pushing into an array
function generateColors(num) {
	var randomArray = [];
	for(i = 0; i < num; i++) {
		generateRgbNumbers();
		randomArray.push(generatedColor);
	}
	return randomArray;
}
//generating random nums between 0 and 255 and creating a rgb from the colors
function generateRgbNumbers() {
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
		generatedColor = "rgb(" + r + ", " + g + ", " + b + ")";
		return generatedColor;
}
function correctGuess() {
	//changing the textContent of Reset button to Play Again?
	reset.textContent = "PLAY AGAIN?";
	//make the message display "correct"
	message.textContent = "Correct!";
	//make the header bg color = winningColor
	header.style.backgroundColor = winningColor;
	//making all the squares the same collor as winningColor
	for(i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = winningColor;
	}
}
function pickRandomNumber(){
	//declaring a randomNumber between 0 and 5 to be used as index in colors[];
	var randomNumber = Math.floor(Math.random() * colors.length);
	return colors[randomNumber];
}
//assigning winning color, calling initial() resetting displays
function resettingAll(){
	winningColor =	pickRandomNumber();
	initial();
	rgbDisplay.textContent = winningColor;
	header.style.backgroundColor = "steelblue";
	message.textContent = "";
	reset.textContent = "NEW COLORS";
	//rmoving hide to show squares again
	for(i = 3; i < squares.length; i++) {
		squares[i].classList.remove("hide");
	}
}
//resets the game generates new colors and assigns them and new winning color, changes the message to ""
function resetBtn(){
	colors = generateColors(6);
	resettingAll();
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	
}
//add event listeners to hard and easy mode button and reset button
reset.addEventListener("click", resetBtn);

hardBtn.addEventListener("click", function(){
	resetBtn();
	this.classList.add("selected");
	easyBtn.classList.remove("selected");
});

//easy button mode listener
easyBtn.addEventListener("click", function(){
	//toggling the highlight for button
	this.classList.add("selected");
	hardBtn.classList.remove("selected");
	//generating 3 new colors 
	colors = generateColors(3);
	resettingAll();
	//hiding the last 3 squares
	for(i = 3; i < squares.length; i++) {
		squares[i].classList.add("hide");
	}
})