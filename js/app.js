//*********  Username ***//
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

//********* Password ****//
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

//Generate array of character code
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

//********* Quotes ****//
const quotesBtn = document.getElementById("quotesBtn");
const quote = document.getElementById('quote');
quotesBtn.addEventListener("click", displayQuotes);

//on page load
displayQuotes();
async function displayQuotes(){
  try{
    quotesBtn.innerHTML=`<span class="spinner-border spinner-border-sm" ></span>Generating...`;
    quotesBtn.disabled = true;
    let api = "https://api.quotable.io/random";
    let quoteStream = await fetch(api);
    //For success 200 status
    if(quoteStream.status == 200){
      const quoteObject = await quoteStream.json();
      quotesBtn.innerHTML="Generate";
      quotesBtn.disabled = false;
      quote.readOnly = false;
      quote.innerHTML = quoteObject.content+"<br><br><span class='text-danger'>- </span>"+quoteObject.author;
    }
    //For failure
    else{
      throw new Error();
    }
  }
  catch(error){
    quotesBtn.innerHTML="Try again";
    quotesBtn.disabled = false;
  }
}

//The joke 
console.log("*********************");
console.log("* A random joke     *");
console.log("* .titanic{         *");
console.log("*  float: none;     *");
console.log("* }                 *");
console.log("*********************");
