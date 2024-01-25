import { useEffect, useRef } from "react";

export function useOutsideClick(handleOutside, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handleOutside();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handleOutside, listenCapturing]);

  return ref;
}
