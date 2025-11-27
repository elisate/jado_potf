
import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "UI/UX", level: 90 },
        { name: "HTML/CSS", level: 98 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "SQL", level: 85 },
        { name: "NOSQL", level: 80 },
        { name: "REST APIs", level: 90 }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 92 },
        { name: "Vercel", level: 85 },
        { name: "Mobile Developpment", level: 80 },
        { name: "Figma", level: 85 },
        { name: "Cloudinary", level: 80 },
        { name: "Expo Go", level: 95 }
      ]
    }
  ];

  return (
    <section className="py-10 lg:py-12 border-b border-border">
      <div className="max-w-lg mb-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3">
          Skills & <span className="text-primary">Technologies</span>
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A comprehensive overview of my technical expertise and proficiency levels across different technologies and tools.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-all duration-300">
            <h3 className="text-base font-semibold text-foreground mb-4 text-center">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary/80 h-1.5 rounded-full transition-all duration-1000 ease-out group-hover:from-primary group-hover:to-accent"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
