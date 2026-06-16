// Football Prediction Engine - EXPANDED VERSION
// Contains all prediction algorithms with 30+ teams and 30+ players

class FootballPredictor {
    constructor() {
        this.teamStats = this.loadTeamStats();
        this.playerStats = this.loadPlayerStats();
    }

    // Load team statistics from local storage or API
    loadTeamStats() {
        const stored = localStorage.getItem('teamStats');
        if (stored) return JSON.parse(stored);
        
        return {
            // Premier League
            'Manchester United': { wins: 18, losses: 5, draws: 2, goalsFor: 65, goalsAgainst: 28 },
            'Liverpool': { wins: 19, losses: 3, draws: 3, goalsFor: 72, goalsAgainst: 22 },
            'Manchester City': { wins: 20, losses: 2, draws: 3, goalsFor: 78, goalsAgainst: 18 },
            'Arsenal': { wins: 17, losses: 6, draws: 2, goalsFor: 68, goalsAgainst: 32 },
            'Chelsea': { wins: 16, losses: 7, draws: 2, goalsFor: 62, goalsAgainst: 38 },
            'Tottenham': { wins: 15, losses: 8, draws: 2, goalsFor: 61, goalsAgainst: 40 },
            'Newcastle': { wins: 14, losses: 9, draws: 2, goalsFor: 55, goalsAgainst: 42 },
            'Aston Villa': { wins: 13, losses: 10, draws: 2, goalsFor: 52, goalsAgainst: 45 },
            'Brighton': { wins: 12, losses: 11, draws: 2, goalsFor: 48, goalsAgainst: 48 },
            'Bournemouth': { wins: 11, losses: 12, draws: 2, goalsFor: 45, goalsAgainst: 52 },
            
            // La Liga
            'Real Madrid': { wins: 21, losses: 2, draws: 2, goalsFor: 85, goalsAgainst: 15 },
            'Barcelona': { wins: 18, losses: 5, draws: 2, goalsFor: 71, goalsAgainst: 28 },
            'Atletico Madrid': { wins: 17, losses: 6, draws: 2, goalsFor: 64, goalsAgainst: 30 },
            'Sevilla': { wins: 15, losses: 8, draws: 2, goalsFor: 58, goalsAgainst: 38 },
            'Villarreal': { wins: 14, losses: 9, draws: 2, goalsFor: 55, goalsAgainst: 42 },
            
            // Bundesliga
            'Bayern Munich': { wins: 22, losses: 1, draws: 2, goalsFor: 88, goalsAgainst: 12 },
            'Borussia Dortmund': { wins: 17, losses: 6, draws: 2, goalsFor: 68, goalsAgainst: 32 },
            'Bayer Leverkusen': { wins: 16, losses: 7, draws: 2, goalsFor: 64, goalsAgainst: 36 },
            'RB Leipzig': { wins: 15, losses: 8, draws: 2, goalsFor: 61, goalsAgainst: 39 },
            'Schalke': { wins: 10, losses: 13, draws: 2, goalsFor: 42, goalsAgainst: 55 },
            
            // Serie A
            'Juventus': { wins: 17, losses: 6, draws: 2, goalsFor: 63, goalsAgainst: 35 },
            'AC Milan': { wins: 16, losses: 7, draws: 2, goalsFor: 62, goalsAgainst: 36 },
            'Inter Milan': { wins: 18, losses: 5, draws: 2, goalsFor: 70, goalsAgainst: 26 },
            'Napoli': { wins: 15, losses: 8, draws: 2, goalsFor: 59, goalsAgainst: 40 },
            'AS Roma': { wins: 14, losses: 9, draws: 2, goalsFor: 56, goalsAgainst: 43 },
            
            // Ligue 1
            'PSG': { wins: 19, losses: 4, draws: 2, goalsFor: 75, goalsAgainst: 24 },
            'Marseille': { wins: 15, losses: 8, draws: 2, goalsFor: 58, goalsAgainst: 38 },
            'Lens': { wins: 14, losses: 9, draws: 2, goalsFor: 54, goalsAgainst: 42 },
            'Lyon': { wins: 12, losses: 11, draws: 2, goalsFor: 48, goalsAgainst: 50 },
            'Monaco': { wins: 13, losses: 10, draws: 2, goalsFor: 51, goalsAgainst: 47 }
        };
    }

    loadPlayerStats() {
        const stored = localStorage.getItem('playerStats');
        if (stored) return JSON.parse(stored);
        
        return {
            // Top Strikers
            'Cristiano Ronaldo': { team: 'Manchester United', goalsPerGame: 0.85, assistsPerGame: 0.2, injuryRisk: 0.15 },
            'Robert Lewandowski': { team: 'Bayern Munich', goalsPerGame: 0.92, assistsPerGame: 0.15, injuryRisk: 0.18 },
            'Erling Haaland': { team: 'Manchester City', goalsPerGame: 0.95, assistsPerGame: 0.10, injuryRisk: 0.25 },
            'Kylian Mbappe': { team: 'PSG', goalsPerGame: 0.88, assistsPerGame: 0.25, injuryRisk: 0.10 },
            'Harry Kane': { team: 'Bayern Munich', goalsPerGame: 0.76, assistsPerGame: 0.22, injuryRisk: 0.20 },
            'Karim Benzema': { team: 'Real Madrid', goalsPerGame: 0.82, assistsPerGame: 0.18, injuryRisk: 0.22 },
            'Lautaro Martinez': { team: 'Inter Milan', goalsPerGame: 0.79, assistsPerGame: 0.20, injuryRisk: 0.16 },
            'Dusan Vlahovic': { team: 'Juventus', goalsPerGame: 0.75, assistsPerGame: 0.15, injuryRisk: 0.19 },
            'Sergio Leon': { team: 'Real Sociedad', goalsPerGame: 0.68, assistsPerGame: 0.12, injuryRisk: 0.24 },
            'Serge Gnabry': { team: 'Bayern Munich', goalsPerGame: 0.62, assistsPerGame: 0.28, injuryRisk: 0.20 },
            
            // Midfielders & Wingers
            'Lionel Messi': { team: 'PSG', goalsPerGame: 0.72, assistsPerGame: 0.35, injuryRisk: 0.12 },
            'Neymar': { team: 'PSG', goalsPerGame: 0.68, assistsPerGame: 0.45, injuryRisk: 0.35 },
            'Mohamed Salah': { team: 'Liverpool', goalsPerGame: 0.71, assistsPerGame: 0.28, injuryRisk: 0.22 },
            'Vinicius Junior': { team: 'Real Madrid', goalsPerGame: 0.65, assistsPerGame: 0.32, injuryRisk: 0.18 },
            'Phil Foden': { team: 'Manchester City', goalsPerGame: 0.58, assistsPerGame: 0.25, injuryRisk: 0.14 },
            'Bukayo Saka': { team: 'Arsenal', goalsPerGame: 0.52, assistsPerGame: 0.22, injuryRisk: 0.26 },
            'Jamal Musiala': { team: 'Bayern Munich', goalsPerGame: 0.55, assistsPerGame: 0.20, injuryRisk: 0.15 },
            'Marco Asensio': { team: 'Real Madrid', goalsPerGame: 0.48, assistsPerGame: 0.18, injuryRisk: 0.20 },
            'Pedri': { team: 'Barcelona', goalsPerGame: 0.32, assistsPerGame: 0.35, injuryRisk: 0.28 },
            'Antoine Griezmann': { team: 'Atletico Madrid', goalsPerGame: 0.58, assistsPerGame: 0.24, injuryRisk: 0.17 },
            
            // Defenders & Midfielders
            'Thiago Alcantara': { team: 'Liverpool', goalsPerGame: 0.08, assistsPerGame: 0.22, injuryRisk: 0.30 },
            'Manuel Akanji': { team: 'Bayern Munich', goalsPerGame: 0.05, assistsPerGame: 0.08, injuryRisk: 0.12 },
            'Virgil van Dijk': { team: 'Liverpool', goalsPerGame: 0.08, assistsPerGame: 0.12, injuryRisk: 0.10 },
            'Rodri': { team: 'Manchester City', goalsPerGame: 0.12, assistsPerGame: 0.18, injuryRisk: 0.08 },
            'Toni Kroos': { team: 'Real Madrid', goalsPerGame: 0.15, assistsPerGame: 0.25, injuryRisk: 0.16 },
            'Eduardo Camavinga': { team: 'Real Madrid', goalsPerGame: 0.08, assistsPerGame: 0.14, injuryRisk: 0.18 },
            'Gavi': { team: 'Barcelona', goalsPerGame: 0.10, assistsPerGame: 0.18, injuryRisk: 0.24 },
            'De Bruyne': { team: 'Manchester City', goalsPerGame: 0.35, assistsPerGame: 0.42, injuryRisk: 0.28 },
            'Casemiro': { team: 'Manchester United', goalsPerGame: 0.10, assistsPerGame: 0.12, injuryRisk: 0.14 },
            'Jude Bellingham': { team: 'Real Madrid', goalsPerGame: 0.22, assistsPerGame: 0.18, injuryRisk: 0.12 }
        };
    }

    // Predict match outcome (win/loss/draw)
    predictMatch(team1, team2) {
        const t1 = this.getTeamStats(team1);
        const t2 = this.getTeamStats(team2);

        if (!t1 || !t2) {
            const teamList = Object.keys(this.teamStats).slice(0, 10).join(', ');
            return {
                error: `Team not found. Try: ${teamList}, etc.`
            };
        }

        // Calculate team strength
        const strength1 = this.calculateTeamStrength(t1);
        const strength2 = this.calculateTeamStrength(t2);

        // Calculate win probability
        const totalStrength = strength1 + strength2;
        const prob1 = strength1 / totalStrength;
        const prob2 = strength2 / totalStrength;
        const drawProb = 0.25;

        // Determine prediction
        let prediction, confidence;
        if (prob1 > prob2) {
            prediction = `${team1} to win`;
            confidence = prob1;
        } else if (prob2 > prob1) {
            prediction = `${team2} to win`;
            confidence = prob2;
        } else {
            prediction = 'Draw';
            confidence = drawProb;
        }

        const confidenceLevel = confidence > 0.7 ? 'high' : confidence > 0.5 ? 'medium' : 'low';

        return {
            prediction,
            confidence: (confidence * 100).toFixed(1) + '%',
            confidenceLevel,
            team1Strength: (strength1).toFixed(2),
            team2Strength: (strength2).toFixed(2),
            drawOdds: (drawProb * 100).toFixed(1) + '%'
        };
    }

    // Predict match score
    predictScore(team1, team2) {
        const t1 = this.getTeamStats(team1);
        const t2 = this.getTeamStats(team2);

        if (!t1 || !t2) {
            return {
                error: 'Team not found. Please check team name spelling.'
            };
        }

        // Calculate average goals
        const avgGoals1 = t1.goalsFor / (t1.wins + t1.losses + t1.draws);
        const avgGoals2 = t2.goalsFor / (t2.wins + t2.losses + t2.draws);

        // Add variance based on defence
        const goalsConceded1 = t1.goalsAgainst / (t1.wins + t1.losses + t1.draws);
        const goalsConceded2 = t2.goalsAgainst / (t2.wins + t2.losses + t2.draws);

        const expectedGoals1 = avgGoals1 + (goalsConceded2 * 0.1);
        const expectedGoals2 = avgGoals2 + (goalsConceded1 * 0.1);

        const score1 = Math.round(expectedGoals1);
        const score2 = Math.round(expectedGoals2);

        return {
            predictedScore: `${score1} - ${score2}`,
            team1Goals: score1,
            team2Goals: score2,
            team1Offensive: avgGoals1.toFixed(2),
            team2Offensive: avgGoals2.toFixed(2),
            team1Defensive: goalsConceded1.toFixed(2),
            team2Defensive: goalsConceded2.toFixed(2)
        };
    }

    // Predict player performance
    predictPlayer(playerName, teamName) {
        const player = this.getPlayerStats(playerName);
        const team = this.getTeamStats(teamName);

        if (!player) {
            const playerList = Object.keys(this.playerStats).slice(0, 10).join(', ');
            return {
                error: `Player "${playerName}" not found. Try: ${playerList}, etc.`
            };
        }

        if (!team) {
            return {
                error: 'Team not found. Please check team name spelling.'
            };
        }

        const teamStrength = this.calculateTeamStrength(team);
        const performanceMultiplier = 0.8 + (teamStrength / 100);

        const predictedGoals = (player.goalsPerGame * performanceMultiplier).toFixed(2);
        const predictedAssists = (player.assistsPerGame * performanceMultiplier).toFixed(2);
        const rating = (6.5 + (performanceMultiplier * 2)).toFixed(1);

        return {
            playerName,
            team: player.team,
            predictedGoals,
            predictedAssists,
            predictedRating: rating,
            form: 'Good',
            nextMatch: 'TBD'
        };
    }

    // Predict injury risk
    predictInjury(playerName, teamName) {
        const player = this.getPlayerStats(playerName);

        if (!player) {
            return {
                error: `Player "${playerName}" not found. Check spelling and try again.`
            };
        }

        const injuryRisk = player.injuryRisk;
        const riskLevel = injuryRisk > 0.3 ? 'High' : injuryRisk > 0.2 ? 'Medium' : 'Low';
        const status = injuryRisk > 0.3 ? '⚠️ Caution' : injuryRisk > 0.2 ? '✓ Monitor' : '✅ Fit';

        return {
            playerName,
            injuryRisk: (injuryRisk * 100).toFixed(1) + '%',
            riskLevel,
            status,
            recommendation: this.getInjuryRecommendation(injuryRisk)
        };
    }

    // Helper methods
    getTeamStats(teamName) {
        // Case-insensitive team lookup
        const team = Object.keys(this.teamStats).find(
            t => t.toLowerCase() === teamName.toLowerCase()
        );
        return team ? this.teamStats[team] : null;
    }

    getPlayerStats(playerName) {
        const player = Object.keys(this.playerStats).find(
            p => p.toLowerCase() === playerName.toLowerCase()
        );
        return player ? this.playerStats[player] : null;
    }

    calculateTeamStrength(team) {
        const winRate = team.wins / (team.wins + team.losses + team.draws);
        const goalDiff = (team.goalsFor - team.goalsAgainst) / (team.wins + team.losses + team.draws);
        const strength = (winRate * 70) + (goalDiff * 30);
        return strength;
    }

    getInjuryRecommendation(risk) {
        if (risk > 0.3) return 'Consider rotation or rest';
        if (risk > 0.2) return 'Monitor closely before match day';
        return 'Available for selection';
    }

    // Get all teams
    getAllTeams() {
        return Object.keys(this.teamStats).sort();
    }

    // Get all players
    getAllPlayers() {
        return Object.keys(this.playerStats).sort();
    }
}

// Initialize predictor
const predictor = new FootballPredictor();
