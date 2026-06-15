import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "https://oracle-flew.onrender.com";

const SUGGESTIONS = [
  { icon: "🌍", text: "What is the latest news about Ethiopia today?" },
  { icon: "🤖", text: "What are the biggest AI breakthroughs this week?" },
  { icon: "💱", text: "What is the current USD to ETB exchange rate?" },
  { icon: "🧮", text: "If I invest $500 monthly at 10% annual return for 20 years, how much will I have?" },
];

const CAPS = [
  { icon: "🔍", label: "Web Search" },
  { icon: "🌐", label: "Read Pages" },
  { icon: "🧮", label: "Calculate" },
  { icon: "📅", label: "Real-time Data" },
  { icon: "🧠", label: "Multi-step Reasoning" },
];

function StepEmoji({ tool }) {
  const map = {
    search_web: "🔍",
    read_webpage: "🌐",
    get_current_date: "📅",
    calculate: "🧮",
  };
  return <span>{map[tool] || "🔧"}</span>;
}

function StepTitle({ step }) {
  if (step.tool === "search_web") return `Searched: "${step.params?.query}"`;
  if (step.tool === "read_webpage") return `Read: ${step.params?.url?.slice(0, 50)}...`;
  if (step.tool === "get_current_date") return "Checked current date & time";
  if (step.tool === "calculate") return `Calculated: ${step.params?.expression}`;
  return step.tool;
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const ask = async (question) => {
    const q = question || input;
    if (!q.trim() || loading) return;

    setMessages((prev) => [...prev, { type: "user", content: q }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/ask`, { question: q });
      setMessages((prev) => [...prev, { type: "oracle", ...res.data }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "oracle",
          answer: "Something went wrong. Please make sure the backend is running.",
          steps: [],
          total_steps: 0,
        },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  const showHero = messages.length === 0;

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-brand" onClick={() => setMessages([])}>
          <div className="header-logo">🔮</div>
          <div>
            <div className="header-name">Oracle</div>
            <div className="header-tagline">AI Agent — powered by real-time web search</div>
          </div>
        </div>
        <div className="header-right">
          {messages.length > 0 && (
            <button className="clear-btn" onClick={() => setMessages([])}>
              ✕ New Chat
            </button>
          )}
          <div className="status-pill">
            <div className="status-dot" />
            Live
          </div>
        </div>
      </div>

      <div className="main">
        {/* Hero */}
        {showHero && (
          <div className="hero">
            <div className="hero-glow" />
            <div className="hero-badge">✦ Powered by Llama 3.3 70B + Real-time Web</div>
            <div className="hero-icon">🔮</div>
            <div className="hero-title">
              Ask <span>Oracle</span><br />anything
            </div>
            <div className="hero-subtitle">
              Oracle searches the web, reads pages, and reasons step by step
              to give you intelligent answers — not just links.
            </div>

            <div className="capabilities">
              {CAPS.map((c, i) => (
                <div key={i} className="cap-chip">
                  {c.icon} {c.label}
                </div>
              ))}
            </div>

            <div className="suggestions-label">Try asking</div>
            <div className="suggestions">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className="suggestion" onClick={() => ask(s.text)}>
                  <div className="suggestion-icon">{s.icon}</div>
                  <div className="suggestion-text">{s.text}</div>
                  <div className="suggestion-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conversation */}
        {!showHero && (
          <div className="conversation">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.type === "user" ? (
                  <div className="user-message">
                    <div className="user-bubble">{msg.content}</div>
                  </div>
                ) : (
                  <div className="oracle-response">
                    <div className="oracle-header">
                      <div className="oracle-avatar">🔮</div>
                      <div className="oracle-label">Oracle</div>
                    </div>

                    {/* Steps */}
                    {msg.steps?.filter(s => s.type === "tool").length > 0 && (
                      <div className="steps">
                        {msg.steps.filter(s => s.type === "tool").map((step, si) => (
                          <div key={si} className="step">
                            <div className="step-emoji">
                              <StepEmoji tool={step.tool} />
                            </div>
                            <div className="step-body">
                              <div className="step-title">
                                <StepTitle step={step} />
                              </div>
                              <div className="step-snippet">{step.result}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer */}
                    <div className="answer-wrap">
                      <div className="answer-bubble">{msg.answer}</div>
                      <div className="answer-meta">
                        ⚡ {msg.total_steps} steps
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="oracle-response">
                <div className="oracle-header">
                  <div className="oracle-avatar">🔮</div>
                  <div className="oracle-label">Oracle</div>
                </div>
                <div className="thinking">
                  <div className="dots">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                  </div>
                  Searching and reasoning...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="input-section">
          <div className="input-wrap">
            <textarea
              ref={inputRef}
              className="input-box"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Oracle anything..."
              rows={1}
              disabled={loading}
            />
            <button
              className="send-btn"
              onClick={() => ask()}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
          <div className="input-hint">Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  );
}
