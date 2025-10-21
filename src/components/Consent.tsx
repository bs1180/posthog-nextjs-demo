"use client";

import { usePostHogConsent } from "@/hooks/usePostHogConsent";

export default function Consent() {
  const [consent, setConsent] = usePostHogConsent();

  return (
    <div className="container mb">
      <h3>Consent</h3>
      <div>
        The visitor&apos;s tracking consent can be kept separate from their
        identity.
      </div>
      <div>
        {consent ? (
          <>✅ The visitor has given consent and events will flow to PH</>
        ) : (
          <>
            ❌ The user has not given consent and no events will be sent to PH
          </>
        )}
      </div>
      <button className="btn-primary" onClick={() => setConsent(!consent)}>
        Toggle Consent
      </button>
    </div>
  );
}
