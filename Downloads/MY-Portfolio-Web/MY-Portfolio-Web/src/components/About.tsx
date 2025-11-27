import React from 'react';
import { Button } from '@/components/ui/button';

const About = () => {
  // Add the achievements array that was missing
  const achievements = [
    { number: "3+", label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "100%", label: "Success Rate" }
  ];

  return (
    <section className="py-10 lg:py-12 border-b border-border" style={{ marginTop: '20px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <div className="order-2 lg:order-1">
          <div className="max-w-lg mx-auto lg:mx-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate full-stack developer from Kigali, Rwanda, with over 3 years of experience 
                creating digital solutions that make a difference. My journey began with  Information system 
                degree, but my real education came from building real-world applications.
              </p>
              <p>
                What drives me is the intersection of beautiful design and powerful functionality. I believe 
                technology should be accessible, intuitive, and impactful. Whether it's a sleek user interface 
                or a robust backend system, I approach every project with curiosity and attention to detail.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or mentoring aspiring developers in my community. I'm always excited to collaborate 
                on projects that challenge me and create value for users.
              </p>
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="bg-[#151515] hover:bg-primary hover:text-primary-foreground transition-colors">
                Download Resume
              </Button>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg p-3 text-center hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
              >
                <div className="text-base md:text-lg font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Education</h3>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Diploma in Software Development</p>
              <p>Runda TSS School • 2024-2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;