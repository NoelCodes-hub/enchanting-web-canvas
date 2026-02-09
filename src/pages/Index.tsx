import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import KnowledgeBaseSection from '@/components/KnowledgeBaseSection';
import ChatSection from '@/components/ChatSection';
import ToolsSection from '@/components/ToolsSection';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <KnowledgeBaseSection />
          <ChatSection />
          <ToolsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
