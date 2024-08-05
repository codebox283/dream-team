import React, { useEffect, useState, useRef } from 'react';
import './scroll.css';
const ScrollToShow = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(Number(entry.target.dataset.index));
          }
        });
      },
      {
        threshold: 0.5, // Adjust this threshold to suit your needs
      }
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div>
      <div className="fixed-element">
        {/* Content that stays in the same spot */}
        {currentSection === 0 && <div>Content for Section 1</div>}
        {currentSection === 1 && <div>Content for Section 2</div>}
        {currentSection === 2 && <div>Content for Section 3</div>}
      </div>
      <div className="scroll-container">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="scroll-section"
            data-index={index}
            ref={(el) => (sectionsRef.current[index] = el)}
          >
            <h2>Section {index + 1}</h2>
            <p>Content for Section {index + 1} goes here...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollToShow;
