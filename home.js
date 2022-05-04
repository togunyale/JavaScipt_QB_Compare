var qbSeleted = null;
const qbMap = new Map();
Promise.all([getTempToken()]).then(
    response => {
        tempToken = response[0].token;
        aggregrateGameAndPlayerData().then(response =>{
        createPlayerCards()
        });
    }
);


function createPlayerCards(){
    var playerImgDiv = document.getElementById("top-container");

    QBs.forEach(qb => {
        let playerCard = document.createElement("div");
        let playerLabel = document.createElement("div");
        let playerImg = document.createElement("img");
        let buttonDiv = document.createElement("div");
        let statsBtn = document.createElement("button");
        let compareBtn = document.createElement("button");

        statsBtn.textContent = "Stats";
        compareBtn.textContent = "Compare";
        addClickEventToStatBtns(statsBtn,qb);
        addClickEventToCompareBtns(compareBtn,qb);
        buttonDiv.setAttribute("class","btns-container");
        buttonDiv.appendChild(statsBtn);
        buttonDiv.appendChild(compareBtn);
        playerCard.setAttribute("class","player-img");
        

        playerImg.setAttribute("src",qb.playerImage);

        playerLabel.textContent = qb.fullName;
        playerLabel.setAttribute("class","playerLabel")
        
        playerCard.appendChild(playerImg);
        playerCard.appendChild(playerLabel);
        playerCard.appendChild(buttonDiv);
        playerImgDiv.appendChild(playerCard);
       
    });
}



function addClickEventToStatBtns(button,qb){
    button.addEventListener('click', ()=>{
        if(qbSeleted != qb.playerId )
        {
            Array.from(document.querySelectorAll('button.clicked-stat')).forEach(
                el =>{
                    el.classList.remove('clicked-stat');
                }
            )
             button.classList.add('clicked-stat');
             qbSeleted = qb.playerId;
             displayTableHeaders();
             // could be optimized
             displayGameByGame(qb);
             displayTotalStats(qb);
        } else {
            qbSeleted = null;
            button.classList.remove('clicked-stat');
            document.getElementById("game-by-game-body").innerHTML = "";
            document.getElementById("season-body").innerHTML = "";
            document.getElementById("game-by-game-header-row").innerHTML = "";
            document.getElementById("season-header-row").innerHTML = "";
        }
    });
}

function addClickEventToCompareBtns(button,qb){
    button.addEventListener('click', () =>{
        if(!qbMap.has(qb.playerId))
        {
            qbMap.set(qb.playerId,qb);
            button.classList.add('clicked-compare');
            button.textContent = "Remove";
        } else
        {
            qbMap.delete(qb.playerId);
            button.classList.remove('clicked-compare');
            button.textContent = "Compare";
           
        }
         compareQbStats();
    }); 
}




function displayTableHeaders(){
    let gameBygameTable = document.getElementById("game-by-game-header-row");  
    let seasonTable = document.getElementById("season-header-row");

    seasonTable.innerHTML = "";
    gameBygameTable.innerHTML = "";

    gameByGameTableHeaders.forEach( header => {
        let newHeader = document.createElement("th");
        newHeader.textContent += header;
        newHeader.setAttribute("class","header-style");
        gameBygameTable.appendChild(newHeader);
    });
  
    seasonTableHeaders.forEach( header => {
        let newHeader = document.createElement("th");
        newHeader.textContent += header;
        newHeader.setAttribute("class","header-style");
        seasonTable.appendChild(newHeader);
    });
}

function compareQbStats(){
    let compareTableHeader = document.getElementById("compare-header-row");
    let compareTableBody = document.getElementById("compare-body");
    let qbsToCompare = Array.from(qbMap.values());

    //clear out the existing tables
    compareTableHeader.innerHTML = "";
    compareTableBody.innerHTML = "";

    if(qbsToCompare.length > 1){
    // Headers for the Compare Tables add an empty header for buffer 
    let emptyHeader = document.createElement("th");
    emptyHeader.setAttribute("class","header-style");
    compareTableHeader.appendChild(emptyHeader);

    qbsToCompare.forEach(qb => {
        let newHeader = document.createElement("th");
        newHeader.textContent += qb.fullName;
        newHeader.setAttribute("class","header-style");
        compareTableHeader.appendChild(newHeader);

    });
    compareVariables.forEach(compare =>{
        let tempTdElements = [];
        let selectedQB;
        let newRow = document.createElement("tr");

        for(let iter = 0; iter < qbsToCompare.length; iter++){
            qbsToCompare[iter]['compareIndex'] = iter;
            let tempTd = document.createElement("td");
            tempTd.textContent += qbsToCompare[iter][compare]
            tempTdElements.push(tempTd);
        }
        if(compare === "totalInts" ||compare ===  "totalSacks" )
        {
            selectedQB = qbsToCompare.reduce((prev,curr) => prev[compare] > curr[compare] ? prev : curr);
        }else
        {
            selectedQB = qbsToCompare.reduce((prev,curr) => prev[compare] > curr[compare] ? prev : curr);
        }
        

        tempTdElements[selectedQB.compareIndex].classList.add("compareCell");

        let emptybuff = document.createElement("td");
        emptybuff.textContent += compare;
        tempTdElements.unshift(emptybuff);

        tempTdElements.forEach(td =>{
            newRow.appendChild(td);
        });
        compareTableBody.appendChild(newRow);


    });
}
}

function displayTotalStats(qb){
    let seasonTableBody = document.getElementById("season-body");
    seasonTableBody.innerHTML = "";

    let newRow = document.createElement("tr");
    let passTds = document.createElement("td");
    let passYds = document.createElement("td");
    let compl = document.createElement("td");
    let atts = document.createElement("td");
    let complPct = document.createElement("td");
    let ints = document.createElement("td");
    let sacks = document.createElement("td");
    let rushAtt = document.createElement("td");
    let rushYds = document.createElement("td");
    let RushTds = document.createElement("td");
    let ypa = document.createElement("td");
    let tdToInt = document.createElement("td");

    passYds.textContent += qb.totalPassYds
    passTds.textContent += qb.totalPassTDs;
    compl.textContent += qb.totalComps;
    atts.textContent += qb.totalAtts;
    complPct.textContent += qb.seasonCompPct;
    ints.textContent += qb.totalInts;
    sacks.textContent += qb.totalSacks;
    ypa.textContent += qb.seasonYPA;
    rushAtt.textContent += qb.totalRushAtts;
    rushYds.textContent += qb.totalRushYds;
    RushTds.textContent += qb.totalRushTds;
    tdToInt.textContent += qb.tdToInt;

    newRow.appendChild(passYds);
    newRow.appendChild(passTds);
    newRow.appendChild(ints);
    newRow.appendChild(compl);
    newRow.appendChild(atts);
    newRow.appendChild(complPct);
    newRow.appendChild(sacks);
    newRow.appendChild(rushAtt);
    newRow.appendChild(rushYds);
    newRow.appendChild(RushTds);
    newRow.appendChild(ypa);
    newRow.appendChild(tdToInt);

    seasonTableBody.appendChild(newRow);
    
}

function displayGameByGame(qb){
    let gameBygameTableBody = document.getElementById("game-by-game-body");
    gameBygameTableBody.innerHTML = "";
    qb.gameStats.forEach(game => {
        let newRow = document.createElement("tr");

        let dataOpponent = document.createElement("td");
        let dataWeek = document.createElement("td");
        let dataCompl = document.createElement("td");
        let dataAtts = document.createElement("td");
        let dataCompPct = document.createElement("td");
        let dataPassYds = document.createElement("td");
        let dataPassTds = document.createElement("td");
        let dataInts = document.createElement("td");
        let dataSacks = document.createElement("td");
        let dataYpa = document.createElement("td");
        let dataRushA = document.createElement("td");
        let dataRushYds = document.createElement("td");
        let dataRushTds = document.createElement("td");

       
        dataOpponent.textContent += game.opponent;
        dataWeek.textContent += game.week;
        dataCompl.textContent += game.completions;
        dataAtts.textContent += game.attempts;
        dataCompPct.textContent += game.completionPct;
        dataPassYds.textContent += game.passingYds;
        dataPassTds.textContent += game.passingTDs;
        dataInts.textContent += game.interceptions;
        dataSacks.textContent += game.sacks
        dataYpa.textContent += game.yardsPerAtt;
        dataRushA.textContent += game.rushAttempts;
        dataRushYds.textContent += game.rushingYds;
        dataRushTds.textContent += game.rushingTDs;
       
        newRow.appendChild(dataOpponent);
        newRow.appendChild(dataWeek);
        newRow.appendChild(dataCompl);
        newRow.appendChild(dataAtts);
        newRow.appendChild(dataCompPct);
        newRow.appendChild(dataPassYds);
        newRow.appendChild(dataPassTds);
        newRow.appendChild(dataInts);
        newRow.appendChild(dataSacks);
        newRow.appendChild(dataYpa);
        newRow.appendChild(dataRushA);
        newRow.appendChild(dataRushYds);
        newRow.appendChild(dataRushTds);


        gameBygameTableBody.appendChild(newRow);
    });
}
