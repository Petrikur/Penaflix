import { useRouter } from "next/router";
import {useEffect, useState} from "react"

interface LoaderStyle{
    styles:string
}
export const Loader = ({styles}:LoaderStyle) => {
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath &&
      setLoading(false)
    

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen w-screen bg-black/70">
          <div
            className={styles}
            role="status"
          >
          </div>
            <span className="visually-hidden ml-2">Loading</span>
        </div>
      )}
    </div>
  );
};
