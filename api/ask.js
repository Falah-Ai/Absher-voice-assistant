// api/ask.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // set in Vercel env
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or "gpt-4.1" depending on your plan
        messages: [
          { role: "system", content: "You are Absher Voice Assistant, helping with Saudi government services." },
          { role: "user", content: query }
        ],
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No response received.";

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
}
