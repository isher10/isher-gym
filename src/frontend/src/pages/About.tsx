import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Clock,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram } from "react-icons/si";

/* ─── Data ────────────────────────────────────────────────── */

const VALUES = [
  {
    icon: Zap,
    label: "Discipline",
    desc: "Consistency turns goals into achievements. Every rep counts.",
  },
  {
    icon: TrendingUp,
    label: "Progress",
    desc: "We measure success by how far you've come, not where you started.",
  },
  {
    icon: Heart,
    label: "Community",
    desc: "Train together, grow together. A gym that feels like family.",
  },
];

const STATS = [
  { label: "Members", value: "1,200+", icon: Users },
  { label: "Trainers", value: "8", icon: Award },
  { label: "Years Strong", value: "11", icon: Star },
];

const TRAINERS = [
  {
    initials: "RS",
    name: "Rajinder Singh",
    title: "Head Trainer",
    specialty: "Strength & Conditioning",
    bio: "A certified strength coach with 10+ years helping athletes and everyday gym-goers build raw power and functional fitness.",
    exp: "10+ years",
    badge: "Strength",
    color: "from-primary/30 to-primary/10",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    title: "Nutrition & Wellness Coach",
    specialty: "Diet & Body Recomposition",
    bio: "Priya combines sports nutrition science with real-world meal planning to help you fuel right and transform from the inside out.",
    exp: "7 years",
    badge: "Nutrition",
    color: "from-chart-2/30 to-chart-2/10",
  },
  {
    initials: "AP",
    name: "Arjun Patel",
    title: "Cardio & HIIT Coach",
    specialty: "Weight Loss & Endurance",
    bio: "Arjun's high-energy HIIT sessions and cardio programs have helped hundreds of members shed fat and boost their endurance.",
    exp: "5 years",
    badge: "HIIT",
    color: "from-chart-4/30 to-chart-4/10",
  },
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    value: "7023095979",
    href: "tel:7023095979",
    ocid: "contact-phone",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ishergym.com",
    href: "mailto:info@ishergym.com",
    ocid: "contact-email",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Fitness Road, Sector 15, Chandigarh, Punjab 160015",
    href: null,
    ocid: "contact-address",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 5:00 AM – 10:00 PM · Sun: 6:00 AM – 8:00 PM",
    href: null,
    ocid: "contact-hours",
  },
];

const MAPS_URL =
  "https://www.google.com/maps/search/123+Fitness+Road+Sector+15+Chandigarh+Punjab+160015";

const SOCIAL = [
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "#",
    ocid: "social-instagram",
    colorClass: "bg-primary/15 text-primary hover:bg-primary/25",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "#",
    ocid: "social-facebook",
    colorClass: "bg-chart-2/15 text-chart-2 hover:bg-chart-2/25",
  },
];

/* ─── Component ───────────────────────────────────────────── */

export default function About() {
  return (
    <div className="flex flex-col pb-8">
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-card border-b border-border px-4 pt-5 pb-6">
        {/* decorative gradient blobs */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-chart-2/8 blur-2xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Badge
            variant="secondary"
            className="mb-3 text-xs tracking-wide uppercase font-semibold"
          >
            Founded 2015 · Chandigarh
          </Badge>
          <h1 className="font-display text-3xl font-extrabold text-foreground leading-tight">
            About <span className="text-primary">Isher Gym</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-xs">
            Your local fitness home — built on discipline, driven by progress,
            united by community.
          </p>
        </motion.div>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-7">
        {/* ── Mission Statement ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="card-elevated rounded-2xl p-5 border-l-4 border-primary"
          data-ocid="about-mission"
        >
          <h2 className="font-display font-bold text-base text-foreground mb-2">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            At Isher Gym, we believe that fitness is for everyone — beginners,
            athletes, and everyone in between. Since 2015, we have been
            providing a welcoming, well-equipped environment in the heart of
            Chandigarh where members transform their bodies, build confidence,
            and become part of something bigger than themselves.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            We combine state-of-the-art equipment with expert coaching and a
            supportive community to make sure every visit brings you one step
            closer to your goals — whether that's strength, weight loss, or
            simply feeling your best.
          </p>
        </motion.div>

        {/* ── Stats Row ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.32 }}
              className="card-elevated rounded-2xl p-3 text-center"
            >
              <Icon size={17} className="text-primary mx-auto mb-1.5" />
              <p className="font-display font-extrabold text-xl text-foreground leading-none">
                {value}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Core Values ────────────────────────────────────── */}
        <div>
          <h2 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
            <Shield size={17} className="text-primary" />
            Our Values
          </h2>
          <div className="flex flex-col gap-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className="card-elevated rounded-2xl p-4 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <v.icon size={18} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm text-foreground">
                    {v.label}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Trainer Profiles ───────────────────────────────── */}
        <div>
          <h2 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
            <Users size={17} className="text-primary" />
            Meet Our Trainers
          </h2>
          <div className="flex flex-col gap-4">
            {TRAINERS.map((trainer, i) => (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.38 }}
                className="card-elevated rounded-2xl p-5"
                data-ocid={`trainer-${trainer.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${trainer.color} flex items-center justify-center shrink-0 border border-border`}
                  >
                    <span className="font-display font-extrabold text-lg text-foreground">
                      {trainer.initials}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-sm text-foreground">
                        {trainer.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 leading-5"
                      >
                        {trainer.badge}
                      </Badge>
                    </div>
                    <p className="text-primary text-xs font-semibold mt-0.5">
                      {trainer.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {trainer.specialty} · {trainer.exp}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-3 leading-relaxed border-t border-border pt-3">
                  {trainer.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Contact & Location ─────────────────────────────── */}
        <div>
          <h2 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
            <MapPin size={17} className="text-primary" />
            Contact &amp; Location
          </h2>
          <div className="flex flex-col gap-2.5">
            {CONTACT_ITEMS.map(
              ({ icon: Icon, label, value, href, ocid }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="card-elevated rounded-xl p-4 flex items-start gap-3"
                  data-ocid={ocid}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-[11px] mb-0.5 uppercase tracking-wide font-medium">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-foreground text-sm hover:text-primary transition-smooth break-words"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-foreground text-sm leading-snug break-words">
                        {value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>

        {/* ── Google Maps CTA ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full btn-accent rounded-xl h-12 font-display font-bold text-base gap-2"
              data-ocid="btn-google-maps"
            >
              <MapPin size={16} />
              Open in Google Maps
              <ExternalLink size={14} className="ml-auto opacity-70" />
            </Button>
          </a>
        </motion.div>

        {/* ── Social Media ────────────────────────────────────── */}
        <div className="card-elevated rounded-2xl p-5">
          <h3 className="font-display font-semibold text-sm text-foreground mb-4 text-center">
            Follow Us
          </h3>
          <div className="flex gap-4 justify-center">
            {SOCIAL.map(({ icon: Icon, label, href, ocid, colorClass }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-ocid={ocid}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-smooth ${colorClass}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Stay updated with workouts, tips &amp; gym news
          </p>
        </div>

        {/* ── Branding Footer ─────────────────────────────────── */}
        <div className="text-center pt-1 pb-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Isher Gym. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
