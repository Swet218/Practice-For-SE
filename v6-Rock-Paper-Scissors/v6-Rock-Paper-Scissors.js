
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
/*
if(!score)
{
    score = {wins:0,losses:0,ties:0};
}
*/
updateScoreElement();

let isautoplaying = false;
let intervalID;

function autoplay()
{
    if(!isautoplaying)
    {
         intervalID = setInterval(function(){
            const playermove = pickcomputermove();
            playgame(playermove);
        },1000);

        isautoplaying = true;
    }
    else
    {
        clearInterval(intervalID);
        isautoplaying = false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{playgame('Rock')});
document.querySelector('.js-paper-button').addEventListener('click',()=>{playgame('Paper')});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{playgame('Scissors')});

document.body.addEventListener('keydown',(event)=>{
    const word = event.key;
    if(word === 'r')
    {
        playgame('Rock');
    }
    else if(word === 'p')
    {
        playgame('Paper');
    }
    else if(word === 's')
    {
        playgame('Scissors');
    }
})

function playgame(playermove)
{
    const computermove=pickcomputermove();

    let result = '';
    if(playermove === 'Rock')
    {
        if(computermove === 'Rock')
        {
            result = 'Tie';
        }
        else if(computermove === 'Paper')
        {
            result = 'Lose';
        }
        else if(computermove === 'Scissors')
        {
            result = 'Win';
        }
    }
    else if(playermove === 'Paper')
    {
        if(computermove === 'Paper')
        {
            result = 'Tie';
        }
        else if(computermove === 'Scissors')
        {
            result = 'Lose';
        }
        else if(computermove === 'Rock')
        {
            result = 'Win';
        }
    }
    else if(playermove === 'Scissors')
    {
        if(computermove === 'Scissors')
        {
            result = 'Tie';
        }
        else if(computermove === 'Paper')
        {
            result = 'Win';
        }
        else if(computermove === 'Rock')
        {
            result = 'Lose';
        }
    }

    if(result === 'Win')
    {
        score.wins++;
    }
    else if(result === 'Lose')
    {
        score.losses++;
    }
    else if(result === 'Tie')
    {
        score.ties++;
    }

    localStorage.setItem('score',JSON.stringify(score));

    updateScoreElement();
    
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
<img src="${playermove}.jpg" class ="move-icon">
<img src="${computermove}.jpg" class ="move-icon">
Computer`;

    /*
    alert(`your move is ${playermove} and computer move is ${computermove} and Result is ${result}.\nWins:${score.wins},Losses:${score.losses},Ties:${score.ties}`);
    */

}

function updateScoreElement()
{
    document.querySelector('.js-score').innerHTML = `Wins:${score.wins},Losses:${score.losses},Ties:${score.ties}`;
}

function pickcomputermove()
{
    let computermove = '';  
    const randomnumber = Math.random();             //to store the random number

    if(randomnumber >= 0 && randomnumber < (1/3))
    {
        //computer have to show Rock
        computermove = 'Rock';
    }
    else if(randomnumber >= 1/3 && randomnumber < (2/3))
    {
        //computer have to show paper
        computermove = 'Paper';
    }
    else if(randomnumber >= 2/3 && randomnumber < (1))
    {
        //computer have to show Scissors
        computermove = 'Scissors';
    }
    return computermove;
}