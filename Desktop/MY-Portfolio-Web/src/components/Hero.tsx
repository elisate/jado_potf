

import image from '../assets/personal-image.png';

const Hero = () => {
  return (
    <section className="pt-16 pb-10 lg:pt-20 lg:pb-12 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div className="order-2 lg:order-1 animate-fade-in">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              I'm JEAN DE DIEU DUSHIMIYIMANA.
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground mb-3">
              <span>FULLSTACK SOFTWARE DEVELOPER</span>
              <span>/</span>
              <span>MOBILE DEVELOPER</span>
              <span>/</span>
              <span>UI/UX DESIGNER</span>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg">
              I design and build websites and apps. I create clear,
              easy-to-use interfaces, responsive layouts, and reliable
              code. I focus on user needs, fast performance, and clean,
              modern design.
            </p>
            
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300">
              Explore My Work
            </button>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 animate-scale-in">
          <div className="relative">
            <img
              src={image}
              alt="JEAN DE DIEU DUSHIMIYIMANA Profile"
              className="mx-auto w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[550px] h-auto -mt-8 sm:-mt-12 lg:-mt-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
