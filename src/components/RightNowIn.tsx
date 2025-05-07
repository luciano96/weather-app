import { PropsWithChildren } from "react";

export const RightNowIn = ({ children }: PropsWithChildren) => (
  <div className="flex items-center flex-col">
    <h3>Right now in</h3>
    {children}
  </div>
);
