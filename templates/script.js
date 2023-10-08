document.addEventListener("DOMContentLoaded", function () {
  const analyzeButton = document.getElementById("analyze-button");
  const resultText = document.getElementById("result-text");
  const textInput = document.getElementById("text-input");

  analyzeButton.addEventListener("click", function () {
    const text = textInput.value;

    // Create a JSON object with the text data
    const data = {
      text: text,
    };
    console.log(data);
    var image = document.getElementById("image");

    // Send a POST request to the server
    fetch("http://127.0.0.1:8080/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Update the resultText element with the response from the server
        switch (result.predicted_emotion) {
          case "neutral":
            resultText.style.color = "gray";
            resultText.textContent = "Neutral 😐";
            document.body.style.backgroundColor = "gray";
            image.src = "./images/neutral.jpg";
            break;
          case "joy":
            resultText.style.color = "green";
            resultText.textContent = "Joy 😄";
            document.body.style.backgroundColor = "green";
            image.src = "./images/joy.jpg";
            break;
          case "sadness":
            resultText.style.color = "blue";
            resultText.textContent = "Sadness 😢";
            document.body.style.backgroundColor = "rgb(28, 60, 149)";
            image.src = "./images/sadness.jpg";
            break;
          case "fear":
            resultText.style.color = "rgb(33, 33, 33)";
            resultText.textContent = "Fear 😨";
            document.body.style.backgroundColor = "rgb(33, 33, 33)";
            image.src = "./images/fear.jpg";
            break;
          case "surprise":
            resultText.style.color = "rgb(205, 205, 0)";
            resultText.textContent = "Surprise 😲";
            document.body.style.backgroundColor = "rgb(205, 205, 0)";
            image.src = "./images/surprise.jpg";
            break;
          case "anger":
            resultText.style.color = "red";
            resultText.textContent = "Anger 😡";
            document.body.style.backgroundColor = "darkred";
            image.src = "./images/anger.jpg";
            break;
          case "shame":
            resultText.style.color = "pink";
            resultText.textContent = "Shame 😳";
            document.body.style.backgroundColor = "pink";
            image.src = "./images/shame.jpg";
            break;
          case "disgust":
            resultText.style.color = "brown";
            resultText.textContent = "Disgust 🤢";
            document.body.style.backgroundColor = "brown";
            image.src = "./images/disgust.jpg";

            break;
          default:
            resultText.style.color = "black"; // Default color for other sentiments
        }

        // resultText.textContent = `${result.predicted_emotion}`;
      })
      .catch((error) => {
        console.error("Error:", error);
        resultText.textContent = "Error occurred.";
      });
  });
});
