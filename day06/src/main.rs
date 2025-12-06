// use std::env;
use std::fs;


fn split_new_line(input: &str) -> Vec<&str> {
    input.split('\n').collect()
}

fn split_space(input: &str) -> Vec<&str> {
    input.split(' ').collect()
}

fn apply_operation(operation: &str, a: i64, b: i64) -> i64 {
    match operation {
        "+" => a + b,
        "*" => a * b,
        _ => panic!("Invalid operation"),
    }
}

fn apply_operation_to_array(operation: &str, array: Vec<i64>) -> i64 {
    let mut result: i64 = if operation == "*" { 1 } else { 0 };
    for i in 0..array.len() {
        result = apply_operation(operation, result, array[i]);
    }
    return result;
}


fn remove_spaces(input: Vec<&str>) -> String{
    let mut result = String::new();
    for line in input {
        match line.trim() {
            "" => result += "",
            _ => {
                result.push_str(line)
            }
        }
    }
    result.trim().to_string()
}

fn read_input(filename: &str) -> String {
    println!("Reading input from file: {}", filename);
    let contents = fs::read_to_string(filename)
        .expect("Should have been able to read the file");
    // println!("Contents: {}", contents);
    contents
}

fn string_to_int_array(input: &str) -> Vec<i64> {
    let mut result = Vec::new();
    let mut current_number = String::new();
    for char in input.chars() {
        if char.is_digit(10) {
            current_number.push(char);
        } else {
            if current_number.len() > 0 {
                result.push(current_number.parse::<i64>().unwrap());
                current_number = String::new();
            }
        }
    }  
    if current_number.len() > 0 {
        result.push(current_number.parse::<i64>().unwrap());
    }
    result
}

fn transpose_array(array: Vec<Vec<i64>>) -> Vec<Vec<i64>> {
    let rows = array.len();
    let cols = array[0].len();
    let mut result: Vec<Vec<i64>> = vec![vec![0; rows]; cols];
    for i in 0..cols {
        for j in 0..rows {
            result[i][j] = array[j][i];
        }
    }
    return result;
}

fn split_digits(array: Vec<Vec<i64>>) -> Vec<Vec<Vec<i64>>> {
    let mut result: Vec<Vec<Vec<i64>>> = Vec::new();
    for i in 0..array.len() {
        let mut row: Vec<Vec<i64>> = Vec::new();
        for j in 0..array[i].len() {
            let mut digit: Vec<i64> = Vec::new();
            for k in 0..array[i][j].to_string().len() {
                digit.push(array[i][j].to_string().chars().nth(k).unwrap().to_digit(10).unwrap() as i64);
            }
            row.push(digit)
        }
        result.push(row);
    }
    return result;
}



fn part1() {
    println!("Part 1");
    let input = read_input("inputTest.txt");
    let lines = split_new_line(&input);
    let len_lines = lines.len();
    println!("Length of lines: {}", len_lines);
    let mut array: Vec<Vec<i64>> = Vec::new();
    for i in 0..len_lines - 1 {
        array.push(string_to_int_array(lines[i]));
    }

    println!("Array length before transpose: {:?}", array.len());
    println!("Array before transpose: {:?}", array);
    let transposed_array = transpose_array(array);
    println!("Transposed array: {:?}", transposed_array.len());
    let operators = remove_spaces(split_space(lines[len_lines - 1]));
    println!("Operators: {}", operators);
    let mut sum = 0;
    for i in 0..transposed_array.len() {
        // println!("Transposed array row: {:?}", transposed_array[i]);
        let operator = operators.chars().nth(i).unwrap().to_string();
        let result = apply_operation_to_array(&operator, transposed_array[i].clone());
        // println!("Result: {}", result);
        sum += result;
    }
    println!("Sum: {}", sum);
   
  
}

fn part2() {
    println!("Part 2");
    let input = read_input("inputTest.txt");
    let lines = split_new_line(&input);
    let len_lines = lines.len();
    println!("Length of lines: {}", len_lines);
    let mut array: Vec<Vec<i64>> = Vec::new();
    for i in 0..len_lines - 1 {
        array.push(string_to_int_array(lines[i]));
    }
    println!("Array length before transpose: {:?}", array.len());
    println!("Array before transpose: {:?}", array);
    let transposed_array = transpose_array(array);
    println!("Transposed array: {:?}", transposed_array.len());
    println!("Transposed array: {:?}", transposed_array);
    let digits = split_digits(transposed_array);
    println!("Digits: {:?}", digits);
    let operators = remove_spaces(split_space(lines[len_lines - 1]));
    println!("Operators: {}", operators);

    for i in 0..digits.len() {
        println!("Row: {:?}", i);
        for j in 0..digits[i].len() {
            println!("Column: {:?}", j);
            let mut valid_number: Vec<i64> = Vec::new();
            for k in 0..digits[i][j].len() {
                println!("Digit: {:?}", digits[i][j][k]);
            }
        }
    }
    
        // println!("Transposed array row: {:?}", transposed_array[i]);
}

fn main() {
    println!("Day 6");
    part1();
    // part2();
}