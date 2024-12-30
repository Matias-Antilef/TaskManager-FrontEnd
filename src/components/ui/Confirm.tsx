import { ReactNode } from "react";

function Button({ children }: { children: ReactNode }) {
  return <button className=""> {children} </button>;
}
export default Button;
