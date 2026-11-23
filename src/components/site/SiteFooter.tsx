import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

import { Logo } from "@/components/site/Logo";
import { BRAND } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="no-print bg-primary text-on-dark-muted">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm">{BRAND.tagline}</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-accent" aria-hidden="true" />
              <a href={`mailto:${BRAND.supportEmail}`} className="hover:text-on-dark">
                {BRAND.supportEmail}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-accent" aria-hidden="true" />
              <a href={BRAND.supportPhoneHref} className="hover:text-on-dark">
                {BRAND.supportPhone}
              </a>
            </li>
            <li className="text-xs">Instagram · LinkedIn · X</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold text-on-dark">Home Services</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services/$category" params={{ category: "ac-appliance-repair" }} className="hover:text-on-dark">AC & Appliance Repair</Link></li>
            <li><Link to="/services/$category" params={{ category: "cleaning-pest-control" }} className="hover:text-on-dark">Cleaning & Pest Control</Link></li>
            <li><Link to="/services/$category" params={{ category: "instant-home-help" }} className="hover:text-on-dark">On-Demand Home Help</Link></li>
            <li><Link to="/services" className="hover:text-on-dark">Electrician, Plumber & Carpenter</Link></li>
            <li><Link to="/services/$category" params={{ category: "painting-wall-upgrades" }} className="hover:text-on-dark">Painting, Waterproofing & Walls</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold text-on-dark">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/how-it-works" className="hover:text-on-dark">How It Works</Link></li>
            <li><Link to="/join-as-pro" className="hover:text-on-dark">Join as a Professional</Link></li>
            <li><Link to="/custom-projects" className="hover:text-on-dark">Large & Custom Projects</Link></li>
            <li><span>Service Areas (West Bengal)</span></li>
            <li><a href={`mailto:${BRAND.supportEmail}`} className="hover:text-on-dark">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold text-on-dark">Support & Legal</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/how-it-works" hash="faq" className="hover:text-on-dark">Help Center / FAQs</Link></li>
            <li><Link to="/warranty" className="hover:text-on-dark">Service Warranty Policy</Link></li>
            <li><span>Cancellation & Refund Policy</span></li>
            <li><span>Terms of Service</span></li>
            <li><span>Privacy Policy</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="container-page py-6 pb-24 text-xs md:pb-6">© 2026 {BRAND.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}
