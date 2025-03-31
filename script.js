const screen = document.getElementById('screen');
const message = document.getElementById('message');

let state = 'ready';
let startTime;
let timeoutId;

screen.addEventListener('click', handleClick);

function handleClick() {
    switch(state) {
        case 'ready':
            state = 'waiting';
            screen.style.backgroundColor = 'red';
            message.textContent = 'Waiting for yellow...';
            
            const waitTime = 1000 + Math.floor(Math.random() * 4000);
            console.log(`Yellow for ${waitTime} ms`); //dev mode
            
            timeoutId = setTimeout(() => {
                state = 'yellow';
                screen.style.backgroundColor = 'yellow';
                message.textContent = 'Click!';
                startTime = Date.now();
            }, waitTime);
            break;
            
        case 'waiting':
            state = 'tooearly';
            clearTimeout(timeoutId);
            screen.style.backgroundColor = 'black';
            message.textContent = 'Too early! Wait for yellow first. Click to restart';
            break;
            
        case 'yellow':
            const reactionTime = Date.now() - startTime;
            state = 'results';
            screen.style.backgroundColor = 'black';
            message.textContent = `Your Reaction Time\n${reactionTime} ms`;
            break;
            
        case 'results':
        case 'tooearly':
            state = 'ready';
            screen.style.backgroundColor = 'red';
            message.textContent = 'Ready, click on the screen to start.';
            break;
    }
}