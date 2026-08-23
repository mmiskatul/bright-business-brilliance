"use client";

import { useEffect, useState } from "react";
import {
  Database,
  Server,
  ShoppingBag,
  CheckCircle,
  Clock,
  RefreshCw,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Star,
  Users,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { toast } from "sonner";

interface InquiryItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "in_review" | "contacted" | "completed" | "archived";
  createdAt: string;
  source?: string;
}

interface HealthStatus {
  status: string;
  uptime: number;
  database: {
    connected: boolean;
    readyState: number;
    host: string;
    name: string;
    uri: string;
  };
  framework: string;
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Health
      const healthRes = await fetch("/api/health");
      if (healthRes.ok) {
        const healthJson = await healthRes.json();
        setHealth(healthJson);
      }

      // 2. Fetch Inquiries / Orders
      const inqRes = await fetch("/api/inquiries");
      if (inqRes.ok) {
        const inqJson = await inqRes.json();
        setInquiries(inqJson.data || []);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
      toast.error("Failed to connect to Fastify API server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Order status updated to "${newStatus}"`);
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as any } : item)),
        );
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredInquiries =
    filterStatus === "all" ? inquiries : inquiries.filter((i) => i.status === filterStatus);

  return (
    <Section tone="surface">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="h-3.5 w-3.5" /> ASFA Design Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Order & Database Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Manage incoming jersey orders, monitor Fastify backend, and verify MongoDB database
            status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="http://localhost:5000/documentation"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors shadow-sm"
          >
            Fastify API Docs <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Fastify Backend
            </span>
            <Server className="h-5 w-5 text-emerald-700" />
          </div>
          <p className="mt-3 text-2xl font-bold text-neutral-900">
            {health?.framework || "Fastify"}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-muted-foreground">
              Status: {health?.status === "ok" ? "Online (Port 5000)" : "Connecting..."}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              MongoDB Database
            </span>
            <Database className="h-5 w-5 text-emerald-700" />
          </div>
          <p className="mt-3 text-2xl font-bold text-neutral-900">
            {health?.database?.connected ? "Connected" : "Active / Fallback"}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                health?.database?.connected ? "bg-emerald-500" : "bg-emerald-500"
              }`}
            ></span>
            <span className="text-muted-foreground truncate">
              {health?.database?.name && health.database.name !== "none"
                ? `DB: ${health.database.name}`
                : "URI: asfa_design"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Incoming Orders
            </span>
            <ShoppingBag className="h-5 w-5 text-emerald-700" />
          </div>
          <p className="mt-3 text-2xl font-bold text-neutral-900">{inquiries.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {inquiries.filter((i) => i.status === "new").length} pending confirmation
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Frontend Stack
            </span>
            <Layers className="h-5 w-5 text-emerald-700" />
          </div>
          <p className="mt-3 text-2xl font-bold text-neutral-900">Next.js 15+</p>
          <p className="mt-2 text-xs text-muted-foreground">App Router & Light Theme</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Recent Jersey Orders & Inquiries
            </h2>
            <p className="text-xs text-muted-foreground">
              Customer orders received from online form submissions stored in MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "new", "in_review", "contacted", "completed"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  filterStatus === st
                    ? "bg-emerald-700 text-white"
                    : "bg-white border border-border text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {filteredInquiries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-base font-bold text-neutral-900">No orders found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              {filterStatus === "all"
                ? "Place an order from the contact page or product page to see it appear here in real-time."
                : `No orders currently marked as "${filterStatus}".`}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredInquiries.map((inq) => (
              <div
                key={inq._id}
                className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft transition-all hover:shadow-lift"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-neutral-900">{inq.name}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          inq.status === "new"
                            ? "bg-emerald-100 text-emerald-900"
                            : inq.status === "in_review"
                              ? "bg-amber-100 text-amber-900"
                              : inq.status === "contacted"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {inq.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        Phone: <strong className="text-neutral-800">{inq.phone}</strong>
                      </span>
                      {inq.email && <span>Email: {inq.email}</span>}
                      <span>Received: {new Date(inq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-muted-foreground">Status:</label>
                    <select
                      value={inq.status}
                      onChange={(e) => updateStatus(inq._id, e.target.value)}
                      className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    >
                      <option value="new">New Order</option>
                      <option value="in_review">In Production</option>
                      <option value="contacted">Dispatched</option>
                      <option value="completed">Delivered</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 text-xs text-neutral-800 bg-neutral-50 p-4 rounded-xl border border-border/60">
                  <p className="font-bold text-neutral-900 mb-1">
                    Order Specification & Delivery Details:
                  </p>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-neutral-700">
                    {inq.message}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
