import Logo from "../icons/Logo";
import PrevArrow from "../icons/PrevArrow";
import { HeaderConfig } from "./types";

export const HEADER_CONFIG: HeaderConfig = {
  "/": () => <Logo />,
  "/order-confirm": (navigate) => <PrevArrow onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />,
} as const;
