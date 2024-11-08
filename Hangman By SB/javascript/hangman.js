class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord=''
    this.letters=[]
    this.guessedLetters=''
    this.errorsLeft=10
  }

  pickWord() {
    // ... your code goes here
    return this.words[parseInt(Math.random()*this.words.length)];
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    if(/^[A-Z]$/.test(keyCode))
      return true 
    else 
      return false;
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    if(this.letters.includes(letter))
      return true
    return false
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    this.guessedLetters+=letter
  }

  addWrongLetter(letter) {
    // ... your code goes here
    this.errorsLeft-=1
    if(!this.letters.includes(letter))
       this.letters.push(letter)
  }

  checkGameOver() {
    // ... your code goes here
    if(this.errorsLeft<0)
      return true 
    return false
  }

  checkWinner() {
    // ... your code goes here
    if(this.guessedLetters.length==this.secretWord.length)
    {
      return true 
    }
    return false 
  }
}
let words=['Tailwind','node','java','django','html','react']
let hint=['A CSS framework','A javascript runtime','A programming language launched in 1995 by Sun microsystems','A python framework for backend','A markup language for websites','A javascript framework']
let hangman;
const startGameButton = document.getElementById('start-game-button');
  startGameButton.addEventListener('click', event => {
    window.scrollBy(0,250)
    hangman = new Hangman(words);

    // HINT (uncomment when start working on the canvas portion of the lab)
    let pickedWord= hangman.pickWord();
    hangman.secretWord=pickedWord.toUpperCase()
    const hintString=hint[words.indexOf(pickedWord)]      //get hint for secret word
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    // ... your code goes here
    hangmanCanvas.createBoard()
    hangmanCanvas.writeHint(hintString)    //write hint on board
  })

document.addEventListener('keydown',(event)=>{
  // React to user pressing a key
  // ... your code goes here
  if(!hangman.checkGameOver())
  {
  let ky=event.key.toUpperCase()
      if(!hangman.checkClickedLetters(ky))
      {
        if(hangman.secretWord.includes(ky))
        {
          if(!hangman.guessedLetters.includes(ky)) 
          {
          for(let i=0;i<hangman.secretWord.length;i++)
          {
            let ch=hangman.secretWord[i]
            if(ch==ky)
            {
              hangman.addCorrectLetter(ky)
              hangmanCanvas.writeCorrectLetter(i)
              if(hangman.checkWinner())
                 hangmanCanvas.winner()
            }
         }
        }
        }
         else 
         {
          hangman.addWrongLetter(ky)
          hangmanCanvas.writeWrongLetter(ky,hangman.errorsLeft)
          hangmanCanvas.drawHangman(hangman.errorsLeft)
          if(hangman.checkGameOver())
          {
            hangmanCanvas.gameOver()
          }
         }
      }
  }
})
