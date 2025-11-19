require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '..', '.env'),
});

const chatService = require('../services/chatService');

(async () => {
  try {
    console.log('[testAssistant] AI_API_KEY=', process.env.AI_API_KEY ? '[set]' : '[missing]');

    // Quick provider probe: try a few known Gemini model names and endpoints
    const models = [
      'models/gemini-2.5-flash',
      'models/gemini-2.5-pro',
      'models/gemini-2.0-flash',
    ];
    const methods = ['generateText', 'generateContent'];

    const fetchFn = global.fetch || require('node-fetch');

    for (const model of models) {
      for (const method of methods) {
        const url = `https://generativelanguage.googleapis.com/v1/${model}:${method}?key=${process.env.AI_API_KEY}`;
        try {
          console.log('[testAssistant] probing', url);
          if (method === 'generateText') {
            const body = { prompt: { text: 'Hello probe' } };
            const res = await fetchFn(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            const text = await res.text();
            console.log(`[testAssistant] ${model} ${method} -> ${res.status} ${res.statusText}\n${text}`);
          } else {
            const bodies = [
              { contents: 'Hello probe' },
              { contents: ['Hello probe'] },
              { contents: [{ text: 'Hello probe' }] },
              { contents: [{ type: 'text', text: 'Hello probe' }] },
              { prompt: { text: 'Hello probe' } },
            ];
            for (const body of bodies) {
              try {
                const res = await fetchFn(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body),
                });
                const text = await res.text();
                console.log(`[testAssistant] ${model} ${method} body=${JSON.stringify(body)} -> ${res.status} ${res.statusText}\n${text}`);
                if (res.ok) break;
              } catch (err) {
                console.error('[testAssistant] probe error for', model, method, err && err.message);
              }
            }
          }
        } catch (err) {
          console.error('[testAssistant] probe error for', model, method, err && err.message);
        }
      }
    }

    // Finally, try the high-level helper
    try {
      const reply = await chatService.getAssistantReply('Hello from test script');
      console.log('[testAssistant] reply:', reply);
    } catch (err) {
      console.error('[testAssistant] helper error:', err && err.message);
    }
  } catch (err) {
    console.error('[testAssistant] error:', err);
    process.exit(1);
  }
})();
