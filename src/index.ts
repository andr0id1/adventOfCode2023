import { solve as solve1 } from "./1/solution";
import { solve as solve1_2 } from "./1_2/solution";
import { solve as solve2 } from "./2/solution";
import { solve as solve3 } from "./3/solution";
import { solve as solve3_2 } from "./3_2/solution";

const solution = solve1("src/1/codes.txt");
console.log("solution: ",solution);

const solution1_2 = solve1_2("src/1_2/codes.txt");
console.log("solution1_2: ",solution1_2);

const solution2 = solve2("src/2/codes.txt");
console.log("solution2: ",solution2);

const solution3 = solve3("src/3/codes.txt");
console.log("solution3: ",solution3);

const solution3_2 = solve3_2("src/3_2/codes.txt");
console.log("solution3_2: ",solution3_2);
