document.addEventListener("DOMContentLoaded", function () {
  const analyzeButton = document.getElementById("analyze-button");
  const resultText = document.getElementById("result-text");
  const textInput = document.getElementById("text-input");

  analyzeButton.addEventListener("click", function () {
    const text = textInput.value;

    const data = {
      text: text,
    };
    console.log(data);

    fetch("http://127.0.0.1:8080/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        switch (result.predicted_emotion) {
          case "neutral":
            resultText.style.color = "gray";
            resultText.textContent = "Neutral 😐";
            document.body.style.backgroundColor = "gray";
            break;
          case "joy":
            resultText.style.color = "green";
            resultText.textContent = "Joy 😄";
            document.body.style.backgroundColor = "green";

            break;
          case "sadness":
            resultText.style.color = "blue";
            resultText.textContent = "Sadness 😢";
            document.body.style.backgroundColor = "rgb(28, 60, 149)";

            break;
          case "fear":
            resultText.style.color = "rgb(33, 33, 33)";
            resultText.textContent = "Fear 😨";
            document.body.style.backgroundColor = "rgb(33, 33, 33)";
            break;
          case "surprise":
            resultText.style.color = "rgb(205, 205, 0)";
            resultText.textContent = "Surprise 😲";
            document.body.style.backgroundColor = "rgb(205, 205, 0)";
            break;
          case "anger":
            resultText.style.color = "red";
            resultText.textContent = "Anger 😡";
            document.body.style.background = "darkred";
            // document.body.style.background = "linear-gradient(to top, red, darkred)";

            break;
          case "shame":
            resultText.style.color = "pink";
            resultText.textContent = "Shame 😳";
            document.body.style.backgroundColor = "pink";
            break;
          case "disgust":
            resultText.style.color = "brown";
            resultText.textContent = "Disgust 🤢";
            document.body.style.backgroundColor = "brown";
            break;
          default:
            resultText.style.color = "black"; 
        }

        // resultText.textContent = `${result.predicted_emotion}`;
      })
      .catch((error) => {
        console.error("Error:", error);
        resultText.textContent = "Error occurred.";
      });
  });
});
