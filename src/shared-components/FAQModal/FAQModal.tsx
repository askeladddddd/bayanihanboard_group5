import { X, HelpCircle, HeartHandshake, FileText, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQModalProps {
  onClose: () => void;
}

export function FAQModal({ onClose }: FAQModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: <HeartHandshake className="h-5 w-5 text-[color:var(--bamboo-deep)]" />,
      question: "What is Bayanihan Board?",
      answer: "Bayanihan Board is a community-driven platform designed to connect people who need help with neighbors who are willing to lend a hand. It embodies the Filipino spirit of 'Bayanihan'—lifting each other up as a community."
    },
    {
      icon: <FileText className="h-5 w-5 text-[color:var(--terracotta)]" />,
      question: "How do I ask for help?",
      answer: "Simply click the 'Post Request' button in the sidebar or the main feed. Fill out what kind of help you need, how many volunteers are required, and where it's happening. Your request will instantly appear on the public feed."
    },
    {
      icon: <Settings className="h-5 w-5 text-[color:var(--nipa-deep)]" />,
      question: "How do I volunteer to help?",
      answer: "Browse the feed and find a request you can help with. Click 'Help' or 'Lend a Hand' on the card, enter your name, and describe what you can contribute (e.g., labor, supplies, or donations)."
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-stone-500" />,
      question: "What do the different filters mean?",
      answer: "You can filter requests by categories like 'Moving', 'Medical', or 'Fundraiser'. You can also sort by 'Urgent' to see requests that are very close to reaching their target volunteer goals and need a final push."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Theme Gradient */}
        <div className="relative px-6 py-6 border-b border-stone-200/50 bg-gradient-to-r from-[color:var(--bamboo)]/10 to-[color:var(--bamboo-deep)]/5 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[color:var(--bamboo)]/10 rounded-full blur-3xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white shadow-sm text-[color:var(--bamboo-deep)]">
                <HelpCircle className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display text-stone-800 tracking-tight">Help Center & FAQ</h2>
                <p className="text-sm text-stone-500 font-medium mt-0.5">Everything you need to know about Bayanihan</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2.5 bg-white text-stone-400 hover:text-stone-700 shadow-sm hover:shadow rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content / Accordion */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#fdfbf7]">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-[color:var(--bamboo)]/40 shadow-md' : 'border-stone-200/60 shadow-sm hover:border-stone-300'
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-stone-50' : 'bg-transparent'}`}>
                        {faq.icon}
                      </div>
                      <h3 className={`text-[15px] font-bold transition-colors ${isOpen ? 'text-[color:var(--bamboo-deep)]' : 'text-stone-800'}`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div 
                    className={`px-5 transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="pl-13 pr-4">
                      <p className="text-sm text-stone-600 leading-relaxed border-l-2 border-stone-100 pl-4 py-1">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-stone-200/50 bg-white flex justify-end gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] relative z-10">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, var(--color-bamboo) 0%, var(--color-bamboo-deep) 100%)' }}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
