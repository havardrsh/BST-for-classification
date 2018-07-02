// Binary search tree with nodes containing words and occurances in categories
function Tree(categories) {

    this.root = null;
    this.categories = categories;
    
    this.insertNode = function(word, category) {

        if (this.root === null) {
            this.root = new Node(word.toLowerCase(), this.categories);
            this.root.addCategory(category);
            return;
        }
        this.completeNodeInsertion(word.toLowerCase(), category, this.root);
    }

    this.completeNodeInsertion = function(data, category, currentNode) {
       
        if (data.localeCompare(currentNode.word) === 0) {

            currentNode.addCategory(category);

        } else if (data.localeCompare(currentNode.word) < 0) {
           
            if (currentNode.leftNode === null) {
                currentNode.leftNode = new Node(data, this.categories);
                currentNode.leftNode.addCategory(category);
                return;

            } else {

                this.completeNodeInsertion(data, category, currentNode.leftNode);
            }

        } else {

            if (currentNode.rightNode === null) {
                currentNode.rightNode = new Node(data, this.categories);
     
                currentNode.rightNode.addCategory(category);
       
                return;

            } else {

                this.completeNodeInsertion(data, category, currentNode.rightNode);
            }
        }
    }

    this.printTree = function(current) {

        if (current === null) return;
        
        this.printTree(current.leftNode)
        console.log(current.word)
        console.log(current.categories)
        this.printTree(current.rightNode)
    }

    // Returns frequency of all categories for a word if word exist in BST
    this.getCategoryFrequencies = function(word, currentNode) {

        if (currentNode !== null) {

            if (word.localeCompare(currentNode.word) === 0) {

                return currentNode.categories;

            } else if (word.localeCompare(currentNode.word) < 0) {

                return this.getCategoryFrequencies(word, currentNode.leftNode);

            } else {

                return this.getCategoryFrequencies(word, currentNode.rightNode);
            }
        }

        return null;
    }

    // Returns name of category with highest probability for a word and returns this category and probability
    this.findCategoryWithHighestProbability = function(word) {

        var categoryFrequencies = this.getCategoryFrequencies(word, tree.root);
        if (categoryFrequencies === null) return null;
        
        var totalFrequencyOfWord = 0;
        var highestFrequency = 0;
        var category = null;

        for (var i = 0; i < categoryFrequencies.length; i++) {

            totalFrequencyOfWord += categoryFrequencies[i].sum;
            if (categoryFrequencies[i].sum > highestFrequency) {
                highestFrequency = categoryFrequencies[i].sum;
                category = categoryFrequencies[i].name;
            }
        }
        var highestProbability = highestFrequency / totalFrequencyOfWord;

        return {name: category, sum: highestProbability};

    }

    // Returns the category with highest probability and its probability for a list of words
    this.predictCategory = function(words) {

        var probabilities = this.categories.map((cat) => ({name : cat, sum : 0}));
        
        var probability = null;
    
        for (var i = 0; i < words.length; i++) {
    
            probability = this.findCategoryWithHighestProbability(words[i].toLowerCase());
            if (probability !== null) {
                for (var j = 0; j < probabilities.length; j++) {
    
                     if (probabilities[j].name === probability.name) {
                        probabilities[j].sum = probabilities[j].sum + probability.sum;
                    }
                }
            }
        }
    
        var categoryOfHighestProbability = null;
        var max = 0;
        for (var i = 0; i < probabilities.length; i++) {
            if (probabilities[i].sum > max) {
                max = probabilities[i].sum;
                categoryOfHighestProbability = probabilities[i].name;
            }
        }
        if (max === 0) return null;
        return {category: categoryOfHighestProbability, probability: (max/words.length)};
        
    }   
}

// Nodes in the binary search tree
function Node(word, categories) {
    
    this.leftNode = null;
    this.rightNode = null;
    this.word = word;
    this.categories = categories.map((cat) => ({name : cat, sum : 0}));

    this.addCategory = function(category) {
     
       this.categories.forEach(function(cat) {

            if (cat.name === category) cat.sum++;

        });
    }
}


