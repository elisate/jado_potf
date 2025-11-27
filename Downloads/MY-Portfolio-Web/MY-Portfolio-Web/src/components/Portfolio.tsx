
import React from 'react';

const Portfolio = () => {
  const portfolioImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/3f0b310f993ac14c116e89cdef54b7e04914fdd4?placeholderIfAbsent=true",
    "https://res.cloudinary.com/dc6iwekzx/image/upload/v1756325888/lxfzyd3yvsobp4olya7t.jpg",
    "https://api.builder.io/api/v1/image/assets/TEMP/bfebfa533199fc56a3f67b161d5fee9ee6b4c014?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/ece51838444e908bf77b73648567f8eb7d0f88c4?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/c1f1e3256657e8bfad7cfda3dfe993d4863f894a?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/TEMP/0e040abc235b598d493fe22c5bfc502f7b52b7a2?placeholderIfAbsent=true"
  ];

  return (
    <section className="py-12 lg:py-16 border-b border-border">
      <div className="max-w-xl mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          My <span className="text-primary">Portfolio</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Recent projects showcasing web development, UI design, and full-stack applications. 
          Each project features modern design, responsive layouts, and optimized performance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            <img
              src={image}
              alt={`Portfolio project ${index + 1}`}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-semibold text-base block mb-2">View Project</span>
                <div className="w-12 h-0.5 bg-primary mx-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
