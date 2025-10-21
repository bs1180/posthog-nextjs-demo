import { useEffect, useState } from "react";
import posthog from "posthog-js";

/**
 * Custom hook to manage PostHog consent. There's no need to manage this behaviour elsewhere, the opt out here will override everything else.
 * @param consent - Whether consent is granted or not.
 * @returns An object with the consent status.
 */
export const usePostHogConsent = () => {
  const [optedIn, setOptedIn] = useState(false);

  useEffect(() => {
    if (optedIn) {
      console.log("PostHog consent granted");
      posthog.opt_in_capturing();
    } else {
      console.log("PostHog consent denied");
      posthog.opt_out_capturing();
    }
  }, [optedIn]);

  return [optedIn, setOptedIn] as const;
};
