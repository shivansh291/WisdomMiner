async function generateWisdom() {
    const prompt = document.getElementById("userInput").value.trim();
    const outputBox = document.getElementById("output");
    const loader = document.getElementById("loader");

    if (!prompt) {
        outputBox.classList.remove("hidden");
        outputBox.innerHTML = "⚠️ Please enter something before generating wisdom.";
        return;
    }

    outputBox.classList.add("hidden");
    loader.classList.remove("hidden");

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        const text =
            data.candidates?.[0]?.output_text ||
            "⚠️ No wisdom generated. Try again.";

        loader.classList.add("hidden");
        outputBox.classList.remove("hidden");
        outputBox.innerHTML = text;
    } 
    catch (error) {
        loader.classList.add("hidden");
        outputBox.classList.remove("hidden");
        outputBox.innerHTML =
            "❌ Error connecting to serverless function.<br>Please check your deployment.";
    }
}