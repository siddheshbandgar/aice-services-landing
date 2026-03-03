"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Tab = "users" | "subscriptions" | "alerts";

export default function AdminPage() {
  return (
    <Suspense>
      <AdminPanel />
    </Suspense>
  );
}

function AdminPanel() {
  const searchParams = useSearchParams();
  const debug = searchParams.get("debug") === "true";

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("subscriptions");
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addEmail, setAddEmail] = useState("");
  const [addName, setAddName] = useState("");
  const [addMsg, setAddMsg] = useState("");

  const [testEmail, setTestEmail] = useState("");
  const [testType, setTestType] = useState("welcome");
  const [testMsg, setTestMsg] = useState("");

  const [checkerResult, setCheckerResult] = useState("");
  const [checkerLoading, setCheckerLoading] = useState(false);

  const headers = useCallback(() => ({ "Content-Type": "application/json", "x-admin-password": password }), [password]);

  const fetchData = useCallback(async (t: Tab) => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/semifinals/admin?tab=${t}`, { headers: { "x-admin-password": password } });
      const j = await r.json();
      if (!j.ok) { setError(j.error || "Failed"); setData([]); return; }
      setData(j.data || []);
    } catch { setError("Network error"); } finally { setLoading(false); }
  }, [password]);

  useEffect(() => { if (authed) fetchData(tab); }, [authed, tab, fetchData]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/semifinals/admin?tab=auth_check", { headers: { "x-admin-password": password } });
    if (r.status === 401) { setError("Wrong password"); }
    else if (r.ok) { setAuthed(true); }
    else { setError("Server error — try again"); }
  }

  async function addSubscriber(e: React.FormEvent) {
    e.preventDefault();
    setAddMsg("");
    try {
      const r = await fetch("/api/semifinals/admin", { method: "POST", headers: headers(), body: JSON.stringify({ action: "add_subscriber", email: addEmail, name: addName }) });
      const j = await r.json();
      setAddMsg(j.ok ? `Added: ${addEmail}` : j.error);
      if (j.ok) { setAddEmail(""); setAddName(""); fetchData(tab); }
    } catch { setAddMsg("Network error"); }
  }

  async function sendTestEmail(e: React.FormEvent) {
    e.preventDefault();
    setTestMsg("");
    try {
      const r = await fetch("/api/semifinals/admin", { method: "POST", headers: headers(), body: JSON.stringify({ action: "test_email", email: testEmail, type: testType }) });
      const j = await r.json();
      setTestMsg(j.ok ? j.message : j.error);
    } catch { setTestMsg("Network error"); }
  }

  async function runChecker() {
    setCheckerLoading(true);
    setCheckerResult("");
    try {
      const r = await fetch("/api/semifinals/check-tickets?debug=true", { method: "POST" });
      const j = await r.json();
      setCheckerResult(JSON.stringify(j, null, 2));
    } catch { setCheckerResult("Network error"); } finally { setCheckerLoading(false); }
  }

  async function activateSub(id: string) {
    const r = await fetch("/api/semifinals/admin", { method: "POST", headers: headers(), body: JSON.stringify({ action: "activate_subscription", subscription_id: id }) });
    const j = await r.json();
    if (j.ok) fetchData(tab); else alert(j.error);
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-lg">
          <h1 className="text-xl font-bold text-gray-900">SemiMatch Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Enter admin password to continue</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-4 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          <button className="mt-3 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-bold text-white hover:bg-orange-400">Login</button>
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </form>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "subscriptions", label: "Subscriptions" },
    { key: "users", label: "Users" },
    { key: "alerts", label: "Alerts Sent" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-lg font-bold">SemiMatch Admin</h1>
          <button onClick={() => { setAuthed(false); setPassword(""); }} className="text-sm text-gray-400 hover:text-red-500">Logout</button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold">Add Subscriber (manual)</h2>
          <form onSubmit={addSubscriber} className="mt-3 flex flex-wrap items-end gap-3">
            <input value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="Name (optional)" className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-500" />
            <input type="email" required value={addEmail} onChange={(e) => setAddEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-500" />
            <button className="rounded-lg bg-green-600 px-5 py-2 text-sm font-bold text-white hover:bg-green-500">Add & Activate</button>
          </form>
          {addMsg && <p className="mt-2 text-xs text-green-700">{addMsg}</p>}
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold">Send Test Email</h2>
          <form onSubmit={sendTestEmail} className="mt-3 flex flex-wrap items-end gap-3">
            <input type="email" required value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="Recipient email" className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-500" />
            <select value={testType} onChange={(e) => setTestType(e.target.value)} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-orange-500">
              <option value="welcome">Welcome Email</option>
              <option value="tickets_live">Tickets LIVE Email</option>
              <option value="sold_out">Sold Out Email</option>
            </select>
            <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-500">Send Test</button>
          </form>
          {testMsg && <p className="mt-2 text-xs text-blue-700">{testMsg}</p>}
        </div>

        {debug && (
          <div className="mt-4 rounded-2xl border border-dashed border-red-300 bg-red-50 p-5">
            <h2 className="text-base font-bold text-red-700">Debug: Run Ticket Checker</h2>
            <p className="mt-1 text-xs text-red-500">This triggers the same endpoint QStash calls every 3 min. If tickets are live, it WILL send real emails to all active subscribers.</p>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={runChecker} disabled={checkerLoading} className="rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-500 disabled:opacity-50">
                {checkerLoading ? "Running..." : "Run Checker Now"}
              </button>
            </div>
            {checkerResult && (
              <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-white p-3 text-xs text-gray-700">{checkerResult}</pre>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${tab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border bg-white shadow-sm">
          {loading ? (
            <p className="p-6 text-center text-sm text-gray-400">Loading...</p>
          ) : error ? (
            <p className="p-6 text-center text-sm text-red-500">{error}</p>
          ) : data.length === 0 ? (
            <p className="p-6 text-center text-sm text-gray-400">No data yet</p>
          ) : tab === "subscriptions" ? (
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Paid</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((row: Record<string, unknown>) => {
                  const users = row.users as Record<string, unknown> | null;
                  const events = row.events as Record<string, unknown> | null;
                  return (
                    <tr key={String(row.id)} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{String(users?.email || "—")}</td>
                      <td className="px-4 py-3">{String(users?.name || "—")}</td>
                      <td className="px-4 py-3">{String(events?.title || "—")}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.status === "active" ? "bg-green-100 text-green-700" : row.status === "pending_stripe" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                          {String(row.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">₹{String(row.paid_amount || 0)}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{row.created_at ? new Date(String(row.created_at)).toLocaleDateString("en-IN") : "—"}</td>
                      <td className="px-4 py-3">
                        {row.status !== "active" && (
                          <button onClick={() => activateSub(String(row.id))} className="rounded bg-orange-500 px-3 py-1 text-xs font-bold text-white hover:bg-orange-400">
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : tab === "users" ? (
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((row: Record<string, unknown>) => (
                  <tr key={String(row.id)} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{String(row.email)}</td>
                    <td className="px-4 py-3">{String(row.name || "—")}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{row.created_at ? new Date(String(row.created_at)).toLocaleDateString("en-IN") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Sent At</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((row: Record<string, unknown>) => {
                  const users = row.users as Record<string, unknown> | null;
                  const events = row.events as Record<string, unknown> | null;
                  return (
                    <tr key={String(row.id)} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{String(users?.email || "—")}</td>
                      <td className="px-4 py-3">{String(events?.title || "—")}</td>
                      <td className="px-4 py-3">{String(row.channel || "email")}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{row.sent_at ? new Date(String(row.sent_at)).toLocaleString("en-IN") : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">{data.length} records &middot; <button onClick={() => fetchData(tab)} className="text-orange-500 hover:underline">Refresh</button></p>
      </div>
    </div>
  );
}
