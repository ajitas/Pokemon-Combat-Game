var enemiesAppended = false;
var defenderSelected = false;
//pointers to the selected pokemon and enemy pokemon
var yourEnemy;
var yourPokemon;
//health powers
var pokemon1HP = 120;
var pokemon2HP = 100;
var pokemon3HP = 150;
var pokemon4HP = 180;
var pokemon1BaseAttack = 8;
var pokemon2BaseAttack = 6;
var pokemon3BaseAttack = 10;
var pokemon4BaseAttack = 12;
var pokemon1CounterAttack = 5;
var pokemon2CounterAttack = 10;
var pokemon3CounterAttack = 15;
var pokemon4CounterAttack = 20;
//selected pokemon's hp and base attack power
var yourHP;
var yourBaseAttack;
//selected enemy's hp and counter attack power
var enemyHP;
var enemyCounterAttack;
//counter for keeping track of the number of attack hits by you
var counter =1;
//counter for the number of defeated enemies
var numOfDefendersLost = 0;

//resets the game
function resetGame() {

    //display necessary divs and hide others
    $("*").show();
    $("title").hide();
    $("all-pokemon-area *").show();
    $("#myModal").hide();
    $("#defender-area").hide();
    $("#combat-zone").hide();
    $("#your-character-message").hide();
    $("#start-combat").hide();
    $("#enemy-area").hide();

    //remove appended images from the corresponding areas
    $("#defender-area> img").remove();
    $("#enemy-area> img").remove();
    
    //reset counters and booleans
    counter =1;
    defenderSelected = false;
    numOfDefendersLost = 0;
    enemiesAppended = false;

    //bind the click event of div attack to the function attack
    $("#attack").bind("click",attack);

}

//moves all the pokemons accept your chosen one to the enemy area
//takes 2 arguments: your selected pokemon and an array of the rest of the pokemons
function moveEnemiesToEnemyArea(enemies,yourSelection) {
    //If enemy area is empty
    if(!enemiesAppended){
        //display/hide necessary divs
        $("#enemy-area").show();
        $("#your-character-message").show();
        $("#start-message").hide();

        //for each enemy
        for(var i =0;i<3;i++){

            //create a new img tag with id as enemy1, enemy2..class as enemies and src same as the enemy
            var newEnemyImage = $("<img id=\"enemy" + parseInt(i+1) + "\">");
            newEnemyImage.attr("class","enemies");
            newEnemyImage.attr("src",enemies[i].attr("src"));

            //append this new image tag to the enemy-area
            $("#enemy-area").append(newEnemyImage);

            //hide the enemy from the all-pokemon-area
            enemies[i].hide();

            //attach hp(health points) and ca(counter attack power) to each enemy
            switch(enemies[i].attr("id")){
                case "pokemon1" : newEnemyImage.attr("hp",pokemon1HP);
                                  newEnemyImage.attr("ca",pokemon1CounterAttack);
                                  break;
                case "pokemon2" : newEnemyImage.attr("hp",pokemon2HP);
                                  newEnemyImage.attr("ca",pokemon2CounterAttack);
                                  break;      
                case "pokemon3" : newEnemyImage.attr("hp",pokemon3HP);
                                  newEnemyImage.attr("ca",pokemon3CounterAttack);
                                  break; 
                case "pokemon4" : newEnemyImage.attr("hp",pokemon4HP);
                                  newEnemyImage.attr("ca",pokemon4CounterAttack);
                                  break; 
            }
        }
        //pointer to your selected pokemon
        yourPokemon = yourSelection;

        //set boolean to true because the enemies have been appended now
        enemiesAppended = true;
    }
}

//move the defender pokemon from enemy-area to defender-area
//takes selected enemy from enemy-area as argument
function moveDefenderToDefenderArea(enemy) {
    //checks if there is no defender selected yet
    if(!defenderSelected){

        //display defender-area
        $("#defender-area").show();

        //create new img tag and give it id as defender class defender and src same as that of the arg
        var newDefenderImage = $("<img id=\"defender\">");
        newDefenderImage.attr("class","defender");
        newDefenderImage.attr("src",enemy.attr("src"));
        //append the new image tag to the defender-area
        $("#defender-area").append(newDefenderImage);

        //pointer to your selected defender
        yourEnemy = newDefenderImage;
        //hide the selected enemy pokemon from the enemy-area
        enemy.hide();

        //set boolean to true because the defender has been selected now
        defenderSelected = true;

        //display the start fight button
        $("#start-combat").show();

        //attach health points and counter atttack to the defender
        enemyHP = parseInt(enemy.attr("hp"));
        enemyCounterAttack = parseInt(enemy.attr("ca"));
    }
}

//makes the screen ready for the new game if you lose
function youLost(){

    //remove appended images from all the necessary areas
    $("#enemy-area> img").remove();
    $("#enemy-pokemon img:last-child").remove();
    $("#defender-area> img").remove();
    $("#your-pokemon img:last-child").remove();

    //show the result and restart div
    $("#result").text("You Lost!!");
    $("#restart").show();
    $("#game-over").show();

    //unbind the attack function from the click event of attack div
    //because we don't want to be able to click on the attack once the game is over
    $("#attack").unbind("click",attack);
}

//makes the screen ready if you defeat the defender
function youWon(){
    //if you haven't yet defeated all the enemies yet
    if(numOfDefendersLost<2){
        //go back to the enemy-area and pick another defender from enemies left
        //show/hide appropriate div
        $("#result").text("You Won!!");
        $("#another-player").show();
    }

    //set boolean to false so that you can choose a new defender
    defenderSelected = false;

    //increase the count of enemies you have defeated
    numOfDefendersLost++;

    //if all 3 enemies have been defeated
    if(numOfDefendersLost == 3)
    {
        //show the div saying you won the game
        $("#result").text("You Won!!");
        //show restart div
        $("#restart").show();
        $("#game-over").show();

        //unbind the attack function from the click event of attack div
        //because we don't want to be able to click on the attack once the game is over
        $("#attack").unbind("click",attack);
    }
    //remove all the appended images from the required areas
    $("#enemy-pokemon img:last-child").remove();
    $("#defender-area> img").remove();
    $("#your-pokemon img:last-child").remove();
}

//calculates the health points after each attack
var attack = function(){

    //decrease the health points after each attack
    yourHP = yourHP - enemyCounterAttack;
    enemyHP = enemyHP - yourBaseAttack * counter;
    //update the new health points on screen
    $("#your-hp").text(yourHP);
    $("#enemy-hp").text(enemyHP);
    $("#your-attack-hp").text(yourBaseAttack*counter);
    $("#enemy-attack-hp").text(enemyCounterAttack);
    //increase your attack power by your base attack power each time
    counter++;
    //if your health points go below 0 you lose the game
    if(yourHP <=0){
        youLost();
    }
    //if enemy's health points go below zero, you win the cuttent battle
    else if(enemyHP <=0){
        youWon();
    }
};

$( document ).ready(function() {
    //reset the game
    resetGame();

}).on("click","#pokemon1",function(){

    //assign health point and base attack power of your selected player pokemon
    yourHP = pokemon1HP;
    yourBaseAttack = pokemon1BaseAttack;
    var enemies=[$("#pokemon2"),$("#pokemon3"),$("#pokemon4")];
    //move the rest of the pokemons to enemy area
    moveEnemiesToEnemyArea(enemies,$(this));
    
}).on("click","#pokemon2",function(){

    //assign health point and base attack power of your selected player pokemon
    yourHP = pokemon2HP;
    yourBaseAttack = pokemon2BaseAttack;
    var enemies=[$("#pokemon1"),$("#pokemon3"),$("#pokemon4")];
    //move the rest of the pokemons to enemy area
    moveEnemiesToEnemyArea(enemies,$(this));
    
}).on("click","#pokemon3",function(){

    //assign health point and base attack power of your selected player pokemon
    yourHP = pokemon3HP;
    yourBaseAttack = pokemon3BaseAttack;
    var enemies=[$("#pokemon1"),$("#pokemon2"),$("#pokemon4")];
    //move the rest of the pokemons to enemy area
    moveEnemiesToEnemyArea(enemies,$(this));
    
}).on("click","#pokemon4",function(){

    //assign health point and base attack power of your selected player pokemon
    yourHP = pokemon4HP;
    yourBaseAttack = pokemon4BaseAttack;
    var enemies=[$("#pokemon1"),$("#pokemon2"),$("#pokemon3")];
    //move the rest of the pokemons to enemy area
    moveEnemiesToEnemyArea(enemies,$(this));

}).on("click",".enemies",function(){
    //move the selected enemy to defender area
    moveDefenderToDefenderArea($(this));

}).on("click","#start-combat",function(){

    //create a new img tag for combat area
    //your selected pokemon
    var localYourPokemon = $("<img id=\"yourPokemonInCombat\">");
    localYourPokemon.attr("src",yourPokemon.attr("src"));
    localYourPokemon.attr("class","combat-pokemon");

    //create a new img tag for combat area
    //your selected defender pokemon
    var localYourEnemy = $("<img id=\"enemyPokemonInCombat\">");
    localYourEnemy.attr("src",yourEnemy.attr("src"));
    localYourEnemy.attr("class","combat-pokemon");

    //show/hide appropriate divs
    $(".area").hide();
    $("#start-combat").hide();
    $("#combat-zone").show();
    $("#restart").hide();
    $("#game-over").hide();
    $("#another-player").hide();

    //append the newly created image tags to the combat-area
    $("#your-pokemon").append(localYourPokemon);
    $("#enemy-pokemon").append(localYourEnemy);

    //sets the scoreboard
    $("#your-hp").text(yourHP);
    $("#enemy-hp").text(enemyHP);
    $("#your-attack-hp").text("0");
    $("#enemy-attack-hp").text("0");
    //no result yet
    $("#result").text("");

}).on("click","#rules",function(){
    //show rules modal
    $("#myModal").show();
}).on("click", ".close", function(){
    //close rules modal
    $("#myModal").hide();
}).on("click","#restart",function(){
    //restarts the game
    resetGame();
}).on("click","#another-player",function(){
    //if you want to choose more enemies to fight with
    $("#your-character-message").show();
    $("#all-pokemon-area").show();
    $("#start-combat").hide();
    $("#enemy-area").show();
    $("#combat-zone").hide();
});