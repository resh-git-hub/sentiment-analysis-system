// ==========================================
// SENTIMENT ANALYSIS APPLICATION
// ==========================================


// Positive words
const positiveWords = [

    "good",
    "great",
    "excellent",
    "amazing",
    "awesome",
    "wonderful",
    "fantastic",
    "happy",
    "love",
    "loved",
    "like",
    "liked",
    "best",
    "beautiful",
    "perfect",
    "nice",
    "enjoy",
    "enjoyed",
    "helpful",
    "success",
    "successful",
    "easy",
    "fast",
    "useful",
    "comfortable",
    "satisfied",
    "thank",
    "thanks",
    "excited",
    "brilliant",
    "super",
    "positive",
    "win",
    "winning",
    "fun"
];


// Negative words
const negativeWords = [

    "bad",
    "worst",
    "terrible",
    "horrible",
    "awful",
    "sad",
    "hate",
    "hated",
    "dislike",
    "disliked",
    "angry",
    "poor",
    "problem",
    "problems",
    "fail",
    "failed",
    "failure",
    "difficult",
    "hard",
    "slow",
    "useless",
    "broken",
    "disappointed",
    "disappointing",
    "boring",
    "pain",
    "painful",
    "wrong",
    "error",
    "errors",
    "badly",
    "negative",
    "loss",
    "losing",
    "unhappy",
    "confusing"
];


// Neutral words
const neutralWords = [

    "okay",
    "ok",
    "average",
    "normal",
    "fine",
    "maybe",
    "perhaps",
    "information",
    "information",
    "report",
    "today",
    "yesterday",
    "tomorrow",
    "product",
    "service",
    "system",
    "application",
    "computer",
    "student",
    "college",
    "class",
    "work"
];


// Get saved history
let history =
    JSON.parse(
        localStorage.getItem("sentimentHistory")
    ) || [];


// ==========================================
// ANALYZE SENTIMENT
// ==========================================

function analyzeSentiment() {

    const input =
        document
        .getElementById("textInput")
        .value
        .trim();


    // Check empty input
    if (input === "") {

        alert(
            "Please enter some text or use the microphone."
        );

        return;
    }


    // Convert to lowercase
    const words =
        input
        .toLowerCase()
        .replace(/[.,!?;:()]/g, "")
        .split(/\s+/);


    let positiveCount = 0;

    let negativeCount = 0;

    let neutralCount = 0;


    // Check every word
    words.forEach(function(word) {

        if (positiveWords.includes(word)) {

            positiveCount++;

        }

        else if (negativeWords.includes(word)) {

            negativeCount++;

        }

        else if (neutralWords.includes(word)) {

            neutralCount++;

        }

    });


    // Total sentiment words
    const total =
        positiveCount +
        negativeCount +
        neutralCount;


    let sentiment;

    let score;

    let icon;

    let message;


    // No matching emotion words
    if (total === 0) {

        sentiment = "Neutral";

        score = 50;

        icon = "😐";

        message =
            "The text does not contain enough emotional words, so it is considered neutral.";

    }


    // Positive
    else if (
        positiveCount > negativeCount
    ) {

        sentiment = "Positive";

        score =
            Math.round(
                (
                    positiveCount /
                    (positiveCount + negativeCount)
                ) * 100
            );

        icon = "😊";

        message =
            "The text expresses a positive feeling or opinion.";

    }


    // Negative
    else if (
        negativeCount > positiveCount
    ) {

        sentiment = "Negative";

        score =
            Math.round(
                (
                    negativeCount /
                    (positiveCount + negativeCount)
                ) * 100
            );

        icon = "😞";

        message =
            "The text expresses a negative feeling or opinion.";

    }


    // Equal
    else {

        sentiment = "Neutral";

        score = 50;

        icon = "😐";

        message =
            "The text contains a balanced or neutral sentiment.";

    }


    // Display result
    document
        .getElementById("resultIcon")
        .innerText = icon;


    document
        .getElementById("sentimentResult")
        .innerText =
        sentiment;


    document
        .getElementById("resultMessage")
        .innerText =
        message;


    document
        .getElementById("score")
        .innerText =
        score + "%";


    document
        .getElementById("progressBar")
        .style.width =
        score + "%";


    // Counts
    document
        .getElementById("positiveCount")
        .innerText =
        positiveCount;


    document
        .getElementById("negativeCount")
        .innerText =
        negativeCount;


    document
        .getElementById("neutralCount")
        .innerText =
        neutralCount;


    // Progress bar color
    const progress =
        document
        .getElementById("progressBar");


    if (sentiment === "Positive") {

        progress.style.background =
            "#22c55e";

    }

    else if (sentiment === "Negative") {

        progress.style.background =
            "#ef4444";

    }

    else {

        progress.style.background =
            "#f59e0b";

    }


    // Save to history
    saveHistory(
        input,
        sentiment,
        score
    );
}


// ==========================================
// SAVE HISTORY
// ==========================================

function saveHistory(
    text,
    sentiment,
    score
) {

    const item = {

        id: Date.now(),

        text: text,

        sentiment: sentiment,

        score: score,

        date:
            new Date()
            .toLocaleString()

    };


    history.unshift(item);


    // Keep only latest 10
    history =
        history.slice(0, 10);


    localStorage.setItem(
        "sentimentHistory",
        JSON.stringify(history)
    );


    displayHistory();
}


// ==========================================
// DISPLAY HISTORY
// ==========================================

function displayHistory() {

    const container =
        document.getElementById(
            "history"
        );


    container.innerHTML = "";


    if (history.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No analysis history yet.
            </p>`;

        return;
    }


    history.forEach(function(item) {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "history-item";


        let className =
            item.sentiment.toLowerCase();


        div.innerHTML = `

            <div class="history-text">

                <strong>
                    ${escapeHTML(item.text)}
                </strong>

                <br>

                <small>
                    ${item.date}
                </small>

            </div>


            <div class="history-result ${className}">

                ${item.sentiment}

                <br>

                ${item.score}%

            </div>

        `;


        container.appendChild(div);

    });
}


// ==========================================
// CLEAR HISTORY
// ==========================================

function clearHistory() {

    if (history.length === 0) {

        return;

    }


    const confirmDelete =
        confirm(
            "Delete all analysis history?"
        );


    if (!confirmDelete) {

        return;

    }


    history = [];


    localStorage.removeItem(
        "sentimentHistory"
    );


    displayHistory();
}


// ==========================================
// CLEAR TEXT
// ==========================================

function clearText() {

    document
        .getElementById("textInput")
        .value = "";


    document
        .getElementById("speechStatus")
        .innerText =
        "Ready to analyze";

}


// ==========================================
// SPEECH TO TEXT
// ==========================================

function startSpeech() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    // Browser support check
    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-US";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.start();


    document
        .getElementById("speechStatus")
        .innerText =
        "🔴 Listening... Speak now";


    recognition.onresult =
        function(event) {

            const speech =
                event
                .results[0][0]
                .transcript;


            document
                .getElementById("textInput")
                .value =
                speech;


            document
                .getElementById("speechStatus")
                .innerText =
                "✅ Speech converted successfully";


            // Automatically analyze
            analyzeSentiment();

        };


    recognition.onerror =
        function() {

            document
                .getElementById("speechStatus")
                .innerText =
                "❌ Could not recognize speech";

        };


    recognition.onend =
        function() {

            setTimeout(
                function() {

                    document
                        .getElementById("speechStatus")
                        .innerText =
                        "Ready to analyze";

                },
                2000
            );

        };

}


// ==========================================
// SECURITY FUNCTION
// Prevent HTML injection
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent = text;


    return div.innerHTML;
}


// ==========================================
// LOAD HISTORY WHEN PAGE OPENS
// ==========================================

displayHistory();