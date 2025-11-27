import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'dushimiyimanajde@gmail.com',
        reply_to: formData.email, // Add this line for reply-to functionality
        subject: `Portfolio Contact from ${formData.name}` // Add subject
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_32vzr4i',
        'template_zai399i',
        templateParams,
        'NfbXRsmASaMBWk777'
      );

      alert('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again or contact me directly at dushimiyimanajde@gmail.com');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      text: "+250789543888",
      href: "tel:+250789543888"
    },
    {
      icon: Mail,
      label: "Email",
      text: "dushimiyimanajde@gmail.com",
      href: "mailto:dushimiyimanajde@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      text: "Kigali, Rwanda",
      href: null
    }
  ];

  return (
    <section className="py-6 lg:py-8 border-b border-border" id="contact">
      <div className="max-w-lg mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Ready to start a project or have questions? Reach out and I'll
          respond quickly to discuss your needs and next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                required
                disabled={isLoading}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-xs disabled:opacity-50"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email Address"
                required
                disabled={isLoading}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-xs disabled:opacity-50"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter Message"
                required
                rows={3}
                disabled={isLoading}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-colors text-xs disabled:opacity-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
          
          <div className="bg-gradient-to-br from-card/50 to-secondary/30 border rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Contact Information
            </h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="group">
                    {contact.href ? (
                      <a 
                        href={contact.href} 
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">{contact.label}</p>
                          <p className="text-xs text-foreground group-hover:text-primary transition-colors">
                            {contact.text}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <IconComponent className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">{contact.label}</p>
                          <p className="text-xs text-foreground">{contact.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-muted-foreground">Usually responds within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block space-y-4">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
            <h3 className="text-xs font-semibold text-foreground mb-2">Let's Work Together</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              I'm always interested in new opportunities and exciting projects. 
              Whether you're a startup looking to build your MVP or an established 
              company seeking to enhance your digital presence, let's discuss how 
              we can collaborate.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Web Development</span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">UI/UX Design</span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Consultation</span>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
            <h3 className="text-xs font-semibold text-foreground mb-2">Quick Response</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I typically respond to messages within 24 hours. For urgent inquiries, 
              feel free to call me directly at +250789543888.
            </p>
          </div>

          <div className="bg-gradient-to-br from-secondary/30 to-muted/20 border border-border rounded-lg p-4">
            <h3 className="text-xs font-semibold text-foreground mb-2">Project Inquiry</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Have a specific project in mind? Let's discuss your requirements, timeline, and budget to create something amazing together.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <span className="text-xs text-primary font-medium">Free consultation available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;