// ********* Random Username ***//
const word1 = document.getElementById("word1");
const word2 = document.getElementById("word2");
const word3 = document.getElementById("word3");
const usernameField = document.getElementById("username");
const userNameBtn = document.getElementById("userNameBtn");

word1.addEventListener("click", generate1WordUsername);
word2.addEventListener("click", generate2WordUsername);
word3.addEventListener("click", generate3WordUsername);


let username = "";

let words = [];
fetch('../words.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    words = data.words;
    console.log(words);
});

function selectRandomWord(){
  return words[Math.floor(Math.random()*words.length)];
}

function displayUsername(){
  usernameField.readOnly = false;
  usernameField.value = username;
}

usernameField.addEventListener("dblclick", ()=>{
  usernameField.select();
  document.execCommand("copy");
  alert("Copied to Clipboard")
})

function generate1WordUsername(){
  username = "";
  username = selectRandomWord();
}
userNameBtn.addEventListener("click", displayUsername);
function generate2WordUsername(){
  username = "";
  for(let i=0;i<2;i++){
    username += selectRandomWord();
  }

}
function generate3WordUsername(){
  username = "";
  for(let i=0;i<3;i++){
    username += selectRandomWord();
  }
}

// ********* Random Password ****//
const characterAmount = document.getElementById("characterAmount");
const passwordGeneratorForm = document.getElementById("passwordGeneratorForm");
const includeUpperCaseElement = document.querySelector('#includeUpperCase');
const includeNumbersElement = document.querySelector('#includeNumbers');
const includeSymbolsElement = document.querySelector('#includeSymbols');
const passwordField = document.querySelector('#password');

passwordGeneratorForm.addEventListener("submit", submitForm);

function submitForm(e){
  if(characterAmount.value  == 0){
    alert("Please enter the number of characters")
    return;
  }
  e.preventDefault();
  const characterAmountValue = +(characterAmount.value);
  const isIncludeUpperCase = includeUpperCaseElement.checked;
  const isIncludeNumbers= includeNumbersElement.checked;
  const isIncludeSymbols= includeSymbolsElement.checked;
  const password = generatePassword(characterAmountValue, isIncludeUpperCase,isIncludeNumbers , isIncludeSymbols);
  passwordField.readOnly = false;
  passwordField.value = password;
}

passwordField.addEventListener("dblclick", ()=>{
  passwordField.select();
  document.execCommand("copy");
  alert("Copied to Clipboard")
})

function generatePassword(characterAmountValue, isIncludeUpperCase,isIncludeNumbers , isIncludeSymbols){
  let charCodes = LOWERCASE_CHAR_CODES;
  if(isIncludeUpperCase){
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }
  if(isIncludeNumbers){
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }
  if(isIncludeSymbols){
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }
  const passwordCharacters = [];
  for(let i=0;i<characterAmountValue;i++){
    let characterCode = charCodes[Math.floor(Math.random()*charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join("");

}

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65,90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97,122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47).concat( arrayFromLowToHigh(58,64) ).
concat( arrayFromLowToHigh(91,96)).concat(arrayFromLowToHigh(123,126));



function arrayFromLowToHigh(low,high){
  const array = [];
  for(let i=low;i<= high;i++){
    array.push(i);
  }
  return array;
}
