var diceNumber;
var activePlayer;
var scores;
var roundScore;
var isGameOver;
//Тоглоомыг эхлүүлэх
var diceDom = document.querySelector(".dice");
init();
//Шоо шиддэг евент листенер
document.querySelector(".btn-roll").addEventListener("click", function (){
    //1-6 санамсаргүй тоо гаргаж авна
    if(!isGameOver){
        diceNumber = Math.floor(Math.random() * 6) + 1;
        //Шооны зургийг харагддаг болгоно
        diceDom.style.display = "block";
        //Буусан санамсаргүй тоонд харгалзах шооны зургийг харуулна
        diceDom.src = "dice-" + diceNumber + ".png";
        //Буусан тоо нь 1-ээс ялгаатай бол идэвхтэй тоглогчийн оноог нэмнэ
        if(diceNumber !== 1){
            //1-ээс ялгаатай бол тоглогчид нэмж өгнө
            roundScore = roundScore + diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }
        else{
            //Тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
            switchToNextPlayer();
            }
            
    }
    else
            alert('Шинээр эхлүүл');

    });
// Hold товчны евент листенер
    document.querySelector(".btn-hold").addEventListener("click", function(){
        //Идэвхтэй тоглогчийн цуглуулсан ээлжийн оноог тоглогчийн оноон дээр нэмнэ
        if(!isGameOver){
            scores[activePlayer] = scores[activePlayer] + roundScore;
            //Уг тоглогч хожсон эсэхийг шалгах
            if(scores[activePlayer] >= 15){
    
                isGameOver = true;
                //winner гэсэн текстийг Player гэсэн текстийн оронд гаргана
                document.getElementById("name-" + activePlayer).textContent = "Winner !!!"
                document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
                document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
                document.getElementById("current-" + activePlayer).textContent = 0;
                document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
                diceDom.style.display = "none";
                //document.querySelector(".btn-hold").style.display = "none";
                //document.querySelector(".btn-roll").style.display = "none";
            }
            else{
                document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
                switchToNextPlayer();
            }
        }else{
            alert('Тоглоом дууссан байна');
        }
        
    })
// Тоглогч солих функц
    function switchToNextPlayer(){
        document.getElementById("current-" + activePlayer).textContent = 0;
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
        roundScore = 0;
        //Улаан цэгийг шилжүүлэх 
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        diceDom.style.display = "none";
        }
//Шинэ тоглоом эхлүүлэх 
    document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    diceNumber = 0;
    activePlayer = 0;
    scores = [0, 0];
    roundScore = 0;
    isGameOver = false;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-0").classList.add("active");
    document.getElementById("name-1").textContent = "Player 2";
    document.getElementById("name-1").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    diceDom.style.display = "none";
    //document.querySelector(".btn-hold").style.display = "block";
    //document.querySelector(".btn-roll").style.display = "block";
}