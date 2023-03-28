
let timeDisplay = document.getElementById(`clock`);
let clock = new THREE.Clock(true);
const testButton = document.querySelector("#test_button");

// [time (sec), x, y, rotation]
let map = [];

function sortMap() {
    // sort block spawn input by reverse in terms of time
    map.sort((a, b) => {
        if (a.time === b.time) {
            return 0;
        } else {
            return (a.time < b.time) ? 1 : -1;
        }
    })
}

function loadMap(blockSpawnInput = []) {
    map = blockSpawnInput;
    console.log(map);
    sortMap();
    curBlock = null;
    // get the element with the least time
    if (map.length > 0) {
        curBlock = map.at(-1);
    }
    clock.start();
}


function frame() {
    requestAnimationFrame(frame);
    curTime = clock.getElapsedTime();
    timeDisplay.innerHTML = `Seconds Passed: ${curTime}`;
    while (curBlock && curTime >= curBlock.time) {
        makeCube(curBlock.x, curBlock.y, curBlock.rotation);
        map.pop();
        if (map.length === 0) {
            console.log("EMPTY");
            curBlock = null;
            break;
        }
        curBlock = map.at(-1);
    }
}

loadMap();

console.log(map);

console.log(`here`);

testButton.addEventListener('click', loadMap());
frame();


