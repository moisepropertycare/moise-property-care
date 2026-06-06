"use client";

import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";

const services = [
  ["Standard Cleaning", "Starting at $129"],
  ["Deep Cleaning", "Starting at $199"],
  ["Move-In / Move-Out", "Starting at $249"],
  ["Airbnb Cleaning", "Custom quote"],
];

export default function Home() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
const form = event.currentTarget;
setIsSubmitting(true);
setStatus("");

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setIsSubmitting(false);

    if (response.ok) {
      setStatus("Thank you! Your quote request has been sent.");
      form.reset();
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  }
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Image
          src="/logo.png"
          alt="Moise Property Care"
          width={120}
          height={70}
        />

        <div className="hidden gap-8 text-sm font-semibold text-slate-700 md:flex">
          <a href="#services">Services</a>
          <a href="#why-us">Why Us</a>
          <a href="#quote">Quote</a>
        </div>

        <a
          href="#quote"
          className="rounded-full bg-blue-950 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900"
        >
          Get Quote
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-green-600">
            Residential • Airbnb • Move-Out Cleaning
          </p>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-blue-950 md:text-7xl">
            Premium Cleaning Services For Brooklyn & Lower Manhattan Homes.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Professional cleaning services throughout Brooklyn and Lower Manhattan.
            Reliable cleaners, clear communication, and spotless results every time.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span className="rounded-full bg-slate-100 px-4 py-2">
              Simple booking
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2">
              Clear pricing
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2">
              Reliable cleaners
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold text-slate-700">
            <span>✓ Trusted Service</span>
            <span>✓ Satisfaction Guaranteed</span>
            <span>✓ Brooklyn & Manhattan</span>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#quote"
              className="rounded-full bg-green-600 px-8 py-4 text-center text-sm font-bold text-white hover:bg-green-700"
            >
              Request a Free Quote
            </a>

            <a
              href="#services"
              className="rounded-full border border-slate-300 px-8 py-4 text-center text-sm font-bold text-blue-950 hover:border-blue-950"
            >
              View Services
            </a>
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] shadow-xl">
          <Image
            src="/images/hero-cleaning.jpg"
            alt="Clean modern apartment interior"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-blue-950/5" />

          <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/90 p-6 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-600">
              Serving Brooklyn & Lower Manhattan
            </p>

            <h2 className="mt-3 text-xl font-bold text-blue-950">
              Premium cleaning for modern city living.
            </h2>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-600">
            Our Services
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-blue-950">
            Cleaning services for every property.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {services.map(([service, price]) => (
              <div
                key={service}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="text-xl font-bold text-blue-950">{service}</h3>
                <p className="mt-2 text-sm font-bold text-green-600">{price}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Professional, reliable cleaning designed to make your space
                  feel fresh, cared for, and ready to use.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
          {[
            [
              "Reliable Service",
              "We focus on showing up, communicating clearly, and doing the job right.",
            ],
            [
              "Easy Quote Request",
              "Request cleaning online without complicated back-and-forth.",
            ],
            [
              "Property Care Mindset",
              "We treat every space with respect, care, and attention to detail.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-blue-950 p-8 text-white">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-4 leading-7 text-blue-100">{text}</p>
            </div>
          ))}
        </div>
      </section>
      

            <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-600">
            Service Areas
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-blue-950">
            Proudly Serving Brooklyn & Lower Manhattan
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-8">
              <h3 className="text-2xl font-bold text-blue-950">Brooklyn</h3>

              <ul className="mt-6 space-y-3 text-slate-700">
                <li>Brooklyn Heights</li>
                <li>Downtown Brooklyn</li>
                <li>DUMBO</li>
                <li>Williamsburg</li>
                <li>Park Slope</li>
                <li>Greenpoint</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8">
              <h3 className="text-2xl font-bold text-blue-950">
                Lower Manhattan
              </h3>

              <ul className="mt-6 space-y-3 text-slate-700">
                <li>Financial District</li>
                <li>Tribeca</li>
                <li>SoHo</li>
                <li>Chinatown</li>
                <li>Lower East Side</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-600">
              Request a Quote
            </p>

            <h2 className="mt-4 text-4xl font-extrabold text-blue-950">
              Ready for a cleaner space?
            </h2>

            <p className="mt-4 text-slate-600">
              Tell us about your property and we’ll contact you to confirm
              pricing, availability, and service details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="name" className="w-full rounded-2xl border border-slate-300 px-5 py-4" placeholder="Full name" />

            <input name="phone" className="w-full rounded-2xl border border-slate-300 px-5 py-4" placeholder="Phone number" />

            <input name="email" className="w-full rounded-2xl border border-slate-300 px-5 py-4" placeholder="Email address" />

            <input name="address" className="w-full rounded-2xl border border-slate-300 px-5 py-4" placeholder="Property address / area" />

            <select name="service" className="w-full rounded-2xl border border-slate-300 px-5 py-4">
              <option>Select service</option>
              <option>Standard Cleaning</option>
              <option>Deep Cleaning</option>
              <option>Move-In / Move-Out</option>
              <option>Airbnb Cleaning</option>
            </select>

            <textarea
            name="message"
            className="min-h-32 w-full rounded-2xl border border-slate-300 px-5 py-4"
            placeholder="Tell us what you need"
            />

            <button
             disabled={isSubmitting}
             className="w-full rounded-full bg-green-600 px-8 py-4 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-60"
             >
             {isSubmitting ? "Sending..." : "Submit Quote Request"}
             </button>

            {status && (
            <p className="text-center text-sm font-semibold text-blue-950">
            {status}
  </p>
)}
          </form>
        </div>
      </section>

      <footer className="bg-white px-6 py-8 text-center">
  <p className="text-3xl font-bold text-blue-950">
    Get a Free Quote Today
  </p>

  <a
    href="tel:3471234567"
    className="mt-3 block text-2xl font-bold text-green-600 hover:text-green-700"
  >
    (347) 123-4567
  </a>

  <p className="mt-2 text-slate-600">
    Brooklyn & Lower Manhattan
  </p>

  <p className="mt-6 text-sm text-slate-500">
    © 2026 Moise Property Care. All rights reserved.
  </p>
</footer>
  </main>
  );
}