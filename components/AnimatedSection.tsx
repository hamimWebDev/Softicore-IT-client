import { FC, ReactNode } from 'react';
import { motion, Variant } from 'framer-motion';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const AnimatedSection: FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0.2,
  direction = 'up',
}) => {
  const [ref, controls, inView] = useAnimateOnScroll({ threshold: 0.1 });
  
  const directionVariants: Record<string, { hidden: Variant; visible: Variant }> = {
    up: {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    down: {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    left: {
      hidden: { x: -50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    right: {
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
  };
  
  const variants = directionVariants[direction];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;