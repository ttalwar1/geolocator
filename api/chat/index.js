import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function (context, req) {
  const { question, city } = req.body || {};
  if (!question) {
    return { status: 400, body: "Missing question" };
  }

  const prompt = `provide relevant information for the city the user is located: ${
    city || "an unknown city"
  }. Context of the area the user is interested in within this geolocation: ${question}`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reply: completion.choices[0].message.content }),
  };
}
