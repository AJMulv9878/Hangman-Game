var words = [
{
	Name: "BLACKBEARD",
	Hint: "Major part of golden age of piracy.",
	Song: "assets/music/Billy Riley.mp3"
},
{
	Name: "WHYDAH",
	Hint: "Black Sams Ship",
	Song: "assets/music/'Way Me Susianah.mp3"
},
{
	Name: "FANCY",
	Hint: "Henry Avery Ship",
	Song: "assets/music/Dead Horse.mp3"
},
{
	Name: "REVENGE",
	Hint: "Captain Edwards Ship",
	Song: "assets/music/Drunken Sailor.mp3"
},
{
	Name: "SPEAKER",
	Hint: "Captain Bowens Ship",
	Song: "assets/music/Fish in the Sea.mp3"
},
{
	Name: "SEADOG",
	Hint: "Old Pirate",
	Song:"assets/music/Good Morning Ladies.mp3"
},
{
	Name: "SCUTTLE",
	Hint: "To sink a ship",
	Song: "assets/music/Leave Her Johnny.mp3"
},
{
	Name: "SCALLYWAG",
	Hint: "Pirate Insult",
	Song: "assets/music/Lowlands Away.mp3"
},
{
	Name: "LANDLUBBER",
	Hint: "Person not skilled at sea",
	Song: "assets/music/Padstow Farewell.mp3"
},
{
	Name: "BOOTY",
	Hint: "Pirate treasure",
	Song: "assets/music/Randy Dandy Oh.mp3"
},
{
	Name: "BUCCANEER",
	Hint: "Pirate",
	Song: "assets/music/Roll, Boys, Roll!.mp3"
},
{
	Name: "CUTLASS",
	Hint: "Pirate Sword",
	Song: "assets/music/Running Down to Cuba.mp3"
},
{
	Name: "PARROT",
	Hint: "Pirate Pet",
	Song: "assets/music/Where Am I to Go.mp3"
},
];

var plank = "assets/music/Walk the Plank.mp3";

var audio = document.createElement('audio');

var previousWords = ["...","...","...","..."];

var userPress = [];

var wins = 0

var losses = 0

document.onkeypress = function(startGame) {

	if (startGame.keyCode == 13) {

		round();

		return;

	}

}

function round() {

	$('#skull').animate({ opacity : "0"});

	var guesses = [];

	var random = [];

	var word = words[Math.floor(Math.random()*words.length)];

	for (k = 0; k < word.Name.length; k++) {
		random.push(word.Name[k]);
	}

	var secret = [];

	for (i = 0; i < word.Name.length; i++) {
		secret.push('-');
	}

	var stepsLeft = 12

	document.getElementById("game-container").innerHTML = secret.join("");

	document.getElementById("hint").innerHTML = "Hint: " + word.Hint;

	document.getElementById("attempts").innerHTML = "Steps Left: " + stepsLeft;

	document.getElementById("word1").innerHTML = "1.) " + previousWords[0];

	document.getElementById("word2").innerHTML = "2.) " + previousWords[1];

	document.getElementById("word3").innerHTML = "3.) " + previousWords[2];

	document.getElementById("word4").innerHTML = "4.) " + previousWords[3];

	previousWords.unshift(word.Name); 

	

	document.onkeypress = function(checkChar) {

		var keyPress = checkChar.keyCode;

		userPress.unshift(String.fromCharCode(keyPress));
			
		if (word.Name.indexOf(userPress[0].toUpperCase()) != -1 && stepsLeft != 0) {

			for (p = 0; p < word.Name.length; p++) {

				if (word.Name.charAt(p) == userPress[0].toUpperCase()) {

					secret[p] = userPress[0].toUpperCase();

					document.getElementById("game-container").innerHTML = secret.join("");

				}

				else {}

			}

		}	

		else if (secret.toString() == random.toString()) {

			wins = wins + 1

			document.getElementById("win-number").innerHTML = wins;

			audio.src = word.Song;

			audio.play();

			round();

			return;

			console.log("you win");

		}

		else if (guesses.indexOf(userPress[0].toUpperCase()) == -1 && stepsLeft != 0 && secret != random) {

			guesses.push(userPress[0].toUpperCase());

			document.getElementById("letters").innerHTML = "Used: " + guesses.join("");

			if (stepsLeft == 1) {

				$('#skull').animate({ opacity : "1"});

				audio.src = plank;

				audio.play();

			}

			stepsLeft = stepsLeft - 1;

			document.getElementById("attempts").innerHTML = "Steps Left: " + stepsLeft;

		}

		else if (stepsLeft == 0) {

			losses = losses + 1;

			document.getElementById("loss-number").innerHTML = losses;

			round();

			return;

			console.log("you lose");

		}

	};

};	



