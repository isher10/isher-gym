import { MEMBERSHIP_PLANS } from "@/data/membership";
import { Check, Crown, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const PLAN_ICONS: Record<string, React.ReactNode> = {
  basic: <span className="text-lg">🏋️</span>,
  standard: <Star size={16} className="text-primary fill-primary" />,
  premium: <Crown size={16} className="text-yellow-400" />,
  annual: <Crown size={16} className="text-primary fill-primary" />,
};

export default function Membership() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20enquire%20about%20Isher%20Gym%20membership",
      "_blank",
    );
  };

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 bg-card border-b border-border">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Membership Plans
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Choose the plan that fits your fitness journey
        </p>
      </div>

      {/* Intro Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-4 mt-4 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 flex items-start gap-3"
        data-ocid="membership-info-banner"
      >
        <Star size={16} className="text-primary mt-0.5 shrink-0 fill-primary" />
        <p className="text-sm text-foreground leading-snug">
          All plans include access to{" "}
          <span className="font-semibold text-primary">Isher Gym</span> — a
          premium fitness facility with state-of-the-art equipment.
        </p>
      </motion.div>

      {/* Plan Cards */}
      <div className="px-4 pt-5 flex flex-col gap-4">
        {MEMBERSHIP_PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className={`relative rounded-2xl p-5 border ${
              plan.highlighted
                ? "bg-primary/10 border-primary shadow-[0_0_20px_oklch(var(--primary)/0.25)]"
                : "bg-card border-border"
            }`}
            data-ocid={`plan-${plan.id}`}
          >
            {/* Most Popular Badge */}
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  <Star size={10} className="fill-current" />
                  Most Popular
                </div>
              </div>
            )}

            {/* Plan Icon + Name + Price row */}
            <div
              className={`flex items-start justify-between ${plan.highlighted ? "mt-2" : ""}`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    plan.highlighted ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  {PLAN_ICONS[plan.id]}
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground leading-tight">
                    {plan.name}
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    per {plan.period === "year" ? "year" : "month"}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-2xl font-extrabold text-foreground">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs">
                  /{plan.period === "year" ? "yr" : "mo"}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              className={`my-4 h-px ${plan.highlighted ? "bg-primary/20" : "bg-border"}`}
            />

            {/* Features */}
            <div className="flex flex-col gap-2.5">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <div
                    className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      plan.highlighted ? "bg-primary/30" : "bg-muted"
                    }`}
                  >
                    <Check
                      size={10}
                      className={
                        plan.highlighted
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </div>
                  <span className="text-foreground text-sm leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Annual savings callout */}
            {plan.id === "annual" && (
              <div className="mt-4 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-center">
                <span className="text-primary text-xs font-semibold">
                  🎉 Save ~₹20,988 vs monthly Premium!
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Informational Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mx-4 mt-6 rounded-xl bg-muted/50 border border-border px-4 py-3 text-center"
        data-ocid="membership-info-notice"
      >
        <p className="text-muted-foreground text-xs leading-relaxed">
          <span className="font-semibold text-foreground">
            Informational only
          </span>{" "}
          — visit or contact Isher Gym to enroll. Prices may vary based on
          ongoing promotions.
        </p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="mx-4 mt-5 rounded-2xl bg-card border border-border p-5"
        data-ocid="contact-section"
      >
        <h3 className="font-display font-bold text-base text-foreground mb-1">
          Ready to join?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Visit us or reach out — our team will help you get started.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-foreground font-display font-semibold text-sm transition-smooth hover:bg-[#25D366]/25"
            data-ocid="btn-whatsapp"
          >
            <SiWhatsapp size={18} className="text-[#25D366]" />
            Chat on WhatsApp
          </button>

          <button
            type="button"
            onClick={handleCall}
            className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl btn-accent font-display font-semibold text-sm"
            data-ocid="btn-call"
          >
            <Phone size={16} />
            Call +91 98765 43210
          </button>
        </div>

        <p className="text-muted-foreground text-xs text-center mt-3">
          📍 Isher Gym, Main Market Road, Ludhiana · Open 6 AM – 11 PM
        </p>
      </motion.div>
    </div>
  );
}
