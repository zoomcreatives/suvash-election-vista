
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Thank you for your message!",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📞',
      label: 'Phone',
      value: '080 4133 6105',
      href: 'tel:+8180413361055'
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'suvash@nrnajapan.org',
      href: 'mailto:suvash@nrnajapan.org'
    },
    {
      icon: '🌐',
      label: 'NRNA Japan',
      value: 'www.nrnajapan.org',
      href: 'https://www.nrnajapan.org'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-campaign-cream/30 dark:bg-campaign-charcoal/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 section-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-campaign-navy dark:text-campaign-cream mb-4">
              Get in Touch & Show Your Support
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-campaign-navy dark:text-campaign-cream nepali-text mb-6">
              सम्पर्क गर्नुहोस् र आफ्नो समर्थन देखाउनुहोस्
            </h3>
            <div className="w-24 h-1 bg-campaign-red mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your voice matters in shaping the future of NRNA Japan. Whether you have questions, 
              suggestions, or want to volunteer for the campaign, I'm here to listen and work 
              together for our community's betterment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 section-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-campaign-navy dark:text-campaign-cream mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-campaign-navy/20 dark:border-campaign-cream/20">
                      <CardContent className="p-4">
                        <a 
                          href={info.href}
                          className="flex items-center space-x-4 hover:text-campaign-red transition-colors duration-200"
                        >
                          <span className="text-2xl">{info.icon}</span>
                          <div>
                            <p className="font-semibold text-campaign-navy dark:text-campaign-cream">
                              {info.label}
                            </p>
                            <p className="text-muted-foreground">{info.value}</p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Campaign Support */}
              <div className="bg-gradient-to-br from-campaign-navy to-campaign-red p-6 rounded-lg text-white">
                <h4 className="text-xl font-bold mb-4">Join Our Campaign</h4>
                <p className="mb-4 leading-relaxed">
                  Together, we can make a difference. Your support, whether through volunteering, 
                  spreading awareness, or simply voting, helps build a stronger NRNA Japan.
                </p>
                <div className="text-lg font-semibold">
                  #iamwithSuvashLamichhane
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-campaign-navy/10 dark:bg-campaign-cream/10 rounded-lg p-8 text-center">
                <span className="text-4xl mb-4 block">🗾</span>
                <h4 className="text-lg font-semibold text-campaign-navy dark:text-campaign-cream mb-2">
                  Serving Nepali Community Across Japan
                </h4>
                <p className="text-muted-foreground">
                  From Hokkaido to Okinawa, we're committed to serving every member of our community.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="section-fade-in">
              <Card className="border-campaign-navy/20 dark:border-campaign-cream/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-campaign-navy dark:text-campaign-cream mb-6">
                    Send a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-campaign-navy dark:text-campaign-cream mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-campaign-navy dark:text-campaign-cream mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-campaign-navy dark:text-campaign-cream mb-2">
                        Subject
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Message subject"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-campaign-navy dark:text-campaign-cream mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message here..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-campaign-red hover:bg-campaign-red/90 text-white font-semibold py-3"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
