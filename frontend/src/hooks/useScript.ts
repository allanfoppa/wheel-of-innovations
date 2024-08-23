
import { useEffect } from 'react';

type UseScriptProps = string;

const useScript = (url: UseScriptProps): void => {
  useEffect(() => {
    const script = document.createElement('script') as HTMLScriptElement;

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;
