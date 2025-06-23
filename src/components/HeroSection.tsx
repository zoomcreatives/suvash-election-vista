
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campaign-cream to-background dark:from-campaign-charcoal dark:to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-campaign-navy dark:text-campaign-cream nepali-text leading-relaxed">
                सुभाष लामिछानेलाई अत्याधिक बहुमतले विजयी गराऔं ।
              </h1>
              <div className="text-lg md:text-xl font-semibold text-campaign-red">
                #iamwithSuvashLamichhane
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-campaign-navy dark:text-campaign-cream">
                Candidate for President
              </h2>
              <p className="text-lg text-campaign-navy/80 dark:text-campaign-cream/80">
                NRNA Japan (2025-2027)
              </p>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Committed to strengthening our Nepali community in Japan through unity, 
              support services, and cultural preservation. Together, we will build a 
              brighter future for all Nepali residents in Japan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-campaign-red hover:bg-campaign-red/90 text-white font-semibold px-8 py-3"
                onClick={() => scrollToSection('contact')}
              >
                Support Suvash
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-campaign-navy text-campaign-navy hover:bg-campaign-navy hover:text-white dark:border-campaign-cream dark:text-campaign-cream dark:hover:bg-campaign-cream dark:hover:text-campaign-navy px-8 py-3"
                onClick={() => scrollToSection('about')}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Candidate Photo */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              <div className="w-80 h-96 md:w-96 md:h-[28rem] bg-gradient-to-br from-campaign-navy/10 to-campaign-red/10 rounded-lg flex items-center justify-center border-2 border-campaign-navy/20 dark:border-campaign-cream/20">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-campaign-navy/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-4xl">👤</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-campaign-navy dark:text-campaign-cream">
                      Suvash Lamichhane
                    </h3>
                    <p className="text-sm text-campaign-navy/70 dark:text-campaign-cream/70 nepali-text">
                      हाल उपाध्यक्ष, एनआरएनए जापान
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Current Vice President, NRNA Japan
                    </p>
                  </div>
                </div>
              </div>
              
              {/* NRNA Japan Logo placeholder */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-campaign-navy rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">NRNA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
