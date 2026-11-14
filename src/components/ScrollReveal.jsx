"use client";

import { useInView, animated } from "@react-spring/web";

const ScrollReveal = ({
   children,
   className = "",
   direction = "up",
   once = true,
   delay = 0,
   enabled = true,
   threshold = "any",
   rootMargin = "0px 0px -100px 0px",
   animationConfig = {
      tension: 120,
      friction: 20,
   },
}) => {
   const transforms = {
      up: "translateY(60px)",
      down: "translateY(-60px)",
      left: "translateX(-80px)",
      right: "translateX(80px)",
      zoom: "scale(0.8)",
   };

   const [ref, springs] = useInView(
      () => ({
         from: {
            opacity: 0,
            transform: transforms[direction] || transforms.up,
         },
         to: {
            opacity: 1,
            transform: "translate(0px, 0px) scale(1)",
         },
         delay,
         immediate: !enabled,
         config: animationConfig,
      }),
      {
         rootMargin,
         once,
         amount: threshold,
      },
   );

   return (
      <animated.div
         ref={ref}
         style={springs}
         className={className}
      >
         {children}
      </animated.div>
   );
};

export default ScrollReveal;
