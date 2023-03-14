const cardArr = [
    {
        name: "img1",
        src: "/assets/image-1.png"
    },
    {
        name: "img2",
        src: "/assets/image-2.png"
    },
    {
        name: "img3",
        src: "/assets/image-3.png"
    },
    {
        name: "img4",
        src: "/assets/image-4.png"
    },
    {
        name: "img5",
        src: "/assets/image-5.png"
    },
    {
        name: "img6",
        src: "/assets/image-6.png"
    },
    {
        name: "img1",
        src: "/assets/image-1.png"
    },
    {
        name: "img2",
        src: "/assets/image-2.png"
    },
    {
        name: "img3",
        src: "/assets/image-3.png"
    },
    {
        name: "img4",
        src: "/assets/image-4.png"
    },
    {
        name: "img5",
        src: "/assets/image-5.png"
    },
    {
        name: "img6",
        src: "/assets/image-6.png"
    }
]

cardArr.sort(() => 0.5 - Math.random())


// -------------GLOBAL VARIABLES ------------  //
const grid = document.querySelector('#grid');
const startModel = document.querySelector('#start-model');
const startBtn = document.querySelector('#start-btn');
const clickBlocker = document.querySelector('#click-blocker')
const scoreText = document.querySelector('#score-model h1');
const messegeText = document.querySelector('#score-model h3');
const scoreModel = document.querySelector('#score-model');
const continueBtn = document.querySelector('#continue-btn');
const gameOverModel = document.querySelector('#game-over');
const finalScore = document.querySelector('#game-over h1');
const restartBtn = document.querySelector('#game-over button');
const beginModel = document.querySelector('#begin-model');
const beginBtn = document.querySelector('#begin-btn');



let openedCards = [];
let choosenCard = {src: '', id: ''};
let randomCard = {src: '', id: ''};
let score = 0;

// ---------------GLOBAL FUNCTIONS ----------------- //
const showModel = (model, type) => {
    model.style.display = type;
}

const hideModel = (model) => {
    model.style.display = 'none'
}

const chooseCard = (e) => {
    const cardId = e.target.dataset.id;
    
    if(openedCards.indexOf(parseInt(cardId)) > -1) {
        alert('Choose another Card!')
    } else {       

        if(randomCard.src == cardArr[cardId].src) {
            openedCards.push(parseInt(cardId))
            e.target.src = cardArr[cardId].src;
            choosenCard.src = cardArr[cardId].src;
            choosenCard.id = cardId;
            
            setTimeout(() => {
                makeResult();
            }, 400)

        } else {
           openRightCard()
        
        }
        

        
    }
    
}

const openRandom = () => {
    const randomId = Math.floor(Math.random() * cardArr.length);

    if(openedCards.length < 12) {
        if(openedCards.indexOf(randomId) <= -1) {
            openedCards.push(randomId);
            cards[randomId].src = cardArr[randomId].src;
            randomCard.src = cardArr[randomId].src;
            randomCard.id = randomId;
            hideModel(clickBlocker);
        } else {
            openRandom()
        }
    } else {
        finalScore.textContent = score;
        showModel(gameOverModel, 'flex');
    }
   
}

const makeResult = () => {
    
    if(randomCard.src && choosenCard && randomCard.src == choosenCard.src) {
        score++
        messegeText.textContent = 'Chosen a Right Card!';
        messegeText.style.color = 'green';
        scoreText.textContent = score;
    } else {      

        messegeText.textContent = 'Chosen a Wrong Card!';
        messegeText.style.color = 'red';
        scoreText.textContent = score;
       
    }


    setTimeout(() => {
        showModel(scoreModel, 'flex')
    }, 200)


}

const showAll = () => {
    for(let i = 0; i < cards.length; i++) {
        cards[i].src = cardArr[i].src;
    }
}

const hideAll = () => {
    for(let i = 0; i < cards.length; i++) {
        cards[i].src = '/assets/blank.png';
    }
}

const openRightCard = () => {
    
    const searchSrc = randomCard.src;

    for(let i = 0; i < cardArr.length; i++) {

        if(searchSrc == cardArr[i].src && randomCard.id != i) {
           cards[i].src = cardArr[i].src;
           openedCards.push(i); 
           setTimeout(() => {
                makeResult()
           }, 400)
           i = cardArr.length;

        }

    }

}


// CREATE HTML IMAGES CARDS ------- 
const createCard = () => {

    for(let i = 0; i < cardArr.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', '/assets/blank.png');
        card.setAttribute('data-id', i);
        grid.appendChild(card);

        card.addEventListener('click', (e) => {
            chooseCard(e)            
            
        })
        
    }

    setTimeout(() => {
        showModel(startModel, 'flex')
    }, 200)
    
}

createCard();

const cards = document.querySelectorAll('img');

// AFTER CLICKING ON START BTN ----------
startBtn.addEventListener('click', () => {   
    hideModel(startModel);
    showModel(clickBlocker, 'block');

    setTimeout(() => {
        showAll()
    }, 200)

    setTimeout(() => {
        showModel(beginModel, 'flex');
    }, 5000)

})


// AFTER CLICKING ON BEGIN BTN -------
beginBtn.addEventListener('click', () => {
    hideAll();
    hideModel(beginModel);
    showModel(clickBlocker, 'block');

    // choose random card and open
    setTimeout(() => {
        openRandom()
    }, 700)


})



// AFTER CLICKING ON CONTINUE BTN ------
continueBtn.addEventListener('click', () => {

    console.log('continue Game!');
    randomCard = {};
    choosenCard = {};
    showModel(clickBlocker, 'block')

    setTimeout(() => {
        openRandom();
    }, 500)
   
    if(openedCards.length < 12) {
        hideModel(scoreModel)
    } else {
        hideModel(scoreModel);
        showModel(gameOverModel);
    }

})


// AFTER CLICKING ON RESTART BTN -----
restartBtn.addEventListener('click', () => {

    location.reload();

})









