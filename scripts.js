function preloadImages() {
    quizItems.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

preloadImages();

const quizItems = [
    {
        alt: "pave",
        image: "https://raw.githubusercontent.com/eccft/folketidende-ai-quiz/main/Billleder%20og%20grafik/Quiz-billeder/pope_francis_drip.jpg",
        answer: "fake",
        description: "For det første: Ville Paven nogensinde have så meget drip? Derudover: Se på højre hånd. Den ser underligt lille ud, og det objekt, den holder, giver ingen mening. Det ligner en blanding af en vandflaske og en pose. Korset hænger kun i en enkelt kæde og jakken ser unaturligt perfekt ud."
    },
    {
        alt: "terkel",
        image: "https://raw.githubusercontent.com/eccft/folketidende-ai-quiz/main/Billleder%20og%20grafik/Quiz-billeder/terkel-jakobsen_palle-nevad-frandsen.jpg",
        answer: "real",
        description: "Lyset og ansigtstrækkene ser naturlige ud. Et særligt træk ved AI er, at især træer i baggrunden ofte bliver \"blandet\" lidt sammen, så det står som en sløret masse. Refleksionerne og tingene i drivhuset ser naturlige ud."
    },
    {
        alt: "trump",
        image: "https://raw.githubusercontent.com/eccft/folketidende-ai-quiz/main/Billleder%20og%20grafik/Quiz-billeder/trump_arrested.jpg",
        answer: "fake",
        description: "Det første, man bør undersøge her, er, om Trump er blevet arresteret. Søg information på anerkendte nyhedsmedier, for at se, om de har skrevet om det. Hvis de ikke har, er det nok ikke sket. Derudover: Trumps nakke ser unaturlig ud, og vejstriberne er helt off. På bilen ser dækket ud til at være større på hver side af betjenten i blå."
    },
    {
        alt: "skrald",
        image: "https://raw.githubusercontent.com/eccft/folketidende-ai-quiz/main/Billleder%20og%20grafik/Quiz-billeder/garbage%20in%20france.jpg",
        answer: "fake",
        description: "Start med at tænke: Hvis der lå så meget skrald i en storby, ville det være en enorm nyhed - også i danske medier. Og så har netop dette billede alle de klassiske AI-kendetegn i sig: Folk går mærkeligt rundt om skraldet, og flere ting ser ikke menneskelige ud. Se for eksempel manden med \"kufferten\"."
    },
    {
        alt: "laura",
        image: "https://raw.githubusercontent.com/eccft/folketidende-ai-quiz/main/Billleder%20og%20grafik/Quiz-billeder/laura-sandau_nicklas-linnemann.jpg",
        answer: "real",
        description: "Det kan måske være svært at se, men billedet er ægte. Men nyere AI-modeller kan lave billeder, der ser lige så virkelige ud. Derfor er det vigtigt at huske på, at man altid skal være vågen - især når det er billeder og videoer, der handler om nyheder, krige og politik, hvor de kan påvirke, hvad vi tror er sandt."
    }
];

let currentIndex = 0;
let score = 0;
let hasAnswered = false;

const quizStatus = document.getElementById("quiz-status");
const quizImage = document.getElementById("quiz-image");
const fakeButton = document.getElementById("fake-button");
const realButton = document.getElementById("real-button");
const nextButton = document.getElementById("next-button");
const feedback = document.getElementById("feedback");

const imageDescription = document.getElementById("image-description");
const descriptionBox = document.getElementById("description-box");
const descriptionResult = document.getElementById("description-result");

const mobileHint = document.getElementById("mobile-hint");
const quizArea = document.getElementById("quiz-area");
const backToImageButton = document.getElementById("back-to-image-button");

function isMobileView() {
    return window.innerWidth <= 900;
}

function getAnswerLabel(answer) {
    return answer === "fake" ? "AI-genereret" : "ægte";
}

function clearResultStyles() {
    feedback.classList.remove("result-correct", "result-wrong");
    descriptionBox.classList.remove("result-correct", "result-wrong");
}

function applyResultStyles(isCorrect) {
    const className = isCorrect ? "result-correct" : "result-wrong";
    feedback.classList.add(className);
    descriptionBox.classList.add(className);
}

function loadQuestion() {
    const currentItem = quizItems[currentIndex];

    quizStatus.textContent = `Billede ${currentIndex + 1} af ${quizItems.length}`;
    quizImage.src = currentItem.image;
    quizImage.alt = currentItem.alt;

    feedback.textContent = "";
    imageDescription.textContent = "";
    descriptionResult.textContent = "";

    clearResultStyles();

    descriptionBox.style.display = "none";
    mobileHint.style.display = "none";

    hasAnswered = false;

    fakeButton.disabled = false;
    realButton.disabled = false;

    nextButton.style.display = "none";
}

function handleAnswer(userAnswer) {
    if (hasAnswered) return;

    hasAnswered = true;

    const currentItem = quizItems[currentIndex];
    const isCorrect = userAnswer === currentItem.answer;
    const correctLabel = getAnswerLabel(currentItem.answer);

    clearResultStyles();
    applyResultStyles(isCorrect);

    if (isCorrect) {
        feedback.textContent = `Korrekt. Billedet er ${correctLabel}.`;
        score++;
    } else {
        feedback.textContent = `Forkert. Billedet er ${correctLabel}.`;
    }

    descriptionResult.textContent = feedback.textContent;
    imageDescription.textContent = currentItem.description;

    descriptionBox.style.display = "block";

    fakeButton.disabled = true;
    realButton.disabled = true;

    nextButton.style.display = "block";
    nextButton.textContent = currentIndex === quizItems.length - 1 ? "Se resultat" : "Næste";

    if (isMobileView()) {
        mobileHint.style.display = "block";

        setTimeout(() => {
            descriptionBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 150);
    }
}

function goToNextStep() {
    if (!hasAnswered) return;

    currentIndex++;

    if (currentIndex < quizItems.length) {
        loadQuestion();

        if (isMobileView()) {
            setTimeout(() => {
                quizArea.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    clearResultStyles();

    quizStatus.textContent = `Færdig – ${score} ud af ${quizItems.length} rigtige`;

    quizImage.removeAttribute("src");
    quizImage.alt = "Quiz afsluttet";

    feedback.textContent = "Quizzen er slut.";

    descriptionResult.textContent = `Du fik ${score} ud af ${quizItems.length} rigtige.`;
    imageDescription.textContent = "Genindlæs siden for at prøve igen.";

    descriptionBox.style.display = "block";

    fakeButton.style.display = "none";
    realButton.style.display = "none";
    nextButton.style.display = "none";
    mobileHint.style.display = "none";

    if (isMobileView()) {
        setTimeout(() => {
            quizArea.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }
}

function scrollBackToImage() {
    quizArea.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

fakeButton.addEventListener("click", () => handleAnswer("fake"));
realButton.addEventListener("click", () => handleAnswer("real"));
nextButton.addEventListener("click", goToNextStep);
backToImageButton.addEventListener("click", scrollBackToImage);

loadQuestion();