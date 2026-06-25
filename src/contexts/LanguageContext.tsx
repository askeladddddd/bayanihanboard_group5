import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

type Language = 'en' | 'tl';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const resources = {
  en: {
    translation: {
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
      'filter.all': 'All Needs',
      'filter.moving': 'Moving House',
      'filter.medical': 'Medical Emergency',
      'filter.fundraiser': 'Fundraiser / Wake',
      'filter.other': 'Other',
      'sort.recent': 'Most Recent',
      'sort.urgent': 'Urgent',
      'community.needs': 'Community Needs',
      'post.help.title': 'Post a Help Request',
      'post.help.desc': 'Describe the community what support do you need right now.',
      'feeds.header.title': 'Community Help Board',
      'feeds.header.subtitle': 'See what the community is up to and lend a hand.',
    }
  },
  tl: {
    translation: {
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
      'filter.all': 'Lahat ng Kailangan',
      'filter.moving': 'Paglipat Bahay',
      'filter.medical': 'Medikal na Emergency',
      'filter.fundraiser': 'Pangangalap-pondo',
      'filter.other': 'Iba pa',
      'sort.recent': 'Pinakabago',
      'sort.urgent': 'Kailangang-kailangan',
      'community.needs': 'Pangangailangan ng Komunidad',
      'post.help.title': 'Mag-post ng Kailangang Tulong',
      'post.help.desc': 'Ilarawan sa komunidad kung anong tulong ang kailangan mo ngayon.',
      'feeds.header.title': 'Bayanihan Board ng Komunidad',
      'feeds.header.subtitle': 'Tingnan kung ano ang kailangan ng komunidad at mag-abot ng tulong.',

      // Mock Data Translations
      "Bayanihan Move: Mang Juan's House": "Bayanihan Lipat: Bahay ni Mang Juan",
      "Brgy. Maligaya, Quezon City": "Brgy. Maligaya, Lungsod ng Quezon",
      "Lifters for the bahay kubo, a small truck, and a midday meal.": "Mga magbubuhat ng bahay kubo, maliit na trak, at pananghalian.",
      "Medicines for Lola Rosa": "Mga Gamot para kay Lola Rosa",
      "Looking for anyone who can pitch in for hypertension meds this month.": "Naghahanap ng maaaring mag-ambag para sa gamot sa altapresyon ngayong buwan.",
      "Barangay Basketball Court Paint Job": "Pagpapintura ng Barangay Basketball Court",
      "We need painters and donations for paint supplies for the upcoming liga.": "Kailangan namin ng mga pintor at donasyon para sa pintura sa parating na liga.",
      "River Cleanup Drive": "Bayanihan sa Paglilinis ng Ilog",
      "Volunteers needed to help clean up the riverbank after the recent storm. The water levels have receded but left behind a massive amount of plastic waste, debris, and fallen branches. We need all the help we can get to restore the riverbank to its former glory. Please bring your own gloves, boots, and water bottles. We will provide garbage bags and some light snacks for everyone. Let's work together to make our community clean and safe again! Every single pair of hands makes a huge difference.": "Kailangan ng mga boluntaryo upang linisin ang ilog pagkatapos ng bagyo. Magdala ng sariling guwantes at bota. Magtutulungan tayo para sa kalikasan!",
      "Help Move Aling Nena's Sari-Sari Store": "Tulong sa Paglipat ng Sari-Sari Store ni Aling Nena",
      "Need strong hands to help move inventory to a safer location before the typhoon.": "Kailangan ng mga tutulong upang ilipat ang mga paninda sa ligtas na lugar bago bumagyo.",
      "Blood Donors Needed - Type O+": "Kailangan ng Blood Donors - Type O+",
      "Urgent: Need 3 donors for my uncle's surgery on Friday.": "Apura: Kailangan ng 3 donor para sa operasyon ng tito ko sa Biyernes.",
      "School Supplies for Street Children": "Mga Gamit Eskuwela para sa mga Batang Lansangan",
      "Collecting notebooks, pencils, and bags for 50 kids.": "Nangongolekta ng mga notebook, lapis, at bag para sa 50 bata.",
      "Free Math Tutoring for High Schoolers": "Libreng Math Tutoring para sa High School",
      "Looking for volunteer tutors for a weekend study session.": "Naghahanap ng boluntaryong tutor para sa pag-aaral sa weekend.",
      "Relocating Community Garden": "Paglipat ng Community Garden",
      "Need volunteers to dig, transport pots, and set up the new garden space.": "Kailangan ng mga boluntaryo na maghuhukay, maglilipat ng mga paso, at mag-aayos ng bagong hardin.",
      "Wheelchair Donation Request": "Hiling na Donasyon na Wheelchair",
      "Looking for a second-hand wheelchair for an elderly neighbor who had a stroke.": "Naghahanap ng segunda-manong wheelchair para sa matandang kapitbahay na na-stroke.",
      "Community Pantry Restock": "Pag-restock ng Community Pantry",
      "Our pantry is running low. Any canned goods, rice, or veggies are welcome!": "Paubos na ang laman ng ating pantry. Tumatanggap kami ng de-lata, bigas, o gulay!",
      "Stray Dog Rescue Operations": "Pagsagip sa mga Asong Gala",
      "Need a vehicle and fosters for 4 puppies found near the highway.": "Kailangan ng sasakyan at mag-aalaga para sa 4 na tuta na natagpuan sa highway.",
      "Transporting Donations to Evacuation Center": "Paglipat ng Donasyon sa Evacuation Center",
      "We have 20 boxes of clothes but no transport. Need a pickup truck.": "Mayroon kaming 20 kahon ng damit ngunit walang sasakyan. Kailangan ng pickup truck.",
      "Sponsor a Child's Dental Checkup": "Mag-sponsor ng Dental Checkup ng Bata",
      "Dentists willing to give free checkups or donors for toothbrushes.": "Mga dentista na handang magbigay ng libreng checkup o donor ng mga sipilyo.",
      "Repairing the Chapel Roof": "Pagkukumpuni ng Bubong ng Kapilya",
      "Needs: The old roof is leaking. We need funds for GI sheets and volunteers for repair.": "Kailangan: Tumutulo ang lumang bubong. Kailangan namin ng pondo para sa yero at mga boluntaryo para sa pagkukumpuni.",

      // Comments Translations
      "I can help with the heavy lifting.": "Kaya kong tumulong sa pabuhat.",
      "Lunch for the crew": "Pananghalian para sa grupo",
      "₱500 via GCash.": "₱500 sa pamamagitan ng GCash.",
      "2 buckets of paint.": "2 timba ng pintura.",
      "Labor for painting": "Trabaho para sa pagpipintura",
      "Snacks": "Meryenda",
      "Garbage bags and gloves.": "Sako para sa basura at guwantes.",
      "Cleanup crew": "Kasama sa paglilinis",
      "Bottled water": "Botelyang tubig",
      "Heavy duty boots": "Matibay na bota",
      "Snacks for the crew": "Meryenda para sa grupo",
      "First aid kit": "First aid kit",
      "Trash pickers": "Panungkit ng basura",
      "Pickup truck for waste": "Pickup truck para sa basura",
      "Extra garbage bags": "Sobra na sako para sa basura",
      "Type O+ Donor.": "Type O+ Donor.",
      "10 Notebooks": "10 Kwaderno",
      "Pencils and Erasers": "Lapis at Pambura",
      "Algebra Tutor": "Guro sa Algebra",
      "Transport van": "Van na pampasahero",
      "Labor": "Trabaho",
      "1 Sack of Rice": "1 Kaban ng Bigas",
      "Canned Goods": "Mga de-lata",
      "Fresh Vegetables": "Sariwang Gulay",
      "Eggs": "Itlog",
      "Bread": "Tinapay",
      "Temporary Foster": "Pansamantalang tagapag-alaga",
      "Pro-bono extractions": "Libreng bunot ng ngipin",
      "GI Sheets": "Yero",
      "Carpentry labor": "Trabaho sa pagkakarpintero",
      "moving": "paglipat",
      "medical": "medikal",
      "fundraiser": "pangangalap-pondo",
      "other": "iba pa",
      "Cleanup": "Paglilinis",
      "Tutoring": "Pagtuturo",
      "Rescue": "Pagsagip"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tl', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('tl'); // state sync for context consumers

  useEffect(() => {
    // If external event changes i18n language, sync state
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng as Language);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'tl' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: (key: string) => t(key) }}>
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

