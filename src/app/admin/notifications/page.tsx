"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Handshake,
  MessageSquare,
  Check,
  Clock,
  Trash2,
} from "lucide-react";

interface AdminNotification {
  id: string;
  type: "inquiry" | "order" | "partner" | "low_stock";
  title: string;
  message: string;
  read: boolean;
  time: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "NOTIF-01",
      type: "order",
      title: "New Transaction Order #WAT-2026-0089",
      message: "Tariq Mehmood confirmed deal on 1 Kanal Luxury Modern Villa. Deal Amount: PKR 85,000,000.",
      read: false,
      time: "10 mins ago",
    },
    {
      id: "NOTIF-02",
      type: "inquiry",
      title: "New High-Intent Client Inquiry",
      message: "Dr. Ayesha Siddiqui submitted inquiry on Maharaja Royal Chinioti Bed Set.",
      read: false,
      time: "45 mins ago",
    },
    {
      id: "NOTIF-03",
      type: "low_stock",
      title: "Low Stock Alert: Antique 8-Seater Dining Suite",
      message: "Inventory count reached 2 items left at Chiniot warehouse. Restock recommended.",
      read: false,
      time: "2 hours ago",
    },
    {
      id: "NOTIF-04",
      type: "partner",
      title: "New Partner Registration: Farhan Qureshi",
      message: "Royal Palm Hospitality applied for partner verification in Events & Catering sector.",
      read: true,
      time: "1 day ago",
    },
  ]);

  const [pushEnabled, setPushEnabled] = useState(true);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            System Alerts & Feed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Notifications Center ({unreadCount} Unread)
          </h1>
          <p className="text-xs text-slate-400">
            Real-time triggers for incoming orders, leads, inventory thresholds, and partner onboarding.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Push Notification Setting Strip */}
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Browser Push Notifications
          </h4>
          <p className="text-[11px] text-slate-400">
            Receive instant desktop alerts when a new client inquiry or order arrives.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPushEnabled(!pushEnabled)}
          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
            pushEnabled ? "bg-blue-600" : "bg-slate-800"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
              pushEnabled ? "right-1" : "left-1"
            }`}
          />
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 divide-y divide-slate-800 overflow-hidden">
        {notifications.map((n) => {
          const isUnread = !n.read;

          return (
            <div
              key={n.id}
              className={`p-6 flex items-start justify-between gap-4 transition-colors ${
                isUnread ? "bg-blue-950/20" : "hover:bg-slate-800/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-2xl shrink-0 mt-0.5 ${
                    n.type === "order"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : n.type === "inquiry"
                      ? "bg-blue-500/20 text-blue-400"
                      : n.type === "low_stock"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  {n.type === "order" && <ShoppingBag className="w-5 h-5" />}
                  {n.type === "inquiry" && <MessageSquare className="w-5 h-5" />}
                  {n.type === "low_stock" && <AlertTriangle className="w-5 h-5" />}
                  {n.type === "partner" && <Handshake className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    {isUnread && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{n.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono inline-block pt-1">
                    {n.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleRead(n.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  title={isUnread ? "Mark as Read" : "Mark as Unread"}
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                  title="Remove Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
