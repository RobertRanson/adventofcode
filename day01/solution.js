const fs = require('fs');
const path = require('path');

class Dial {
    constructor(totalPostitions, startPosition){
        this.totalPostitions = totalPostitions;
        this.startPosition = startPosition;
        this.dial = this.createLinkededList();
        this.passesOfZero = 0;
    }

    createLinkededList(){
        console.log('Creating linkeded list...');
        let currentPosition = this.startPosition;
        let firstNode = new NumberNode(currentPosition, null, null);
        let currentNode = firstNode;
        let previousNode = currentNode;
        for(let i = 1; i < this.totalPostitions; i++){
            currentPosition = (currentPosition + 1) % this.totalPostitions;
            currentNode = new NumberNode(currentPosition, null, previousNode);
            previousNode.next = currentNode;
            previousNode = currentNode;
        }
        // Close the circular list
        currentNode.next = firstNode;
        firstNode.previous = currentNode;
        return firstNode;
    }

    printDial(){
        let currentNode = this.dial;
        for(let i = 0; i < this.totalPostitions; i++){
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }

    rotate(step){
        let direction = step.substring(0, 1);
        let stepsToMove = step.substring(1);
        //console.log('Rotating ' + stepsToMove + ' steps in ' + direction + ' direction');
        for(let i = 0; i < stepsToMove; i++){
            if(direction === 'R'){
                this.dial = this.dial.next;
            } else {
                this.dial = this.dial.previous;
            }
            if(this.dial.value === 0){
                this.passesOfZero ++
            }
        }
        //console.log('Dial position: ' + this.dial.value);
    }
  

    
}

class NumberNode{
    constructor(value, next, previous){
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}

function readInput(){
    console.log('Reading input...');
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
    return input.split('\n');
}

function main(){
    const dial = new Dial(100, 50);
    //dial.printDial();
    let zeroCount = 0;
    for(let step of readInput()){
        dial.rotate(step);
        if(dial.dial.value === 0){
            zeroCount++;
        }
    }
    console.log('Zero count: ' + zeroCount);
    console.log('Passes of zero: ' + dial.passesOfZero);
    //dial.printDial();
}

main();