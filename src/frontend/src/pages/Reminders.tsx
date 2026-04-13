import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useGetReminderSettings,
  useSaveReminderSettings,
} from "@/hooks/use-backend";
import {
  AlertCircle,
  Bell,
  BellOff,
  CheckCircle2,
  Clock,
  Info,
  Save,
  Send,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────

type NotifPermission = "granted" | "denied" | "default" | "unsupported";

const DAYS = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────

function getPermissionStatus(): NotifPermission {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission as NotifPermission;
}

// ── Sub-components ────────────────────────────────────────────────────────

function PermissionBadge({ status }: { status: NotifPermission }) {
  if (status === "granted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
        <CheckCircle2 size={12} />
        Granted
      </span>
    );
  }
  if (status === "denied") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 px-2.5 py-1 rounded-full">
        <XCircle size={12} />
        Blocked
      </span>
    );
  }
  if (status === "unsupported") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full">
        <AlertCircle size={12} />
        Not Supported
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
      <AlertCircle size={12} />
      Not Enabled
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function Reminders() {
  const { data: savedSettings, isLoading } = useGetReminderSettings();
  const saveMutation = useSaveReminderSettings();

  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("07:00");
  const [restDays, setRestDays] = useState<number[]>([0, 6]);
  const [permission, setPermission] =
    useState<NotifPermission>(getPermissionStatus);

  // Pre-populate from saved settings
  useEffect(() => {
    if (savedSettings) {
      setEnabled(savedSettings.enabled);
      setTime(savedSettings.time ?? "07:00");
      setRestDays(savedSettings.restDays.map(Number));
    }
  }, [savedSettings]);

  function toggleRestDay(day: number) {
    setRestDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  async function handleRequestPermission() {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPermission(result as NotifPermission);
    if (result === "granted") {
      toast.success("Notifications enabled!");
    } else if (result === "denied") {
      toast.error("Notifications blocked. Allow them in browser settings.");
    }
  }

  function handleTestNotification() {
    if (permission !== "granted") return;
    new Notification("💪 Isher Gym Reminder", {
      body: `Time to crush your workout! Scheduled for ${time}.`,
      icon: "/favicon.ico",
    });
    toast.success("Test notification sent!");
  }

  async function handleSave() {
    await saveMutation.mutateAsync({
      enabled,
      time,
      restDays: restDays.map(BigInt),
    });
    toast.success("Reminder settings saved!");
  }

  const workoutDaysCount = DAYS.length - restDays.length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4"
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <Bell size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg font-bold text-foreground leading-none">
              Workout Reminders
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {enabled
                ? `Active · ${workoutDaysCount} days/week at ${time}`
                : "Reminders off"}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-4">
        {/* ── Enable Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-card border border-border rounded-2xl p-4"
          data-ocid="reminder-toggle-card"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm">
                Daily Workout Reminders
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Get notified at your chosen time on workout days.
              </p>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
              disabled={isLoading}
              data-ocid="reminder-enabled-toggle"
              aria-label="Enable workout reminders"
            />
          </div>
        </motion.div>

        {/* ── Settings (conditional) ── */}
        {enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Time Picker */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl p-4"
              data-ocid="reminder-time-card"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-primary" />
                <Label className="font-display font-semibold text-sm text-foreground">
                  Reminder Time
                </Label>
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                data-ocid="reminder-time-input"
                className="w-full bg-muted border border-input rounded-xl px-4 py-3 text-foreground text-base font-mono focus:outline-none focus:ring-2 focus:ring-ring transition-smooth [color-scheme:dark]"
                aria-label="Reminder time"
              />
              <p className="text-xs text-muted-foreground mt-2">
                You'll receive a notification at this time on your workout days.
              </p>
            </motion.div>

            {/* Rest Days */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-card border border-border rounded-2xl p-4"
              data-ocid="reminder-rest-days-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BellOff size={16} className="text-muted-foreground" />
                  <Label className="font-display font-semibold text-sm text-foreground">
                    Rest Days
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {restDays.length === 0
                    ? "No rest days"
                    : `${restDays.length} rest`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Tap days to mark them as rest days — no reminder will fire on
                selected days.
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {DAYS.map(({ label, value }) => {
                  const isRest = restDays.includes(value);
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => toggleRestDay(value)}
                      data-ocid={`rest-day-${label.toLowerCase()}`}
                      aria-pressed={isRest}
                      aria-label={`${label} rest day`}
                      className={[
                        "flex flex-col items-center justify-center py-2.5 rounded-xl text-xs font-medium transition-smooth select-none",
                        isRest
                          ? "bg-muted text-muted-foreground border border-border line-through opacity-60"
                          : "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {workoutDaysCount === 0
                  ? "⚠️ All days are rest days — no reminders will fire."
                  : `Reminders active on ${workoutDaysCount} day${workoutDaysCount !== 1 ? "s" : ""} per week.`}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* ── Save Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending || isLoading}
            className="w-full h-12 font-display font-semibold text-sm rounded-2xl"
            data-ocid="reminder-save-btn"
          >
            <Save size={16} className="mr-2" />
            {saveMutation.isPending ? "Saving…" : "Save Settings"}
          </Button>
        </motion.div>

        {/* ── Notification Permission ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-4 space-y-3"
          data-ocid="notification-permission-card"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-primary" />
              <span className="font-display font-semibold text-sm text-foreground">
                Browser Notifications
              </span>
            </div>
            <PermissionBadge status={permission} />
          </div>

          {permission === "unsupported" && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your browser doesn't support notifications.
            </p>
          )}

          {permission === "denied" && (
            <p className="text-xs text-destructive/80 leading-relaxed">
              Notifications are blocked. To fix this, click the lock icon in
              your browser's address bar and allow notifications for this site.
            </p>
          )}

          {permission !== "granted" &&
            permission !== "unsupported" &&
            permission !== "denied" && (
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl text-sm font-medium"
                onClick={handleRequestPermission}
                data-ocid="enable-notifications-btn"
              >
                <Bell size={15} className="mr-2" />
                Enable Notifications
              </Button>
            )}

          {permission === "granted" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Notifications are enabled. Send a test to see how they look.
              </p>
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl text-sm font-medium"
                onClick={handleTestNotification}
                data-ocid="test-notification-btn"
              >
                <Send size={14} className="mr-2" />
                Send Test Notification
              </Button>
            </div>
          )}
        </motion.div>

        {/* ── Info / Limitations Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="bg-muted/40 border border-border rounded-2xl p-4 space-y-3"
          data-ocid="reminder-info-card"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Info size={15} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-sm text-foreground mb-1">
                How Reminders Work
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Notifications fire while the app is open in your browser tab.
                For reliable daily reminders,{" "}
                <span className="text-foreground font-medium">
                  keep a browser tab open
                </span>{" "}
                or bookmark this page and open it before your usual workout
                time.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            {[
              {
                icon: "🏋️",
                text: "Consistency is the #1 driver of fitness results.",
              },
              {
                icon: "📅",
                text: "Set a time you'll actually be awake and ready to move.",
              },
              {
                icon: "😴",
                text: "Mark real rest days — recovery is part of training.",
              },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-2">
                <span className="text-sm mt-0.5 shrink-0">{icon}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
