"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Filter,
} from "lucide-react";
import { INITIAL_NOTIFICATIONS, NotificationItem } from "@/lib/firebase/admin-service";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<string>("all");

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === "unread") return !n.read;
    if (filterType !== "all") return n.type === filterType;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotifIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case "inquiry":
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case "low_stock":
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case "partner":
        return <Handshake className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
              Live System Broadcasts
            </span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {unreadCount} Unread Alerts
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Notifications & System Alerts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time feed of customer inquiries, transaction settlements, stock thresholds, and partner registrations.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap gap-1 text-xs">
        {[
          { id: "all", label: "All Alerts" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "order", label: "Deal Orders" },
          { id: "inquiry", label: "Inquiries" },
          { id: "low_stock", label: "Stock Warnings" },
          { id: "partner", label: "Partner Registrations" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              filterType === tab.id
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800/60 shadow-xl">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors ${
                !notif.read ? "bg-slate-950/60" : ""
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-2xl shrink-0 border ${
                    notif.type === "order"
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : notif.type === "inquiry"
                      ? "bg-blue-500/10 border-blue-500/20"
                      : notif.type === "low_stock"
                      ? "bg-rose-500/10 border-rose-500/20"
                      : "bg-amber-500/10 border-amber-500/20"
                  }`}
                >
                  {getNotifIcon(notif.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                    {notif.link && (
                      <Link
                        href={notif.link}
                        className="text-blue-400 hover:underline font-bold"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-slate-500 text-xs">
            No notifications found under this filter.
          </div>
        )}
      </div>
    </div>
  );
}
