var QBs = [];
var apiToken = 'fa718609-36e0-4593-b802-55d9d278b2b5';
var tempToken = '';

async function getTempToken(){
    const token = await fetch('https://project.trumedianetworks.com/api/token',{
        method:"GET",headers:{"apiKey": apiToken}});
    return await token.json();
}

async function getPlayers(){
    const players = await fetch('https://project.trumedianetworks.com/api/nfl/players',{
        method:"GET", headers:{"temptoken": tempToken}});
    return await players.json();
}
async function getPlayerGameData(data){
    const playerData = await fetch(`https://project.trumedianetworks.com/api/nfl/player/${data}`
    ,{ method:"GET", headers:{"temptoken": tempToken}})
    return await playerData.json();      
}

async function aggregrateGameAndPlayerData(){
    return getPlayers().then(
        response => {
           if(response){
               response.forEach(player => {
                   QBs.push(new QbProfile(player));
                    getPlayerGameData(player.playerId)
                    .then(
                       stats => {
                           const currentPlayerID = stats[0].playerId;
                           QBs.forEach( qb =>{
                               if( qb.playerId === currentPlayerID){
                                    stats.forEach(stat => {
                                        qb.gameStats.push(new QbGameStats(stat));
                                    });
                                    qb.seasonTotals();
                               }
                           });
                          
                       }
                   )
               });
           }
        }
    )
}
