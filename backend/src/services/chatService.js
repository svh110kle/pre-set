const ChatMessage = require('../models/ChatMessage');

/**
 * Mimics a call to an AI model by echoing the last user message with
 * a friendly acknowledgement. The placeholder API key is referenced
 * so teams know where to integrate their provider of choice.
 */
async function getAssistantReply(prompt) {
  const key = process.env.AI_API_KEY || '{{AI_API_KEY}}';

  // If a real API key is present, call Google's Generative Language API.
  if (key && key !== '{{AI_API_KEY}}') {
    const preferred = process.env.AI_MODEL ? [process.env.AI_MODEL] : [];
    const candidates = preferred.concat([
      'models/gemini-1.0',
      'models/gemini-1.0-preview',
      'models/text-bison-001',
      'models/text-bison',
    ]);

    const fetchFn = global.fetch;
    if (typeof fetchFn !== 'function') {
      throw new Error('Global fetch is not available. Use Node 18+ or install node-fetch.');
    }

    let lastErr = null;
    const apiVersions = ['v1', 'v1beta2'];
    for (const model of candidates) {
      console.log(`[chatService] trying model ${model}`);
      for (const ver of apiVersions) {
        const endpoint = `https://generativelanguage.googleapis.com/${ver}/${model}:generateText?key=${key}`;
        console.log(`[chatService] calling generative endpoint ${endpoint}`);

        try {
        const body = {
          prompt: { text: prompt },
          temperature: Number(process.env.AI_TEMPERATURE || 0.2),
          candidateCount: 1,
          maxOutputTokens: Number(process.env.AI_MAX_OUTPUT_TOKENS || 512),
        };

        const res = await fetchFn(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error(`[chatService] Generative API error for ${model}: ${res.status} ${errText}`);
          if (res.status === 404) {
            lastErr = new Error(`Generative API 404 for model ${model}`);
            continue; // try next candidate
          }
          throw new Error(`Generative API error: ${res.status} ${errText}`);
        }

        const json = await res.json();

        // Robust extraction: try several possible shapes returned by different API versions
        function extractText(obj) {
          if (!obj) return null;
          const cand = obj.candidates?.[0];
          if (cand) {
            if (typeof cand.output === 'string') return cand.output;
            if (typeof cand.content === 'string') return cand.content;
            if (Array.isArray(cand.content)) {
              return cand.content.map((c) => c.text || c.outputText || String(c)).join(' ');
            }
          }

          if (typeof obj.output === 'string') return obj.output;
          if (typeof obj.text === 'string') return obj.text;

          if (Array.isArray(obj.output)) {
            const parts = [];
            for (const out of obj.output) {
              if (typeof out === 'string') parts.push(out);
              if (Array.isArray(out.content)) {
                for (const c of out.content) {
                  if (c.text) parts.push(c.text);
                  else if (c.outputText) parts.push(c.outputText);
                  else parts.push(String(c));
                }
              }
            }
            if (parts.length) return parts.join(' ');
          }

          if (obj.results?.length) {
            const r = obj.results[0];
            if (r.output) return extractText(r.output);
          }

          return null;
        }

        const candidateText = extractText(json);
        if (candidateText) return String(candidateText).trim();

        return `🤖 [AI Ready] Sorry — got an unexpected response from the provider.`;
        } catch (err) {
          // record and try next endpoint/version
          lastErr = err;
          continue;
        }
      }
      // tried all versions for this model, move to next model
    }

    // All candidates failed
    throw new Error(`Assistant provider error: ${(lastErr && lastErr.message) || 'unknown error'}`);
  }

  // Fallback (mock) reply when no key is configured
  const response =
    `🤖 [${key ? 'AI Ready' : 'Missing Key'}] ` +
    `Thanks for sharing: "${prompt}". We'll plug in the real AI provider here.`;
  await new Promise((resolve) => setTimeout(resolve, 600));
  return response;
}

async function createUserMessage(userId, content) {
  return ChatMessage.create({
    user: userId,
    role: 'user',
    content,
  });
}

async function createAssistantMessage(userId, content) {
  return ChatMessage.create({
    user: userId,
    role: 'assistant',
    content,
  });
}

async function getHistory(userId) {
  return ChatMessage.find({ user: userId })
    .sort({ createdAt: 1 })
    .lean();
}

module.exports = {
  getAssistantReply,
  createUserMessage,
  createAssistantMessage,
  getHistory,
};

