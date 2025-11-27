
import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      quote: "Creative designer and solid developer. You Delivered a beautiful site that matches our brand and works perfectly on mobile.",
      name: "K-Lab",
      title: "Tech Company",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/3077399db835491cc4874707bbc26a00440d3eba?placeholderIfAbsent=true"
    },
    {
      quote: "Professional and detail-focused. The new UI made our app easier to use and boosted customer engagement. Highly recommended.",
      name: "Dushimiyimana Elissa",
      title: "Software Engineer",
      avatar: "https://dtechel.web.app/assets/Profile-Buavt6d3.png"
    },
    {
      quote: "Great work! You've turned our messy ideas into a clean, fast website. Communication was clear and delivery was on time.",
      name: "Mbarushimana Eric",
      title: "IT Manager",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/3d9149a955847a9fbacd23298a663551b64cf177?placeholderIfAbsent=true"
    },
    {
      quote: "Fast, reliable, and friendly. You've fixed our site issues quickly and improved loading speed noticeably. Will hire again.",
      name: "Mugabo Jean Claude",
      title: "Software Development Manager",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/8d9120823a19797ad58a85e5d348a202957bb473?placeholderIfAbsent=true"
    }
  ];

  return (
    <section className="py-12 lg:py-16 border-b border-border">
      <div className="max-w-xl mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Customer <span className="text-primary">Reviews</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Real feedback from clients about design, development, and support 
          services across various project types and business sizes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <article key={index} className="bg-card border border-border rounded-xl p-5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
            <blockquote className="text-foreground mb-4 leading-relaxed text-sm group-hover:text-foreground/90 transition-colors">
              &quot;{review.quote}&quot;
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-foreground font-medium text-sm">{review.name}</div>
                <div className="text-primary text-xs">{review.title}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
