import './ChatBubble.css';

type ChatBubbleProps = {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
};

const ChatBubble = ({ role, content, timestamp }: ChatBubbleProps) => {
  return (
    <div className={`chat-bubble ${role}`}>
      <p>{content}</p>
      {timestamp && <small>{timestamp}</small>}
    </div>
  );
};

export default ChatBubble;

