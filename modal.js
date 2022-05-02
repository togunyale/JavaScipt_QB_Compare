class QbGameStats {
    constructor(stats){
       this.attempts = stats.Att;
       this.completions = stats.Cmp;
       this.interceptions = stats.Int;
       this.passingTDs = stats.PsTD;
       this.passingYds = stats.PsYds;
       this.rushingTDs = stats.RshTD;
       this.rushingYds = stats.RshYds;
       this.rushAttempts = stats.Rush;
       this.sacks = stats.Sack;
       this.week = stats.week;
       this.gameDate = stats.gameDate;
       this.opponent = stats.opponent;
       this.playerName = stats.fullName;
       this.playerId = stats.playerId;
       this.season = stats.seasonYear;
       this.team = stats.team;
       this.oppImage = stats.opponentImage;
       this.completionPct =  Math.round(this.completions / this.attempts * 100);
       this.yardsPerAtt =  Math.round(this.passingYds / this.attempts * 10 ) / 10 ;
    }
}

class QbProfile{
    constructor(player){
        this.playerId = player.playerId;
        this.fullName = player.fullName;
        this.playerImage = player.playerImage;
        this.teamImage = player.teamImage;
        this.gameStats = [];
        this.totalsGathered = false;

        this.totalPassTDs = 0;
        this.totalPassYds = 0;
        this.totalComps = 0;
        this.totalAtts = 0;
        this.seasonCompPct = 0;
        this.totalInts = 0;
        this.totalSacks = 0;
        this.seasonYPA = 0;
        this.totalRushAtts = 0;
        this.totalRushYds = 0;
        this.totalRushTds = 0;
        this.tdToInt = 0;

        this.compareIndex = null;
    }

    seasonTotals(){
        this.gameStats.forEach(game =>{
            this.totalComps += game.completions;
            this.totalAtts += game.attempts;
            this.totalPassYds += game.passingYds;
            this.totalPassTDs += game.passingTDs;
            this.totalInts += game.interceptions;
            this.totalSacks += game.sacks
            this.totalRushAtts += game.rushAttempts;
            this.totalRushYds += game.rushingYds;
            this.totalRushTds += game.rushingTDs;
        });

        this.seasonCompPct = Math.round(this.totalComps / this.totalAtts * 100);
        this.seasonYPA =  Math.round(this.totalPassYds / this.totalAtts * 10 ) / 10;
        this.tdToInt = Math.round(this.totalPassTDs / this.totalInts * 10 ) / 10;
    }

}

const gameByGameTableHeaders = [
   "Opponent", "Week","Completions", "Attempts","Compl %", "Pass Yds",
    "Pass TDs", "Interceptions", "Sack","Yards/Att", "Rush Atts",
    "Rush Yds", "Rush TDs"
];



const seasonTableHeaders =[
"Passing Yards","Passing TD(s)","Int(s)","Completions",
"Attempts","Completion %","Sacks","Rush Atts","Rush Yards","Rush TD(s)",
"Yards/Att","TD/INT"
]

const compareVariables = [
    "totalPassTDs",
        "totalPassYds",
        "totalComps",
        "totalAtts",
        "seasonCompPct",
        "totalInts",
        "totalSacks",
        "seasonYPA",
        "totalRushAtts",
        "totalRushYds",
        "totalRushTds",
        "tdToInt"
];