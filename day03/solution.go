package main

import (
    "fmt"
    "strconv"
    "strings"
    "os"
    "bufio"
)

// Helper functions

func max(a, b string) string {
    aInt := stringToInt(a)
    bInt := stringToInt(b)
    if aInt > bInt {
        return a
    }
    return b
}

func intToString(input int) string {
    i := strconv.Itoa(input)
    return i
}

func stringToInt(input string) int {
    i, err := strconv.Atoi(input)
    if err != nil {
        panic(err)
    }
    return i
}

func charAtIndex(input string, index int) string {
    return string(input[index])
}

func indexOfFirstChar(input string, char string) int {
    return strings.Index( input, char)
}

func length(input string) int{
    return len(input)
}

// Logic functions 

func maxDigit(input string, index int, maxIndex int) string {
    if index == maxIndex {
        return charAtIndex(input, index)
    }
    return max(maxDigit(input, index + 1, maxIndex), charAtIndex(input, index))
  }

func maxBattery(input string) int {
    var firstDigit string = maxDigit(input, 0, length(input)- 2)
    // fmt.Println("Digit 1 :" , firstDigit)
    var index = indexOfFirstChar(input, firstDigit)
    var secondDigit string = maxDigit(input, index + 1, length(input) -1)
    // fmt.Println("Digit 2 :" , secondDigit)
    return stringToInt(firstDigit + secondDigit)
}
//012345678901234
//234234234234278


func largestJoltage(input string) string {
    var totalJolts = length(input) 
    var batterySize, joltsNeeded = 12, 12
    var largestJoltage string = ""
    
    for i := 0; i < batterySize; i++ {
        // fmt.Println("Input: " + input)
        totalJolts = length(input)
        // fmt.Println("Total jolts: " + intToString(totalJolts))
        var digit string = maxDigit(input, 0, totalJolts - (joltsNeeded))
        // fmt.Println("Digit: " + digit)
        var index = indexOfFirstChar(input, digit)
        // fmt.Println("Index of digit: " + intToString(index))
        largestJoltage = largestJoltage + digit
        // fmt.Println("Largest joltage: " + largestJoltage)
        joltsNeeded = joltsNeeded - 1
        input = input[index + 1:]
    }

    return largestJoltage
}

func readInput(fileName string) []string {
    fmt.Println("Reading input...")

    file, err := os.Open(fileName)
    if err != nil {
        panic(err)
    }
    scanner := bufio.NewScanner(file)
    scanner.Split(bufio.ScanLines)
    var text []string
    for scanner.Scan() {
        text = append(text, scanner.Text())
    }
    file.Close()
    return text
}

func totalMaxBattery(input []string) int {
    var total int = 0
    for _, line := range input {
        total += maxBattery(line)
    }
    return total
}

func totalMaxBatteryPart2(input []string) int {
    var total int = 0
    for _, line := range input {
        total += stringToInt(largestJoltage(line))
    }
    return total
}

func main() {
	fmt.Println("Starting program...")
    //Part 1

    // var total = totalMaxBattery(readInput("inputTest.txt"))
    var total1 = totalMaxBattery(readInput("input.txt"))
    fmt.Println("Total max battery Part 1: ", total1)

    //Part 2

    var total2 = totalMaxBatteryPart2(readInput("input.txt"))
    fmt.Println("Total max battery part 2: ", total2)

    fmt.Println("Ending program...")
}