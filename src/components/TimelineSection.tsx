
const TimelineSection = () => {
  const timelineEvents = [
    {
      year: '2020',
      title: 'Joined NRNA Japan',
      titleNepali: 'एनआरएनए जापानमा सामेल',
      description: 'Began active involvement with NRNA Japan as a dedicated volunteer, organizing community events and supporting new arrivals.',
      type: 'start'
    },
    {
      year: '2021',
      title: 'Community Outreach Programs',
      titleNepali: 'सामुदायिक पहुँच कार्यक्रमहरू',
      description: 'Led several successful outreach programs to connect isolated community members and provide essential support services.',
      type: 'milestone'
    },
    {
      year: '2022',
      title: 'Cultural Festival Leadership',
      titleNepali: 'सांस्कृतिक महोत्सव नेतृत्व',
      description: 'Spearheaded the organization of major Nepali cultural festivals, strengthening community bonds and cultural preservation.',
      type: 'achievement'
    },
    {
      year: '2023',
      title: 'Elected Vice President',
      titleNepali: 'उपाध्यक्ष निर्वाचित',
      description: 'Elected as Vice President of NRNA Japan, bringing fresh perspectives and innovative approaches to community leadership.',
      type: 'promotion'
    },
    {
      year: '2024',
      title: 'Support System Expansion',
      titleNepali: 'सहायता प्रणाली विस्तार',
      description: 'Expanded support services including legal aid, language assistance, and professional networking for community members.',
      type: 'expansion'
    },
    {
      year: '2025',
      title: 'Presidential Campaign',
      titleNepali: 'राष्ट्रपति चुनावी अभियान',
      description: 'Launching campaign for NRNA Japan President with a vision to unite and strengthen our community for the future.',
      type: 'future'
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'start': return 'bg-campaign-navy';
      case 'milestone': return 'bg-campaign-red';
      case 'achievement': return 'bg-campaign-gold';
      case 'promotion': return 'bg-campaign-navy';
      case 'expansion': return 'bg-campaign-red';
      case 'future': return 'bg-gradient-to-r from-campaign-navy to-campaign-red';
      default: return 'bg-campaign-navy';
    }
  };

  return (
    <section id="timeline" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-campaign-navy dark:text-campaign-cream mb-4">
              My Journey with NRNA & the Community
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-campaign-navy dark:text-campaign-cream nepali-text mb-6">
              एनआरएनए र समुदायसँग मेरो यात्रा
            </h3>
            <div className="w-24 h-1 bg-campaign-red mx-auto"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-campaign-navy/20 dark:bg-campaign-cream/20"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } section-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full ${getEventColor(event.type)} flex items-center justify-center z-10`}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8 md:ml-0' : 'md:ml-8'
                  } md:w-5/12`}>
                    <div className="bg-card border border-campaign-navy/20 dark:border-campaign-cream/20 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${getEventColor(event.type)}`}>
                          {event.year}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-campaign-navy dark:text-campaign-cream mb-2">
                        {event.title}
                      </h4>
                      
                      <h5 className="text-lg font-semibold text-campaign-red nepali-text mb-3">
                        {event.titleNepali}
                      </h5>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center section-fade-in">
            <div className="bg-campaign-cream/50 dark:bg-campaign-navy/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-campaign-navy dark:text-campaign-cream mb-4">
                The Journey Continues
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                This timeline represents not just my personal journey, but our collective 
                progress as a community. Together, we have achieved remarkable milestones, 
                and together, we will reach even greater heights.
              </p>
              <div className="inline-flex items-center space-x-2 text-campaign-red font-semibold">
                <span>2025-2027: Leading NRNA Japan Forward</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
