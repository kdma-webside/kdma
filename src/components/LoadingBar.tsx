"use client";

import NextTopLoader from "nextjs-toploader";

const LoadingBar = () => {
  return (
    <NextTopLoader
      color="#EAB308" // yellow-500/gold color
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #EAB308,0 0 5px #EAB308"
    />
  );
};

export default LoadingBar;
