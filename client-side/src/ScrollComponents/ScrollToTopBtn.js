import React, { useState, useEffect } from "react";
import "./style.css";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      toggleVisibility();
    });
  });

  const toggleVisibility = () => {
    if (window.pageYOffset > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={() => scrollToTop()}>
          <div className="ChevUp">
            <FaChevronUp style={{ color: "white" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollToTopBtn;
