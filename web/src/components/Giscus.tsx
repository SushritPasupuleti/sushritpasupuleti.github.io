import React, { useEffect } from "react";

interface GiscusProps {
  theme?: "light" | "dark";
}

const Giscus: React.FC<GiscusProps> = ({ theme = "light" }) => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    // Set all data attributes
    script.setAttribute("data-repo", "SushritPasupuleti/sushritpasupuleti.github.io");
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkxNDA5NjM0MzM=");
    script.setAttribute("data-category", "Q&A");
    script.setAttribute("data-category-id", "DIC_kwDOCGbuac4C_VfO");
    script.setAttribute("data-mapping", "og:title");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
    //   theme === "dark" ? "catppuccin_mocha" : "catppuccin_latte"
    theme === "dark" ? "dark" : "light"
    );
    script.setAttribute("data-lang", "en");
    // script.setAttribute("data-loading", "lazy");

    // Append script to the container
    const giscusContainer = document.getElementById("giscus-container");
    if (giscusContainer) {
      giscusContainer.appendChild(script);
    }
  }, [theme]);

  return <div id="giscus-container" style={{ marginTop: "2rem" }} />;
};

export default Giscus;
