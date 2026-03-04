"use client";

import { useAuth } from "@/components/AuthProvider";
import StatusCard from "@/components/StatusCard";
import AgentChat from "@/components/AgentChat";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";

const DashboardMap = dynamic(() => import("@/components/DashboardMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg flex items-center justify-center">
      <p className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-dim)]">
        Loading map...
      </p>
    </div>
  ),
});

interface LocationData {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy?: number;
}

interface AgentHealth {
  status: string;
}

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [health, setHealth] = useState<AgentHealth | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  const fetchLocation = useCallback(async () => {
    try {
      const res = await fetch("/api/location");
      if (res.ok) {
        setLocation(await res.json());
        setLocationError(false);
      } else {
        setLocationError(true);
      }
    } catch {
      setLocationError(true);
    }
  }, []);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/agent/health");
      if (res.ok) {
        setHealth(await res.json());
      } else {
        setHealth({ status: "offline" });
      }
    } catch {
      setHealth({ status: "offline" });
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) setContacts(await res.json());
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    fetchLocation();
    fetchHealth();
    fetchContacts();

    const locationInterval = setInterval(fetchLocation, 60000);
    const healthInterval = setInterval(fetchHealth, 30000);
    const contactsInterval = setInterval(fetchContacts, 60000);

    return () => {
      clearInterval(locationInterval);
      clearInterval(healthInterval);
      clearInterval(contactsInterval);
    };
  }, [fetchLocation, fetchHealth, fetchContacts]);

  if (!user) return null;

  const isAdmin = user.role === "admin";
  const locationAge = location
    ? Math.round((Date.now() - location.timestamp) / 60000)
    : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-chakra)] text-2xl font-bold text-[var(--color-green)]">
          Dashboard
        </h1>
        <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] mt-1">
          Welcome back, {user.username}.
        </p>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard
          label="Agent"
          value={health?.status === "online" ? "Online" : "Offline"}
          color={
            health?.status === "online"
              ? "var(--color-green)"
              : "var(--color-red)"
          }
        />
        <StatusCard
          label="Location"
          value={
            locationError
              ? "No data"
              : locationAge !== null
                ? `${locationAge}m ago`
                : "Loading..."
          }
          color={
            locationError
              ? "var(--color-red)"
              : locationAge !== null && locationAge < 5
                ? "var(--color-green)"
                : "var(--color-amber)"
          }
        />
        <StatusCard
          label="Role"
          value={user.role}
          color="var(--color-cyan)"
        />
        <StatusCard
          label="Session"
          value="Active"
          color="var(--color-green)"
        />
      </div>

      {/* Main content grid */}
      <div className={`grid gap-6 ${isAdmin ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Map */}
        <div>
          <h2 className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)] mb-3">
            GPS Location
          </h2>
          {location ? (
            <DashboardMap
              lat={location.lat}
              lng={location.lng}
              timestamp={location.timestamp}
            />
          ) : (
            <div className="h-[400px] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg flex items-center justify-center">
              <p className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-dim)]">
                {locationError
                  ? "No location data available. Push from phone to begin."
                  : "Loading location..."}
              </p>
            </div>
          )}
        </div>

        {/* Agent Chat — admin only */}
        {isAdmin && (
          <div>
            <h2 className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)] mb-3">
              Gh0st Agent v2
            </h2>
            <AgentChat />
          </div>
        )}
      </div>

      {/* Contact submissions */}
      <div>
        <h2 className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)] mb-3">
          Contact Submissions
          {contacts.length > 0 && (
            <span className="ml-2 text-[var(--color-green)]">
              ({contacts.length})
            </span>
          )}
        </h2>
        {contacts.length === 0 ? (
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4">
            <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)]">
              No submissions yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {contacts.map((c, i) => (
              <div
                key={i}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-green)]">
                      {c.name}
                    </span>
                    <span className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-txt-dim)] ml-3">
                      {c.email}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)] whitespace-nowrap">
                    {new Date(c.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-outfit)] text-sm text-[var(--color-txt-sec)] whitespace-pre-wrap">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Infrastructure — admin only */}
      {isAdmin && (
        <div>
          <h2 className="font-[family-name:var(--font-fira)] text-sm text-[var(--color-txt-sec)] mb-3">
            Infrastructure
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "mcp-phone", host: "Pixel 6a" },
              { name: "mcp-kali", host: "Kali VM" },
              { name: "mcp-windows", host: "GPU Box" },
              { name: "mcp-memory", host: "Qdrant" },
              { name: "mcp-services", host: "Services" },
              { name: "Agent v2", host: ":8080" },
            ].map((server) => (
              <div
                key={server.name}
                className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-3"
              >
                <p className="font-[family-name:var(--font-fira)] text-xs text-[var(--color-cyan)]">
                  {server.name}
                </p>
                <p className="font-[family-name:var(--font-fira)] text-[10px] text-[var(--color-txt-dim)]">
                  {server.host}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
