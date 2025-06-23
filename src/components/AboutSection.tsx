
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-campaign-navy dark:text-campaign-cream mb-4">
              About Suvash Lamichhane
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-campaign-navy dark:text-campaign-cream nepali-text mb-6">
              सुभाष लामिछानेको बारेमा
            </h3>
            <div className="w-24 h-1 bg-campaign-red mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 section-fade-in">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-campaign-navy dark:text-campaign-cream">
                  Current Vice President, NRNA Japan
                </h4>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Suvash Lamichhane has been a dedicated servant of the Nepali community 
                  in Japan, currently serving as Vice President of NRNA Japan. His journey 
                  from a passionate community member to a respected leader reflects his 
                  unwavering commitment to our shared values and aspirations.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-campaign-navy dark:text-campaign-cream">
                  A Bridge Between Two Cultures
                </h4>
                <p className="text-base leading-relaxed text-muted-foreground">
                  With deep roots in Nepali traditions and a profound understanding of 
                  Japanese society, Suvash has successfully navigated the complexities 
                  of maintaining our cultural identity while integrating into Japanese 
                  society. His experience makes him uniquely qualified to lead NRNA Japan 
                  into a new era of growth and unity.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-campaign-navy dark:text-campaign-cream">
                  Commitment to Service
                </h4>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Throughout his tenure as Vice President, Suvash has demonstrated 
                  exceptional leadership in organizing community events, supporting 
                  new arrivals, and advocating for the rights and welfare of Nepali 
                  residents. His vision extends beyond immediate needs to building 
                  sustainable support systems for future generations.
                </p>
              </div>

              {/* Key Achievements */}
              <div className="bg-campaign-cream/50 dark:bg-campaign-navy/20 p-6 rounded-lg">
                <h5 className="font-semibold text-campaign-navy dark:text-campaign-cream mb-3">
                  Key Values & Principles
                </h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-campaign-red mr-2">•</span>
                    Community unity and collective progress
                  </li>
                  <li className="flex items-start">
                    <span className="text-campaign-red mr-2">•</span>
                    Transparent and inclusive leadership
                  </li>
                  <li className="flex items-start">
                    <span className="text-campaign-red mr-2">•</span>
                    Cultural preservation and promotion
                  </li>
                  <li className="flex items-start">
                    <span className="text-campaign-red mr-2">•</span>
                    Support for professional and educational growth
                  </li>
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center section-fade-in">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-campaign-navy/10 to-campaign-red/10 rounded-lg flex items-center justify-center border border-campaign-navy/20 dark:border-campaign-cream/20">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-campaign-navy/20 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div className="space-y-2 px-6">
                      <h3 className="text-lg font-semibold text-campaign-navy dark:text-campaign-cream">
                        Community Engagement
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Working together with the Nepali community in Japan to build 
                        stronger connections and support networks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
