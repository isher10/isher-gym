import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAddFeedback, useListFeedback } from "@/hooks/use-backend";
import type { FeedbackEntry } from "@/types";
import { Camera, MessageSquare, Send, Star } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Helpers ────────────────────────────────────────────────────────────────

function getFirstLetter(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
}

function formatDisplayDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ── Avatar ─────────────────────────────────────────────────────────────────

function UserAvatar({
  name,
  photoUrl,
  size = "md",
}: {
  name: string;
  photoUrl: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "w-16 h-16 text-xl"
      : size === "sm"
        ? "w-8 h-8 text-sm"
        : "w-11 h-11 text-base";
  return (
    <Avatar className={`${sizeClass} flex-shrink-0`}>
      {photoUrl && <AvatarImage src={photoUrl} alt={name} />}
      <AvatarFallback className="bg-primary text-primary-foreground font-display font-bold">
        {getFirstLetter(name)}
      </AvatarFallback>
    </Avatar>
  );
}

// ── Feedback Card ──────────────────────────────────────────────────────────

function FeedbackCard({ entry }: { entry: FeedbackEntry }) {
  return (
    <Card className="bg-card border-border/50 hover:border-border transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <UserAvatar name={entry.name} photoUrl={entry.photoUrl} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-semibold text-sm text-foreground truncate">
                {entry.name}
              </span>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDisplayDate(entry.date)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed break-words">
              {entry.message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Feedback Form ──────────────────────────────────────────────────────────

function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const addFeedback = useAddFeedback();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoUrl((ev.target?.result as string) ?? "");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Naam zaroori hai");
      return;
    }
    if (!message.trim()) {
      toast.error("Feedback likhna zaroori hai");
      return;
    }
    addFeedback.mutate(
      {
        name: name.trim(),
        photoUrl,
        message: message.trim(),
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Shukriya! Aapka feedback mil gaya 🙏");
          setName("");
          setMessage("");
          setPhotoUrl("");
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
        },
        onError: () => {
          toast.error("Kuch problem aa gayi, dobara try karein");
        },
      },
    );
  };

  return (
    <Card className="bg-card border-border/60">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-5">
          <Star size={16} className="text-primary" />
          <h2 className="font-display font-semibold text-base text-foreground">
            Apna Feedback Dein
          </h2>
        </div>

        {submitted ? (
          <div
            className="text-center py-6 space-y-2"
            data-ocid="feedback-success-state"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Star size={22} className="text-primary" />
            </div>
            <p className="font-display font-semibold text-foreground">
              Shukriya!
            </p>
            <p className="text-sm text-muted-foreground">
              Aapka feedback hamare liye bahut khaas hai.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar + Name */}
            <div className="flex items-end gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <UserAvatar name={name} photoUrl={photoUrl} size="lg" />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  aria-label="Photo upload karein"
                  data-ocid="feedback-photo-btn"
                >
                  <Camera size={11} />
                  <span>Photo</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                  data-ocid="feedback-photo-input"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="feedback-name"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Aapka naam <span className="text-primary">*</span>
                </Label>
                <Input
                  id="feedback-name"
                  placeholder="Naam likhein..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-border/60 focus-visible:ring-primary"
                  data-ocid="feedback-name-input"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label
                htmlFor="feedback-message"
                className="text-xs text-muted-foreground mb-1.5 block"
              >
                Aapka feedback <span className="text-primary">*</span>
              </Label>
              <Textarea
                id="feedback-message"
                placeholder="Gym ke baare mein apne vichar likhein..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="bg-background border-border/60 focus-visible:ring-primary resize-none"
                data-ocid="feedback-message-input"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={addFeedback.isPending}
              data-ocid="feedback-submit-btn"
            >
              <Send size={14} className="mr-2" />
              {addFeedback.isPending
                ? "Submit ho raha hai..."
                : "Feedback Bhejein"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

// ── Loading Skeleton ───────────────────────────────────────────────────────

function FeedbackSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex gap-3 p-4 rounded-xl border border-border/40"
        >
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function Feedback() {
  const { data: feedbackList = [], isLoading } = useListFeedback();

  return (
    <div className="px-4 py-5 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
          <MessageSquare size={18} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">
            Feedback
          </h1>
          <p className="text-xs text-muted-foreground">
            Apni raay dein — hame sunna pasand hai
          </p>
        </div>
      </div>

      {/* Feedback Form */}
      <FeedbackForm />

      {/* Feedback List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Community Feedback
          </h2>
          {!isLoading && feedbackList.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
              {feedbackList.length}
            </span>
          )}
        </div>

        {isLoading ? (
          <FeedbackSkeleton />
        ) : feedbackList.length === 0 ? (
          <div
            className="text-center py-12 space-y-3"
            data-ocid="feedback-empty-state"
          >
            <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center mx-auto">
              <MessageSquare size={24} className="text-muted-foreground/50" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Abhi koi feedback nahi hai
              </p>
              <p className="text-xs text-muted-foreground">
                Koi feedback nahi hai abhi. Pehle feedback dene wale bano!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="feedback-list">
            {feedbackList.map((entry) => (
              <FeedbackCard key={String(entry.id)} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
