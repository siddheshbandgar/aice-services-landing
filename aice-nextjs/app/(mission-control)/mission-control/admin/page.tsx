"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function AdminPage() {
  const seedDatabase = useMutation(api.seedData.seedDatabase);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await seedDatabase();
      setSeedResult(result);
    } catch (error) {
      console.error("Seeding failed:", error);
      setSeedResult({ error: error.toString() });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Mission Control Admin</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isSeeding ? "Seeding Database..." : "Seed Database"}
          </button>

          {seedResult && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(seedResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 text-center">
            <a
              href="/mission-control"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go to Mission Control Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}