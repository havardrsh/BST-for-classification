/* Example usage */

// You will need a list of categories used in your system
var categories = ["Admin", "Production", "Environmental"];

// Create an instance of the binary search tree and pass in the categories to the constructor
var tree = new Tree(categories);

// Based on previous data, pass in words with connected category
var text1 = "Hello, this is a test";
text1 = text1.split(/[ .?!,-]+/);
for (word of text1) {
    tree.insertNode(word, "Admin");
}

var text2 = "Hello, OK";
text2 = text2.split(/[ .?!,-]+/);
for (word of text2) {
    tree.insertNode(word, "Production");
}

var categoryWithHighestProbability = tree.predictCategory(["Hello", "test"]);

console.log("Predicted Category: " + categoryWithHighestProbability.category);
console.log("Probability: " + categoryWithHighestProbability.probability);
// Expected output: Admin - .75