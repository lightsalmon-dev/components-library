import cn from "classnames";
import React, { FC, PropsWithChildren } from "react";

export const Grid: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cn("ls-grid")}>{children}</div>;
};
