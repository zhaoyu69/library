import React, {useEffect, useRef, useState} from 'react';
import styles from "@/Ripple/index.less";
import {IRippleCore} from "@/Ripple/Interface";

export default function RippleCore({ripple, spead, color, opacity, transition, handleRippleEnd} : IRippleCore) {
  const { id, attrs } = ripple;
  const { size, left, top } = attrs;
  const [transform, setTransform] = useState(0);
  const timers = useRef({
    transform: null,
    rippling: null
  });

  useEffect(() => {
    timers.current.transform = setTimeout(() => {
      setTransform(1);
    }, 0);
    timers.current.rippling = setTimeout(() => {
      handleRippleEnd(id);
    }, spead * 1000);

    return () => {
      if(timers.current.transform) {
        clearTimeout(timers.current.transform);
        timers.current.transform = null
      }
      if(timers.current.rippling) {
        clearTimeout(timers.current.rippling);
        timers.current.rippling = null
      }
    }
  }, []);

  return (
    <div
      className={styles.rippleCore}
      style={{
        zIndex: id,
        opacity: opacity,
        top: `${top}px`,
        left: `${left}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `scale(${transform})`,
        backgroundColor: color,
        transitionDuration: `${spead}s, 0.4s`,
        transitionTimingFunction: `${transition}, ease-out`
      }}
    />
  );
}
