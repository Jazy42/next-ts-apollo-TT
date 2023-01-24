import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { authenticatedVar } from "../../constants/helper";
import useGeTUser from "../../hooks/useGetMe";
import { GuardProps } from "./types";

const Guard = ({ children, excludedRoutes }: GuardProps) => {
  const authenticated = useReactiveVar(authenticatedVar);
  const { data: user, refetch } = useGeTUser();
  const router = useRouter();

  useEffect(() => {
    if (!excludedRoutes?.includes(router.pathname)) {
      refetch();
    }
  }, [router.pathname, refetch, excludedRoutes]);

  useEffect(() => {
    if (!authenticated && !excludedRoutes?.includes(router.pathname)) {
      router.push("/");
    }
  }, [authenticated, router, excludedRoutes]);
  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? (
        children
      ) : (
        <>{user && children}</>
      )}
    </>
  );
};

export default Guard;
