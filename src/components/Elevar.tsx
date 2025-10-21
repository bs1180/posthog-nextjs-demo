"use client";

import { useAuth } from "@/contexts/AuthContext";
import posthog from "posthog-js";
import { useEffect } from "react";

export const Elevar = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      const customUserId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("CUSTOM_USER_ID="))
        ?.split("=")[1];

      console.log(customUserId);
      if (customUserId) {
        posthog.setPersonProperties({ elevarId: customUserId });
      }
    }
  }, [user]);

  return (
    <div className="container mb">
      <h3>Tracking Elevar ID </h3>
      <p>
        We get the Elevar ID from the CUSTOM_USER_ID cookie that is set in the
        middleware.
      </p>
      <p>
        We set the ID as a custom property on the PostHog person profile, so it
        can be used in the full range of PostHog Insights, Cohorts etc.
      </p>

      <p>
        User:
        {user ? <>✅</> : <>❌</>}
      </p>
    </div>
  );
};
