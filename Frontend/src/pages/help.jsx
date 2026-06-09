import { useState } from "react";
import Sidebar from "../components/Sidebar";

const faqs = [
  {
    question: "How does Majesty detect my language automatically?",
    answer: "Majesty uses AI-powered speech recognition to analyze the phonetics and patterns of your spoken words. It automatically identifies the language within the first few words without requiring any manual selection.",
  },
  {
    question: "Which languages does Majesty support?",
    answer: "Majesty currently supports 16 languages including English, French, Spanish, German, Chinese, Arabic, Swahili, Portuguese, Hindi, Russian, Japanese, Korean, Italian, Turkish, Dutch and Polish. More languages are being added regularly.",
  },
  {
    question: "How do I connect my Bluetooth earphones?",
    answer: "Connect your Bluetooth earphones to your device normally through your device's Bluetooth settings. Once connected, go to Settings → Audio Settings and enable Bluetooth Earphone Support. Majesty will automatically route translation audio to your earphones.",
  },
  {
    question: "Can I use Majesty offline?",
    answer: "Currently Majesty requires an internet connection for real-time AI translation. We are working on an offline mode for basic language pairs that will be available in a future update.",
  },
  {
    question: "How do I save a translation?",
    answer: "After a translation appears on the dashboard, click the Save button next to Play Translation. Your saved translations can be accessed anytime from the Saved page in the sidebar.",
  },
  {
    question: "How do I delete my translation history?",
    answer: "Go to Settings → Account and click Clear All History. This will permanently delete all your translation history. You can also delete individual translations from the History page using the delete icon.",
  },
  {
    question: "Is my voice data stored?",
    answer: "Majesty only processes your voice in real time for translation purposes. We do not store raw audio recordings. Only the translated text is saved if you choose to save it.",
  },
  {
    question: "How do I change my target language?",
    answer: "You can change your target language directly from the Dashboard using the Target Language dropdown at the top right. You can also set a default language in Settings → Language Preferences.",
  },
];

const guides = [
  {
    title: "Getting Started",
    icon: "🚀",
    description: "Learn how to set up your account and make your first translation.",
    steps: ["Create your account", "Choose your target language", "Click Start Speaking", "View your translation instantly"],
  },
  {
    title: "Using the Microphone",
    icon: "🎤",
    description: "How to use the mic button for best translation results.",
    steps: ["Click the blue mic button", "Speak clearly and naturally", "Wait for language detection", "Translation appears automatically"],
  },
  {
    title: "Managing History",
    icon: "📋",
    description: "How to view, save and manage your translation history.",
    steps: ["Go to History page", "Search or filter translations", "Star important translations", "Delete ones you no longer need"],
  },
  {
    title: "Bluetooth Setup",
    icon: "🎧",
    description: "Set up Bluetooth earphones for private translation audio.",
    steps: ["Pair earphones via device settings", "Go to Settings → Audio", "Enable Bluetooth Support", "Translation plays in your earphones"],
  },
];

export default function HelpPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [contact, setContact] = useState({ subject: "", message: "" });

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    setMessageSent(true);
    setContact({ subject: "", message: "" });
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
    
            {sidebarOpen && (
              <div onClick={() => setSidebarOpen(false)} style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.6)", zIndex: 20,
              }} />
            )}
    
            <div style={{
              position: "fixed", top: 0, left: 0,
              height: "100vh", zIndex: 30,
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s ease",
            }}>
              <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

      <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

        {/* Header */}
        
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 28px", borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)", position: "sticky", top: 0, zIndex: 10,
        }}>
          <button onClick={() => setSidebarOpen(true)} style={{
            background: "none", border: "none",
            color: "var(--text-secondary)", cursor: "pointer", padding: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        </button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
            Help & Support
          </h1>
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Hero banner */}
          <div style={{
            background: "linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%)",
            borderRadius: "var(--radius)", padding: "32px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "20px",
          }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "700", color: "white", marginBottom: "8px" }}>
                How can we help you? 👋
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                Search our knowledge base or browse the guides below.
              </p>
            </div>

            {/* Search */}
            <div style={{ position: "relative", width: "300px" }}>
              <span style={{
                position: "absolute", left: "14px", top: "50%",
                transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search help articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "11px 14px 11px 40px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "var(--radius-sm)", color: "white",
                  fontSize: "14px", outline: "none",
                }}
              />
            </div>
          </div>

          {/* Quick guides */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
                Quick Guides
              </h2>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
              {guides.map((guide, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius)", padding: "20px",
                    transition: "border-color 0.2s, transform 0.2s", cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "10px" }}>{guide.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "6px" }}>
                    {guide.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "14px", lineHeight: "1.5" }}>
                    {guide.description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {guide.steps.map((step, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{
                          width: "18px", height: "18px", borderRadius: "50%",
                          background: "var(--accent)", color: "white",
                          fontSize: "10px", fontWeight: "700",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          {j + 1}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
                Frequently Asked Questions
              </h2>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)", border: `1px solid ${openFaq === i ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius)", overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", padding: "16px 20px",
                      background: "none", border: "none",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      color: "var(--text-primary)", cursor: "pointer", gap: "16px",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>{faq.question}</span>
                    <span style={{
                      color: "var(--accent)", flexShrink: 0,
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{
                      padding: "0 20px 16px",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "14px",
                    }}>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No results found for "{search}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                Contact Support
              </h3>
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "500px" }}>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Can't find what you're looking for? Send us a message and we'll get back to you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", color: "var(--text-muted)" }}>Subject</label>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  value={contact.subject}
                  onChange={e => setContact({ ...contact, subject: e.target.value })}
                  style={{
                    padding: "11px 14px",
                    background: "var(--bg-secondary)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                    fontSize: "14px", outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", color: "var(--text-muted)" }}>Message</label>
                <textarea
                  placeholder="Describe your issue in detail..."
                  value={contact.message}
                  onChange={e => setContact({ ...contact, message: e.target.value })}
                  rows={4}
                  style={{
                    padding: "11px 14px",
                    background: "var(--bg-secondary)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                    fontSize: "14px", outline: "none", resize: "vertical",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>

              <button
                onClick={handleSend}
                style={{
                  alignSelf: "flex-start", padding: "11px 28px",
                  background: messageSent ? "#22c55e" : "var(--accent)",
                  border: "none", borderRadius: "var(--radius-sm)",
                  color: "white", fontSize: "14px", fontWeight: "600",
                  cursor: "pointer", transition: "background 0.2s",
                  boxShadow: "var(--shadow-accent)",
                }}
              >
                {messageSent ? "✓ Message Sent!" : "Send Message"}
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}