import { useState } from "react";

export default function useToggle(initial = false) {
  const [isToggled, setIsToggled] = useState(initial);
  function toggle() {
    setIsToggled(prev => !prev);
  }
  return [isToggled, toggle];
}
