import React from "react";

interface IProps {
  children: React.ReactNode,
  spead: number,
  color: string,
  opacity: number,
  transition: string,
}

interface IAttrs {
  size: number,
  left: number,
  top: number
}

interface IRipple {
  id: number,
  attrs: IAttrs
}

interface IRippleCore {
  ripple: IRipple,
  spead: number,
  color: string,
  opacity: number,
  transition: string,
  handleRippleEnd: any
}

export {
  IProps,
  IAttrs,
  IRipple,
  IRippleCore
}
