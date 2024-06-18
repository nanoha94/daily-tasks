"use client";
import { useEventCallback } from "@mui/material";
import { useEffect, useState } from "react";

export const mediaQuery = {
  md: "min-width: 768px",
};

export const useMediaQuery = (query: string) => {
  const formattedQuery = `(${query})`;
  const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setMatch(() => matchMedia(formattedQuery).matches);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mql = matchMedia(formattedQuery);

    if (mql.media === "not all" || mql.media === "invalid") {
      console.error(`useMediaQuery Error: Invalid media query`);
    }

    mql.onchange = (e) => {
      setMatch(e.matches);
    };

    return () => {
      mql.onchange = null;
    };
  }, [formattedQuery, setMatch]);

  return match;
};
