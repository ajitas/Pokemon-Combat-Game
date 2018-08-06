var enemiesAppended = false;
var defenderSelected = false;
var yourEnemy;
var yourPokemon;
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
var yourHP;
var yourBaseAttack;
var enemyHP;
var enemyCounterAttack;
var counter =1;
var numOfDefendersLost = 0;

function resetGame() {
    $("*").show();
    $("all-pokemon-area *").show();
    $("#myModal").hide();
    $("#defender-area").hide();
    $("#combat-zone").hide();
    $("#your-character-message").hide();
    $("#start-combat").hide();
    $("#enemy-area").hide();
    $("#defender-area> img").remove();
    $("#enemy-area> img").remove();
    

    counter =1;
    defenderSelected = false;
    numOfDefendersLost = 0;
    enemiesAppended = false;
    $("#attack").bind("click",attack);

}
function moveEnemiesToEnemyArea(enemies,yourSelection) {
    if(!enemiesAppended){
        $("#enemy-area").show();
        $("#your-character-message").show();
        $("#start-message").hide();

        for(var i =0;i<3;i++){
            var newEnemyImage = $("<img id=\"enemy" + parseInt(i+1) + "\">");
            $("#enemy-area").append(newEnemyImage);
            newEnemyImage.attr("class","enemies");
            newEnemyImage.attr("src",enemies[i].attr("src"));
            enemies[i].hide();
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
        yourPokemon = yourSelection;
        enemiesAppended = true;
    }
}

function moveDefenderToDefenderArea(enemy) {
    if(!defenderSelected){
        $("#defender-area").show();
        var newDefenderImage = $("<img id=\"defender\">");
        $("#defender-area").append(newDefenderImage);
        newDefenderImage.attr("class","defender");
        newDefenderImage.attr("src",enemy.attr("src"));
        yourEnemy = newDefenderImage;
        enemy.hide();
        defenderSelected = true;
        $("#start-combat").show();

        enemyHP = parseInt(enemy.attr("hp"));
        enemyCounterAttack = parseInt(enemy.attr("ca"));
    }
}

function youLost(){
    $("#enemy-area> img").remove();
    $("#enemy-pokemon img:last-child").remove();
    $("#defender-area> img").remove();
    $("#your-pokemon img:last-child").remove();
    $("#result").text("You Lost!!");
    $("#restart").show();
    $("#attack").unbind("click",attack);
}

function youWon(){
    if(numOfDefendersLost<2){
        $("#your-character-message").show();
        $("#all-pokemon-area").show();
        $("#start-combat").hide();
        $("#enemy-area").show();
        $("#combat-zone").hide();
    }
    defenderSelected = false;
    numOfDefendersLost++;
    if(numOfDefendersLost == 3)
    {
        $("#result").text("You Won!!");
        $("#restart").show();
        $("#attack").unbind("click",attack);
    }
    $("#enemy-pokemon img:last-child").remove();
    $("#defender-area> img").remove();
    $("#your-pokemon img:last-child").remove();
}

var attack = function(){
    yourHP = yourHP - enemyCounterAttack;
    enemyHP = enemyHP - yourBaseAttack*counter;
    $("#your-hp").text(yourHP);
    $("#enemy-hp").text(enemyHP);
    $("#your-attack-hp").text(yourBaseAttack*counter);
    $("#enemy-attack-hp").text(enemyCounterAttack);
    counter++;
    if(yourHP <=0){
        youLost();
    }
    else if(enemyHP <=0){
        youWon();
    }
};

$( document ).ready(function() {
    resetGame();

}).on("click","#pokemon1",function(){

    yourHP = pokemon1HP;
    yourBaseAttack = pokemon1BaseAttack;
    var enemies=[$("#pokemon2"),$("#pokemon3"),$("#pokemon4")];
    moveEnemiesToEnemyArea(enemies,$(this));
    
}).on("click","#pokemon2",function(){

    yourHP = pokemon2HP;
    yourBaseAttack = pokemon2BaseAttack;
    var enemies=[$("#pokemon1"),$("#pokemon3"),$("#pokemon4")];
    moveEnemiesToEnemyArea(enemies,$(this));
    
}).on("click","#pokemon3",function(){

    yourHP = pokemon3HP;
    yourBaseAttack = pokemon3BaseAttack;
    var enemies=[$("#pokemon1"),$("#pokemon2"),$("#pokemon4")];
    moveEnemiesToEnemyArea(enemies,$(this));
    
}).on("click","#pokemon4",function(){

    yourHP = pokemon4HP;
    yourBaseAttack = pokemon4BaseAttack;
    var enemies=[$("#pokemon1"),$("#pokemon2"),$("#pokemon3")];
    moveEnemiesToEnemyArea(enemies,$(this));

}).on("click",".enemies",function(){
    moveDefenderToDefenderArea($(this));

}).on("click","#start-combat",function(){
    var localYourPokemon = $("<img id=\"yourPokemonInCombat\">");
    localYourPokemon.attr("src",yourPokemon.attr("src"));
    localYourPokemon.attr("class","combat-pokemon");

    var localYourEnemy = $("<img id=\"enemyPokemonInCombat\">");
    localYourEnemy.attr("src",yourEnemy.attr("src"));
    localYourEnemy.attr("class","combat-pokemon");

    $(".area").hide();
    $("#start-combat").hide();
    $("#combat-zone").show();
    $("#restart").hide();
    $("#your-pokemon").append(localYourPokemon);
    $("#enemy-pokemon").append(localYourEnemy);
    $("#your-hp").text(yourHP);
    $("#enemy-hp").text(enemyHP);
    $("#your-attack-hp").text("0");
    $("#enemy-attack-hp").text("0");
    $("#result").text("");

}).on("click","#rules",function(){
    $("#myModal").show();
}).on("click", ".close", function(){
    $("#myModal").hide();
}).on("click","#restart",function(){
    resetGame();
});