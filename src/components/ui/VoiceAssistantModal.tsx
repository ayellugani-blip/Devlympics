import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  Loader2
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import type { AssistantMessage } from '../../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContextOpportunityTitle?: string;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  initialContextOpportunityTitle
}) => {
  const { speakText, stopSpeaking, isSpeaking, selectedLanguage } = useAccessibility();

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [activeVoicePlayingId, setActiveVoicePlayingId] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: initialContextOpportunityTitle
        ? `Hello! I am SANGAM Assistant. I can help clarify requirements, deadlines, or eligibility details for "${initialContextOpportunityTitle}". You can ask me a question by typing or using your microphone.`
        : `Hello! I am SANGAM Assistant, designed to help you understand scholarships, internships, hackathons, and eligibility criteria in simple, jargon-free words. How can I assist you today?`,
      timestamp: 'Just now',
      suggestedPrompts: [
        'How does SANGAM check my eligibility?',
        'What documents are typically needed for government scholarships?',
        'What should I do if an opportunity deadline is unclear?'
      ]
    }
  ]);

  // Setup Web Speech API speech recognition if available
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'te' ? 'te-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        handleSendQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      stopSpeaking();
    };
  }, [selectedLanguage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  if (!isOpen) return null;

  const toggleListening = () => {
    if (!speechRecognitionSupported) {
      alert('Speech Recognition is not natively supported in this browser. Please type your question in the text box below.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      try {
        stopSpeaking();
        recognitionRef.current?.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleSendQuery = (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend) return;

    // Add user message
    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Generate intelligent, respectful response
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let responseText = '';
      let suggestedPrompts: string[] = [];

      if (lower.includes('eligibility') || lower.includes('check') || lower.includes('evaluate')) {
        responseText = `SANGAM evaluates eligibility with complete transparency using exactly three statuses:\n\n1. Satisfied (Green): Clear evidence confirms you meet the requirement.\n2. Not Satisfied (Amber/Red): Your current profile falls outside the criteria (e.g. income or study year).\n3. Unknown (Slate): You haven't provided enough information yet, so we don't guess.\n\nWe also provide exact source quotes from the official notice for each rule.`;
        suggestedPrompts = ['Take me to Eligibility Checker', 'What documents do I need for verification?'];
      } else if (lower.includes('document') || lower.includes('certificate') || lower.includes('proof')) {
        responseText = `Most academic and government opportunities in India require:\n\n• Latest Academic Marksheet (Class 10, 12, or semester grade card)\n• Family Income Certificate (issued by Revenue Authority / Tehsildar)\n• College Bonafide Student Certificate with AISHE code\n• Valid Government Photo ID (Aadhaar Card linked to active bank account)\n\nYou can view the exact checklist on any opportunity's detail page.`;
        suggestedPrompts = ['Where do I get an income certificate?', 'Explain Class 12 board percentile'];
      } else if (lower.includes('scholarship') || lower.includes('merit') || lower.includes('money') || lower.includes('grant')) {
        responseText = `Scholarships in SANGAM range from central government merit-cum-means awards (like the National Merit Scholarship offering ₹12,000–₹20,000/year) to corporate foundations (like Reliance Foundation offering up to ₹2,00,000 and Amazon Future Engineer offering ₹50,000/year plus laptops for women in tech).\n\nBrowse the Explore Opportunities page to filter by your education level!`;
        suggestedPrompts = ['Show me engineering scholarships', 'Are there scholarships for Arts and Commerce?'];
      } else if (lower.includes('income') || lower.includes('lakh') || lower.includes('3.5')) {
        responseText = `An annual family income of ₹3.5 Lakhs qualifies you for most major government and corporate merit-cum-means scholarships, including the Central Sector Scheme (limit ₹4.5 Lakhs) and Reliance Foundation (limit ₹15 Lakhs).\n\nEnsure your Income Certificate is issued in the current financial year by a Tehsildar or Sub-Divisional Magistrate.`;
        suggestedPrompts = ['Check my eligibility with ₹3.5 Lakhs income', 'How to apply on NSP portal?'];
      } else if (lower.includes('voice') || lower.includes('speak') || lower.includes('read')) {
        responseText = `You can tap the speaker button next to any of my answers to listen to it read aloud. SANGAM is committed to ensuring opportunities are accessible to everyone, including visual or reading assistance.`;
      } else {
        responseText = `Thank you for asking. SANGAM simplifies complex application notices into clear, human steps. You can explore open listings in the 'Explore' tab, check your fit in the 'Eligibility Checker', or upload any circular in 'Upload & Simplify' to extract deadlines and requirements automatically.`;
        suggestedPrompts = ['Show me open hackathons', 'Explain the upload feature'];
      }

      const botMsg: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        suggestedPrompts
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsProcessing(false);

      // Automatically speak the answer if enabled or user asked by voice
      if (isListening) {
        speakText(responseText);
        setActiveVoicePlayingId(botMsg.id);
      }
    }, 700);
  };

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (activeVoicePlayingId === msgId && isSpeaking) {
      stopSpeaking();
      setActiveVoicePlayingId(null);
    } else {
      speakText(text);
      setActiveVoicePlayingId(msgId);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#20334A]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-title"
    >
      <div className="bg-white border border-[#E2EBF5] rounded-3xl shadow-2xl shadow-[#20334A]/10 w-full max-w-2xl h-[85vh] max-h-[680px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2EBF5] flex items-center justify-between bg-gradient-to-r from-[#EAF5FF] via-white to-[#F0FAF7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2878D4] to-[#62B6F5] text-white flex items-center justify-center shadow-xs shadow-[#2878D4]/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="assistant-title" className="text-base font-bold text-[#20334A]">
                  SANGAM Assistant
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EAF5FF] text-[#2878D4] border border-[#CBE0F4] px-2 py-0.5 rounded-full">
                  Voice & Plain Language
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Helping you understand opportunities, requirements, and next steps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#64748B] hover:text-[#20334A] rounded-lg hover:bg-[#EAF5FF] transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAFCFF]">
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            const isPlayingThis = activeVoicePlayingId === msg.id && isSpeaking;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] text-[#2878D4] border border-[#CBE0F4] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#2878D4]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white border border-[#E2EBF5] text-[#20334A] shadow-2xs'
                      : 'bg-[#2878D4] text-white font-medium rounded-br-xs shadow-xs shadow-[#2878D4]/20'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Bot message audio controls & suggested prompts */}
                  {isBot && (
                    <div className="mt-3 pt-2.5 border-t border-[#E2EBF5] flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleSpeakMessage(msg.id, msg.text)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          isPlayingThis
                            ? 'bg-[#FFF6F3] text-[#C2410C] border border-[#FFB7A5]'
                            : 'bg-[#EAF5FF] hover:bg-[#D8EDFF] text-[#2878D4] border border-[#CBE0F4]'
                        }`}
                        title={isPlayingThis ? 'Stop reading' : 'Read answer aloud'}
                      >
                        {isPlayingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-[#C2410C]" />
                            <span>Stop Speaking</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#2878D4]" />
                            <span>Read Aloud</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] text-[#64748B]">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Suggested follow-up prompts */}
                  {isBot && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendQuery(prompt)}
                          className="text-[11px] font-medium bg-[#EAF5FF] hover:bg-[#D8EDFF] text-[#2878D4] px-2.5 py-1 rounded-full border border-[#CBE0F4] transition-colors text-left cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-lg bg-[#2878D4] text-white flex items-center justify-center shrink-0 mb-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] text-[#2878D4] border border-[#CBE0F4] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin text-[#2878D4]" />
              </div>
              <div className="bg-white border border-[#E2EBF5] rounded-2xl px-4 py-3 text-xs text-[#64748B] shadow-2xs flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2878D4]" />
                <span>Simplifying guidance...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice Listening Active Banner */}
        {isListening && (
          <div className="bg-[#2878D4] text-white px-4 py-2.5 flex items-center justify-between text-xs animate-pulse">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#72D6D0]" />
              <span className="font-semibold">Listening to your voice... Speak your question clearly</span>
            </div>
            <button
              type="button"
              onClick={toggleListening}
              className="text-[11px] underline font-bold cursor-pointer hover:text-[#EAF5FF]"
            >
              Stop Listening
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E2EBF5]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md animate-bounce'
                  : 'bg-[#FAFCFF] text-[#20334A] border-[#E2EBF5] hover:bg-[#EAF5FF]'
              }`}
              title={isListening ? 'Stop listening' : 'Speak your question'}
              aria-label={isListening ? 'Stop voice recording' : 'Start voice recording'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Query Input */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question (e.g., 'What are the income requirements?')..."
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E2EBF5] bg-[#FAFCFF] focus:bg-white focus:outline-hidden focus:border-[#2878D4] focus:ring-1 focus:ring-[#2878D4] transition-all text-[#20334A] placeholder:text-[#64748B]"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuery.trim() || isProcessing}
              className="p-2.5 bg-[#2878D4] text-white rounded-xl hover:bg-[#1F63B4] disabled:opacity-40 disabled:hover:bg-[#2878D4] transition-colors cursor-pointer shadow-xs shadow-[#2878D4]/20"
              aria-label="Send Question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[11px] text-[#64748B]">
            <span>AI-assisted guidance. Verify all policies with official portals.</span>
            {!speechRecognitionSupported && (
              <span className="text-[#C2410C] font-medium">Mic input requires Chrome/Edge</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
