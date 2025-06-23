
import { Card, CardContent } from '@/components/ui/card';

const VisionSection = () => {
  const visionPillars = [
    {
      icon: '🤝',
      title: 'Community Unity',
      titleNepali: 'समुदायिक एकता',
      description: 'Fostering stronger bonds among Nepali residents in Japan through inclusive events and collaborative initiatives that bring our diverse community together.'
    },
    {
      icon: '🛡️',
      title: 'Support Services',
      titleNepali: 'सहायता सेवाहरू',
      description: 'Establishing comprehensive support systems for new arrivals, including language assistance, legal guidance, and professional networking opportunities.'
    },
    {
      icon: '🎭',
      title: 'Cultural Promotion',
      titleNepali: 'सांस्कृतिक प्रवर्धन',
      description: 'Preserving and celebrating our rich Nepali heritage while building cultural bridges with Japanese society through festivals and educational programs.'
    },
    {
      icon: '📚',
      title: 'Education & Growth',
      titleNepali: 'शिक्षा र विकास',
      description: 'Creating opportunities for skill development, professional advancement, and educational excellence for all community members and their families.'
    },
    {
      icon: '💬',
      title: 'Transparent Leadership',
      titleNepali: 'पारदर्शी नेतृत्व',
      description: 'Ensuring open communication, accountability, and democratic participation in all NRNA Japan decisions and community initiatives.'
    },
    {
      icon: '🌐',
      title: 'Global Connections',
      titleNepali: 'विश्वव्यापी सम्पर्क',
      description: 'Strengthening ties with NRNA chapters worldwide and creating opportunities for international collaboration and knowledge exchange within the global Nepali diaspora.'
    }
  ];

  return (
    <section id="vision" className="py-20 bg-campaign-cream/30 dark:bg-campaign-charcoal/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-campaign-navy dark:text-campaign-cream mb-4">
              My Vision for NRNA Japan
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-campaign-navy dark:text-campaign-cream nepali-text mb-6">
              एनआरएनए जापानको लागि मेरो भिजन
            </h3>
            <div className="w-24 h-1 bg-campaign-red mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Together, we will build a stronger, more united NRNA Japan that serves as a beacon 
              of hope and support for all Nepali residents, while fostering meaningful connections 
              with our Japanese hosts and the global Nepali diaspora.
            </p>
          </div>

          {/* Vision Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visionPillars.map((pillar, index) => (
              <Card 
                key={index} 
                className="bg-background/50 backdrop-blur-sm border-campaign-navy/20 dark:border-campaign-cream/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 section-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-campaign-navy dark:text-campaign-cream">
                      {pillar.title}
                    </h4>
                    <h5 className="text-lg font-semibold text-campaign-red nepali-text">
                      {pillar.titleNepali}
                    </h5>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center section-fade-in">
            <div className="bg-gradient-to-r from-campaign-navy to-campaign-red p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission Statement</h3>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                "To create an inclusive, supportive, and thriving community where every Nepali 
                resident in Japan can achieve their full potential while maintaining their 
                cultural identity and contributing positively to Japanese society."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
