import { useSpring, animated } from "@react-spring/web";
const AnimatedNumber = ({ endValue }: { endValue: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: endValue },
    config: { duration: 1500 }, // Adjust the duration as needed
  });

  return (
    <animated.span>{number.interpolate((val) => val.toFixed(0))}</animated.span>
  );
};

export default AnimatedNumber;
