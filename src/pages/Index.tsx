import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import KnowledgeBaseSection from '@/components/KnowledgeBaseSection';
import ChatSection from '@/components/ChatSection';
import ToolsSection from '@/components/ToolsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
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
  );
};

export default Index;
