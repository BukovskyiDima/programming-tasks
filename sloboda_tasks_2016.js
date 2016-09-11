// test task' work
function test(valueOfSteps) {
  console.log("Results for task 1:\n");
  for (var i = 1; i< valueOfSteps + 1; i++) {
      console.log( giftOptions(10,15,20, i * 10 ) + "\n");
  }
  console.log("Results for task 2:\n");
  for (var i = 0; i< valueOfSteps; i++) { 
    console.log( copyTask(1,1+i,i) + "\n");
  }
  console.log("Results for task 2 (version 2):\n");
  for (var i = 0; i< valueOfSteps; i++) {
    console.log( copyTasks(1,1+i,i) + "\n");
  }
  console.log("Results for task 3\n");
  console.log( howManyFriends(5,2,
    [[0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,0,0,1],
    [0,0,0,0,1],
    [0,0,1,1,0]]));
  console.log( howManyFriends(3,1,
    [[0,1,0],
    [1,0,1],
    [0,1,0]]));
};


// task 1
  // Candy weighs X grams, tangerine - Y grams and apple - Z grams.
  // Need to write a program that will determine how many different versions of gifts weighing exactly W grams can make Santa Claus.
  // Input data
  // Function should receive four integers X, Y, Z and W.
  // Output data
  // Function should return a single integer - the number of gift options.
  // Example: 
  // X = 10
  // Y = 25
  // Z = 15
  // W = 40
  // Result: 3
// discrition
function giftOptions(candy, tangerine, apple, weight) {
  
   var candy = checkType(candy),
    tangerine = checkType(tangerine),
    apple = checkType(apple),
    weight = checkType(weight);
  
  // conditions of withdrawal from the weight function
  if (weight < 0) {
    return 0;
  } else if (weight === 0) {
    return 1;
  }

  //func for check full conditions of release function
  if (candy === -1 && tangerine === -1) {
      return giftOptions(-1, -1,apple, weight - apple);
  } else if (candy === -1) {
        return giftOptions(-1, tangerine,apple, weight - tangerine) + 
    giftOptions(-1, -1,apple, weight - apple);
  }
  
  return giftOptions(candy, tangerine, apple, weight - candy) +
  giftOptions(-1, tangerine,apple, weight - tangerine) +
  giftOptions(-1, -1,apple, weight - apple);
};


// task 2
  // Jenifer, our secretary, went to the office late today, and it is urgently necessary to save time to have a dinner, but she needs N copies of the same document. 
  // There are two Xerox, one of which copies the list of paper for x seconds, and the other one - for y seconds. (You may use one Xerox machine, or both at the same time. 
  // You can not only copy from the original, but also use a copy.) To help her to find out what is the minimum time it will take.
  // Input data
  // Function should receive three integers: N, x and y
  // Output data
  // Function should return a single number - the minimum time in seconds required for the preparation of N copies.
  // Example1: 
    // N = 4
    // x = 1
    // y = 1
    // Result: 3
  // Example2: 
    // N = 5
    // x = 1
    // y = 2
    // Result: 4
    
    
// task 2 version 1
function copyTask(firstXeroxSpeed, secondXeroxSpeed, copies) {
  
  var x = checkType(firstXeroxSpeed),
    y = checkType(secondXeroxSpeed),
    N = checkType(copies),
    time = 0;
    
    if (N <= 0) {
        time =  0;
    } else if (N === 1) {
      time += x > y ? x : y;
    } else {
      
      if (x > y) {
        var temp = x;
        x = y;
        y = temp;
      }
      
      var minT = 0,
      maxT = (N - 1) * y;
      while (minT < maxT) {
        var averangeT = 0,
        averangeCopies = 0;
        averangeT = integerDivision(minT + maxT, 2)
        averangeCopies = averangeT / x + averangeT / y;
        if (averangeCopies < N - 1) {
          minT = averangeT + 1
        } else {
          maxT = averangeT
        }
      }
      
      time = x + maxT;
    }
    
  return time;
};


// task 2 version 2
function copyTasks(firstXeroxSpeed,secondXeroxSpeed,copies) {
  
  var x = checkType(firstXeroxSpeed),
    y = checkType(secondXeroxSpeed),
    N = checkType(copies),
    time = 0,
    aProd;
    
  if (N <= 0) {
    return time;
  } else if (N > 1) {
    aProd = 1 / x + 1 / y;
    time = Math.ceil( (N-1) / aProd );
  }
  
  time += (x < y) ? x : y;
  return time;
};


// task 3
// 3. Sloboda friends
// Sloboda has N people. Many of them are friends. Also, interesting fact is that friends of friends are also friends. You need to find out how much friends has a particular person in the company.
// Input data
// Function should receive next params:
// N - number of people in the company
// S - a specific number of person
// Matrix N lines contain N numbers consisting of ones and zeros. And the unit standing in the i-th row and j-th column ensures that people with numbers i and j - friends, and 0 - expresses uncertainty.
// Output data
// Function should return number of the certain friends of the person with the S number, remembering transitive friendship.
// Example1:
// N = 3
// S = 1
// Matrix = 0 1 0
//          1 0 1
//          0 1 0
// Result: 2
// Example2:
// N = 5
// S = 2
// Matrix = 0 0 0 0 0
//          0 0 1 0 0
//          0 1 0 0 1
//          0 0 0 0 1
//          0 0 1 1 0
// Result: 3


function howManyFriends(people, person, company) {
  
  var n = checkType(people),
  s = checkType(person),
  c = company,
  result = 0;
  
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      
      if (c[i][j] === 1) {
        for (var k = 0; k < n; k++) {
          if (c[j][k] === 1)
            c[i][k] = 1;
          }
      }
    }
    
    if ((s-1 != i) && c[s-1][i] === 1) {
      result++;
    }
  }
  return result;
};


// support functionality 
function checkType (value) {
 return typeof value === 'number' ? value: 0;
}

function integerDivision(x, y) {
    return (x - x % y) / y;
}
