const chatService = require('../services/chatService');

async function fetchHistory(req, res) {
  try {
    const history = await chatService.getHistory(req.user._id);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    await chatService.createUserMessage(req.user._id, message);
    const replyText = await chatService.getAssistantReply(message);
    const reply = await chatService.createAssistantMessage(
      req.user._id,
      replyText
    );

    res.status(201).json({ reply });
  } catch (error) {
    // Log full error server-side for debugging and return the message to client
    console.error('[chatController] sendMessage error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

module.exports = {
  fetchHistory,
  sendMessage,
};

