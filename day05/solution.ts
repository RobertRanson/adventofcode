import * as fs from 'fs';
import * as path from 'path';

interface FreshRange {
    freshStart: number;
    freshEnd: number;
}

interface Input {
    freshRanges: FreshRange[];
    ingredients: number[];
}

// Doubly Linked list Node 
class LinkedListNode {

    data : FreshRange;
    next : LinkedListNode | null;
    prev : LinkedListNode | null;
    constructor(val : FreshRange) {
    
        this.data = val;
        this.next = null;
        this.prev = null;
    }
}

function parseInput(inputFile: string): Input {
    const inputPath: string = path.join(__dirname, inputFile);
    const input: string = fs.readFileSync(inputPath, 'utf8');
    const lines: string[] = input.split('\n').filter(line => line.trim() !== '');
    const freshRanges: FreshRange[] = lines.filter(line => line.includes('-')).map(line => {
        const [freshStart, freshEnd] = line.split('-').map(Number);
        return { freshStart, freshEnd };
    });
    const ingredients: number[] = lines.filter(line => !line.includes('-')).map(line => Number(line));
    return { freshRanges, ingredients };
}

function calculatePart1(input: Input): number {
    let total = 0;
    for (const ingredient of input.ingredients) {
        for (const freshRange of input.freshRanges) {
            if (ingredient >= freshRange.freshStart && ingredient <= freshRange.freshEnd) {
                total ++;
                // console.log(`Ingredient ${ingredient} is fresh`);
                break;
            }
        }
    }
    return total;
}



function sortFreshRanges(inputRanges: FreshRange[]): FreshRange[] {
    return inputRanges.sort((a, b) => a.freshStart - b.freshStart);
}

function createLinkedList(inputRanges: FreshRange[]): LinkedListNode {
    let head: LinkedListNode = new LinkedListNode(inputRanges[0]);
    let currentNode: LinkedListNode = head;
    for (let i = 1; i < inputRanges.length; i++) {
        currentNode.next = new LinkedListNode(inputRanges[i]);
        currentNode.next.prev = currentNode;
        currentNode = currentNode.next;
    }
    return head;
}

function doesOverlap(prevNode: FreshRange, currentNode: FreshRange): boolean {
    return prevNode.freshEnd >= currentNode.freshStart;
}

function condenseLinkedList(linkedList: LinkedListNode): LinkedListNode {
 
    let currentNode: LinkedListNode = linkedList;
    while(currentNode.next !== null) {
        if(doesOverlap(currentNode.data, currentNode.next.data)) {
            if(currentNode.data.freshEnd < currentNode.next.data.freshEnd) {
                currentNode.data.freshEnd = currentNode.next.data.freshEnd;
            }
            currentNode.next = currentNode.next.next;
        }else{
            currentNode = currentNode.next;
        }
    }
    return linkedList;
}

function printLinkedList(linkedList: LinkedListNode): void {
    let currentNode: LinkedListNode = linkedList;
    let log = '';
    while(currentNode.next !== null) {
        log += '[' + currentNode.data.freshStart + '-' + currentNode.data.freshEnd + '] -> ';
        currentNode = currentNode.next;
    }
    log += '[' + currentNode.data.freshStart + '-' + currentNode.data.freshEnd + ']';
    console.log(log);
}

function calculatePart2(input: Input): number {
    // console.log('Input: ', input.freshRanges);
    const sortedRanges: FreshRange[] = sortFreshRanges(input.freshRanges);
    // console.log('Sorted Ranges: ', sortedRanges);
    const linkedList: LinkedListNode = createLinkedList(sortedRanges);
    // printLinkedList(linkedList);
    const condensedLinkedList: LinkedListNode = condenseLinkedList(linkedList);
    // printLinkedList(condensedLinkedList);
    let total = 0;
    let currentNode: LinkedListNode = condensedLinkedList;
    while(currentNode.next !== null) {
        total += currentNode.data.freshEnd - currentNode.data.freshStart + 1;
        currentNode = currentNode.next;
    }
    total += currentNode.data.freshEnd - currentNode.data.freshStart + 1;
    return total;
}

function main(): void {
    console.log('Starting program...');
    // const input: Input = parseInput('inputTest.txt');
    const input: Input = parseInput('input.txt');
    // console.log(input);
    console.log('Part 1');
    console.log("Total Fresh: ", calculatePart1(input));

    console.log('Part 2');
    console.log("Total Fresh: ", calculatePart2(input));
}
main();