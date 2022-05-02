var QBs = [];
var tempToken = '809fd3cb-66d0-4d70-9b98-ce11a14f0819'

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