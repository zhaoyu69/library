import React, {useRef, useState} from 'react';
import styles from "./index.less";
import RippleCore from "@/Ripple/core";
import { IProps } from "@/Ripple/Interface";

export default (
  {
    children,
    spead = 1,
    color = "#fff",
    opacity = 0.3,
    transition = "ease-out",
  }: IProps
) => {
  const ref = useRef(null);
  const [id, setId] = useState(0);
  const [ripples, setRipples] = useState([]);

  function mousedown(event) {
    if(!ref.current) {
      return ;
    }
    const { left: innerX, top: innerY } = ref.current.getBoundingClientRect(); // 容器的坐标
    const { clientX: layerX, clientY: layerY } = event; // 点击点的坐标
    const positionX = layerX - innerX;
    const positionY = layerY - innerY; // 点击点的相对位置

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight; // 容器的宽高

    // 得到点击位置距离最远的点，计算出这两点之间的距离
    const square = x => x * x;
    const coordinates = [[0, 0], [width, 0], [0, height], [width, height]].map(coordinate => {
      return Math.sqrt(square(coordinate[0] - positionX) + square(coordinate[1] - positionY))
    });

    // 最长边即为半径
    const maxCoordinate = Math.max.apply({}, coordinates);

    const size = maxCoordinate * 2;
    const left = positionX - maxCoordinate;
    const top = positionY - maxCoordinate;

    const newId = id + 1;
    setId(newId);
    const newRipples = ripples.concat([{
      id: newId,
      attrs: {size, left, top}
    }]);
    setRipples(newRipples);
  }

  function handleRippleEnd(id) {
    const targetIndex = ripples.findIndex(ripple => ripple.id === id);
    if(targetIndex > -1) {
      const newRipples = [...ripples];
      newRipples.splice(targetIndex, 1);
      setRipples(newRipples);
    }
  }

  return <div
    className={styles.rippleWrap}
    onMouseDown={mousedown}
    ref={ref}
  >
    { children }
    <div className={styles.ripples}>
      {
        ripples.map(ripple => {
          return <RippleCore
              ripple={ripple}
              spead={spead}
              color={color}
              opacity={opacity}
              transition={transition}
              handleRippleEnd={handleRippleEnd}
            />
        })
      }
    </div>
  </div>;
}
