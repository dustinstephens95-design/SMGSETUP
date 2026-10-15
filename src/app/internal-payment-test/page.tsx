"use client";

import { useState } from "react";

export default function InternalPaymentTest() {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function start() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/internal-payment-test", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error("Internal test checkout is not available.");
      window.location.assign(data.url);
    } catch {
      setError("The test is not enabled or the authorization code is incorrect.");
      setBusy(false);
    }
  }
  return <main style={{maxWidth:600, margin:"8vh auto",padding:24,fontFamily:"system-ui"}}>
    <h1>SMG internal payment verification</h1>
    <p>Authorized internal test only. Total is $1.00 plus any applicable tax. No products will ship. The test transaction can be refunded in Stripe; processing fees may not be returned.</p>
    <label htmlFor="testcode">Internal test authorization code</label>
    <input id="testcode" type="password" autoComplete="off" value={token} onChange={e=>setToken(e.target.value)} style={{display:"block",width:"100%",maxWidth:420,padding:12,marginTop:8,marginBottom:16}} />
    <button type="button" disabled={busy || !token} onClick={start} style={{padding:"12px 18px",cursor:"pointer"}}>{busy ? "Starting…" : "Open $1 Stripe checkout"}</button>
    {error && <p role="alert">{error}</p>}
    <p style={{marginTop:24}}><a href="/shop">Return to SMG store</a></p>
  </main>;
}
