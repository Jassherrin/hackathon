function calculateDelusionScore(formData) {
    var income = parseFloat(formData.income);
    var expenses = parseFloat(formData.expenses);
    var assets = parseFloat(formData.assets);
    var retireAge = parseFloat(formData.retire);
    var retirementSpenditure = parseFloat(formData.retirementSpenditure);

    var yearsToRetire = retireAge - parseFloat(formData.age);
    var savingsPerMonth = income - expenses;
    var totalSavings = (savingsPerMonth * 12) * yearsToRetire;
    var totalAssets = assets + totalSavings;
    var requiredAssets = retirementSpenditure * 12;

    // Calculate the percentage of assets compared to required assets for retirement
    var delusionPercentage = (totalAssets / requiredAssets) * 100;

    // Ensure the delusion percentage does not exceed 100%
    delusionPercentage = Math.min(delusionPercentage, 100);

    // Determine delusion score based on percentage
    var delusionScore = delusionPercentage >= 100 ? "Delusional" : "Feasible";

    // Generate message based on delusion percentage
    var delusionMessage = delusionScore === "Delusional" ? "You may need to adjust your financial plan to achieve your retirement goals." : "You are on track for a financially secure retirement!";

    return {
        score: delusionPercentage.toFixed(2) + "% Delusion",
        message: delusionMessage
    };
}


function updateDelusionScore() {
    var formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        income: document.getElementById('income').value,
        expenses: document.getElementById('expenses').value,
        assets: document.getElementById('assets').value,
        retire: document.getElementById('dream').value, // corrected here
        retirementSpenditure: document.getElementById('retire').value
    };

    var delusionResult = calculateDelusionScore(formData);

    // Update delusion message
    document.getElementById('feasibility-score').textContent = delusionResult.score;
    document.getElementById('feasibility-message').textContent = delusionResult.message;
}

// Attach input event listeners to all input fields
var inputFields = document.querySelectorAll('input');
inputFields.forEach(function(input) {
    input.addEventListener('input', updateDelusionScore);
});

// Update delusion message initially
updateDelusionScore();



function toggleChat() {
    var chatbox = document.getElementById('chatbox');
    chatbox.classList.toggle('collapsed');
}

function sendMessage() {
    var userMessage = document.getElementById('user-message').value;
    var chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += '<div class="message sent">' + userMessage + '</div>';
    document.getElementById('user-message').value = ''; // Clear input field

    // Send user message to OpenAI API and handle response
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: userMessage }]
        })
    })
    .then(response => response.json())
    .then(data => {
        var modelResponse = data.choices[0].message.content;
        chatMessages.innerHTML += '<div class="message received">' + modelResponse + '</div>';
    })
    .catch(error => console.error('Error:', error));
}

