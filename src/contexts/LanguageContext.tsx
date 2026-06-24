import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'tl';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'Bayanihan Board',
    'app.subtitle': 'Community help, lifted together',
    'nav.wall': 'The Wall',
    'nav.post': 'Post a Request',
    'nav.plan': 'Plan Big',
    'nav.search': 'Search...',
    'hero.badge': '☑️ Bayanihan, In Your Pocket',
    'hero.title.1': 'When a neighbor needs help, ',
    'hero.title.2': 'the whole barangay',
    'hero.title.3': ' lifts the house.',
    'hero.desc': 'No more scattered group chats. Post what you need, and watch the bahay kubo rise — one bamboo pole per neighbor who says "I can help."',
    'hero.btn.post': 'Post a request',
    'hero.btn.wall': 'See the wall',
    'alert.badge': 'Paalala — Upcoming Commitments',
    'alert.event1': "Lolo Ben's Wake — Food Brigade",
    'alert.event1.date': '(Tue, Jun 23)',
    'alert.event2': "Aling Rosa's Dialysis Ride",
    'alert.event2.date': '(Wed, Jun 24)',
    'cta.badge': 'Organizing Something Big?',
    'cta.title': 'Schedule a planning call with a Bayanihan ate or kuya.',
    'cta.desc': "Multi-day fundraisers, large moves, or barangay-wide drives. We'll help you break it into pole-sized commitments.",
    'cta.btn': 'Schedule a planning call →',
    'wall.title': 'The Help Wall',
    'wall.open': 'open',
    'wall.lifted': 'lifted',
    'detail.when': 'When:',
    'detail.join': 'Join the Bayanihan',
    'detail.name': 'Your Name',
    'detail.name.ph': 'e.g., Aling Nena',
    'detail.contribution': 'Your Contribution',
    'detail.contribution.ph': 'e.g., truck, lunch, 4hrs of labor',
    'detail.btn.full': 'Puno na 🙏',
    'detail.btn.help': 'I can help!',
    'detail.commitments': 'Mga nag-commit na',
    'detail.empty.1': 'Wala pang nag-volunteer.',
    'detail.empty.2': 'Be the first pole under this house.',
    'detail.pole': 'pole',
    'detail.close': 'Close',
    'create.title': 'Post a Help Request',
    'create.desc': 'Fill in the details below to ask your barangay for help.',
    'create.form.title': 'Title',
    'create.form.title.ph': "e.g. Bayanihan Move: Mang Juan's House",
    'create.form.category': 'Category',
    'create.form.location': 'Location',
    'create.form.location.ph': 'e.g. Brgy. Maligaya',
    'create.form.desc': 'Description',
    'create.form.desc.ph': 'What do you need?',
    'create.form.date': 'Date & Time',
    'create.form.volunteers': 'Volunteers Needed',
    'create.btn.cancel': 'Cancel',
    'create.btn.post': 'Post Request',
    'progress.title': 'The House Lifts',
    'progress.neighbors': 'neighbors',
    'progress.complete': 'Tapos na! 🎉',
    'progress.footer': 'Every pole is a neighbor. The more who commit, the higher the bahay kubo rises.',
  },
  tl: {
    'app.title': 'Bayanihan Board',
    'app.subtitle': 'Tulong ng komunidad, sabay-sabay iangat',
    'nav.wall': 'Ang Pader',
    'nav.post': 'Mag-post ng Kailangan',
    'nav.plan': 'Malaking Plano',
    'nav.search': 'Maghanap...',
    'hero.badge': '☑️ Bayanihan, Nasa Iyong Bulsa',
    'hero.title.1': 'Kapag may kapitbahay na nangangailangan, ',
    'hero.title.2': 'buong barangay',
    'hero.title.3': ' ang nag-aangat ng bahay.',
    'hero.desc': 'Wala nang magulong group chats. I-post ang kailangan, at panoorin ang pag-angat ng bahay kubo — isang kawayan kada kapitbahay na nagsasabing "Tutulong ako."',
    'hero.btn.post': 'Mag-post ng kailangan',
    'hero.btn.wall': 'Tingnan ang pader',
    'alert.badge': 'Paalala — Mga Nakatakdang Pagtulong',
    'alert.event1': "Lamay ni Lolo Ben — Food Brigade",
    'alert.event1.date': '(Mar, Hun 23)',
    'alert.event2': "Hatid sa Dialysis ni Aling Rosa",
    'alert.event2.date': '(Miy, Hun 24)',
    'cta.badge': 'May Malaking Ino-organisa?',
    'cta.title': 'Mag-schedule ng tawag kasama ang isang Bayanihan ate o kuya.',
    'cta.desc': "Ilang araw na fundraisers, malalaking lipatan, o proyektong pambaranggay. Tutulungan ka naming hatiin ito sa mga kayang gawin.",
    'cta.btn': 'Mag-schedule ng tawag →',
    'wall.title': 'Pader ng Bayanihan',
    'wall.open': 'bukas',
    'wall.lifted': 'naangat',
    'detail.when': 'Kailan:',
    'detail.join': 'Sumali sa Bayanihan',
    'detail.name': 'Pangalan Mo',
    'detail.name.ph': 'hal., Aling Nena',
    'detail.contribution': 'Iyong Maitutulong',
    'detail.contribution.ph': 'hal., truck, pananghalian, 4 oras na tulong',
    'detail.btn.full': 'Puno na 🙏',
    'detail.btn.help': 'Tutulong ako!',
    'detail.commitments': 'Mga nag-commit na',
    'detail.empty.1': 'Wala pang nag-volunteer.',
    'detail.empty.2': 'Maging unang kawayan sa bahay na ito.',
    'detail.pole': 'kawayan',
    'detail.close': 'Isara',
    'create.title': 'Mag-post ng Kailangan',
    'create.desc': 'Ilagay ang mga detalye sa ibaba upang humingi ng tulong sa barangay.',
    'create.form.title': 'Titulo',
    'create.form.title.ph': "hal. Bayanihan Lipat: Bahay ni Mang Juan",
    'create.form.category': 'Kategorya',
    'create.form.location': 'Lokasyon',
    'create.form.location.ph': 'hal. Brgy. Maligaya',
    'create.form.desc': 'Deskripsyon',
    'create.form.desc.ph': 'Ano ang kailangan mo?',
    'create.form.date': 'Petsa at Oras',
    'create.form.volunteers': 'Kailangang Volunteers',
    'create.btn.cancel': 'Kanselahin',
    'create.btn.post': 'I-post',
    'progress.title': 'Ang Bahay Ay Umaangat',
    'progress.neighbors': 'kapitbahay',
    'progress.complete': 'Tapos na! 🎉',
    'progress.footer': 'Bawat kawayan ay kapitbahay. Habang dumarami ang tumutulong, mas umaangat ang bahay kubo.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'tl' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
