"use client";

import React, { useState, useMemo } from "react";
import {
  Cake,
  Calendar as CalendarIcon,
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
  Download,
  Printer,
  CalendarDays,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { INITIAL_EVENTS, EventItem } from "@/lib/firebase/admin-service";
import { formatPKR, formatDate } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedMenu, setSelectedMenu] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    venue: "Grand Crystal Ballroom, Royal Palm Lahore",
    eventDate: "2026-09-20",
    packagePrice: "3500",
    capacity: "500",
    menuType: "Desi" as "Desi" | "Chinese" | "BBQ" | "Continental" | "Fusion",
    specialRequests: "",
    notes: "",
    status: "Confirmed" as "Confirmed" | "Pending" | "Cancelled" | "Completed",
  });

  const venueOptions = [
    "Grand Crystal Ballroom, Royal Palm Lahore",
    "Margalla View Marquee, Islamabad",
    "Heritage Haveli Courtyard, Lahore",
    "The Nishat Grand Banquet Hall, Emporium",
    "PC Marquee Rawalpindi",
  ];

  const menuTypes = ["Desi", "Chinese", "BBQ", "Continental", "Fusion"];

  // Check Upcoming Events (< 7 days from 2026-09-10)
  const isUpcoming = (dateString: string) => {
    try {
      const today = new Date("2026-09-10").getTime();
      const evtDate = new Date(dateString).getTime();
      const diffDays = (evtDate - today) / (1000 * 3600 * 24);
      return diffDays >= 0 && diffDays <= 7;
    } catch {
      return false;
    }
  };

  // Conflict Detection Validator
  const checkVenueConflict = (venue: string, date: string, currentId?: string) => {
    const conflict = events.find(
      (e) =>
        e.id !== currentId &&
        e.status !== "Cancelled" &&
        e.venue.trim().toLowerCase() === venue.trim().toLowerCase() &&
        e.eventDate === date
    );
    if (conflict) {
      return `CONFLICT DETECTED: "${conflict.venue}" is already booked on ${date} for "${conflict.title}" (Client: ${conflict.clientName})!`;
    }
    return null;
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        !searchQuery ||
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.clientPhone.includes(searchQuery);

      const matchesStatus =
        selectedStatus === "all" || evt.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesMenu =
        selectedMenu === "all" || evt.menuType.toLowerCase() === selectedMenu.toLowerCase();

      return matchesSearch && matchesStatus && matchesMenu;
    });
  }, [events, searchQuery, selectedStatus, selectedMenu]);

  // Modal Handlers
  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setConflictWarning(null);
    setFormData({
      title: "",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      venue: venueOptions[0],
      eventDate: "2026-09-25",
      packagePrice: "3500",
      capacity: "500",
      menuType: "Desi",
      specialRequests: "",
      notes: "",
      status: "Confirmed",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (evt: EventItem) => {
    setEditingEvent(evt);
    setConflictWarning(null);
    setFormData({
      title: evt.title,
      clientName: evt.clientName,
      clientPhone: evt.clientPhone,
      clientEmail: evt.clientEmail,
      venue: evt.venue,
      eventDate: evt.eventDate,
      packagePrice: String(evt.packagePrice),
      capacity: String(evt.capacity),
      menuType: evt.menuType,
      specialRequests: evt.specialRequests || "",
      notes: evt.notes || "",
      status: evt.status,
    });
    setIsModalOpen(true);
  };

  // Live validate on venue or date change
  const handleVenueOrDateChange = (venue: string, date: string) => {
    const warning = checkVenueConflict(venue, date, editingEvent?.id);
    setConflictWarning(warning);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.clientName || !formData.eventDate) {
      alert("Please fill in event title, client name, and date.");
      return;
    }

    // Check conflict
    const conflict = checkVenueConflict(formData.venue, formData.eventDate, editingEvent?.id);
    if (conflict && formData.status !== "Cancelled") {
      const proceed = confirm(
        `${conflict}\n\nDo you still want to force-save this double booking?`
      );
      if (!proceed) return;
    }

    const pkgPrice = Number(formData.packagePrice) || 0;
    const capacityNum = Number(formData.capacity) || 0;

    if (editingEvent) {
      // Edit
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === editingEvent.id
            ? {
                ...evt,
                title: formData.title,
                clientName: formData.clientName,
                clientPhone: formData.clientPhone,
                clientEmail: formData.clientEmail,
                venue: formData.venue,
                eventDate: formData.eventDate,
                packagePrice: pkgPrice,
                capacity: capacityNum,
                menuType: formData.menuType,
                specialRequests: formData.specialRequests,
                notes: formData.notes,
                status: formData.status,
              }
            : evt
        )
      );
    } else {
      // Add
      const newId = `EVT-${Math.floor(300 + Math.random() * 700)}`;
      const newEvt: EventItem = {
        id: newId,
        title: formData.title,
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        clientEmail: formData.clientEmail,
        venue: formData.venue,
        eventDate: formData.eventDate,
        packagePrice: pkgPrice,
        capacity: capacityNum,
        menuType: formData.menuType,
        specialRequests: formData.specialRequests,
        notes: formData.notes,
        images: ["/images/events/default.jpg"],
        status: formData.status,
        views: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setEvents([newEvt, ...events]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to cancel and remove this event booking?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_events_calendar",
      filteredEvents.map((e) => ({
        id: e.id,
        title: e.title,
        clientName: e.clientName,
        clientPhone: e.clientPhone,
        venue: e.venue,
        eventDate: e.eventDate,
        capacity: e.capacity,
        menuType: e.menuType,
        packagePrice: e.packagePrice,
        status: e.status,
      }))
    );
  };

  // Calendar Days generator for September 2026
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const dayNumber = i + 1;
    const dateStr = `2026-09-${String(dayNumber).padStart(2, "0")}`;
    const dayEvents = events.filter((e) => e.eventDate === dateStr);
    return { dayNumber, dateStr, events: dayEvents };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 font-mono">
              Sector Management
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {events.length} Booked Events
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Signature Events & Banquets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage hall bookings, catering menus, guest capacities, and conflict detection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-orange-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "calendar" ? "bg-orange-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Calendar View</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => printOrExportPDF("Watech Events Schedule")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Feature Guide & Rahnumai Banner */}
      <div className="bg-slate-900/90 border border-orange-500/20 p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-orange-500/20 text-orange-400">
              <Cake className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Events & Catering Module Rahnumai (How It Works):
            </h3>
          </div>
          <span className="text-[10px] text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
            Real Quotation System
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">1. Custom Menu Planning:</span>
            <p className="text-[11px] leading-relaxed">
              Wedding, Barat, Valima, ya corporate lunch ke mutabiq per-head items (Mutton Qorma, Dum Biryani, Live BBQ) client ki zaroorat ke mutabiq customize karein.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">2. No Fake Multipliers:</span>
            <p className="text-[11px] leading-relaxed">
              Seasonal raw material (mutton/chicken market rate) aur exact guest count ke hisaab se transparent pricing provide karein taake koi confusion na ho.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">3. Hall Dates & Capacity:</span>
            <p className="text-[11px] leading-relaxed">
              Calendar view se banquet dates reserve karein taake aik hi hall par double booking ka conflict na aye.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Highlight Banner (if any date < 7 days) */}
      {events.filter((e) => isUpcoming(e.eventDate)).length > 0 && (
        <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Upcoming Events Within 7 Days
              </h4>
              <p className="text-[11px] text-slate-400">
                You have {events.filter((e) => isUpcoming(e.eventDate)).length} major banquets
                scheduled this week. Ensure catering and venue stage confirmations are ready.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {events
              .filter((e) => isUpcoming(e.eventDate))
              .map((e) => (
                <span
                  key={e.id}
                  className="px-2.5 py-1 rounded-lg bg-orange-600/20 text-orange-300 border border-orange-500/30 text-xs font-mono font-bold"
                >
                  {e.eventDate}: {e.clientName}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event title, client, venue, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Menu Packages</option>
              {menuTypes.map((m) => (
                <option key={m} value={m}>
                  {m} Menu
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main View Mode Render */}
      {viewMode === "table" ? (
        /* Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-4">Event Title & Venue</th>
                  <th className="p-4">Client Contact</th>
                  <th className="p-4">Event Date</th>
                  <th className="p-4">Guests & Menu</th>
                  <th className="p-4">Per Head Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((evt) => {
                    const upcoming = isUpcoming(evt.eventDate);
                    return (
                      <tr
                        key={evt.id}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          upcoming ? "bg-orange-950/15" : ""
                        }`}
                      >
                        <td className="p-4">
                          <div className="font-bold text-white text-sm hover:text-orange-400 transition-colors">
                            {evt.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[260px]">
                            {evt.venue}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-200">{evt.clientName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {evt.clientPhone}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-mono font-bold text-slate-200">
                            {formatDate(evt.eventDate)}
                          </div>
                          {upcoming && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-orange-400 font-bold">
                              <Clock className="w-3 h-3" />
                              <span>Upcoming (&lt;7 days)</span>
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-slate-300 font-medium">
                            <Users className="w-3.5 h-3.5 text-slate-500" />
                            <span>{evt.capacity} Guests</span>
                          </div>
                          <div className="text-[11px] text-orange-400 font-semibold mt-0.5">
                            {evt.menuType} Catering
                          </div>
                        </td>
                        <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                          PKR {evt.packagePrice} / head
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              evt.status === "Confirmed"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : evt.status === "Pending"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : evt.status === "Completed"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            }`}
                          >
                            {evt.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(evt)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-slate-800 transition-colors"
                              title="Edit Event"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(evt.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                              title="Delete / Cancel"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                      No events match your current filter settings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Interactive Calendar Month Grid (September 2026) */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              September 2026 Schedule
            </h3>
            <span className="text-xs text-slate-400">Click any event badge to edit or reschedule</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-bold text-[10px] uppercase tracking-wider text-slate-500 py-2 border-b border-slate-800"
              >
                {day}
              </div>
            ))}

            {/* Empty slots before Sep 1 (Sep 1, 2026 was Tuesday) */}
            <div className="h-24 bg-slate-950/30 rounded-xl border border-slate-800/40 p-1.5 opacity-30" />
            <div className="h-24 bg-slate-950/30 rounded-xl border border-slate-800/40 p-1.5 opacity-30" />

            {/* Calendar Days */}
            {calendarDays.map((day) => {
              const hasEvents = day.events.length > 0;
              return (
                <div
                  key={day.dayNumber}
                  className={`min-h-24 rounded-xl border p-2 flex flex-col justify-between transition-colors ${
                    hasEvents
                      ? "bg-slate-950 border-orange-500/30 hover:border-orange-500/60"
                      : "bg-slate-950/60 border-slate-800/60 hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {day.dayNumber}
                    </span>
                    {hasEvents && (
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-1 my-1">
                    {day.events.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => handleOpenEditModal(e)}
                        className="w-full text-left p-1 rounded bg-orange-600/20 hover:bg-orange-600/40 border border-orange-500/30 text-[10px] font-bold text-orange-300 truncate transition-colors cursor-pointer"
                        title={`${e.title} - ${e.venue}`}
                      >
                        {e.title}
                      </button>
                    ))}
                  </div>

                  <div className="text-[9px] text-slate-600 text-right">
                    {hasEvents ? `${day.events.length} booked` : "Available"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  {editingEvent ? "Edit Event Booking" : "Add New Event Reservation"}
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in banquet venue, guest headcount, catering menu, and conflict checks.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conflict Detection Banner */}
            {conflictWarning && (
              <div className="bg-rose-950/30 border border-rose-500/50 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Venue Scheduling Conflict!</div>
                  <div>{conflictWarning}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barat Reception & Grand Banquet"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hamza Tariq"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Client Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="0300 1234567"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Client Email</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Banquet Venue *</label>
                  <select
                    value={formData.venue}
                    onChange={(e) => {
                      setFormData({ ...formData, venue: e.target.value });
                      handleVenueOrDateChange(e.target.value, formData.eventDate);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  >
                    {venueOptions.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => {
                      setFormData({ ...formData, eventDate: e.target.value });
                      handleVenueOrDateChange(formData.venue, e.target.value);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Guest Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Menu Type</label>
                  <select
                    value={formData.menuType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        menuType: e.target.value as "Desi" | "Chinese" | "BBQ" | "Continental" | "Fusion",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  >
                    {menuTypes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Price per Head (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.packagePrice}
                    onChange={(e) => setFormData({ ...formData, packagePrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Special Requests / Rigging</label>
                <input
                  type="text"
                  placeholder="Live Jalebi counter, VIP floral stage, projector screen..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Internal Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Advance payment status, tasting notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Booking Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Confirmed" | "Pending" | "Cancelled" | "Completed",
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-lg shadow-orange-600/20 cursor-pointer"
                >
                  {editingEvent ? "Update Booking" : "Confirm Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
