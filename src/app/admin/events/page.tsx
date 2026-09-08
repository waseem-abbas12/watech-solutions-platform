"use client";

import React, { useState } from "react";
import {
  Cake,
  Calendar,
  Clock,
  Search,
  Plus,
  Edit3,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  Users,
  Utensils,
} from "lucide-react";

interface EventRow {
  id: string;
  title: string;
  clientName: string;
  clientPhone: string;
  venue: string;
  eventDate: string; // YYYY-MM-DD
  packagePrice: number;
  capacity: number;
  menuType: "Desi" | "Chinese" | "BBQ" | "Continental";
  specialRequests?: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([
    {
      id: "EVT-301",
      title: "Barat Reception & Dinner",
      clientName: "Hamza Tariq",
      clientPhone: "0333 1122334",
      venue: "Grand Crystal Ballroom, Royal Palm Lahore",
      eventDate: "2026-09-14", // UPCOMING (< 7 days from 2026-09-09)
      packagePrice: 3800,
      capacity: 650,
      menuType: "Desi",
      specialRequests: "Live Jalebi counter and VIP floral stage setup.",
      status: "Confirmed",
    },
    {
      id: "EVT-302",
      title: "Corporate Annual Gala Dinner",
      clientName: "TechLogix Pakistan",
      clientPhone: "0300 5566778",
      venue: "Margalla View Marquee, Islamabad",
      eventDate: "2026-09-12", // UPCOMING (< 7 days)
      packagePrice: 4500,
      capacity: 400,
      menuType: "Continental",
      specialRequests: "Stage projector rigging and podium mic setup.",
      status: "Confirmed",
    },
    {
      id: "EVT-303",
      title: "Mehndi Night & Qawwali",
      clientName: "Shahid Afridi Family",
      clientPhone: "0321 9988776",
      venue: "Creek Heritage Hall & Live BBQ Lawn, Karachi",
      eventDate: "2026-10-20",
      packagePrice: 3200,
      capacity: 550,
      menuType: "BBQ",
      specialRequests: "Open lawn bonfire seating and live BBQ skewers.",
      status: "Pending",
    },
  ]);

  const [activeView, setActiveView] = useState<"table" | "calendar">("table");
  const [search, setSearch] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    clientPhone: "",
    venue: "Grand Crystal Ballroom, Lahore",
    eventDate: "2026-09-20",
    capacity: "500",
    menuType: "Desi" as "Desi" | "Chinese" | "BBQ" | "Continental",
    packagePrice: "3800",
    status: "Confirmed" as "Confirmed" | "Pending" | "Cancelled" | "Completed",
    specialRequests: "",
  });

  // Check if date is within next 7 days from today (2026-09-09)
  const isUpcomingWithin7Days = (dateStr: string): boolean => {
    const today = new Date("2026-09-09").getTime();
    const evtDate = new Date(dateStr).getTime();
    const diffDays = (evtDate - today) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 7;
  };

  const handleOpenEdit = (ev: EventRow) => {
    setEditingId(ev.id);
    setFormData({
      title: ev.title,
      clientName: ev.clientName,
      clientPhone: ev.clientPhone,
      venue: ev.venue,
      eventDate: ev.eventDate,
      capacity: String(ev.capacity),
      menuType: ev.menuType,
      packagePrice: String(ev.packagePrice),
      status: ev.status,
      specialRequests: ev.specialRequests || "",
    });
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      clientName: "",
      clientPhone: "",
      venue: "Grand Crystal Ballroom, Lahore",
      eventDate: "2026-09-20",
      capacity: "500",
      menuType: "Desi",
      packagePrice: "3800",
      status: "Confirmed",
      specialRequests: "",
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check double-booking slot collision
    const collision = events.find(
      (ev) =>
        ev.id !== editingId &&
        ev.venue === formData.venue &&
        ev.eventDate === formData.eventDate &&
        ev.status === "Confirmed"
    );

    if (collision) {
      alert(`Conflict Detected! ${formData.venue} is already booked on ${formData.eventDate} for "${collision.title}".`);
      return;
    }

    if (editingId) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingId
            ? {
                ...ev,
                title: formData.title,
                clientName: formData.clientName,
                clientPhone: formData.clientPhone,
                venue: formData.venue,
                eventDate: formData.eventDate,
                capacity: Number(formData.capacity),
                menuType: formData.menuType,
                packagePrice: Number(formData.packagePrice),
                status: formData.status,
                specialRequests: formData.specialRequests,
              }
            : ev
        )
      );
    } else {
      const newEvt: EventRow = {
        id: `EVT-${Math.floor(300 + Math.random() * 700)}`,
        title: formData.title,
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        venue: formData.venue,
        eventDate: formData.eventDate,
        capacity: Number(formData.capacity),
        menuType: formData.menuType,
        packagePrice: Number(formData.packagePrice),
        status: formData.status,
        specialRequests: formData.specialRequests,
      };
      setEvents([newEvt, ...events]);
    }
    setIsModalOpen(false);
  };

  const filteredEvents = events.filter((e) => {
    return (
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.clientName.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] font-mono">
            Hospitality & Banquet Schedule
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Events & Catering Bookings
          </h1>
          <p className="text-xs text-slate-400">
            Prevent double-bookings, monitor upcoming functions, and manage banquet menu packages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setActiveView("table")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeView === "table" ? "bg-orange-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setActiveView("calendar")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeView === "calendar" ? "bg-orange-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Calendar Schedule
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Book Event</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search event, client name, or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* TABLE VIEW */}
      {activeView === "table" && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Event Title</th>
                  <th className="py-4 px-4">Client Name</th>
                  <th className="py-4 px-4">Venue</th>
                  <th className="py-4 px-4">Event Date</th>
                  <th className="py-4 px-4">Package</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredEvents.map((ev, idx) => {
                  const upcoming = isUpcomingWithin7Days(ev.eventDate);

                  return (
                    <tr
                      key={ev.id}
                      className={
                        upcoming
                          ? "bg-orange-950/20 hover:bg-orange-950/30"
                          : idx % 2 === 0
                          ? "bg-slate-900"
                          : "bg-slate-900/50"
                      }
                    >
                      <td className="py-4 px-6 font-bold text-white max-w-xs truncate">
                        {ev.title}
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{ev.id}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        <div className="font-bold text-white">{ev.clientName}</div>
                        <div className="text-[10px] text-slate-500">{ev.clientPhone}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300 max-w-xs truncate">{ev.venue}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-200">{ev.eventDate}</span>
                          {upcoming && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                              Upcoming &lt; 7d
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-white">
                        PKR {ev.packagePrice.toLocaleString()}{" "}
                        <span className="text-[10px] text-slate-500 font-normal">/ head ({ev.menuType})</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            ev.status === "Confirmed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : ev.status === "Pending"
                              ? "bg-orange-500/20 text-orange-400"
                              : ev.status === "Completed"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {ev.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(ev)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this event booking?")) {
                                setEvents(events.filter((item) => item.id !== ev.id));
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CALENDAR VIEW */}
      {activeView === "calendar" && (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white">Upcoming Booking Slots (Double-Booking Protection)</h3>
            <span className="text-xs text-slate-400 font-mono">September - October 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-orange-600/20 text-orange-400 text-xs font-bold font-mono">
                    {ev.eventDate}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">Slot Locked</span>
                </div>
                <h4 className="font-bold text-white text-sm">{ev.title}</h4>
                <p className="text-xs text-slate-400">{ev.venue}</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Guest Count: {ev.capacity}</span>
                  <span className="font-bold text-white">{ev.clientName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Edit Event Reservation" : "Schedule New Event Booking"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Client Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1.5">Venue Location *</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Guest Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Menu Cuisine</label>
                  <select
                    value={formData.menuType}
                    onChange={(e) => setFormData({ ...formData, menuType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Desi">Desi Traditional</option>
                    <option value="Chinese">Chinese</option>
                    <option value="BBQ">Live BBQ</option>
                    <option value="Continental">Continental</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Package (PKR/head)</label>
                  <input
                    type="number"
                    value={formData.packagePrice}
                    onChange={(e) => setFormData({ ...formData, packagePrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1.5">Special Requests & Decor Notes</label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold"
                >
                  Confirm Event Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
