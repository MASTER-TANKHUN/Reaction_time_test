const gameContainer = document.getElementById('game-container');
const message = document.getElementById('message');
const latestValue = document.getElementById('latest-value');
const bestValue = document.getElementById('best-value');
const averageValue = document.getElementById('average-value');
const chartContainer = document.getElementById('chart-container');
const clearDataBtn = document.getElementById('clear-data');
const emptyChartMessage = document.querySelector('.empty-chart-message');

let state = 'ready';
let startTime;
let timeoutId;
let reactionTimes = JSON.parse(localStorage.getItem('reactionTimes')) || [];


gameContainer.addEventListener('click', handleClick);
clearDataBtn.addEventListener('click', clearData);


updateStats();
renderChart();

function handleClick() {
    switch(state) {
        case 'ready':

            state = 'waiting';
            gameContainer.style.backgroundColor = 'red';
            message.textContent = 'Wait For Yellow...';
            

            const waitTime = 1000 + Math.floor(Math.random() * 4000);
            console.log(`Yellow for ${waitTime} ms`); //dev mode
            
            timeoutId = setTimeout(() => {
                state = 'yellow';
                gameContainer.style.backgroundColor = 'yellow';
                message.textContent = 'Click!';
                startTime = Date.now();
            }, waitTime);
            break;
            
        case 'waiting':

            state = 'tooearly';
            clearTimeout(timeoutId);
            gameContainer.style.backgroundColor = 'red';
            message.textContent = 'Tooearly! Wait For Yellow Click For Restart';
            break;
            
        case 'yellow':

            const reactionTime = Date.now() - startTime;
            state = 'results';
            gameContainer.style.backgroundColor = 'black';
            message.textContent = `Your Reaction Time\n${reactionTime} ms`;

            reactionTimes.push({ time: reactionTime, date: new Date().toISOString() });
            localStorage.setItem('reactionTimes', JSON.stringify(reactionTimes));
            updateStats();
            renderChart();
            break;
            
        case 'results':
        case 'tooearly':
            state = 'ready';
            gameContainer.style.backgroundColor = 'red';
            message.textContent = 'Ready, click on the screen to start.';
            break;
    }
}

function updateStats() {
    if (reactionTimes.length === 0) {
        latestValue.textContent = "-";
        bestValue.textContent = "-";
        averageValue.textContent = "-";
        return;
    }
    
    const latest = reactionTimes[reactionTimes.length - 1].time;
    const best = Math.min(...reactionTimes.map(record => record.time));
    const average = Math.round(reactionTimes.reduce((sum, record) => sum + record.time, 0) / reactionTimes.length);
    
    latestValue.textContent = `${latest} ms`;
    bestValue.textContent = `${best} ms`;
    averageValue.textContent = `${average} ms`;
}

function renderChart() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach(bar => bar.remove());
    
    const xAxis = document.querySelector('.x-axis');
    xAxis.innerHTML = '';
    
    if (reactionTimes.length === 0) {
        emptyChartMessage.style.display = 'block';
        return;
    }
    
    emptyChartMessage.style.display = 'none';
    
    const displayData = reactionTimes.slice(-100);
    const maxTime = Math.max(...displayData.map(record => record.time)) * 1.2;
    
    displayData.forEach((record, index) => {
        const percentage = (record.time / maxTime) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${percentage}%`;
        bar.style.left = `${(index / displayData.length) * 100}%`;
        bar.style.width = `${80 / displayData.length}%`;
        bar.style.marginLeft = `${10 / displayData.length}%`;
        bar.setAttribute('title', `${record.time} ms`);
        chartContainer.appendChild(bar);
        
        const label = document.createElement('div');
        label.className = 'axis-label';
        label.textContent = `#${reactionTimes.length - displayData.length + index + 1}`;
        xAxis.appendChild(label);
    });
}

function clearData() {
    Swal.fire({
        title: 'Confirm to clear data',
        text: 'Do you want to clear all data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, clear data!',
        cancelButtonText: 'cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            reactionTimes = [];
            localStorage.removeItem('reactionTimes');
            updateStats();
            renderChart();
            Swal.fire(
                'Data cleared!',
                'All data has been cleared',
                'success'
            );
        }
    });
}
