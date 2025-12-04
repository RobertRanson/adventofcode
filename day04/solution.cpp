#include <iostream>
#include <fstream>
#include <string>

using namespace std;

typedef struct {
    int x;
    int y;
} Dimensions;

typedef struct {
    Dimensions dimensions;
    char** grid;
} Grid;

Dimensions getDimensions(string fileName) {
    Dimensions dimensions;
    dimensions.y = 0;
    ifstream file(fileName);
    if (file.is_open()) {
        string line;
        while (getline(file, line)) {
            // Process each line

            dimensions.x = line.length();
            dimensions.y++;
        }
        file.close();
    }
    cout << "Dimensions: " << dimensions.x << "x" << dimensions.y << endl;
    return dimensions;
}

char** createGrid(Dimensions dimensions) {
    char** grid = new char*[dimensions.y];
    for (int i = 0; i < dimensions.y; i++) {
        grid[i] = new char[dimensions.x];
    }
    return grid;
}

Grid getGrid(string fileName) {
    Grid grid = { getDimensions(fileName), createGrid(getDimensions(fileName)) };
    return grid;
}

Grid readGrid(string fileName) {
    Grid grid = getGrid(fileName);
    Dimensions dimensions = grid.dimensions;
    char** gridArray = grid.grid;
    ifstream file(fileName);
    if (file.is_open()) {
        string line;
        int y = 0;
        while (getline(file, line)) {
            for (int x = 0; x < dimensions.x; x++) {
                // cout << "Reading char at index " << x << ", " << y << " from line " << line << endl;
                // cout << "Char: " << line[x] << endl;
                gridArray[y][x] = line[x];

            }
            y++;
        }
        file.close();
    }
    return grid;
}

void printGrid(char** grid, Dimensions dimensions) {
    for (int y = 0; y < dimensions.y; y++) {
        for (int x = 0; x < dimensions.x; x++) {
            cout << grid[y][x] << " ";
        }
        cout << endl << endl;
    }
}

bool isRemovable(Grid grid, int x, int y) {
    char current = grid.grid[y][x];
    if (current == '.') {
        return false;
    }
    int neighbors = 0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            int neighborX = x + i;
            int neighborY = y + j;
            if (neighborX < 0 || neighborX >= grid.dimensions.x || neighborY < 0 || neighborY >= grid.dimensions.y) {
                continue;
            }

            if (grid.grid[neighborY][neighborX] == '@') {
                neighbors++;
            }
        }
    }
    return neighbors < 4;
}
bool areGridsIdentical(Grid grid1, Grid grid2) {
    for (int y = 0; y < grid1.dimensions.y; y++) {
        for (int x = 0; x < grid1.dimensions.x; x++) {
            if (grid1.grid[y][x] != grid2.grid[y][x]) {
                return false;
            }
        }
    }
    return true;
}

int countRemovable(Grid grid) {
    int count = 0;
    for (int y = 0; y < grid.dimensions.y; y++) {
        for (int x = 0; x < grid.dimensions.x; x++) {
            if (grid.grid[y][x] == 'x') {
                count++;
            }
        }
    }
    return count;
}

Grid part1(Grid grid) {
    Grid newGrid = grid;
    newGrid.grid = createGrid(grid.dimensions);
    for (int y = 0; y < grid.dimensions.y; y++) {
        for (int x = 0; x < grid.dimensions.x; x++) {
            if (isRemovable(grid, x, y)) {
                newGrid.grid[y][x] = 'x';
            }else{
                newGrid.grid[y][x] = grid.grid[y][x];
            }
        }
    }
    return newGrid;
}



Grid part2(Grid grid) {
    Grid originalGrid = grid;
    Grid newGrid = originalGrid;
    bool isIdentical = false;
    while (isIdentical == false) {
        newGrid = part1(originalGrid);
        isIdentical = areGridsIdentical(newGrid, originalGrid);
        originalGrid = newGrid;
    }
    return newGrid;
}



int main() {
    Grid grid = readGrid("input.txt");
    // printGrid(grid.grid, grid.dimensions);
    cout << "Part 1" << endl;

    Grid newGrid = part1(grid);
    // printGrid(newGrid.grid, newGrid.dimensions);
    cout << "Count of removable: " << countRemovable(newGrid) << endl;

    cout << "Part 2" << endl;
    Grid newGrid2 = part2(grid);
    cout << "Count of removable: " << countRemovable(newGrid2) << endl;
    return 0;
}

