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
    var image = document.getElementById("image");
    let color = "";
    let result = "";

    // Send a POST request to the server
    fetch("http://127.0.0.1:8080/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        switch (res.predicted_emotion) {
          case "neutral":
            color = "gray";
            result = "Neutral 😐";
            break;
          case "joy":
            color = "green";
            result = "Joy 😄";
            break;
          case "sadness":
            result = "Sadness 😢";
            color = "rgb(28, 60, 149)";
            break;
          case "fear":
            result = "Fear 😨";
            color = "rgb(33, 33, 33)";
            break;
          case "surprise":
            result = "Surprise 😲";
            color = "rgb(205, 205, 0)";
            break;
          case "anger":
            result = "Anger 😡";
            color = "darkred";
            break;
          case "shame":
            result = "Shame 😳";
            color = "pink";
            break;
          case "disgust":
            result = "Disgust 🤢";
            color = "brown";
            break;
          default:
            resultText.style.color = "black"; // Default color for other sentiments
        }
        image.src = `./images/${res.predicted_emotion}.jpg`;
        resultText.textContent = result;
        document.body.style.backgroundColor = color;
      })
      .catch((error) => {
        console.error("Error:", error);
        resultText.textContent = "Error occurred.";
      });
  });
});
