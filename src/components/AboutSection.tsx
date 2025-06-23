
const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Spotlight Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-campaign-navy/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-campaign-red/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-campaign-gold/3 via-transparent to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Modern Header */}
          <div className="text-center mb-20 section-fade-in">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-campaign-red rounded-full"></div>
              <span className="text-sm font-semibold text-campaign-red uppercase tracking-wider">
                Leadership Profile
              </span>
              <div className="w-12 h-1 bg-campaign-red rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-campaign-navy dark:text-campaign-cream mb-6 leading-tight">
              Meet 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-campaign-navy via-campaign-red to-campaign-navy dark:from-campaign-cream dark:via-campaign-gold dark:to-campaign-cream">
                {" "}Suvash Lamichhane
              </span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-campaign-navy/80 dark:text-campaign-cream/80 nepali-text mb-8">
              सुभाष लामिछानेको बारेमा
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transforming vision into reality through dedicated leadership and unwavering commitment to our community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Modern Content Cards */}
            <div className="lg:col-span-7 space-y-8 section-fade-in">
              {/* Leadership Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-campaign-navy/5 to-campaign-red/5 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-campaign-navy/10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-campaign-navy to-campaign-red rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      🏆
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-campaign-navy dark:text-campaign-cream mb-2">
                        Current Vice President
                      </h4>
                      <p className="text-campaign-red font-semibold">NRNA Japan</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Leading with distinction as Vice President of NRNA Japan, Suvash has demonstrated 
                    exceptional leadership in fostering community unity and driving meaningful change. 
                    His proven track record speaks to his ability to translate vision into tangible results.
                  </p>
                </div>
              </div>

              {/* Cultural Bridge Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-campaign-red/5 to-campaign-gold/5 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-campaign-red/10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-campaign-red to-campaign-gold rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      🌏
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-campaign-navy dark:text-campaign-cream mb-2">
                        Cultural Ambassador
                      </h4>
                      <p className="text-campaign-red font-semibold">Nepal-Japan Bridge</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Masterfully bridging two rich cultures, Suvash embodies the perfect synthesis of 
                    Nepali heritage and Japanese integration. His deep understanding of both societies 
                    positions him uniquely to guide our community toward sustainable growth and harmony.
                  </p>
                </div>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: "🤝", title: "Unity & Collaboration", desc: "Building bridges across communities" },
                  { icon: "💡", title: "Innovation & Progress", desc: "Embracing change for growth" },
                  { icon: "🎯", title: "Transparent Leadership", desc: "Open communication always" },
                  { icon: "🌱", title: "Sustainable Development", desc: "Planning for future generations" }
                ].map((value, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-campaign-navy/3 to-campaign-red/3 rounded-xl blur-lg transition-all duration-300 group-hover:blur-xl"></div>
                    <div className="relative bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                      <div className="text-2xl mb-3">{value.icon}</div>
                      <h5 className="font-bold text-campaign-navy dark:text-campaign-cream mb-2">{value.title}</h5>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Visual Element */}
            <div className="lg:col-span-5 flex justify-center section-fade-in">
              <div className="relative group">
                {/* Floating rings */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-80 h-80 border-2 border-campaign-navy/10 rounded-full"></div>
                </div>
                <div className="absolute inset-4 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
                  <div className="w-72 h-72 border-2 border-campaign-red/10 rounded-full"></div>
                </div>
                
                {/* Central content */}
                <div className="relative w-80 h-80 bg-gradient-to-br from-white via-campaign-cream/20 to-white dark:from-campaign-charcoal dark:via-campaign-navy/20 dark:to-campaign-charcoal rounded-full flex items-center justify-center border border-border/20 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="text-center space-y-6 p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-campaign-navy to-campaign-red rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-3xl">🇳🇵</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-campaign-navy dark:text-campaign-cream">
                        Community Leader
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Dedicated to building stronger connections and fostering growth within 
                        the Nepali community in Japan
                      </p>
                      <div className="flex justify-center gap-2 mt-4">
                        <span className="text-2xl">🇯🇵</span>
                        <span className="text-xl">❤️</span>
                        <span className="text-2xl">🇳🇵</span>
                      </div>
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
