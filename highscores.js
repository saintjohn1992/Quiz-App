const highScoreList = document.querySelector('#highScoresList')
const highcores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML = highcores.map(score => {
    return `<li class="high-score">${score.name} -${score.score}</li>`
}).join('')