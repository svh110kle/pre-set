import { type FormEvent, useEffect, useRef, useState } from 'react';
import ChatBubble from '../components/ChatBubble';
import { chatService, type ChatMessage } from '../services/chatService';
import './ChatbotPage.css';

const ChatbotPage = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { history } = await chatService.fetchHistory();
        setHistory(history);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setError(null);
    try {
      setHistory((prev) => [
        ...prev,
        {
          _id: crypto.randomUUID(),
          role: 'user',
          content: message,
          createdAt: new Date().toISOString(),
        },
      ]);
      const { reply } = await chatService.sendMessage(message);
      setHistory((prev) => [
        ...prev,
        {
          _id: reply._id,
          role: reply.role,
          content: reply.content,
          createdAt: reply.createdAt,
        },
      ]);
      setMessage('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="chat-page glass-panel">
      <div className="chat-info">
        <div>
          <p className="eyebrow">AI Lab</p>
          <h3>Talk to your prototype assistant.</h3>
          <p>
            We automatically inject the API key placeholder {'{{AI_API_KEY}}'}. Just swap it in the
            backend to hit your provider.
          </p>
        </div>
      </div>
      <div className="chat-window" ref={containerRef}>
        {history.map((msg) => (
          <ChatBubble key={msg._id} role={msg.role} content={msg.content} />
        ))}
      </div>
      {error && <p style={{ color: '#ff9b9b' }}>{error}</p>}
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prompt the AI…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="cta-btn" disabled={sending}>
          {sending ? 'Thinking…' : 'Send'}
        </button>
      </form>
    </section>
  );
};

export default ChatbotPage;

