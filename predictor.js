// Football Prediction Engine
// Contains all prediction algorithms

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
            'Manchester United': { wins: 18, losses: 5, draws: 2, goalsFor: 65, goalsAgainst: 28 },
            'Liverpool': { wins: 19, losses: 3, draws: 3, goalsFor: 72, goalsAgainst: 22 },
            'Manchester City': { wins: 20, losses: 2, draws: 3, goalsFor: 78, goalsAgainst: 18 },
            'Arsenal': { wins: 17, losses: 6, draws: 2, goalsFor: 68, goalsAgainst: 32 },
            'Chelsea': { wins: 16, losses: 7, draws: 2, goalsFor: 62, goalsAgainst: 38 },
            'Real Madrid': { wins: 21, losses: 2, draws: 2, goalsFor: 85, goalsAgainst: 15 },
            'Barcelona': { wins: 18, losses: 5, draws: 2, goalsFor: 71, goalsAgainst: 28 },
            'Bayern Munich': { wins: 22, losses: 1, draws: 2, goalsFor: 88, goalsAgainst: 12 },
            'PSG': { wins: 19, losses: 4, draws: 2, goalsFor: 75, goalsAgainst: 24 },
            'Juventus': { wins: 17, losses: 6, draws: 2, goalsFor: 63, goalsAgainst: 35 }
        };
    }

    loadPlayerStats() {
        const stored = localStorage.getItem('playerStats');
        if (stored) return JSON.parse(stored);
        
        return {
            'Cristiano Ronaldo': { team: 'Manchester United', goalsPerGame: 0.85, assistsPerGame: 0.2, injuryRisk: 0.15 },
            'Lionel Messi': { team: 'PSG', goalsPerGame: 0.72, assistsPerGame: 0.35, injuryRisk: 0.12 },
            'Robert Lewandowski': { team: 'Bayern Munich', goalsPerGame: 0.92, assistsPerGame: 0.15, injuryRisk: 0.18 },
            'Neymar': { team: 'PSG', goalsPerGame: 0.68, assistsPerGame: 0.45, injuryRisk: 0.35 },
            'Kylian Mbappe': { team: 'PSG', goalsPerGame: 0.88, assistsPerGame: 0.25, injuryRisk: 0.10 },
            'Harry Kane': { team: 'Bayern Munich', goalsPerGame: 0.76, assistsPerGame: 0.22, injuryRisk: 0.20 },
            'Mohamed Salah': { team: 'Liverpool', goalsPerGame: 0.71, assistsPerGame: 0.28, injuryRisk: 0.22 },
            'Erling Haaland': { team: 'Manchester City', goalsPerGame: 0.95, assistsPerGame: 0.10, injuryRisk: 0.25 }
        };
    }

    // Predict match outcome (win/loss/draw)
    predictMatch(team1, team2) {
        const t1 = this.getTeamStats(team1);
        const t2 = this.getTeamStats(team2);

        if (!t1 || !t2) {
            return {
                error: 'Team not found. Try: Manchester United, Liverpool, Manchester City, Arsenal, etc.'
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
                error: 'Team not found. Try: Manchester United, Liverpool, Manchester City, Arsenal, etc.'
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
            return {
                error: `Player "${playerName}" not found. Try: Cristiano Ronaldo, Lionel Messi, Robert Lewandowski, etc.`
            };
        }

        if (!team) {
            return {
                error: 'Team not found. Try: Manchester United, Liverpool, Manchester City, Arsenal, etc.'
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
                error: `Player "${playerName}" not found. Try: Cristiano Ronaldo, Lionel Messi, Robert Lewandowski, etc.`
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
        const team = teamName.charAt(0).toUpperCase() + teamName.slice(1).toLowerCase();
        return this.teamStats[team];
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
}

// Initialize predictor
const predictor = new FootballPredictor();
