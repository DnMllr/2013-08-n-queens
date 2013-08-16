// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solutionSet = [];
  var solutionFinder = function(input, n, position) {
    if (position < n) {
      for (var i = 0 ; i < n ; i++) {
        input[position] = i;
        solutionFinder(input, n, position+1);
      }
    } else {
      var hello = input.slice(0);
      solutionSet.push(hello);
    }
  };
  solutionFinder([], n, 0);
  solutionSet = _.map(solutionSet, function(item){return _.uniq(item);});
  solutionSet = _.filter(solutionSet, function(item){
    return item.length === n;
  });
  console.log('Single solution for ' + n + ' rooks:', solutionSet[0]);
  return solutionSet;
};

window.countNRooksSolutions = function(n){
  var solutionSet = [];
  var solutionFinder = function(input, n, position) {
    if (position < n) {
      for (var i = 0 ; i < n ; i++) {
        input[position] = i;
        solutionFinder(input, n, position+1);
      }
    } else {
      var hello = input.slice(0);
      solutionSet.push(hello);
    }
  };
  solutionFinder([], n, 0);
  solutionSet = _.map(solutionSet, function(item){return _.uniq(item);});
  solutionSet = _.filter(solutionSet, function(item){
    return item.length === n;
  });
  console.log('Number of solutions for ' + n + ' rooks:', solutionSet.length);
  return solutionSet.length;
};

window.countNRooksSolutionsBW = function(n){
  var counter = 0;
  var nOnes = (1<<n)-1;
  var recurseSearch = function(column) {
    var possibilities = ~column & nOnes;
    while (possibilities > 0) {
      var rookPlacement = -possibilities & possibilities;
      possibilities = possibilities^rookPlacement;
      recurseSearch(column|rookPlacement);
    }
    if (column === nOnes) {
      counter++;
    }
  };
  recurseSearch(0);
  return counter;
};

window.findNQueensSolution = function(n){
  // debugger;
  var solutionSet = [];
  var counter = 0;
  var nOnes = (1<<n)-1;
  var recurseSearch = function(leftDiagonal, column, rightDiagonal, queenHistory) {
    queenHistory = queenHistory || [];
    var possibilities = ~(leftDiagonal | column | rightDiagonal) & nOnes;
    while (possibilities > 0) {
      var queenPlacement = -possibilities & possibilities;
      possibilities = possibilities^queenPlacement;
      queenHistory.push(queenPlacement);
      recurseSearch((leftDiagonal|queenPlacement)<<1, column|queenPlacement, (rightDiagonal|queenPlacement)>>1, queenHistory);
    }
    if (column === nOnes) {
      counter++;
      queenHistory = _.map(queenHistory, function(item){
        return Math.log(item)/Math.log(2);
      });
      solutionSet.push(queenHistory);
    }
  };
  recurseSearch(0, 0, 0);
  console.log('Single solution for ' + n + ' queens:', solutionSet);
  return solutionSet;
};

window.countNQueensSolutions = function(n){
  var counter = 0;
  var nOnes = (1<<n)-1;
  var recurseSearch = function(leftDiagonal, column, rightDiagonal) {
    var possibilities = ~(leftDiagonal | column | rightDiagonal) & nOnes;
    while (possibilities > 0) {
      var queenPlacement = -possibilities & possibilities;
      possibilities = possibilities^queenPlacement;
      recurseSearch((leftDiagonal|queenPlacement)<<1, column|queenPlacement, (rightDiagonal|queenPlacement)>>1);
    }
    if (column === nOnes) {
      counter++;
    }
  };
  recurseSearch(0, 0, 0);
  var solutionCount = counter;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
