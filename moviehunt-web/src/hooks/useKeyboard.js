import { useEffect } from "react";
import KEY_CODES from "@src/const/keyCodes";

export default function useKeyboard(
  {
    onEnter = () => {},
    onEscape = () => {},
    onUp = () => {},
    onDown = () => {},
    ref = { current: document },
  },
  deps = [onEnter, onEscape, onUp, onDown]
) {
  const listener = (e) => {
    if (
      document.activeElement.hasAttribute("contenteditable") ||
      document.activeElement.tagName === "TEXTAREA"
    )
      return;

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        return onEnter(e);
      case KEY_CODES.ESCAPE:
        return onEscape(e);
      case KEY_CODES.UP:
        return onUp(e);
      case KEY_CODES.DOWN:
        return onDown(e);
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, deps);
}
