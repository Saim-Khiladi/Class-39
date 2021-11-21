class Game {
  constructor() {
    this.resetTitle = createElement("h2")
    this.resetBtn = createButton("")
    this.leaderBoardTitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
    car1 = createSprite(width/2 - 50,height - 100);
    car1.addImage(car1_img)
    car1.scale= 0.07;

    car2 = createSprite(width/2 + 100,height - 100);
    car2.addImage(car2_img)
    car2.scale= 0.07;

    cars = [car1,car2]
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game")
    this.resetBtn.class("Reset");
    this.resetBtn.position(width-100,50);
    this.leaderBoardTitle.html("Leader Board"); 
    this.leaderBoardTitle.class("resetText");
    this.leaderBoardTitle.position(width / 3 - 60, 40);
    this.leader1.class("leadersText"); 
    this.leader1.position(width / 3 - 50, 80); 
    this.leader2.class("leadersText"); 
    this.leader2.position(width / 3 - 50, 130)
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    })
  }

  play() {
    this.handleElements();
    this.handleResetBtn();
    Player.getPlayersInfo();
    if(allPlayers !== undefined){
      image(track,0,-height*5,width,height*6);

    var index = 0
    this.showLeaderBrd();
    for (var plr in allPlayers){
      index += 1 
      var x = allPlayers[plr].positionX
      var y = height - allPlayers[plr].positionY
      cars[index - 1].position.x = x
      cars[index - 1].position.y = y
      if(index === player.index){
        stroke(10)
        fill("red")
        ellipse(x,y,60,60)
        camera.position.x= cars[index - 1].position.x
        camera.position.y= cars[index - 1].position.y
      }
    }
    this.handlePlayerControls()
      drawSprites();
    }
  }
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10
      player.update()
    }
    if(keyIsDown(LEFT_ARROW)&& player.position.x>width/3-50){
      player.positionX -= 5
      player.update()
    }
    if(keyIsDown(RIGHT_ARROW)&& player.position.x>width/2+300){
      player.positionX += 5
      player.update()
    }

  }

  handleResetBtn(){
    this.resetBtn.mousePressed(() => {
      database.ref("/").set({
        playerCount : 0,
        gameState : 0,
        players : {}

      })
      window.location.reload();
    })
  
  }

  showLeaderBrd(){
   var players = Object.values(allPlayers); 
   if ( (players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1 ) { 
     // &emsp; This tag is used for displaying four spaces. 
  leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;"
   + players[0].score; leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score; } if (players[1].rank === 1) { leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score; leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score; } this.leader1.html(leader1); this.leader2.html(leader2);
    }


}
