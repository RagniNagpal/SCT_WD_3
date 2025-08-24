const handleSubmit = async () => {
  try {
    const userId = localStorage.getItem("userId"); // login ke baad store kiya hoga
    const response = await fetch("http://localhost:5000/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, score })
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Error submitting quiz:", err);
  }
};
