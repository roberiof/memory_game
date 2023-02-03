const grid = document.querySelector('.grid')
const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
]

const playersNames = JSON.parse(localStorage.getItem('names'))
const playerNameDiv = document.querySelector('.player_name')


const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
var cont = 0

const startBtn = document.querySelector('.start_game_div') 
const blackBackground = document.querySelector('.black_background')

const backArrow = document.querySelector('.back_arrow')
const pauseIcon = document.querySelector('.pause_icon')
const wonDiv = document.querySelector('.won_div')

// STARTING GAME 
window.onload = () =>{
  playerNameDiv.innerHTML = playersNames[playersNames.length-1]
  loadGame()
}

const standardizeTime = (time) =>{
  var timeStr = '' + time 
  if(timeStr.length === 1){
    timeStr = '0' + timeStr
  }
  return timeStr
}

startBtn.onclick = () =>{
  startBtn.style.display = 'none'
  blackBackground.style.display = 'none'
  this.timer = setInterval( () =>{
    cont++
    const min = Math.floor(cont / 60)
    const sec = Math.round((cont/60 - min)*60)
    seconds.innerHTML = standardizeTime(sec)
    minutes.innerHTML = standardizeTime(min)
  }, 1000)
}


// PAUSING GAME 
pauseIcon.onclick = () =>{  
  blackBackground.style.display = 'block'
  startBtn.style.display = 'flex'
  clearInterval(this.timer)
}

// GO BACK TO THE LOGIN PAGE 
backArrow.onclick = () => {
  window.history.back()
}

// PLAYING GAME 
const restartGame = () =>{
  window.location.reload(true)
}

const checkGameWon = () =>{
  const qntDisabledCards = document.querySelectorAll('.disabled_card')
  if(qntDisabledCards.length === 20){
    clearInterval(this.timer)
    setTimeout(() => {
      blackBackground.style.display = 'block'
      var neww = `
      <h1> Congratulations! </h1>  
      <p> You won game and you took ${cont} seconds to do it. </p>
      `
      const restartBtn = document.createElement('button')
      restartBtn.innerHTML = 'Restart'
      restartBtn.addEventListener('click' , restartGame)
      wonDiv.innerHTML = neww 
      wonDiv.appendChild(restartBtn)
      wonDiv.style.display = 'flex'

    }, 1000)
  }
}

let firstCard = ''
let secondCard = ''
const compareCards = () =>{
  const firstCharacter = firstCard.getAttribute('data-character')
  const secondCharacter = secondCard.getAttribute('data-character')
  
  if(firstCharacter === secondCharacter){
    firstCard.firstChild.classList.add('disabled_card')
    secondCard.firstChild.classList.add('disabled_card')
    firstCard = ''
    secondCard = ''
    checkGameWon()
  }else{
    setTimeout( ()=>{
      firstCard.classList.remove('reveal_card')
      secondCard.classList.remove('reveal_card')
      firstCard = ''
      secondCard = ''
    }, 600)
  }
  
}

const revealCard =  ({target}) =>{
  const card = target.parentElement
  if(!card.classList.contains('reveal_card')){
    if(firstCard === ''){
      firstCard = card 
      firstCard.classList.add('reveal_card')
    } else if(secondCard === ''){
      secondCard = card
      secondCard.classList.add('reveal_card')
      compareCards()
    }
  }
}


// CREATING AND LOADING GAME 
const createElement = (tag , className) =>{
  const elementt = document.createElement(tag)
  elementt.className = className
  // is better using the 'className' than using the 'classList.add()', because, with that, i can put 2 classnames at once 
  return elementt
}
const createCard = (character) =>{
  const card = createElement('div' , 'card')
  const front = createElement('div' , 'face front')
  const back = createElement('div' , 'face back')

  card.setAttribute('data-character' , `${character}`)
  front.style.backgroundImage  = `"url('../images/${character}.png')"`

  card.appendChild(front)
  card.appendChild(back)

  card.addEventListener('click' , revealCard)
  
  return card 
}

const loadGame = () =>{
  const duplicateCharacters = [ ...characters , ...characters]
  const shuffledArray = duplicateCharacters.sort( () => (Math.round(Math.random()) - 0.5))
  shuffledArray.forEach( (character) =>{
    var card = createCard(character);
    grid.appendChild(card)
  })
}





