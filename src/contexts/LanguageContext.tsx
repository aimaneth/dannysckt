'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ms' | 'zh';

export type TranslationKeys =
  | 'nav.home' | 'nav.products' | 'nav.events' | 'nav.about' | 'nav.business' | 'nav.contact'
  | 'hero.welcome' | 'hero.title' | 'hero.subtitle' | 'hero.description' | 'hero.viewProducts' | 'hero.bookEvent'
  | 'features.title' | 'features.subtitle'
  | 'features.chef.title' | 'features.chef.description'
  | 'features.quality.title' | 'features.quality.description'
  | 'features.love.title' | 'features.love.description'
  | 'gallery.title' | 'gallery.subtitle' | 'gallery.description'
  | 'events.title' | 'events.subtitle' | 'events.description'
  | 'events.private' | 'events.corporate' | 'events.cooking' | 'events.tasting' | 'events.learnMore'
  | 'cta.title' | 'cta.subtitle' | 'cta.description' | 'cta.orderNow'
  // Products page translations
  | 'products.title' | 'products.description' | 'products.searchPlaceholder' | 'products.searchButton'
  | 'products.showing' | 'products.sort.latest' | 'products.sort.priceLow' | 'products.sort.priceHigh' | 'products.sort.name'
  // Events page translations
  | 'events.hero.title' | 'events.hero.description'
  | 'events.stats.chefs' | 'events.stats.chefsCount'
  | 'events.stats.eventsCatered' | 'events.stats.eventsCateredCount'
  | 'events.stats.menuItems' | 'events.stats.menuItemsCount'
  | 'events.stats.support' | 'events.stats.supportDesc'
  | 'events.corporate.title' | 'events.corporate.description'
  | 'events.corporate.items' | 'events.corporate.minPax'
  | 'events.private.title' | 'events.private.description'
  | 'events.private.items' | 'events.private.minPax'
  | 'events.festivals.title' | 'events.festivals.description'
  | 'events.festivals.items'
  // About page translations
  | 'about.hero.title' | 'about.hero.subtitle'
  | 'about.story.title' | 'about.story.description'
  | 'about.philosophy.title' | 'about.philosophy.description'
  | 'about.philosophy.expertChefs.title' | 'about.philosophy.expertChefs.description'
  | 'about.philosophy.quality.title' | 'about.philosophy.quality.description'
  | 'about.philosophy.traditional.title' | 'about.philosophy.traditional.description'
  | 'about.visit.title'
  | 'about.visit.hours.title' | 'about.visit.hours.weekdays' | 'about.visit.hours.weekends'
  | 'about.visit.location.title' | 'about.visit.location.address1' | 'about.visit.location.address2'
  | 'about.visit.contact.title' | 'about.visit.contact.phone' | 'about.visit.contact.email'
  // Business Opportunities page translations
  | 'business.hero.title' | 'business.hero.subtitle'
  | 'business.hero.consultation' | 'business.hero.download'
  | 'business.why.title'
  | 'business.why.subtitle'
  | 'business.why.model.title' | 'business.why.model.description'
  | 'business.why.training.title' | 'business.why.training.description'
  | 'business.why.ingredients.title' | 'business.why.ingredients.description'
  | 'business.why.marketing.title' | 'business.why.marketing.description'
  | 'business.why.territory.title' | 'business.why.territory.description'
  | 'business.why.support.title' | 'business.why.support.description'
  | 'business.packages.title' | 'business.packages.description'
  | 'business.packages.recommended'
  | 'business.contact.title' | 'business.contact.description'
  | 'business.contact.phone' | 'business.contact.email' | 'business.contact.location'
  | 'business.packages.starter.name' | 'business.packages.starter.description'
  | 'business.packages.starter.features'
  | 'business.packages.premium.name' | 'business.packages.premium.description'
  | 'business.packages.premium.features'
  | 'business.packages.enterprise.name' | 'business.packages.enterprise.description'
  | 'business.packages.enterprise.features'
  // Footer translations
  | 'footer.description' | 'footer.quickLinks' | 'footer.products' | 'footer.events' | 'footer.about'
  | 'footer.business' | 'footer.startBusiness' | 'footer.investmentPackages' | 'footer.businessDev'
  | 'footer.legal' | 'footer.privacy' | 'footer.terms' | 'footer.faq'
  | 'footer.newsletter' | 'footer.newsletterDesc' | 'footer.emailPlaceholder' | 'footer.subscribe'
  | 'footer.rights'
  | 'events.booking.title' | 'events.booking.eventType.label' | 'events.booking.eventType.placeholder'
  | 'events.booking.eventType.corporate' | 'events.booking.eventType.private' | 'events.booking.eventType.festival' | 'events.booking.eventType.other'
  | 'events.booking.name' | 'events.booking.organization' | 'events.booking.email' | 'events.booking.phone'
  | 'events.booking.date' | 'events.booking.guests' | 'events.booking.location' | 'events.booking.locationPlaceholder'
  | 'events.booking.requirements' | 'events.booking.requirementsPlaceholder'
  | 'events.booking.terms' | 'events.booking.submit'
  | 'events.whyChoose.title'
  | 'events.whyChoose.live.title' | 'events.whyChoose.live.description'
  | 'events.whyChoose.service.title' | 'events.whyChoose.service.description'
  | 'events.whyChoose.packages.title' | 'events.whyChoose.packages.description'
  | 'events.whyChoose.quality.title' | 'events.whyChoose.quality.description'
  // Legal Pages
  | 'privacy.title' | 'privacy.lastUpdated'
  | 'privacy.intro.title' | 'privacy.intro.description'
  | 'privacy.collection.title' | 'privacy.collection.description'
  | 'privacy.collection.items'
  | 'privacy.use.title' | 'privacy.use.description'
  | 'privacy.use.items'
  | 'privacy.sharing.title' | 'privacy.sharing.description'
  | 'privacy.sharing.items'
  | 'privacy.security.title' | 'privacy.security.description'
  | 'privacy.cookies.title' | 'privacy.cookies.description'
  | 'privacy.rights.title' | 'privacy.rights.description'
  | 'privacy.rights.items'
  | 'privacy.contact.title' | 'privacy.contact.description'
  // Terms of Service
  | 'terms.title' | 'terms.lastUpdated'
  | 'terms.intro.title' | 'terms.intro.description'
  | 'terms.acceptance.title' | 'terms.acceptance.description'
  | 'terms.services.title' | 'terms.services.description'
  | 'terms.services.items'
  | 'terms.account.title' | 'terms.account.description'
  | 'terms.account.items'
  | 'terms.ip.title' | 'terms.ip.description'
  | 'terms.liability.title' | 'terms.liability.description'
  | 'terms.termination.title' | 'terms.termination.description'
  | 'terms.governing.title' | 'terms.governing.description'
  | 'terms.contact.title' | 'terms.contact.description'
  // FAQ
  | 'faq.title' | 'faq.description'
  | 'faq.general.title'
  | 'faq.general.q1' | 'faq.general.a1'
  | 'faq.general.q2' | 'faq.general.a2'
  | 'faq.general.q3' | 'faq.general.a3'
  | 'faq.business.title'
  | 'faq.business.q1' | 'faq.business.a1'
  | 'faq.business.q2' | 'faq.business.a2'
  | 'faq.business.q3' | 'faq.business.a3'
  | 'faq.events.title'
  | 'faq.events.q1' | 'faq.events.a1'
  | 'faq.events.q2' | 'faq.events.a2'
  | 'faq.events.q3' | 'faq.events.a3'
  | 'faq.contact.title' | 'faq.contact.description'
  | 'faq.contact.email'
  // Contact Page
  | 'contact.hero.title' | 'contact.hero.subtitle'
  | 'contact.info.phone.title' | 'contact.info.phone.value'
  | 'contact.info.email.title' | 'contact.info.email.value'
  | 'contact.info.address.title' | 'contact.info.address.value'
  | 'contact.hours.title' | 'contact.hours.weekdays' | 'contact.hours.weekends'
  | 'contact.form.title' | 'contact.form.description'
  | 'contact.form.name' | 'contact.form.email' | 'contact.form.subject' | 'contact.form.message'
  | 'contact.form.submit'
  | 'faq.questions.title' | 'faq.questions.description' | 'faq.questions.contact'
  | 'common.submitting';

type TranslationValue = string | string[];

type Translations = {
  [K in Language]: {
    [T in TranslationKeys]: TranslationValue;
  };
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => TranslationValue;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ms' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: TranslationKeys): TranslationValue => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Translations
export const translations: Record<Language, Record<TranslationKeys, TranslationValue>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.events': 'Events',
    'nav.about': 'About',
    'nav.business': 'Business Opportunities',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.welcome': 'Welcome to Danny\'s',
    'hero.title': 'Experience Authentic',
    'hero.subtitle': 'Char Kuey Teow',
    'hero.description': 'Savor the authentic taste of Malaysia\'s favorite street food, crafted with passion and tradition.',
    'hero.viewProducts': 'View Products',
    'hero.bookEvent': 'Book an Event',

    // Features Section
    'features.title': 'The Danny\'s CKT Experience',
    'features.subtitle': 'Why Choose Us',
    'features.chef.title': 'Master Chef Expertise',
    'features.chef.description': 'Crafted by experienced chefs who have mastered the art of authentic CKT',
    'features.quality.title': 'Premium Quality',
    'features.quality.description': 'Only the finest ingredients, carefully selected for perfect taste',
    'features.love.title': 'Made with Love',
    'features.love.description': 'Every dish is prepared with passion and attention to detail',

    // Gallery Section
    'gallery.title': 'Our Instagram Feed',
    'gallery.subtitle': 'Follow Us',
    'gallery.description': 'Stay updated with our latest dishes and events by following us on Instagram.',

    // Events Section
    'events.title': 'Host Unforgettable Moments',
    'events.subtitle': 'Special Events',
    'events.description': 'From intimate gatherings to corporate events, let us bring the authentic taste of Char Kuey Teow to your special occasions. Our experienced team will ensure an unforgettable culinary experience.',
    'events.private': 'Private parties and celebrations',
    'events.corporate': 'Corporate events and meetings',
    'events.cooking': 'Cooking demonstrations',
    'events.tasting': 'Food tasting sessions',
    'events.learnMore': 'Learn More About Events',

    // CTA Section
    'cta.title': 'Ready to Experience Our',
    'cta.subtitle': 'Char Kuey Teow?',
    'cta.description': 'Join us for an authentic Malaysian street food experience that will tantalize your taste buds and leave you craving for more.',
    'cta.orderNow': 'Order Now',

    // Products Page
    'products.title': 'Premium CKT Products',
    'products.description': 'Discover our range of authentic Char Kway Teow ingredients and sauces. Perfect for restaurants and food businesses.',
    'products.searchPlaceholder': 'Search products...',
    'products.searchButton': 'Search',
    'products.showing': 'Showing',
    'products.sort.latest': 'Latest',
    'products.sort.priceLow': 'Price: Low to High',
    'products.sort.priceHigh': 'Price: High to Low',
    'products.sort.name': 'Name',

    // Events Page
    'events.hero.title': 'Event Catering Services',
    'events.hero.description': 'Bring the authentic taste of Malaysian street food to your next event',
    
    // Stats
    'events.stats.chefs': 'Expert Chefs',
    'events.stats.chefsCount': '15+',
    'events.stats.eventsCatered': 'Events Catered',
    'events.stats.eventsCateredCount': '1000+',
    'events.stats.menuItems': 'Menu Items',
    'events.stats.menuItemsCount': '50+',
    'events.stats.support': '24/7',
    'events.stats.supportDesc': 'Support',

    // Corporate Events
    'events.corporate.title': 'Corporate Events',
    'events.corporate.description': 'Impress your clients and team with our live cooking stations. Perfect for:',
    'events.corporate.items': ['Company celebrations', 'Product launches', 'Team building events', 'Client appreciation events', 'Conference catering'],
    'events.corporate.minPax': 'Minimum 50 pax • Live cooking station included • Customizable menu options',

    // Private Events
    'events.private.title': 'Private Celebrations',
    'events.private.description': 'Make your special day memorable with our signature dishes. Ideal for:',
    'events.private.items': ['Birthday parties', 'Wedding receptions', 'Family reunions', 'House warming parties', 'Graduation celebrations'],
    'events.private.minPax': 'Minimum 30 pax • Flexible serving times • Customizable setup options',

    // Festivals
    'events.festivals.title': 'Food Festivals & Markets',
    'events.festivals.description': 'Add authentic Malaysian flavors to your food event. Available for:',
    'events.festivals.items': ['Food festivals', 'Night markets', 'Cultural events', 'Community gatherings', 'Pop-up events'],

    // Footer translations
    'footer.description': 'Authentic Char Kuey Teow crafted with passion and tradition, bringing the true taste of Malaysian street food to your plate.',
    'footer.quickLinks': 'Quick Links',
    'footer.products': 'Our Products',
    'footer.events': 'Events',
    'footer.about': 'About Us',
    'footer.business': 'Business Opportunities',
    'footer.startBusiness': 'Start a Business',
    'footer.investmentPackages': 'Investment Packages',
    'footer.businessDev': 'Business Development',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.faq': 'FAQ',
    'footer.newsletter': 'Stay Updated',
    'footer.newsletterDesc': 'Subscribe to our newsletter for exclusive offers and updates.',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',

    // Booking Form
    'events.booking.title': 'Book Us For Your Event',
    'events.booking.eventType.label': 'Type of Event',
    'events.booking.eventType.placeholder': 'Select event type',
    'events.booking.eventType.corporate': 'Corporate Event',
    'events.booking.eventType.private': 'Private Celebration',
    'events.booking.eventType.festival': 'Food Festival/Market',
    'events.booking.eventType.other': 'Other',
    'events.booking.name': 'Contact Name',
    'events.booking.organization': 'Organization/Company',
    'events.booking.email': 'Email Address',
    'events.booking.phone': 'Phone Number',
    'events.booking.date': 'Event Date',
    'events.booking.guests': 'Expected Number of Guests',
    'events.booking.location': 'Event Location',
    'events.booking.locationPlaceholder': 'Full address of the event',
    'events.booking.requirements': 'Special Requirements',
    'events.booking.requirementsPlaceholder': 'Tell us about any specific requirements, dietary restrictions, or special requests',
    'events.booking.terms': 'I understand that this is an inquiry and not a confirmed booking',
    'events.booking.submit': 'Submit Inquiry',

    // Why Choose Us
    'events.whyChoose.title': 'Why Choose Us?',
    'events.whyChoose.live.title': 'Live Cooking Experience',
    'events.whyChoose.live.description': 'Watch our chefs prepare fresh Char Kuey Teow right in front of your guests, creating an engaging and memorable experience.',
    'events.whyChoose.service.title': 'Professional Service',
    'events.whyChoose.service.description': 'Our experienced team ensures smooth setup, service, and cleanup, letting you focus on your event.',
    'events.whyChoose.packages.title': 'Customizable Packages',
    'events.whyChoose.packages.description': 'We work with you to create the perfect package that fits your event size, budget, and preferences.',
    'events.whyChoose.quality.title': 'Quality Guaranteed',
    'events.whyChoose.quality.description': 'Using only the freshest ingredients and authentic recipes to ensure every dish meets our high standards.',

    // About Page
    'about.hero.title': 'About Danny\'s CKT',
    'about.hero.subtitle': 'Where passion meets tradition in every plate we serve',
    'about.story.title': 'Our Story',
    'about.story.description': 'Founded by Danny, a passionate chef with over 15 years of experience in Malaysian cuisine, our restaurant has become a beloved destination for those seeking authentic Char Kuey Teow. What started as a small street food stall has grown into a full-service restaurant, but our commitment to quality and tradition remains unchanged.',
    'about.philosophy.title': 'Our Philosophy',
    'about.philosophy.description': 'At Danny\'s CKT, we believe that great food comes from great ingredients and time-honored techniques. Every plate of Char Kuey Teow is cooked to order, ensuring that you get the perfect wok hei flavor that makes this dish so special.',
    'about.philosophy.expertChefs.title': 'Expert Chefs',
    'about.philosophy.expertChefs.description': 'Our team of experienced chefs brings years of expertise in traditional Malaysian cooking techniques.',
    'about.philosophy.quality.title': 'Quality Ingredients',
    'about.philosophy.quality.description': 'We source only the freshest ingredients from local suppliers, ensuring that every dish meets our high standards.',
    'about.philosophy.traditional.title': 'Traditional Methods',
    'about.philosophy.traditional.description': 'Our chefs use traditional cooking methods and authentic recipes passed down through generations.',
    'about.visit.title': 'Visit Us',
    'about.visit.hours.title': 'Opening Hours',
    'about.visit.hours.weekdays': 'Monday - Friday: 11:00 AM - 10:00 PM',
    'about.visit.hours.weekends': 'Saturday - Sunday: 10:00 AM - 11:00 PM',
    'about.visit.location.title': 'Location',
    'about.visit.location.address1': '123 Food Street,',
    'about.visit.location.address2': 'Kuala Lumpur, Malaysia',
    'about.visit.contact.title': 'Contact',
    'about.visit.contact.phone': '+60 12-345 6789',
    'about.visit.contact.email': 'info@dannysckt.com',

    // Business Opportunities Page
    'business.hero.title': 'Build Your CKT Empire',
    'business.hero.subtitle': 'Join Malaysia\'s growing Char Kway Teow revolution with our proven business model and comprehensive support system.',
    'business.hero.consultation': 'Schedule a Consultation',
    'business.hero.download': 'Download Info Pack',

    'business.why.title': 'Why Partner With Danny\'s CKT?',
    'business.why.subtitle': 'Start your journey with a proven business model, backed by comprehensive support and training',
    'business.why.model.title': 'Proven Business Model',
    'business.why.model.description': 'Our successful outlets across Malaysia demonstrate the strength of our business model.',
    'business.why.training.title': 'Comprehensive Training',
    'business.why.training.description': 'Learn every aspect of running a successful CKT business from our experienced team.',
    'business.why.ingredients.title': 'Premium Ingredients',
    'business.why.ingredients.description': 'Access to our premium quality ingredients and secret recipe sauces.',
    'business.why.marketing.title': 'Marketing Support',
    'business.why.marketing.description': 'Benefit from our established brand and marketing strategies.',
    'business.why.territory.title': 'Territory Rights',
    'business.why.territory.description': 'Secure exclusive rights to operate in your chosen territory.',
    'business.why.support.title': 'Ongoing Support',
    'business.why.support.description': 'Regular business reviews and continuous operational support.',

    'business.packages.title': 'Investment Packages',
    'business.packages.description': 'Choose from our carefully crafted packages designed to help you start and grow your CKT business successfully.',
    'business.packages.recommended': 'Recommended',

    'business.contact.title': 'Ready to Get Started?',
    'business.contact.description': 'Contact our business development team to discuss opportunities in your area.',
    'business.contact.phone': '+60 17-363-2350',
    'business.contact.email': 'business@dannysckt.com',
    'business.contact.location': 'Kuala Lumpur, Malaysia',

    // Distributor Packages
    'business.packages.starter.name': 'Starter Package',
    'business.packages.starter.description': 'Perfect for food court or small hawker stall entrepreneurs',
    'business.packages.starter.features': [
      'Complete stall setup guide',
      'Essential cooking equipment set',
      '3 days hands-on training',
      'Initial stock of premium ingredients',
      'Halal certification guidance',
      'Local marketing materials',
      '3 months support hotline',
      'Social media starter kit'
    ],

    'business.packages.premium.name': 'Premium Package',
    'business.packages.premium.description': 'Ideal for restaurant or multiple stall operations',
    'business.packages.premium.features': [
      'Full restaurant/stall setup with equipment',
      '7 days intensive training',
      '6 months stock of premium ingredients',
      'Halal certification assistance',
      'Digital marketing package',
      'Modern POS system',
      '12 months support',
      'Territory exclusivity',
      'Staff training program',
      'Business management app'
    ],

    'business.packages.enterprise.name': 'Enterprise Package',
    'business.packages.enterprise.description': 'For established F&B businesses looking to expand across Malaysia',
    'business.packages.enterprise.features': [
      'Multiple outlet setup capability',
      '14 days advanced training',
      '12 months stock of ingredients',
      'Custom branding & localization',
      'Full business management system',
      '24 months premium support',
      'Nationwide territory rights',
      'Revenue sharing benefits',
      'Central kitchen setup guide',
      'Franchise development support',
      'Marketing team support'
    ],

    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdated': 'Last Updated: March 15, 2024',
    'privacy.intro.title': 'Introduction',
    'privacy.intro.description': 'At Danny\'s CKT, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.',
    'privacy.collection.title': 'Information We Collect',
    'privacy.collection.description': 'We collect information that you provide directly to us, including:',
    'privacy.collection.items': [
      'Name and contact information',
      'Order and payment details',
      'Business inquiries and correspondence',
      'Event booking information',
      'Marketing preferences'
    ],
    'privacy.use.title': 'How We Use Your Information',
    'privacy.use.description': 'We use the collected information for:',
    'privacy.use.items': [
      'Processing your orders and payments',
      'Communicating about our services',
      'Improving our products and customer experience',
      'Marketing and promotional purposes (with consent)',
      'Legal compliance and business operations'
    ],
    'privacy.sharing.title': 'Information Sharing',
    'privacy.sharing.description': 'We may share your information with:',
    'privacy.sharing.items': [
      'Service providers and business partners',
      'Payment processors',
      'Legal authorities when required',
      'Business transferees in case of sale or merger'
    ],
    'privacy.security.title': 'Security Measures',
    'privacy.security.description': 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    'privacy.cookies.title': 'Cookies and Tracking',
    'privacy.cookies.description': 'We use cookies and similar tracking technologies to enhance your experience on our website and analyze usage patterns.',
    'privacy.rights.title': 'Your Rights',
    'privacy.rights.description': 'You have the right to:',
    'privacy.rights.items': [
      'Access your personal information',
      'Correct inaccurate data',
      'Request deletion of your data',
      'Opt-out of marketing communications',
      'Lodge a complaint with authorities'
    ],
    'privacy.contact.title': 'Contact Us',
    'privacy.contact.description': 'For any privacy-related questions or concerns, please contact us at privacy@dannysckt.com',

    // Terms of Service
    'terms.title': 'Terms of Service',
    'terms.lastUpdated': 'Last Updated: March 15, 2024',
    'terms.intro.title': 'Introduction',
    'terms.intro.description': 'These Terms of Service govern your use of Danny\'s CKT services, website, and mobile applications.',
    'terms.acceptance.title': 'Acceptance of Terms',
    'terms.acceptance.description': 'By accessing or using our services, you agree to be bound by these terms and conditions.',
    'terms.services.title': 'Services',
    'terms.services.description': 'Our services include:',
    'terms.services.items': [
      'Restaurant dining services',
      'Food delivery and catering',
      'Event hosting and management',
      'Business partnership opportunities',
      'Online ordering system'
    ],
    'terms.account.title': 'Account Responsibilities',
    'terms.account.description': 'When creating an account, you must:',
    'terms.account.items': [
      'Provide accurate information',
      'Maintain account security',
      'Not share account credentials',
      'Update information as needed',
      'Accept responsibility for account activity'
    ],
    'terms.ip.title': 'Intellectual Property',
    'terms.ip.description': 'All content, trademarks, and intellectual property on our platforms are owned by Danny\'s CKT and protected by law.',
    'terms.liability.title': 'Limitation of Liability',
    'terms.liability.description': 'Danny\'s CKT shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
    'terms.termination.title': 'Termination',
    'terms.termination.description': 'We reserve the right to terminate or suspend access to our services for violations of these terms.',
    'terms.governing.title': 'Governing Law',
    'terms.governing.description': 'These terms are governed by the laws of Malaysia.',
    'terms.contact.title': 'Contact Information',
    'terms.contact.description': 'For any questions about these terms, please contact us at legal@dannysckt.com',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Find answers to common questions about our services, business opportunities, and events.',
    'faq.general.title': 'General Questions',
    'faq.general.q1': 'What are your operating hours?',
    'faq.general.a1': 'We operate from 11:00 AM to 10:00 PM on weekdays and 10:00 AM to 11:00 PM on weekends.',
    'faq.general.q2': 'Do you offer delivery services?',
    'faq.general.a2': 'Yes, we offer delivery through our partner platforms within Kuala Lumpur and selected areas.',
    'faq.general.q3': 'Are your ingredients Halal certified?',
    'faq.general.a3': 'Yes, all our ingredients are Halal certified and we maintain strict compliance with Halal requirements.',
    'faq.business.title': 'Business Opportunities',
    'faq.business.q1': 'What is the minimum investment required?',
    'faq.business.a1': 'Our Starter Package begins at RM15,000, which includes essential equipment and training.',
    'faq.business.q2': 'Do you provide training for new partners?',
    'faq.business.a2': 'Yes, we provide comprehensive training ranging from 3 to 14 days depending on your package.',
    'faq.business.q3': 'What ongoing support do you offer?',
    'faq.business.a3': 'We provide continuous operational support, marketing assistance, and regular business reviews.',
    'faq.events.title': 'Events & Catering',
    'faq.events.q1': 'What is the minimum group size for events?',
    'faq.events.a1': 'We cater to events with a minimum of 30 pax for private events and 50 pax for corporate events.',
    'faq.events.q2': 'Do you provide equipment for events?',
    'faq.events.a2': 'Yes, we provide all necessary cooking equipment and serving stations for your event.',
    'faq.events.q3': 'Can you accommodate dietary restrictions?',
    'faq.events.a3': 'Yes, we can customize our menu to accommodate various dietary requirements with advance notice.',
    'faq.contact.title': 'Still Have Questions?',
    'faq.contact.description': 'Contact us directly and we\'ll get back to you as soon as possible.',
    'faq.contact.email': 'Contact Us',
    
    // Contact Page
    'contact.hero.title': 'Get in Touch',
    'contact.hero.subtitle': 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.info.phone.title': 'Phone',
    'contact.info.phone.value': '+60 12-345 6789',
    'contact.info.email.title': 'Email',
    'contact.info.email.value': 'hello@dannysckt.com',
    'contact.info.address.title': 'Address',
    'contact.info.address.value': '123 Jalan Sultan, 50000 Kuala Lumpur, Malaysia',
    'contact.hours.title': 'Business Hours',
    'contact.hours.weekdays': 'Monday - Friday: 11:00 AM - 10:00 PM',
    'contact.hours.weekends': 'Saturday - Sunday: 10:00 AM - 11:00 PM',
    'contact.form.title': 'Send us a Message',
    'contact.form.description': 'Fill out the form below and we\'ll get back to you shortly.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'faq.questions.title': 'Still Have Questions?',
    'faq.questions.description': 'We\'re here to help! Contact us for any additional inquiries.',
    'faq.questions.contact': 'Contact Us',
    'common.submitting': 'Submitting...'
  },
  ms: {
    // Navigation
    'nav.home': 'Utama',
    'nav.products': 'Produk',
    'nav.events': 'Acara',
    'nav.about': 'Tentang Kami',
    'nav.business': 'Peluang Perniagaan',
    'nav.contact': 'Hubungi Kami',

    // Hero Section
    'hero.welcome': 'Selamat Datang ke Danny\'s',
    'hero.title': 'Rasai Keunikan',
    'hero.subtitle': 'Char Kuey Teow',
    'hero.description': 'Nikmati rasa autentik makanan jalanan Malaysia yang paling digemari, dimasak dengan penuh semangat dan tradisi.',
    'hero.viewProducts': 'Lihat Produk',
    'hero.bookEvent': 'Tempah Acara',

    // Features Section
    'features.title': 'Pengalaman Danny\'s CKT',
    'features.subtitle': 'Mengapa Memilih Kami',
    'features.chef.title': 'Kepakaran Chef',
    'features.chef.description': 'Dimasak oleh chef berpengalaman yang mahir dalam seni CKT autentik',
    'features.quality.title': 'Kualiti Premium',
    'features.quality.description': 'Hanya bahan-bahan terbaik, dipilih dengan teliti untuk rasa yang sempurna',
    'features.love.title': 'Dimasak Dengan Kasih',
    'features.love.description': 'Setiap hidangan disediakan dengan penuh kasih sayang dan perhatian',

    // Gallery Section
    'gallery.title': 'Suapan Instagram Kami',
    'gallery.subtitle': 'Ikuti Kami',
    'gallery.description': 'Ikuti kami di Instagram untuk mengetahui hidangan dan acara terbaru kami.',

    // Events Section
    'events.title': 'Anjurkan Majlis Yang Tak Terlupakan',
    'events.subtitle': 'Acara Istimewa',
    'events.description': 'Dari majlis peribadi hingga acara korporat, biarkan kami membawa rasa autentik Char Kuey Teow ke majlis istimewa anda. Pasukan kami yang berpengalaman akan memastikan pengalaman kulinari yang tak terlupakan.',
    'events.private': 'Majlis dan sambutan peribadi',
    'events.corporate': 'Acara dan mesyuarat korporat',
    'events.cooking': 'Demonstrasi memasak',
    'events.tasting': 'Sesi mencuba makanan',
    'events.learnMore': 'Ketahui Lebih Lanjut',

    // CTA Section
    'cta.title': 'Bersedia untuk Merasai',
    'cta.subtitle': 'Char Kuey Teow Kami?',
    'cta.description': 'Sertai kami untuk pengalaman makanan jalanan Malaysia yang tulen yang akan menggiurkan deria rasa anda dan membuatkan anda ingin lagi.',
    'cta.orderNow': 'Pesan Sekarang',

    // Products Page
    'products.title': 'Produk CKT Premium',
    'products.description': 'Terokai rangkaian bahan-bahan dan sos Char Kuey Teow autentik kami. Sesuai untuk restoran dan perniagaan makanan.',
    'products.searchPlaceholder': 'Cari produk...',
    'products.searchButton': 'Cari',
    'products.showing': 'Menunjukkan',
    'products.sort.latest': 'Terkini',
    'products.sort.priceLow': 'Harga: Rendah ke Tinggi',
    'products.sort.priceHigh': 'Harga: Tinggi ke Rendah',
    'products.sort.name': 'Nama',

    // Events Page
    'events.hero.title': 'Perkhidmatan Katering',
    'events.hero.description': 'Bawa rasa autentik makanan jalanan Malaysia ke acara anda yang seterusnya',
    
    // Stats
    'events.stats.chefs': 'Chef Pakar',
    'events.stats.chefsCount': '15+',
    'events.stats.eventsCatered': 'Acara Dikendalikan',
    'events.stats.eventsCateredCount': '1000+',
    'events.stats.menuItems': 'Menu',
    'events.stats.menuItemsCount': '50+',
    'events.stats.support': '24/7',
    'events.stats.supportDesc': 'Sokongan',

    // Corporate Events
    'events.corporate.title': 'Acara Korporat',
    'events.corporate.description': 'Pukau pelanggan dan pasukan anda dengan stesen masakan langsung kami. Sesuai untuk:',
    'events.corporate.items': ['Sambutan syarikat', 'Pelancaran produk', 'Acara pembinaan pasukan', 'Acara penghargaan pelanggan', 'Katering persidangan'],
    'events.corporate.minPax': 'Minimum 50 pax • Termasuk stesen masakan langsung • Pilihan menu boleh disesuaikan',

    // Private Events
    'events.private.title': 'Sambutan Peribadi',
    'events.private.description': 'Jadikan hari istimewa anda lebih bermakna dengan hidangan istimewa kami. Sesuai untuk:',
    'events.private.items': ['Majlis hari jadi', 'Majlis perkahwinan', 'Perhimpunan keluarga', 'Majlis rumah terbuka', 'Sambutan graduasi'],
    'events.private.minPax': 'Minimum 30 pax • Masa hidangan fleksibel • Pilihan susun atur boleh disesuaikan',

    // Festivals
    'events.festivals.title': 'Festival & Pasar Makanan',
    'events.festivals.description': 'Tambah rasa autentik Malaysia ke acara makanan anda. Tersedia untuk:',
    'events.festivals.items': ['Festival makanan', 'Pasar malam', 'Acara kebudayaan', 'Perhimpunan komuniti', 'Acara pop-up'],

    // Footer translations
    'footer.description': 'Char Kuey Teow autentik yang dimasak dengan penuh semangat dan tradisi, membawakan rasa sebenar makanan jalanan Malaysia ke pinggan anda.',
    'footer.quickLinks': 'Pautan Pantas',
    'footer.products': 'Produk Kami',
    'footer.events': 'Acara',
    'footer.about': 'Tentang Kami',
    'footer.business': 'Peluang Perniagaan',
    'footer.startBusiness': 'Mulakan Perniagaan',
    'footer.investmentPackages': 'Pakej Pelaburan',
    'footer.businessDev': 'Pembangunan Perniagaan',
    'footer.legal': 'Perundangan',
    'footer.privacy': 'Dasar Privasi',
    'footer.terms': 'Terma Perkhidmatan',
    'footer.faq': 'Soalan Lazim',
    'footer.newsletter': 'Kekal Dikemaskini',
    'footer.newsletterDesc': 'Langgan surat berita kami untuk tawaran eksklusif dan kemas kini.',
    'footer.emailPlaceholder': 'Masukkan emel anda',
    'footer.subscribe': 'Langgan',
    'footer.rights': 'Hak cipta terpelihara.',

    // Booking Form
    'events.booking.title': 'Tempah Kami Untuk Acara Anda',
    'events.booking.eventType.label': 'Jenis Acara',
    'events.booking.eventType.placeholder': 'Pilih jenis acara',
    'events.booking.eventType.corporate': 'Acara Korporat',
    'events.booking.eventType.private': 'Sambutan Peribadi',
    'events.booking.eventType.festival': 'Festival/Pasar Makanan',
    'events.booking.eventType.other': 'Lain-lain',
    'events.booking.name': 'Nama Untuk Dihubungi',
    'events.booking.organization': 'Organisasi/Syarikat',
    'events.booking.email': 'Alamat Emel',
    'events.booking.phone': 'Nombor Telefon',
    'events.booking.date': 'Tarikh Acara',
    'events.booking.guests': 'Jangkaan Bilangan Tetamu',
    'events.booking.location': 'Lokasi Acara',
    'events.booking.locationPlaceholder': 'Alamat penuh acara',
    'events.booking.requirements': 'Keperluan Khas',
    'events.booking.requirementsPlaceholder': 'Beritahu kami tentang keperluan khusus, sekatan pemakanan, atau permintaan istimewa',
    'events.booking.terms': 'Saya faham bahawa ini adalah pertanyaan dan bukan tempahan yang disahkan',
    'events.booking.submit': 'Hantar Pertanyaan',

    // Why Choose Us
    'events.whyChoose.title': 'Mengapa Memilih Kami?',
    'events.whyChoose.live.title': 'Pengalaman Memasak Langsung',
    'events.whyChoose.live.description': 'Saksikan chef kami menyediakan Char Kuey Teow segar di hadapan tetamu anda, mencipta pengalaman yang menarik dan tidak dapat dilupakan.',
    'events.whyChoose.service.title': 'Perkhidmatan Profesional',
    'events.whyChoose.service.description': 'Pasukan kami yang berpengalaman memastikan persediaan, perkhidmatan, dan pembersihan yang lancar, membolehkan anda fokus pada acara anda.',
    'events.whyChoose.packages.title': 'Pakej Boleh Disesuaikan',
    'events.whyChoose.packages.description': 'Kami bekerjasama dengan anda untuk mencipta pakej yang sempurna yang sesuai dengan saiz acara, bajet, dan pilihan anda.',
    'events.whyChoose.quality.title': 'Kualiti Terjamin',
    'events.whyChoose.quality.description': 'Menggunakan bahan-bahan yang paling segar dan resipi autentik untuk memastikan setiap hidangan memenuhi standard tinggi kami.',

    // About Page
    'about.hero.title': 'Tentang Danny\'s CKT',
    'about.hero.subtitle': 'Di mana semangat bertemu tradisi dalam setiap hidangan yang kami sajikan',
    'about.story.title': 'Kisah Kami',
    'about.story.description': 'Diasaskan oleh Danny, seorang chef yang bersemangat dengan pengalaman lebih 15 tahun dalam masakan Malaysia, restoran kami telah menjadi destinasi yang digemari oleh mereka yang mencari Char Kuey Teow yang autentik. Bermula sebagai gerai makanan jalanan kecil dan kini berkembang menjadi restoran perkhidmatan penuh, namun komitmen kami terhadap kualiti dan tradisi tetap tidak berubah.',
    'about.philosophy.title': 'Falsafah Kami',
    'about.philosophy.description': 'Di Danny\'s CKT, kami percaya bahawa makanan yang hebat datang dari bahan-bahan yang berkualiti dan teknik-teknik tradisional. Setiap pinggan Char Kuey Teow dimasak mengikut pesanan, memastikan anda mendapat rasa wok hei yang sempurna yang menjadikan hidangan ini istimewa.',
    'about.philosophy.expertChefs.title': 'Chef Pakar',
    'about.philosophy.expertChefs.description': 'Pasukan chef kami yang berpengalaman membawa bertahun-tahun kepakaran dalam teknik memasak Malaysia tradisional.',
    'about.philosophy.quality.title': 'Bahan Berkualiti',
    'about.philosophy.quality.description': 'Kami hanya menggunakan bahan-bahan segar dari pembekal tempatan, memastikan setiap hidangan memenuhi standard tinggi kami.',
    'about.philosophy.traditional.title': 'Kaedah Tradisional',
    'about.philosophy.traditional.description': 'Chef kami menggunakan kaedah memasak tradisional dan resipi autentik yang diwariskan dari generasi ke generasi.',
    'about.visit.title': 'Kunjungi Kami',
    'about.visit.hours.title': 'Waktu Operasi',
    'about.visit.hours.weekdays': 'Isnin - Jumaat: 11:00 AM - 10:00 PM',
    'about.visit.hours.weekends': 'Sabtu - Ahad: 10:00 AM - 11:00 PM',
    'about.visit.location.title': 'Lokasi',
    'about.visit.location.address1': '123 Jalan Makanan,',
    'about.visit.location.address2': 'Kuala Lumpur, Malaysia',
    'about.visit.contact.title': 'Hubungi',
    'about.visit.contact.phone': '+60 12-345 6789',
    'about.visit.contact.email': 'info@dannysckt.com',

    // Business Opportunities Page
    'business.hero.title': 'Bina Empayar CKT Anda',
    'business.hero.subtitle': 'Sertai revolusi Char Kway Teow Malaysia yang sedang berkembang dengan model perniagaan yang terbukti dan sistem sokongan komprehensif kami.',
    'business.hero.consultation': 'Jadualkan Konsultasi',
    'business.hero.download': 'Muat Turun Info',

    'business.why.title': 'Mengapa Bekerjasama Dengan Danny\'s CKT?',
    'business.why.subtitle': 'Mulakan perjalanan anda dengan model perniagaan yang terbukti, disokong oleh latihan dan sokongan komprehensif',
    'business.why.model.title': 'Model Perniagaan Terbukti',
    'business.why.model.description': 'Cawangan kami yang berjaya di seluruh Malaysia membuktikan kekuatan model perniagaan kami.',
    'business.why.training.title': 'Latihan Komprehensif',
    'business.why.training.description': 'Pelajari setiap aspek mengendalikan perniagaan CKT yang berjaya daripada pasukan berpengalaman kami.',
    'business.why.ingredients.title': 'Bahan Premium',
    'business.why.ingredients.description': 'Akses kepada bahan-bahan berkualiti premium dan sos resipi rahsia kami.',
    'business.why.marketing.title': 'Sokongan Pemasaran',
    'business.why.marketing.description': 'Manfaatkan jenama dan strategi pemasaran kami yang telah mantap.',
    'business.why.territory.title': 'Hak Wilayah',
    'business.why.territory.description': 'Dapatkan hak eksklusif untuk beroperasi di wilayah pilihan anda.',
    'business.why.support.title': 'Sokongan Berterusan',
    'business.why.support.description': 'Semakan perniagaan berkala dan sokongan operasi berterusan.',

    'business.packages.title': 'Pakej Perniagaan',
    'business.packages.description': 'Pilih dari pakej yang direka khas untuk membantu anda memulakan dan mengembangkan perniagaan CKT anda dengan jayanya.',
    'business.packages.recommended': 'Disyorkan',

    'business.contact.title': 'Bersedia untuk Bermula?',
    'business.contact.description': 'Hubungi pasukan pembangunan perniagaan kami untuk membincangkan peluang di kawasan anda.',
    'business.contact.phone': '+60 17-363-2350',
    'business.contact.email': 'business@dannysckt.com',
    'business.contact.location': 'Kuala Lumpur, Malaysia',

    // Distributor Packages
    'business.packages.starter.name': 'Pakej Permulaan',
    'business.packages.starter.description': 'Sesuai untuk usahawan medan selera atau gerai kecil',
    'business.packages.starter.features': [
      'Panduan lengkap setup gerai',
      'Set peralatan memasak asas',
      '3 hari latihan praktikal',
      'Stok awal bahan premium',
      'Bimbingan pensijilan halal',
      'Bahan pemasaran tempatan',
      'Talian sokongan 3 bulan',
      'Kit permulaan media sosial'
    ],

    'business.packages.premium.name': 'Pakej Premium',
    'business.packages.premium.description': 'Sesuai untuk operasi restoran atau berbilang gerai',
    'business.packages.premium.features': [
      'Setup restoran/gerai lengkap dengan peralatan',
      '7 hari latihan intensif',
      'Stok bahan premium 6 bulan',
      'Bantuan pensijilan halal',
      'Pakej pemasaran digital',
      'Sistem POS moden',
      'Sokongan 12 bulan',
      'Eksklusiviti wilayah',
      'Program latihan kakitangan',
      'Aplikasi pengurusan perniagaan'
    ],

    'business.packages.enterprise.name': 'Pakej Enterprise',
    'business.packages.enterprise.description': 'Untuk perniagaan F&B sedia ada yang ingin berkembang di seluruh Malaysia',
    'business.packages.enterprise.features': [
      'Keupayaan setup berbilang outlet',
      '14 hari latihan lanjutan',
      'Stok bahan 12 bulan',
      'Penjenamaan & penyesuaian tempatan',
      'Sistem pengurusan perniagaan lengkap',
      'Sokongan premium 24 bulan',
      'Hak wilayah seluruh negara',
      'Faedah perkongsian hasil',
      'Panduan setup dapur pusat',
      'Sokongan pembangunan francais',
      'Sokongan pasukan pemasaran'
    ],

    // Privacy Policy
    'privacy.title': 'Dasar Privasi',
    'privacy.lastUpdated': 'Kemas Kini Terakhir: 15 Mac 2024',
    'privacy.intro.title': 'Pengenalan',
    'privacy.intro.description': 'Di Danny\'s CKT, kami mengambil berat tentang privasi anda. Dasar Privasi ini menerangkan bagaimana kami mengumpul, menggunakan, dan melindungi maklumat peribadi anda.',
    'privacy.collection.title': 'Maklumat Yang Kami Kumpul',
    'privacy.collection.description': 'Kami mengumpul maklumat yang anda berikan secara langsung kepada kami, termasuk:',
    'privacy.collection.items': [
      'Nama dan maklumat hubungan',
      'Butiran pesanan dan pembayaran',
      'Pertanyaan perniagaan dan surat-menyurat',
      'Maklumat tempahan acara',
      'Pilihan pemasaran'
    ],
    'privacy.use.title': 'Cara Kami Menggunakan Maklumat Anda',
    'privacy.use.description': 'Kami menggunakan maklumat yang dikumpul untuk:',
    'privacy.use.items': [
      'Memproses pesanan dan pembayaran anda',
      'Berkomunikasi tentang perkhidmatan kami',
      'Meningkatkan produk dan pengalaman pelanggan',
      'Tujuan pemasaran dan promosi (dengan kebenaran)',
      'Pematuhan undang-undang dan operasi perniagaan'
    ],
    'privacy.sharing.title': 'Perkongsian Maklumat',
    'privacy.sharing.description': 'Kami mungkin berkongsi maklumat anda dengan:',
    'privacy.sharing.items': [
      'Pembekal perkhidmatan dan rakan perniagaan',
      'Pemproses pembayaran',
      'Pihak berkuasa undang-undang apabila diperlukan',
      'Penerima perniagaan dalam kes jualan atau penggabungan'
    ],
    'privacy.security.title': 'Langkah-langkah Keselamatan',
    'privacy.security.description': 'Kami melaksanakan langkah-langkah teknikal dan organisasi yang sesuai untuk melindungi maklumat peribadi anda daripada akses, pengubahan, pendedahan, atau pemusnahan yang tidak dibenarkan.',
    'privacy.cookies.title': 'Cookies dan Pengesanan',
    'privacy.cookies.description': 'Kami menggunakan cookies dan teknologi pengesanan yang serupa untuk meningkatkan pengalaman anda di laman web kami dan menganalisis corak penggunaan.',
    'privacy.rights.title': 'Hak Anda',
    'privacy.rights.description': 'Anda mempunyai hak untuk:',
    'privacy.rights.items': [
      'Mengakses maklumat peribadi anda',
      'Membetulkan data yang tidak tepat',
      'Meminta penghapusan data anda',
      'Memilih untuk tidak menerima komunikasi pemasaran',
      'Membuat aduan kepada pihak berkuasa'
    ],
    'privacy.contact.title': 'Hubungi Kami',
    'privacy.contact.description': 'Untuk sebarang pertanyaan berkaitan privasi, sila hubungi kami di privacy@dannysckt.com',

    // Terms of Service
    'terms.title': 'Terma Perkhidmatan',
    'terms.lastUpdated': 'Kemas Kini Terakhir: 15 Mac 2024',
    'terms.intro.title': 'Pengenalan',
    'terms.intro.description': 'Terma Perkhidmatan ini mengawal penggunaan perkhidmatan, laman web, dan aplikasi mudah alih Danny\'s CKT.',
    'terms.acceptance.title': 'Penerimaan Terma',
    'terms.acceptance.description': 'Dengan mengakses atau menggunakan perkhidmatan kami, anda bersetuju untuk terikat dengan terma dan syarat ini.',
    'terms.services.title': 'Perkhidmatan',
    'terms.services.description': 'Perkhidmatan kami termasuk:',
    'terms.services.items': [
      'Perkhidmatan makan di restoran',
      'Penghantaran makanan dan katering',
      'Penganjuran dan pengurusan acara',
      'Peluang perkongsian perniagaan',
      'Sistem pesanan dalam talian'
    ],
    'terms.account.title': 'Tanggungjawab Akaun',
    'terms.account.description': 'Apabila membuat akaun, anda mesti:',
    'terms.account.items': [
      'Memberikan maklumat yang tepat',
      'Mengekalkan keselamatan akaun',
      'Tidak berkongsi maklumat log masuk',
      'Mengemaskini maklumat apabila diperlukan',
      'Menerima tanggungjawab untuk aktiviti akaun'
    ],
    'terms.ip.title': 'Harta Intelek',
    'terms.ip.description': 'Semua kandungan, tanda dagangan, dan harta intelek di platform kami adalah milik Danny\'s CKT dan dilindungi oleh undang-undang.',
    'terms.liability.title': 'Had Liabiliti',
    'terms.liability.description': 'Danny\'s CKT tidak akan bertanggungjawab untuk sebarang kerosakan tidak langsung, sampingan, khas, berbangkit, atau punitif.',
    'terms.termination.title': 'Penamatan',
    'terms.termination.description': 'Kami berhak untuk menamatkan atau menggantung akses kepada perkhidmatan kami untuk pelanggaran terma ini.',
    'terms.governing.title': 'Undang-undang Yang Mengawal',
    'terms.governing.description': 'Terma ini dikawal oleh undang-undang Malaysia.',
    'terms.contact.title': 'Maklumat Hubungan',
    'terms.contact.description': 'Untuk sebarang pertanyaan tentang terma ini, sila hubungi kami di legal@dannysckt.com',

    // FAQ
    'faq.title': 'Soalan Lazim',
    'faq.description': 'Dapatkan jawapan untuk soalan-soalan biasa tentang perkhidmatan, peluang perniagaan, dan acara kami.',
    'faq.general.title': 'Soalan Umum',
    'faq.general.q1': 'Apakah waktu operasi anda?',
    'faq.general.a1': 'Kami beroperasi dari 11:00 pagi hingga 10:00 malam pada hari biasa dan 10:00 pagi hingga 11:00 malam pada hujung minggu.',
    'faq.general.q2': 'Adakah anda menawarkan perkhidmatan penghantaran?',
    'faq.general.a2': 'Ya, kami menawarkan penghantaran melalui platform rakan kongsi kami di Kuala Lumpur dan kawasan terpilih.',
    'faq.general.q3': 'Adakah bahan-bahan anda diperakui Halal?',
    'faq.general.a3': 'Ya, semua bahan kami diperakui Halal dan kami mengekalkan pematuhan ketat dengan keperluan Halal.',
    'faq.business.title': 'Peluang Perniagaan',
    'faq.business.q1': 'Berapakah pelaburan minimum yang diperlukan?',
    'faq.business.a1': 'Pakej Permulaan kami bermula dari RM15,000, yang merangkumi peralatan penting dan latihan.',
    'faq.business.q2': 'Adakah anda menyediakan latihan untuk rakan kongsi baru?',
    'faq.business.a2': 'Ya, kami menyediakan latihan komprehensif dari 3 hingga 14 hari bergantung pada pakej anda.',
    'faq.business.q3': 'Apakah sokongan berterusan yang anda tawarkan?',
    'faq.business.a3': 'Kami menyediakan sokongan operasi berterusan, bantuan pemasaran, dan semakan perniagaan berkala.',
    'faq.events.title': 'Acara & Katering',
    'faq.events.q1': 'Berapakah saiz kumpulan minimum untuk acara?',
    'faq.events.a1': 'Kami mengendalikan acara dengan minimum 30 pax untuk acara peribadi dan 50 pax untuk acara korporat.',
    'faq.events.q2': 'Adakah anda menyediakan peralatan untuk acara?',
    'faq.events.a2': 'Ya, kami menyediakan semua peralatan memasak dan stesen hidangan yang diperlukan untuk acara anda.',
    'faq.events.q3': 'Bolehkah anda menampung sekatan pemakanan?',
    'faq.events.a3': 'Ya, kami boleh menyesuaikan menu kami untuk menampung pelbagai keperluan pemakanan dengan notis awal.',
    'faq.contact.title': 'Masih Ada Soalan?',
    'faq.contact.description': 'Hubungi kami secara langsung dan kami akan menjawab secepat mungkin.',
    'faq.contact.email': 'Hubungi Kami',
    
    // Contact Page
    'contact.hero.title': 'Hubungi Kami',
    'contact.hero.subtitle': 'Kami sentiasa menghargai maklum balas anda. Hantarkan mesej dan kami akan membalas secepat mungkin.',
    'contact.info.phone.title': 'Telefon',
    'contact.info.phone.value': '+60 12-345 6789',
    'contact.info.email.title': 'Emel',
    'contact.info.email.value': 'hello@dannysckt.com',
    'contact.info.address.title': 'Alamat',
    'contact.info.address.value': '123 Jalan Sultan, 50000 Kuala Lumpur, Malaysia',
    'contact.hours.title': 'Waktu Operasi',
    'contact.hours.weekdays': 'Isnin - Jumaat: 11:00 AM - 10:00 PM',
    'contact.hours.weekends': 'Sabtu - Ahad: 10:00 AM - 11:00 PM',
    'contact.form.title': 'Hantar Mesej',
    'contact.form.description': 'Isi borang di bawah dan kami akan menghubungi anda secepat mungkin.',
    'contact.form.name': 'Nama Anda',
    'contact.form.email': 'Emel Anda',
    'contact.form.subject': 'Subjek',
    'contact.form.message': 'Mesej Anda',
    'contact.form.submit': 'Hantar Mesej',
    'faq.questions.title': 'Masih Ada Pertanyaan?',
    'faq.questions.description': 'Kami sedia membantu! Hubungi kami untuk sebarang pertanyaan tambahan.',
    'faq.questions.contact': 'Hubungi Kami',
    'common.submitting': 'Menghantar...'
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.events': '活动',
    'nav.about': '关于我们',
    'nav.business': '商业机会',
    'nav.contact': '联系我们',

    // Hero Section
    'hero.welcome': '欢迎来到Danny\'s',
    'hero.title': '体验正宗',
    'hero.subtitle': 'Char Kuey Teow',
    'hero.description': '品尝马来西亚最受欢迎的街头美食，由热情和传统精心制作。',
    'hero.viewProducts': '查看产品',
    'hero.bookEvent': '预订活动',

    // Features Section
    'features.title': 'Danny\'s CKT体验',
    'features.subtitle': '为什么选择我们',
    'features.chef.title': '大师级厨师技艺',
    'features.chef.description': '由经验丰富的厨师精心制作，他们精通正宗的CKT艺术',
    'features.quality.title': '高品质',
    'features.quality.description': '只有最好的原料，精心挑选以达到完美的味道',
    'features.love.title': '用爱制作',
    'features.love.description': '每一道菜都是用热情和细心制作的',

    // Gallery Section
    'gallery.title': '我们的Instagram动态',
    'gallery.subtitle': '关注我们',
    'gallery.description': '在Instagram上关注我们，了解我们最新的美食和活动。',

    // Events Section
    'events.title': '举办难忘时刻',
    'events.subtitle': '特别活动',
    'events.description': '从私人聚会到企业活动，让我们将正宗的Char Kuey Teow风味带到您的特殊场合。我们的经验团队将确保您获得难忘的烹饪体验。',
    'events.private': '私人聚会和庆祝活动',
    'events.corporate': '企业活动和会议',
    'events.cooking': '烹饪演示',
    'events.tasting': '食物品尝活动',
    'events.learnMore': '了解更多关于活动',

    // CTA Section
    'cta.title': '准备好体验我们的',
    'cta.subtitle': 'Char Kuey Teow?',
    'cta.description': '加入我们，体验正宗的马来西亚街头美食，让您的味蕾陶醉，让您还想再来。',
    'cta.orderNow': '立即订购',

    // Products Page
    'products.title': 'CKT优质产品',
    'products.description': '探索我们的正宗Char Kway Teow原料和酱料系列。适合餐厅和食品业务。',
    'products.searchPlaceholder': '搜索产品...',
    'products.searchButton': '搜索',
    'products.showing': '显示',
    'products.sort.latest': '最新',
    'products.sort.priceLow': '价格：低到高',
    'products.sort.priceHigh': '价格：高到低',
    'products.sort.name': '名称',

    // Events Page
    'events.hero.title': '活动餐饮服务',
    'events.hero.description': '将正宗的马来西亚街头美食带到您的下一个活动',
    
    // Stats
    'events.stats.chefs': '专家厨师',
    'events.stats.chefsCount': '15+',
    'events.stats.eventsCatered': '活动承办',
    'events.stats.eventsCateredCount': '1000+',
    'events.stats.menuItems': '菜单项目',
    'events.stats.menuItemsCount': '50+',
    'events.stats.support': '24/7',
    'events.stats.supportDesc': '支持',

    // Corporate Events
    'events.corporate.title': '企业活动',
    'events.corporate.description': '用我们的现场烹饪站给您的客户和团队留下深刻印象。适合:',
    'events.corporate.items': ['公司庆祝活动', '产品发布', '团队建设活动', '客户感谢活动', '会议餐饮'],
    'events.corporate.minPax': '最少50人 • 包括现场烹饪站 • 可定制菜单选项',

    // Private Events
    'events.private.title': '私人庆祝活动',
    'events.private.description': '用我们的招牌菜肴为您的特殊日子增添意义。适合:',
    'events.private.items': ['生日聚会', '婚礼招待会', '家庭聚会', '新房派对', '毕业庆祝'],
    'events.private.minPax': '最少30人 • 灵活的服务时间 • 可定制设置选项',

    // Festivals
    'events.festivals.title': '食品节和市场',
    'events.festivals.description': '为您的食品活动添加正宗的马来西亚风味。适合:',
    'events.festivals.items': ['食品节', '夜市', '文化活动', '社区聚会', '快闪活动'],

    // Footer translations
    'footer.description': '由热情和传统精心制作的正宗Char Kuey Teow，将正宗的马来西亚街头美食带到您的盘子上。',
    'footer.quickLinks': '快速链接',
    'footer.products': '我们的产品',
    'footer.events': '活动',
    'footer.about': '关于我们',
    'footer.business': '商业机会',
    'footer.startBusiness': '开始业务',
    'footer.investmentPackages': '投资套餐',
    'footer.businessDev': '业务发展',
    'footer.legal': '法律',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.faq': '常见问题',
    'footer.newsletter': '保持更新',
    'footer.newsletterDesc': '订阅我们的新闻通讯，获取独家优惠和更新。',
    'footer.emailPlaceholder': '输入您的电子邮件',
    'footer.subscribe': '订阅',
    'footer.rights': '版权所有。',

    // Booking Form
    'events.booking.title': '为我们预订您的活动',
    'events.booking.eventType.label': '活动类型',
    'events.booking.eventType.placeholder': '选择活动类型',
    'events.booking.eventType.corporate': '企业活动',
    'events.booking.eventType.private': '私人庆祝活动',
    'events.booking.eventType.festival': '食品节/市场',
    'events.booking.eventType.other': '其他',
    'events.booking.name': '联系人姓名',
    'events.booking.organization': '组织/公司',
    'events.booking.email': '电子邮件地址',
    'events.booking.phone': '电话号码',
    'events.booking.date': '活动日期',
    'events.booking.guests': '预计客人数量',
    'events.booking.location': '活动地点',
    'events.booking.locationPlaceholder': '活动完整地址',
    'events.booking.requirements': '特殊要求',
    'events.booking.requirementsPlaceholder': '告诉我们关于任何特殊要求、饮食限制或特殊请求',
    'events.booking.terms': '我理解这只是一个查询，而不是确认的预订',
    'events.booking.submit': '提交查询',

    // Why Choose Us
    'events.whyChoose.title': '为什么选择我们？',
    'events.whyChoose.live.title': '现场烹饪体验',
    'events.whyChoose.live.description': '观看我们的厨师在我们客人面前准备新鲜的Char Kuey Teow，创造难忘的体验。',
    'events.whyChoose.service.title': '专业服务',
    'events.whyChoose.service.description': '我们的经验团队确保设置、服务和清理流畅，让您专注于活动。',
    'events.whyChoose.packages.title': '可定制套餐',
    'events.whyChoose.packages.description': '我们与您合作，为您的事件、预算和偏好创建完美的套餐。',
    'events.whyChoose.quality.title': '质量保证',
    'events.whyChoose.quality.description': '使用最新鲜的原料和正宗的食谱，确保每一道菜都符合我们的高标准。',

    // About Page
    'about.hero.title': '关于Danny\'s CKT',
    'about.hero.subtitle': '热情与传统在每一道菜肴中相遇',
    'about.story.title': '我们的故事',
    'about.story.description': '由Danny创立，他拥有超过15年的马来西亚美食经验，我们的餐厅已成为那些寻求正宗Char Kuey Teow的人们的最爱目的地。从一个小小的街头食品摊位开始，现在已经发展成为一个完整的餐饮服务餐厅，但我们的质量承诺和传统保持不变。',
    'about.philosophy.title': '我们的哲学',
    'about.philosophy.description': '在Danny\'s CKT，我们相信伟大的食物来自高质量的原料和传统技艺。每一道Char Kuey Teow都是按订单烹饪的，确保您获得完美的wok hei风味，使这道菜如此特别。',
    'about.philosophy.expertChefs.title': '专家厨师',
    'about.philosophy.expertChefs.description': '我们的经验团队带来了马来西亚传统烹饪技术的多年经验。',
    'about.philosophy.quality.title': '高质量原料',
    'about.philosophy.quality.description': '我们只使用当地供应商的新鲜原料，确保每一道菜都符合我们的高标准。',
    'about.philosophy.traditional.title': '传统方法',
    'about.philosophy.traditional.description': '我们的厨师使用传统烹饪方法和正宗食谱，代代相传。',
    'about.visit.title': '访问我们',
    'about.visit.hours.title': '营业时间',
    'about.visit.hours.weekdays': '周一至周五：上午11点至晚上10点',
    'about.visit.hours.weekends': '周六至周日：上午10点至晚上11点',
    'about.visit.location.title': '位置',
    'about.visit.location.address1': '123 Food Street,',
    'about.visit.location.address2': '吉隆坡, 马来西亚',
    'about.visit.contact.title': '联系',
    'about.visit.contact.phone': '+60 12-345 6789',
    'about.visit.contact.email': 'info@dannysckt.com',

    // Business Opportunities Page
    'business.hero.title': '建立您的CKT帝国',
    'business.hero.subtitle': '加入马来西亚正在蓬勃发展的Char Kway Teow革命，与我们经过验证的业务模型和全面支持系统。',
    'business.hero.consultation': '安排咨询',
    'business.hero.download': '下载信息包',

    'business.why.title': '为什么与Danny\'s CKT合作？',
    'business.why.subtitle': '以经过验证的业务模型开始您的旅程，获得全面的支持和培训',
    'business.why.model.title': '经过验证的业务模型',
    'business.why.model.description': '我们在马来西亚的成功分支机构证明了我们的业务模型。',
    'business.why.training.title': '全面培训',
    'business.why.training.description': '从经验丰富的团队那里学习如何成功经营CKT业务。',
    'business.why.ingredients.title': '优质原料',
    'business.why.ingredients.description': '访问我们的优质原料和秘密食谱酱料。',
    'business.why.marketing.title': '营销支持',
    'business.why.marketing.description': '利用我们已建立的品牌和营销策略。',
    'business.why.territory.title': '地区权利',
    'business.why.territory.description': '获得在您选择的地区运营的独家权利。',
    'business.why.support.title': '持续支持',
    'business.why.support.description': '定期业务审查和持续运营支持。',

    'business.packages.title': '投资套餐',
    'business.packages.description': '从我们精心制作的套餐中选择，帮助您成功开始和扩展CKT业务。',
    'business.packages.recommended': '推荐',

    'business.contact.title': '准备好开始吗？',
    'business.contact.description': '联系我们的业务发展团队，讨论您地区的机会。',
    'business.contact.phone': '+60 17-363-2350',
    'business.contact.email': 'business@dannysckt.com',
    'business.contact.location': '吉隆坡, 马来西亚',

    // Distributor Packages
    'business.packages.starter.name': '起步套餐',
    'business.packages.starter.description': '适合食品法庭或小型小贩摊位企业家',
    'business.packages.starter.features': [
      '完整摊位设置指南',
      '基本烹饪设备套件',
      '3天实地培训',
      '优质原料初始库存',
      'Halal认证指导',
      '本地营销材料',
      '3个月支持热线',
      '社交媒体启动套件'
    ],

    'business.packages.premium.name': '高级套餐',
    'business.packages.premium.description': '适合餐厅或多个摊位操作',
    'business.packages.premium.features': [
      '完整餐厅/摊位设置与设备',
      '7天密集培训',
      '优质原料6个月库存',
      'Halal认证协助',
      '数字营销套餐',
      '现代POS系统',
      '12个月支持',
      '地区排他性',
      '员工培训计划',
      '业务管理应用程序'
    ],

    'business.packages.enterprise.name': '企业套餐',
    'business.packages.enterprise.description': '适合已经在马来西亚扩展的F&B业务',
    'business.packages.enterprise.features': [
      '多地点设置能力',
      '14天高级培训',
      '12个月原料库存',
      '定制品牌和本地化',
      '完整业务管理系统',
      '24个月高级支持',
      '全国范围权利',
      '收入分享利益',
      '中央厨房设置指南',
      '法国发展支持',
      '营销团队支持'
    ],

    // Privacy Policy
    'privacy.title': '隐私政策',
    'privacy.lastUpdated': '最后更新：2024年3月15日',
    'privacy.intro.title': '介绍',
    'privacy.intro.description': '在Danny\'s CKT，我们认真对待您的隐私。此隐私政策解释了我们如何收集、使用和保护您的个人信息。',
    'privacy.collection.title': '我们收集的信息',
    'privacy.collection.description': '我们直接向您收集信息，包括：',
    'privacy.collection.items': [
      '姓名和联系方式',
      '订单和支付详细信息',
      '业务查询和通信',
      '活动预订信息',
      '营销偏好'
    ],
    'privacy.use.title': '我们如何使用您的信息',
    'privacy.use.description': '我们使用收集的信息用于：',
    'privacy.use.items': [
      '处理您的订单和支付',
      '与我们服务沟通',
      '改进我们的产品和服务',
      '营销和促销目的（在同意下）',
      '法律遵从和业务运营'
    ],
    'privacy.sharing.title': '信息共享',
    'privacy.sharing.description': '我们可能会与以下人员共享您的信息：',
    'privacy.sharing.items': [
      '服务提供商和业务合作伙伴',
      '支付处理器',
      '在法律要求时法律当局',
      '在销售或合并情况下业务转让接收者'
    ],
    'privacy.security.title': '安全措施',
    'privacy.security.description': '我们实施适当的技术和组织措施，以保护您的个人信息免受未经授权的访问、修改、披露或破坏。',
    'privacy.cookies.title': 'Cookies和跟踪',
    'privacy.cookies.description': '我们使用cookies和类似的跟踪技术来增强您的网站体验并分析使用模式。',
    'privacy.rights.title': '您的权利',
    'privacy.rights.description': '您有权：',
    'privacy.rights.items': [
      '访问您的个人信息',
      '纠正不准确的数据',
      '请求删除您的数据',
      '选择不接收营销通信',
      '向当局提出投诉'
    ],
    'privacy.contact.title': '联系我们',
    'privacy.contact.description': '对于任何隐私相关的问题或关注，请随时联系我们privacy@dannysckt.com',

    // Terms of Service
    'terms.title': '服务条款',
    'terms.lastUpdated': '最后更新：2024年3月15日',
    'terms.intro.title': '介绍',
    'terms.intro.description': '这些服务条款控制我们对服务、网站和移动应用程序的使用。',
    'terms.acceptance.title': '接受条款',
    'terms.acceptance.description': '通过访问或使用我们的服务，您同意受这些条款和条件的约束。',
    'terms.services.title': '服务',
    'terms.services.description': '我们的服务包括：',
    'terms.services.items': [
      '餐厅用餐服务',
      '食品配送和餐饮',
      '活动规划和管理',
      '业务合作机会',
      '在线订购系统'
    ],
    'terms.account.title': '账户责任',
    'terms.account.description': '创建账户时，您必须：',
    'terms.account.items': [
      '提供准确信息',
      '维护账户安全',
      '不共享账户凭据',
      '根据需要更新信息',
      '接受账户活动责任'
    ],
    'terms.ip.title': '知识产权',
    'terms.ip.description': '我们平台上的所有内容、商标和知识产权属于Danny\'s CKT并受法律保护。',
    'terms.liability.title': '责任限制',
    'terms.liability.description': 'Danny\'s CKT不对任何间接、附带、特殊、后果性或惩罚性损害承担责任。',
    'terms.termination.title': '终止',
    'terms.termination.description': '我们保留终止或暂停对服务访问的权利，以违反这些条款。',
    'terms.governing.title': '管辖法律',
    'terms.governing.description': '这些条款受马来西亚法律管辖。',
    'terms.contact.title': '联系信息',
    'terms.contact.description': '对于这些条款的任何问题，请随时联系我们legal@dannysckt.com',

    // FAQ
    'faq.title': '常见问题',
    'faq.description': '获取有关我们的服务、业务机会和活动的常见问题答案。',
    'faq.general.title': '常见问题',
    'faq.general.q1': '营业时间是什么时候？',
    'faq.general.a1': '我们每天上午11点至晚上10点营业。最后点餐时间为打烊前30分钟。',
    'faq.general.q2': '接受预订吗？',
    'faq.general.a2': '是的，我们接受6人或以上团体的预订。请致电或使用我们的在线预订系统。',
    'faq.general.q3': '你们的食材是清真的吗？',
    'faq.general.a3': '是的，我们所有菜品都使用清真认证的食材。',
    'faq.business.title': '商业与特许经营',
    'faq.business.q1': '需要多少初始投资？',
    'faq.business.a1': '初始投资因地点和店铺大小而异。请联系我们获取详细明细。',
    'faq.business.q2': '你们为加盟商提供培训吗？',
    'faq.business.a2': '是的，我们提供全面培训，包括运营、烹饪技术和管理。',
    'faq.business.q3': '你们提供什么持续支持？',
    'faq.business.a3': '我们在营销、运营、供应链和质量控制方面提供持续支持。',
    'faq.events.title': '活动与餐饮',
    'faq.events.q1': '活动需要多少人参加？',
    'faq.events.a1': '我们为私人活动和公司活动分别提供至少30人和50人的服务。',
    'faq.events.q2': '你们为活动提供设备吗？',
    'faq.events.a2': '是的，我们为您的活动提供所有必要的烹饪设备和餐饮站。',
    'faq.events.q3': '你们可以适应饮食限制吗？',
    'faq.events.a3': '是的，我们可以根据提前通知为各种饮食要求定制菜单。',
    'faq.contact.title': '还有问题？',
    'faq.contact.description': '直接联系我们，我们会尽快回复。',
    'faq.contact.email': '联系我们',
    
    // Contact Page
    'contact.hero.title': '联系我们',
    'contact.hero.subtitle': '我们很乐意听取您的意见。发送消息，我们会尽快回复。',
    'contact.info.phone.title': '电话',
    'contact.info.phone.value': '+60 12-345 6789',
    'contact.info.email.title': '电子邮件',
    'contact.info.email.value': 'hello@dannysckt.com',
    'contact.info.address.title': '地址',
    'contact.info.address.value': '马来西亚吉隆坡苏丹路123号 50000',
    'contact.hours.title': '营业时间',
    'contact.hours.weekdays': '周一至周五：上午11:00 - 晚上10:00',
    'contact.hours.weekends': '周六至周日：上午10:00 - 晚上11:00',
    'contact.form.title': '发送消息',
    'contact.form.description': '填写以下表格，我们会尽快与您联系。',
    'contact.form.name': '您的姓名',
    'contact.form.email': '您的电子邮件',
    'contact.form.subject': '主题',
    'contact.form.message': '您的消息',
    'contact.form.submit': '发送消息',
    'faq.questions.title': '还有问题？',
    'faq.questions.description': '我们随时为您服务！如有任何其他问题或咨询，请与我们联系。',
    'faq.questions.contact': '联系我们',
    'common.submitting': '提交中...'
  }
}; 