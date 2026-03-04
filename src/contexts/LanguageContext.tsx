import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'sn' | 'nd' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: Record<Language, string>;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.knowledge': 'Knowledge Base',
    'nav.chat': 'Chat',
    'nav.tools': 'Tools',
    'header.login': 'Log In',
    'header.signup': 'Sign Up',
    'header.tagline': 'AI Workplace Assistant',
    
    // Hero Section
    'hero.title1': 'Empowering',
    'hero.title2': 'Workplace Inclusion',
    'hero.title3': 'Through AI',
    'hero.description': 'PLUSME uses advanced AI and comprehensive disability data to recommend suitable tasks and accommodations for people with disabilities in various job roles, creating more inclusive work environments.',
    'hero.cta1': 'Start Chatting with PLUSME',
    'hero.cta2': 'Explore Resources',
    
    // Features Section
    'features.title': 'How PLUSME Helps',
    'features.subtitle': 'Our AI-powered platform provides comprehensive support for creating inclusive workplaces',
    'features.ai.title': 'AI-Powered Recommendations',
    'features.ai.desc': 'Get personalized task recommendations based on job role and specific disability needs using Groq, DeepSeek, and OpenAI models',
    'features.database.title': 'Comprehensive Disability Database',
    'features.database.desc': 'Access tasks recommendations for disability types with detailed accommodation strategies and task suitability analysis',
    'features.chat.title': 'Interactive Chat Assistant',
    'features.chat.desc': 'Chat with our AI to get instant answers to your workplace accommodation questions with text-to-speech functionality',
    'features.language.title': 'Multi-Language Support',
    'features.language.desc': 'Use the app in English, French, Shona, and isiNdebele with seamless translation',
    
    // Knowledge Base Section
    'knowledge.title': 'Disability',
    'knowledge.titleHighlight': 'Knowledge Base',
    'knowledge.subtitle': 'Search through various disability types with detailed recommendations and accommodations',
    'knowledge.search': 'Search disabilities (e.g., visual impairment, autism, mobility...)',
    'knowledge.all': 'All Disabilities',
    'knowledge.visual': 'Visual Impairment',
    'knowledge.hearing': 'Hearing Impairment',
    'knowledge.mobility': 'Mobility Disabilities',
    'knowledge.cognitive': 'Cognitive',
    'knowledge.neurodiversity': 'Neurodiversity',
    'knowledge.readMore': 'Read More',
    'knowledge.article1.title': 'Visual Impairment Accommodations',
    'knowledge.article1.desc': 'Screen readers, magnification software, and workplace adaptations for visually impaired employees.',
    'knowledge.article2.title': 'Hearing Accessibility Solutions',
    'knowledge.article2.desc': 'Sign language interpreters, captioning services, and visual alert systems for deaf and hard of hearing workers.',
    'knowledge.article3.title': 'Mobility Support Strategies',
    'knowledge.article3.desc': 'Wheelchair accessibility, ergonomic workstations, and flexible work arrangements for mobility disabilities.',
    'knowledge.article4.title': 'Cognitive Disability Support',
    'knowledge.article4.desc': 'Task simplification, memory aids, and structured routines for employees with cognitive challenges.',
    'knowledge.article5.title': 'Neurodiversity in the Workplace',
    'knowledge.article5.desc': 'Autism-friendly environments, ADHD accommodations, and sensory considerations for neurodiverse individuals.',
    'knowledge.article6.title': 'Universal Design Principles',
    'knowledge.article6.desc': 'Creating inclusive workspaces that benefit all employees regardless of ability or disability.',
    
    // Chat Section
    'chat.title': 'Chat with',
    'chat.titleHighlight': 'PLUSME Assistant',
    'chat.subtitle': 'Ask questions about workplace accommodations and get personalized recommendations using Groq AI',
    'chat.assistantName': 'PLUSME ASSISTANT',
    'chat.greeting': "Hello! I'm PLUSME, an AI Platform designed by MAYIBONGWE from NUST. I can help you find suitable tasks and accommodations based on job roles and specific disabilities in workplaces. How can I be of assistance today?",
    'chat.you': 'You',
    'chat.userMessage': "I'm a software developer with visual impairment. What tasks would you recommend for me?",
    'chat.placeholder': 'Type your message here...',
    
    // Tools Section
    'tools.title': 'Tools & Resources',
    'tools.subtitle': 'Practical tools to support workplace inclusion',
    'tools.useTool': 'Use Tool',
    'tools.assessment.title': 'Accommodation Assessment',
    'tools.assessment.desc': 'Evaluate workplace needs and get personalized accommodation recommendations based on disability type.',
    'tools.metrics.title': 'Inclusion Metrics',
    'tools.metrics.desc': 'Track and measure inclusion efforts with our comprehensive metrics dashboard.',
    'tools.templates.title': 'Policy Templates',
    'tools.templates.desc': 'Access ready-to-use templates for inclusive workplace policies and procedures.',
    'tools.training.title': 'Training Scheduler',
    'tools.training.desc': 'Plan and schedule disability awareness training for your team.',
    
    // Footer
    'footer.description': 'Empowering workplace inclusion through advanced AI technology. Creating accessible and accommodating work environments for everyone.',
    'footer.platform': 'Platform',
    'footer.resources': 'Resources',
    'footer.contact': 'Contact',
    'footer.documentation': 'Documentation',
    'footer.tutorials': 'Tutorials',
    'footer.blog': 'Blog',
    'footer.caseStudies': 'Case Studies',
    'footer.aboutUs': 'About Us',
    'footer.careers': 'Careers',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': 'All rights reserved. Empowering inclusive workplaces worldwide.',
  },
  sn: {
    // Header
    'nav.home': 'Kumba',
    'nav.features': 'Zvinogoneka',
    'nav.knowledge': 'Ruzivo',
    'nav.chat': 'Kutaura',
    'nav.tools': 'Maturusi',
    'header.login': 'Pinda',
    'header.signup': 'Nyoresa',
    'header.tagline': 'AI Mubatsiri Webasa',
    
    // Hero Section
    'hero.title1': 'Kusimbisa',
    'hero.title2': 'Kubatanidzwa Mubasa',
    'hero.title3': 'Nekuda kwe AI',
    'hero.description': 'PLUSME inoshandisa AI yakadzama uye data yakazara yevakaremara kuti ikurudzire mabasa akakodzera uye kugarisana kwevanhu vane zviremera mumabasa akasiyana, zvichiita kuti nzvimbo dzebasa dzirambe dzakavhurika.',
    'hero.cta1': 'Tanga Kutaura na PLUSME',
    'hero.cta2': 'Ongorora Zviwanikwa',
    
    // Features Section
    'features.title': 'Maitirwo e PLUSME',
    'features.subtitle': 'Puratfomu yedu yekutendera AI inopa rubatsiro rwakazara rekugadzira nzvimbo dzebasa dzakavhurika',
    'features.ai.title': 'Zvikurudziro zve AI',
    'features.ai.desc': 'Wana zvikurudziro zvebasa zvakakodzera maererano nebasa uye zvinodiwa zvechirema zvekushandisa Groq, DeepSeek, uye OpenAI',
    'features.database.title': 'Database Yakakwana Yevakaremara',
    'features.database.desc': 'Wana zvikurudziro zvemabasa ezviremera nezvinhu zvekugarisana zvakadzama',
    'features.chat.title': 'Mubatsiri Wekutaura',
    'features.chat.desc': 'Taura ne AI yedu kuti uwane mhinduro nekukasira kumibvunzo yako yekugarisana mubasa',
    'features.language.title': 'Rutsigiro Rwemitauro Mizhinji',
    'features.language.desc': 'Shandisa app muChirungu, ChiFurenchi, ChiShona, uye isiNdebele nekuenderera kunoita',
    
    // Knowledge Base Section
    'knowledge.title': 'Chirema',
    'knowledge.titleHighlight': 'Ruzivo Rwezvakaremara',
    'knowledge.subtitle': 'Tsvaga mhando dzevakaremara nezvirongwa zvakadzama uye kugarisana',
    'knowledge.search': 'Tsvaga zviremera (somuenzaniso, kushaya kuona, autism, kufamba...)',
    'knowledge.all': 'Zviremera Zvese',
    'knowledge.visual': 'Kushaya Kuona',
    'knowledge.hearing': 'Kushaya Kunzwa',
    'knowledge.mobility': 'Kusagona Kufamba',
    'knowledge.cognitive': 'Pfungwa',
    'knowledge.neurodiversity': 'Kusiyana Kweuropi',
    'knowledge.readMore': 'Verenga Zvimwe',
    'knowledge.article1.title': 'Kugarisana Kwevane Kushaya Kuona',
    'knowledge.article1.desc': 'Vanoverengera skrini, software yekukudza, uye kugadzirisa nzvimbo yebasa kune vanoshanda vasina kuona.',
    'knowledge.article2.title': 'Mhinduro Dzekuwana Kunzwa',
    'knowledge.article2.desc': 'Vadudziri vemitauro yemumaoko, masevhisi ekutapwa, uye zviyambiro zvinooneka kune vasinganzwe.',
    'knowledge.article3.title': 'Nzira Dzekutsigira Kufamba',
    'knowledge.article3.desc': 'Kuwana wheelcheel, nzvimbo dzebasa dzakanyorwa, uye kurongedza basa kwakakwanira kune vasingazive kufamba.',
    'knowledge.article4.title': 'Rutsigiro Rwechirema Chepfungwa',
    'knowledge.article4.desc': 'Kureruka kwemabasa, zvinobatsira ndangariro, uye tsika dzakanyorerwa vashandi vane matambudziko epfungwa.',
    'knowledge.article5.title': 'Kusiyana Kweuropi Mubasa',
    'knowledge.article5.desc': 'Nzvimbo dzinobata autisim, kugarisana kwe ADHD, uye kufunga kwe sensory kune vanhu vasina kufanana.',
    'knowledge.article6.title': 'Mitemo Yekugadzira Yakavhurika',
    'knowledge.article6.desc': 'Kugadzira nzvimbo dzebasa dzakavhurika dzinobatsira vashandi vese pasinei nekugona kana kusagona.',
    
    // Chat Section
    'chat.title': 'Taura na',
    'chat.titleHighlight': 'Mubatsiri wa PLUSME',
    'chat.subtitle': 'Bvunza mibvunzo pamusoro pekugarisana mubasa uye wana zvikurudziro zvakakodzera uchishandisa Groq AI',
    'chat.assistantName': 'PLUSME ASSISTANT',
    'chat.greeting': 'Mhoro! Ndiri PLUSME, chiteshi che AI chakagadzirwa naMayibongwe kubva kuNUST. Ndinogona kukubatsira kuwana mabasa akakodzera uye kugarisana maererano nemabasa nezviremera munzvimbo dzebasa. Ndingakubatsira sei nhasi?',
    'chat.you': 'Iwe',
    'chat.userMessage': 'Ndiri mudeveloper we software ane kushaya kuona. Ndezvipi mabasa aungandikurudzira?',
    'chat.placeholder': 'Nyora shoko rako pano...',
    
    // Tools Section
    'tools.title': 'Maturusi & Zviwanikwa',
    'tools.subtitle': 'Maturusi ari pachokwadi ekutsigira kubatanidzwa mubasa',
    'tools.useTool': 'Shandisa Turusi',
    'tools.assessment.title': 'Kuongorora Kugarisana',
    'tools.assessment.desc': 'Ongorora zvinodiwa mubasa uye uwane zvikurudziro zvakakodzera maererano nezviremera.',
    'tools.metrics.title': 'Zviyero Zvekubatanidzwa',
    'tools.metrics.desc': 'Tevera uye yera kubatanidzwa nedashboard yedu yakazara.',
    'tools.templates.title': 'Templates Dzemitemo',
    'tools.templates.desc': 'Wana templates dzakagadzirira dzekushandisa dzemitemo yenzvimbo dzebasa yakavhurika.',
    'tools.training.title': 'Murongi Wekudzidziswa',
    'tools.training.desc': 'Ronga uye gadza nguva yekudzidziswa kuziikanwa kwevakaremara chikwata chako.',
    
    // Footer
    'footer.description': 'Kusimbisa kubatanidzwa mubasa nekushandisa AI yakadzama. Kugadzira nzvimbo dzebasa dzinowanikwa uye dzinogarisana kune munhu wese.',
    'footer.platform': 'Puratfomu',
    'footer.resources': 'Zviwanikwa',
    'footer.contact': 'Bata Nesu',
    'footer.documentation': 'Magwaro',
    'footer.tutorials': 'Kudzidzisa',
    'footer.blog': 'Blog',
    'footer.caseStudies': 'Zvidzidzo',
    'footer.aboutUs': 'Nezvedu',
    'footer.careers': 'Mabasa',
    'footer.privacy': 'Mutemo Wekuchengetedza',
    'footer.terms': 'Mitemo Yekushandisa',
    'footer.copyright': 'Kodzero dzese dzakachengetedzwa. Kusimbisa nzvimbo dzebasa dzakavhurika pasi rose.',
  },
  nd: {
    // Header
    'nav.home': 'Ikhaya',
    'nav.features': 'Izinto',
    'nav.knowledge': 'Ulwazi',
    'nav.chat': 'Ukukhuluma',
    'nav.tools': 'Amathuluzi',
    'header.login': 'Ngena',
    'header.signup': 'Bhalisela',
    'header.tagline': 'Umsizi we AI Emsebenzini',
    
    // Hero Section
    'hero.title1': 'Ukuqinisa',
    'hero.title2': 'Ukufakwa Emsebenzini',
    'hero.title3': 'Nge AI',
    'hero.description': 'PLUSME isebenzisa i-AI ephakeme kanye ledatha epheleleyo yokukhubazeka ukuncoma imisebenzi efaneleyo lokuhleleka kwabantu abakhubazekileyo emisebenzini etshiyeneyo, idala indawo zomsebenzi ezikhanyayo.',
    'hero.cta1': 'Qala Ukukhuluma le PLUSME',
    'hero.cta2': 'Hlola Izinto Ezitholakala',
    
    // Features Section
    'features.title': 'PLUSME Isiza Njani',
    'features.subtitle': 'Isistimu yethu ye AI inikeza usizo olupheleleyo lokudala indawo zomsebenzi ezikhanyayo',
    'features.ai.title': 'Izincomo ze AI',
    'features.ai.desc': 'Thola izincomo zemisebenzi ezifaneleyo ngokwemsebenzi kanye lezidingo zokukhubazeka usebenzisa Groq, DeepSeek, kanye le OpenAI',
    'features.database.title': 'Database Epheleleyo Yokukhubazeka',
    'features.database.desc': 'Finyelela izincomo zemisebenzi zokukhubazeka kanye lamasu okuhleleka',
    'features.chat.title': 'Umsizi Wokukhuluma',
    'features.chat.desc': 'Khuluma le AI yethu ukuthola impendulo ngokushesha emibuzweni yakho yokuhleleka emsebenzini',
    'features.language.title': 'Ukusekelwa Kwezilimi Eziningi',
    'features.language.desc': 'Sebenzisa i-app ngesiNgisi, isiFrentshi, isiShona, kanye lesiNdebele ngokuguqulwa okuhle',
    
    // Knowledge Base Section
    'knowledge.title': 'Ukukhubazeka',
    'knowledge.titleHighlight': 'Ulwazi Lokukhubazeaka',
    'knowledge.subtitle': 'Sesha izinhlobo zokukhubazeka ngezincomo kanye lokuhleleka',
    'knowledge.search': 'Sesha ukukhubazeka (isibonelo, ukungaboni, autism, ukuhamba...)',
    'knowledge.all': 'Konke Ukukhubazeka',
    'knowledge.visual': 'Ukungaboni',
    'knowledge.hearing': 'Ukungezwa',
    'knowledge.mobility': 'Ukungahambi',
    'knowledge.cognitive': 'Ingqondo',
    'knowledge.neurodiversity': 'Ukutshiyana Kwengqondo',
    'knowledge.readMore': 'Funda Okunye',
    'knowledge.article1.title': 'Ukuhleleka Kwabangaboniyo',
    'knowledge.article1.desc': 'Abafundi beskrin, isoftware yokuzimba, kanye lokuhleleka kwendawo yomsebenzi kubaqhatshi abangaboniyo.',
    'knowledge.article2.title': 'Izisombululo Zokuzwa',
    'knowledge.article2.desc': 'Abahumushi bolimi lwezandla, insiza zokuthi, kanye lezaziso ezibonwayo kubaqhatshi abangezwayo.',
    'knowledge.article3.title': 'Amasu Okusekela Ukuhamba',
    'knowledge.article3.desc': 'Ukufinyelela kwesihlalo samasondo, izindawo zomsebenzi ezenziwe ngcono, kanye lokuhlela umsebenzi okuhle kubakhubazekileyo ngokuhamba.',
    'knowledge.article4.title': 'Ukusekela Ukukhubazeka Kwengqondo',
    'knowledge.article4.desc': 'Ukwenza imisebenzi lula, izinto zokusiza inkumbulo, kanye lemikhuba ehleliweyo kubaqhatshi abanemingcele yengqondo.',
    'knowledge.article5.title': 'Ukutshiyana Kwengqondo Emsebenzini',
    'knowledge.article5.desc': 'Izindawo ezinobungani be-autism, ukuhleleka kwe ADHD, kanye lokucabanga kwe sensory kubantu abatshiyeneyo.',
    'knowledge.article6.title': 'Imithetho Yokudala Okuvulelekile',
    'knowledge.article6.desc': 'Ukudala izindawo zomsebenzi ezivulelekile ezisiza bonke abaqhatshi kungakhathaleki ukuze bakhoze noma cha.',
    
    // Chat Section
    'chat.title': 'Khuluma lo',
    'chat.titleHighlight': 'Umsizi we PLUSME',
    'chat.subtitle': 'Buza imibuzo mayelana lokuhleleka emsebenzini uthole izincomo ezifaneleyo usebenzisa Groq AI',
    'chat.assistantName': 'PLUSME ASSISTANT',
    'chat.greeting': 'Sawubona! NginguPLUSME, isistimu ye AI eyenziwe nguMayibongwe ovela eNUST. Ngingakusiza ukuthola imisebenzi efaneleyo lokuhleleka mayelana lemisebenzi kanye lokukhubazeka endaweni zomsebenzi. Ngingakusiza ngani lamuhla?',
    'chat.you': 'Wena',
    'chat.userMessage': 'Ngingumthuthukisi wesoftware ongaboniyo. Yimiphi imisebenzi ongangincoma yona?',
    'chat.placeholder': 'Bhala umlayezo wakho lapha...',
    
    // Tools Section
    'tools.title': 'Amathuluzi & Izinto',
    'tools.subtitle': 'Amathuluzi aprakthayo okusekela ukufakwa emsebenzini',
    'tools.useTool': 'Sebenzisa Ithuluzi',
    'tools.assessment.title': 'Ukuhlola Ukuhleleka',
    'tools.assessment.desc': 'Hlola izidingo zendawo yomsebenzi uthole izincomo zokuhleleka ezifaneleyo.',
    'tools.metrics.title': 'Izikalo Zokufakwa',
    'tools.metrics.desc': 'Landelela usilinganise imizamo yokufakwa nge dashboard yethu epheleleyo.',
    'tools.templates.title': 'Izifanekiso Zemithetho',
    'tools.templates.desc': 'Finyelela izifanekiso ezikulungele ukusetshenziswa zemithetho yendawo yomsebenzi evulelekile.',
    'tools.training.title': 'Umhleli Wokuqeqeshwa',
    'tools.training.desc': 'Hlela ugade isikhathi sokuqeqeshwa kokwazi ukukhubazeka iqembu lakho.',
    
    // Footer
    'footer.description': 'Ukuqinisa ukufakwa emsebenzini ngokusebenzisa i-AI ephakeme. Ukudala izindawo zomsebenzi ezitholakala nezihleliwe kuwo wonke umuntu.',
    'footer.platform': 'Isistimu',
    'footer.resources': 'Izinto',
    'footer.contact': 'Xhumana Lathi',
    'footer.documentation': 'Amaphepha',
    'footer.tutorials': 'Izifundo',
    'footer.blog': 'Blog',
    'footer.caseStudies': 'Izifundo Zamacala',
    'footer.aboutUs': 'Ngathi',
    'footer.careers': 'Imisebenzi',
    'footer.privacy': 'Umthetho Wokugcina',
    'footer.terms': 'Imigomo Yokusebenzisa',
    'footer.copyright': 'Wonke amalungelo agciniwe. Ukuqinisa izindawo zomsebenzi ezivulelekile emhlabeni wonke.',
  },
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.features': 'Fonctionnalités',
    'nav.knowledge': 'Base de Connaissances',
    'nav.chat': 'Chat',
    'nav.tools': 'Outils',
    'header.login': 'Connexion',
    'header.signup': "S'inscrire",
    'header.tagline': 'Assistant IA pour le Travail',
    
    // Hero Section
    'hero.title1': 'Favoriser',
    'hero.title2': "l'Inclusion au Travail",
    'hero.title3': 'Grâce à l\'IA',
    'hero.description': "PLUSME utilise l'IA avancée et des données complètes sur le handicap pour recommander des tâches et des aménagements adaptés aux personnes handicapées dans divers rôles professionnels, créant des environnements de travail plus inclusifs.",
    'hero.cta1': 'Commencer à Discuter avec PLUSME',
    'hero.cta2': 'Explorer les Ressources',
    
    // Features Section
    'features.title': 'Comment PLUSME Aide',
    'features.subtitle': 'Notre plateforme alimentée par l\'IA fournit un support complet pour créer des lieux de travail inclusifs',
    'features.ai.title': 'Recommandations IA',
    'features.ai.desc': 'Obtenez des recommandations de tâches personnalisées basées sur le rôle et les besoins spécifiques en utilisant Groq, DeepSeek et OpenAI',
    'features.database.title': 'Base de Données Complète',
    'features.database.desc': 'Accédez aux recommandations de tâches pour les types de handicap avec des stratégies d\'aménagement détaillées',
    'features.chat.title': 'Assistant Chat Interactif',
    'features.chat.desc': 'Discutez avec notre IA pour obtenir des réponses instantanées à vos questions sur les aménagements au travail',
    'features.language.title': 'Support Multilingue',
    'features.language.desc': 'Utilisez l\'application en anglais, français, shona et isiNdebele avec une traduction transparente',
    
    // Knowledge Base Section
    'knowledge.title': 'Handicap',
    'knowledge.titleHighlight': 'Base de Connaissances',
    'knowledge.subtitle': 'Recherchez parmi les types de handicap avec des recommandations et aménagements détaillés',
    'knowledge.search': 'Rechercher des handicaps (ex: déficience visuelle, autisme, mobilité...)',
    'knowledge.all': 'Tous les Handicaps',
    'knowledge.visual': 'Déficience Visuelle',
    'knowledge.hearing': 'Déficience Auditive',
    'knowledge.mobility': 'Handicaps Moteurs',
    'knowledge.cognitive': 'Cognitif',
    'knowledge.neurodiversity': 'Neurodiversité',
    'knowledge.readMore': 'Lire Plus',
    'knowledge.article1.title': 'Aménagements pour Déficience Visuelle',
    'knowledge.article1.desc': 'Lecteurs d\'écran, logiciels de grossissement et adaptations du lieu de travail pour les employés malvoyants.',
    'knowledge.article2.title': 'Solutions d\'Accessibilité Auditive',
    'knowledge.article2.desc': 'Interprètes en langue des signes, services de sous-titrage et systèmes d\'alerte visuelle pour les travailleurs sourds.',
    'knowledge.article3.title': 'Stratégies de Support à la Mobilité',
    'knowledge.article3.desc': 'Accessibilité en fauteuil roulant, postes de travail ergonomiques et arrangements de travail flexibles.',
    'knowledge.article4.title': 'Support pour Handicap Cognitif',
    'knowledge.article4.desc': 'Simplification des tâches, aides mémoire et routines structurées pour les employés avec des défis cognitifs.',
    'knowledge.article5.title': 'Neurodiversité au Travail',
    'knowledge.article5.desc': 'Environnements adaptés à l\'autisme, aménagements TDAH et considérations sensorielles pour les individus neurodivers.',
    'knowledge.article6.title': 'Principes de Conception Universelle',
    'knowledge.article6.desc': 'Créer des espaces de travail inclusifs qui bénéficient à tous les employés.',
    
    // Chat Section
    'chat.title': 'Discutez avec',
    'chat.titleHighlight': 'l\'Assistant PLUSME',
    'chat.subtitle': 'Posez des questions sur les aménagements au travail et obtenez des recommandations personnalisées avec Groq AI',
    'chat.assistantName': 'PLUSME ASSISTANT',
    'chat.greeting': 'Bonjour! Je suis PLUSME, une plateforme IA conçue par MAYIBONGWE de NUST. Je peux vous aider à trouver des tâches et des aménagements adaptés en fonction des rôles professionnels et des handicaps spécifiques dans les lieux de travail. Comment puis-je vous aider aujourd\'hui?',
    'chat.you': 'Vous',
    'chat.userMessage': 'Je suis développeur logiciel avec une déficience visuelle. Quelles tâches me recommanderiez-vous?',
    'chat.placeholder': 'Tapez votre message ici...',
    
    // Tools Section
    'tools.title': 'Outils & Ressources',
    'tools.subtitle': 'Outils pratiques pour soutenir l\'inclusion au travail',
    'tools.useTool': 'Utiliser',
    'tools.assessment.title': 'Évaluation des Aménagements',
    'tools.assessment.desc': 'Évaluez les besoins du lieu de travail et obtenez des recommandations d\'aménagement personnalisées.',
    'tools.metrics.title': 'Métriques d\'Inclusion',
    'tools.metrics.desc': 'Suivez et mesurez les efforts d\'inclusion avec notre tableau de bord complet.',
    'tools.templates.title': 'Modèles de Politiques',
    'tools.templates.desc': 'Accédez à des modèles prêts à l\'emploi pour les politiques de lieu de travail inclusif.',
    'tools.training.title': 'Planificateur de Formation',
    'tools.training.desc': 'Planifiez et programmez des formations de sensibilisation au handicap pour votre équipe.',
    
    // Footer
    'footer.description': 'Favoriser l\'inclusion au travail grâce à une technologie IA avancée. Créer des environnements de travail accessibles et accommodants pour tous.',
    'footer.platform': 'Plateforme',
    'footer.resources': 'Ressources',
    'footer.contact': 'Contact',
    'footer.documentation': 'Documentation',
    'footer.tutorials': 'Tutoriels',
    'footer.blog': 'Blog',
    'footer.caseStudies': 'Études de Cas',
    'footer.aboutUs': 'À Propos',
    'footer.careers': 'Carrières',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    'footer.copyright': 'Tous droits réservés. Favoriser les lieux de travail inclusifs dans le monde entier.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const languageNames: Record<Language, string> = {
    en: 'English',
    sn: 'Shona',
    nd: 'isiNdebele',
    fr: 'Français',
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageNames }}>
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
