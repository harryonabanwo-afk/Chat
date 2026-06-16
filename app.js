// Main App Logic
// Connects UI with prediction engine

// Show/Hide tabs
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Match Prediction
function predictMatch() {
    const team1 = document.getElementById('team1').value.trim();
    const team2 = document.getElementById('team2').value.trim();
    const resultDiv = document.getElementById('matchResult');

    if (!team1 || !team2) {
        showResult(resultDiv, '❌ Please enter both team names', 'error');
        return;
    }

    if (team1.toLowerCase() === team2.toLowerCase()) {
        showResult(resultDiv, '❌ Teams must be different!', 'error');
        return;
    }

    const result = predictor.predictMatch(team1, team2);

    if (result.error) {
        showResult(resultDiv, '❌ ' + result.error, 'error');
        return;
    }

    const html = `
        <div class="prediction-box">
            <div class="prediction-title">⚽ Match Prediction</div>
            <div class="prediction-stat">
                <span>${team1} vs ${team2}</span>
            </div>
            <div class="prediction-stat">
                <span>🎯 Prediction:</span>
                <span class="prediction-value">${result.prediction}</span>
            </div>
            <div class="prediction-stat">
                <span>📊 Confidence:</span>
                <span class="prediction-value">${result.confidence}</span>
            </div>
            <div class="prediction-stat">
                <span>💪 ${team1} Strength:</span>
                <span class="prediction-value">${result.team1Strength}</span>
            </div>
            <div class="prediction-stat">
                <span>💪 ${team2} Strength:</span>
                <span class="prediction-value">${result.team2Strength}</span>
            </div>
            <div class="prediction-stat">
                <span>🤝 Draw Odds:</span>
                <span class="prediction-value">${result.drawOdds}</span>
            </div>
            <span class="confidence ${result.confidenceLevel}">${result.confidenceLevel.toUpperCase()} CONFIDENCE</span>
        </div>
    `;

    showResult(resultDiv, html, 'success');
    document.getElementById('team1').value = '';
    document.getElementById('team2').value = '';
}

// Score Prediction
function predictScore() {
    const team1 = document.getElementById('scoreTeam1').value.trim();
    const team2 = document.getElementById('scoreTeam2').value.trim();
    const resultDiv = document.getElementById('scoreResult');

    if (!team1 || !team2) {
        showResult(resultDiv, '❌ Please enter both team names', 'error');
        return;
    }

    if (team1.toLowerCase() === team2.toLowerCase()) {
        showResult(resultDiv, '❌ Teams must be different!', 'error');
        return;
    }

    const result = predictor.predictScore(team1, team2);

    if (result.error) {
        showResult(resultDiv, '❌ ' + result.error, 'error');
        return;
    }

    const html = `
        <div class="prediction-box">
            <div class="prediction-title">⚽ Score Prediction</div>
            <div class="prediction-stat">
                <span>🎯 Predicted Score:</span>
                <span class="prediction-value" style="font-size: 1.3em;">${result.predictedScore}</span>
            </div>
            <div class="prediction-stat">
                <span>${team1}</span>
                <span class="prediction-value">${result.team1Goals} goals</span>
            </div>
            <div class="prediction-stat">
                <span>${team2}</span>
                <span class="prediction-value">${result.team2Goals} goals</span>
            </div>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;">
            <div class="prediction-stat">
                <span>📈 ${team1} Avg Goals/Game:</span>
                <span class="prediction-value">${result.team1Offensive}</span>
            </div>
            <div class="prediction-stat">
                <span>📈 ${team2} Avg Goals/Game:</span>
                <span class="prediction-value">${result.team2Offensive}</span>
            </div>
            <div class="prediction-stat">
                <span>🛡️ ${team1} Goals Conceded/Game:</span>
                <span class="prediction-value">${result.team1Defensive}</span>
            </div>
            <div class="prediction-stat">
                <span>🛡️ ${team2} Goals Conceded/Game:</span>
                <span class="prediction-value">${result.team2Defensive}</span>
            </div>
        </div>
    `;

    showResult(resultDiv, html, 'success');
    document.getElementById('scoreTeam1').value = '';
    document.getElementById('scoreTeam2').value = '';
}

// Player Performance Prediction
function predictPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    const teamName = document.getElementById('playerTeam').value.trim();
    const resultDiv = document.getElementById('playerResult');

    if (!playerName || !teamName) {
        showResult(resultDiv, '❌ Please enter player name and team', 'error');
        return;
    }

    const result = predictor.predictPlayer(playerName, teamName);

    if (result.error) {
        showResult(resultDiv, '❌ ' + result.error, 'error');
        return;
    }

    const html = `
        <div class="prediction-box">
            <div class="prediction-title">⭐ Player Performance</div>
            <div class="prediction-stat">
                <span>👤 Player:</span>
                <span class="prediction-value">${result.playerName}</span>
            </div>
            <div class="prediction-stat">
                <span>🏟️ Team:</span>
                <span class="prediction-value">${result.team}</span>
            </div>
            <div class="prediction-stat">
                <span>⚽ Predicted Goals:</span>
                <span class="prediction-value">${result.predictedGoals}</span>
            </div>
            <div class="prediction-stat">
                <span>🎯 Predicted Assists:</span>
                <span class="prediction-value">${result.predictedAssists}</span>
            </div>
            <div class="prediction-stat">
                <span>⭐ Expected Rating:</span>
                <span class="prediction-value">${result.predictedRating}/10</span>
            </div>
            <div class="prediction-stat">
                <span>📊 Form:</span>
                <span class="prediction-value">${result.form}</span>
            </div>
            <span class="confidence high">EXPECTED TO PERFORM WELL</span>
        </div>
    `;

    showResult(resultDiv, html, 'success');
    document.getElementById('playerName').value = '';
    document.getElementById('playerTeam').value = '';
}

// Injury Risk Prediction
function predictInjury() {
    const playerName = document.getElementById('injuryPlayer').value.trim();
    const teamName = document.getElementById('injuryTeam').value.trim();
    const resultDiv = document.getElementById('injuryResult');

    if (!playerName) {
        showResult(resultDiv, '❌ Please enter player name', 'error');
        return;
    }

    const result = predictor.predictInjury(playerName, teamName);

    if (result.error) {
        showResult(resultDiv, '❌ ' + result.error, 'error');
        return;
    }

    const riskColor = result.riskLevel === 'High' ? 'low' : result.riskLevel === 'Medium' ? 'medium' : 'high';

    const html = `
        <div class="prediction-box">
            <div class="prediction-title">🏥 Injury Risk Assessment</div>
            <div class="prediction-stat">
                <span>👤 Player:</span>
                <span class="prediction-value">${result.playerName}</span>
            </div>
            <div class="prediction-stat">
                <span>⚠️ Injury Risk:</span>
                <span class="prediction-value">${result.injuryRisk}</span>
            </div>
            <div class="prediction-stat">
                <span>📊 Risk Level:</span>
                <span class="prediction-value">${result.riskLevel}</span>
            </div>
            <div class="prediction-stat">
                <span>✅ Status:</span>
                <span class="prediction-value">${result.status}</span>
            </div>
            <div class="prediction-stat">
                <span>💡 Recommendation:</span>
                <span class="prediction-value">${result.recommendation}</span>
            </div>
            <span class="confidence ${riskColor}">${result.riskLevel.toUpperCase()} RISK</span>
        </div>
    `;

    showResult(resultDiv, html, 'success');
    document.getElementById('injuryPlayer').value = '';
    document.getElementById('injuryTeam').value = '';
}

// Helper function to display results
function showResult(element, content, type) {
    element.innerHTML = content;
    element.classList.add('show');
    element.classList.remove('error', 'success');
    element.classList.add(type);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('⚽ Football Prediction Software Loaded');
    console.log('Available teams: Manchester United, Liverpool, Manchester City, Arsenal, Chelsea, Real Madrid, Barcelona, Bayern Munich, PSG, Juventus');
    console.log('Available players: Cristiano Ronaldo, Lionel Messi, Robert Lewandowski, Neymar, Kylian Mbappe, Harry Kane, Mohamed Salah, Erling Haaland');
});

// Allow Enter key to submit
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const activeTab = document.querySelector('.tab-content.active');
        
        if (activeTab.id === 'matches') predictMatch();
        else if (activeTab.id === 'scores') predictScore();
        else if (activeTab.id === 'players') predictPlayer();
        else if (activeTab.id === 'injuries') predictInjury();
    }
});
