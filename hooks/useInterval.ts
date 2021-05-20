import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, timer: number) {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, timer || 1000);
    return () => clearInterval(id);
  }, [timer]);
}
