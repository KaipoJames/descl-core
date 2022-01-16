var players = [
    {
      playerName: 'Person 1',
    },
    {
      playerName: 'Person 2',
    },
    {
      playerName: 'Person 3',
    },
    {
      playerName: 'Person 4',
    },
    {
      playerName: 'Person 5',
    },
    {
      playerName: 'Person 6',
    },
    {
      playerName: 'Person 7',
    },
    {
      playerName: 'Person 8',
    },
    {
      playerName: 'Person 9',
    },
    {
      playerName: 'Person 10',
    },
    {
      playerName: 'Person 11',
    },
    {
      playerName: 'Person 12',
    },
    {
      playerName: 'Person 13',
    },
    {
      playerName: 'Person 14',
    },
    {
      playerName: 'Person 15',
    },
    {
      playerName: 'Person 16',
    },
  ];
  
  var numberOfRounds = players.length - 1;
  
  function generateRounds() {
    for(let i = 0; i < numberOfRounds; i++) {
      //document.write('<h1 class="round">'+'Round ' + (i+1) + '</h1>');
      console.log("round " + (i + 1));
      
      for (let j = 0; j < players.length / 2; j++) { 
        console.log(players[j].playerName + " - " + players[players.length - 1 - j].playerName);
      }
  
      players.splice(1, 0, players[15]);
      players.pop();
    }
  }
  
  generateRounds();
  