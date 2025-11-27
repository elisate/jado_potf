
import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/1130694cdca0f95f249c40d54ae92ee7f0eb3a8e?placeholderIfAbsent=true",
      title: "UI DESIGN",
      description: "I create clean, user-focused interfaces that make apps and websites easy to use. I wireframe, prototype, and test designs to ensure users can reach their goals quickly and enjoy the experience.",
      zIndex: false
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/ebc78632da298e50d26e678141cb7aad42a4ca80?placeholderIfAbsent=true",
      title: "WEB DESIGN",
      description: "I design attractive, modern websites that match your brand. I focus on layout, color, typography, and visual hierarchy so your site looks professional and builds trust with visitors.",
      zIndex: true
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/7192ffbb4c6073de76be9af353753de57c638998?placeholderIfAbsent=true",
      title: "FRONTEND DEVELOPMENT",
      description: "I turn designs into responsive, accessible websites using HTML, CSS, and JavaScript. I ensure pages load fast, work well on all devices, and provide smooth interactions for users.",
      zIndex: false
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/0f7834557702774f6d6ee545278f0555280e5f6e?placeholderIfAbsent=true",
      title: "BACKEND DEVELOPMENT",
      description: "I build reliable server-side systems, APIs, and databases to power your site or app. I focus on security, performance, and scalability so your project runs smoothly as it grows.",
      zIndex: true
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/5f5be059c8b6682045f43338bffd8d0d113c6121?placeholderIfAbsent=true",
      title: "MAINTENANCE & OPTIMIZATION",
      description: "I offer ongoing support, updates, and performance improvements. I fix bugs, keep software up to date, and optimize speed so your site remains secure and fast over time.",
      zIndex: false
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/cb619138bf6003711a33c3f0dfc877982297e3ec?placeholderIfAbsent=true",
      title: "RESPONSIVE & ACCESSIBLE DESIGN",
      description: "I make sure sites work on phones, tablets, and desktops, and follow accessibility best practices. This helps more people use your site and improves search visibility and user satisfaction.",
      zIndex: true
    }
  ];

  return (
    <section className="py-12 lg:py-16 border-b border-border">
      <div className="max-w-xl mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          My <span className="text-primary">Services</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          I design intuitive user interfaces, create responsive websites, and
          develop fast, maintainable code. I focus on accessibility, clear
          visual design, and smooth user interactions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <article
            key={index}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <img
                src={service.icon}
                alt={`${service.title} icon`}
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-primary text-base font-semibold mb-2 group-hover:text-primary/80 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
