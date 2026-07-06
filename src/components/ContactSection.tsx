import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Mail, Copy, Check, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formInterest, setFormInterest] = useState('Zumba');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const fullAddress = "Plot B 585, Block 13 Gulberg Town, Karachi, Pakistan, 75950";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    setFormSubmitted(true);
  };

  // Generate dynamic WhatsApp link based on form inputs for an incredibly interactive experience!
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Aslam-o-Alaikum Romana! I'm ${formName}. I'd love to join Women's Own Fitness Club for ${formInterest}. My phone is ${formPhone}. Please let me know the batch availability! 🤸🏻‍♀️`
    );
    return `https://wa.me/923360323509?text=${text}`;
  };

  return (
    <section className="py-20 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">Visit & Inquire</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Find Us & Join Today
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Contact details & Form (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-stone-950">Get in Touch Directly</h3>
              <p className="text-stone-600 text-sm leading-relaxed font-light">
                Ready to take the first step towards a stronger, healthier, and glowing you? We have multiple slots open. Feel free to send a direct request.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Card */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/50 space-y-2">
                  <div className="bg-brand-primary/10 w-9 h-9 rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 text-brand-primary" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900">Call Trainer Romana</h4>
                  <a href="tel:+923360323509" className="text-xs font-semibold text-stone-600 hover:text-brand-primary block">
                    +92 336 0323509
                  </a>
                </div>

                {/* WhatsApp Card */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/50 space-y-2">
                  <div className="bg-emerald-500/10 w-9 h-9 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900">Direct WhatsApp Chat</h4>
                  <a href="https://wa.me/923360323509" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-600 hover:underline block">
                    Message Now
                  </a>
                </div>
              </div>

              {/* Address card with copy to clipboard */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-3">
                  <div className="bg-brand-accent/10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Club Address</h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed font-light">
                      Plot B 585, Block 13 Gulberg Town, Karachi, Pakistan
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 border border-stone-200 hover:border-brand-primary bg-white px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-brand-primary cursor-pointer transition-colors shadow-sm"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* INTERACTIVE FORM / WHATSAPP REDIRECT GENERATOR */}
            <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary rounded-full filter blur-3xl opacity-5" />

              <h4 className="font-serif text-lg font-bold text-stone-900 mb-4">Direct Class Reservation</h4>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="contact-name" className="text-xs font-bold text-stone-700 block">Your Name:</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full text-xs px-4 py-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary placeholder-stone-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="contact-phone" className="text-xs font-bold text-stone-700 block">WhatsApp or Phone Number:</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="E.g., 0336..."
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full text-xs px-4 py-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary placeholder-stone-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-interest" className="text-xs font-bold text-stone-700 block">Class Interest:</label>
                      <select
                        id="contact-interest"
                        value={formInterest}
                        onChange={(e) => setFormInterest(e.target.value)}
                        className="w-full text-xs px-4 py-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary text-stone-700"
                      >
                        <option value="Zumba">Zumba Dance Fitness 💃</option>
                        <option value="Yoga">Yoga & Flexibility 🧘🏻‍♀️</option>
                        <option value="Pilates">Pilates & Pilates Rope 🤸🏻‍♀️</option>
                        <option value="Strength Training">Strength Training & Weights 🏋️‍♀️</option>
                        <option value="Mobility">Mobility & Body Recovery ✨</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white hover:bg-brand-secondary py-3 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Prepare Inquiry</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 text-center py-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 max-w-sm mx-auto">
                      <h5 className="font-bold text-stone-900 text-sm">Your Inquiry is Ready!</h5>
                      <p className="text-stone-500 text-xs font-light leading-relaxed">
                        We've prepared your custom WhatsApp message. Click below to directly send it to trainer Romana Imran.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xs mx-auto">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs hover:bg-emerald-600 transition-colors text-center inline-flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send to WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormName('');
                          setFormPhone('');
                        }}
                        className="border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Reset Form
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: MAPS WIDGET & VISUAL NAVIGATION GUIDE (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 space-y-6 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Gulberg Town Directory</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  Finding Plot B 585, Block 13 Karachi
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-light">
                  Our fitness club is located in Block 13, Gulberg Town, Karachi, Pakistan. The address is 100% private and situated in a secure, family-friendly residential street.
                </p>
              </div>

              {/* Styled Mock Interactive Google Map Widget */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 my-6 shadow-inner flex items-center justify-center group">
                {/* Abstract grid lines representing streets */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual abstract roads */}
                <div className="absolute top-1/2 inset-x-0 h-4 bg-stone-800 -translate-y-1/2" />
                <div className="absolute left-1/3 inset-y-0 w-4 bg-stone-800" />
                
                {/* Pulse location pointer */}
                <div className="absolute top-1/2 left-1/3 -translate-x-2 -translate-y-2 flex flex-col items-center">
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-40" />
                    <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-brand-primary border-2 border-white flex items-center justify-center">
                      <MapPin className="w-2.5 h-2.5 text-white" />
                    </span>
                  </span>
                  {/* Tooltip on Mock Map */}
                  <div className="bg-stone-950 border border-stone-800 text-[10px] font-bold text-white px-2.5 py-1 rounded-md shadow-md mt-1 select-none whitespace-nowrap">
                    Women's Own Club
                  </div>
                </div>

                {/* Cover overlay hover prompt */}
                <div className="absolute inset-0 bg-stone-950/60 opacity-100 group-hover:bg-stone-950/40 transition-colors flex flex-col items-center justify-center p-4 text-center">
                  <MapPin className="w-8 h-8 text-brand-primary mb-2 transform group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white mb-1">Click to Navigate</span>
                  <p className="text-[10px] text-stone-400 font-light max-w-[200px]">Open Karachi's Gulberg Town coordinates directly on Google Maps app.</p>
                </div>

                {/* Real Anchor Link Overlay */}
                <a
                  href="https://maps.google.com/?q=Plot+B+585+Karachi+Block+13+Gulberg+Town+Karachi+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  title="Open Google Maps"
                />
              </div>

              {/* Action directions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-stone-800">
                <div className="text-left text-[11px] text-stone-400 font-light max-w-[300px]">
                  <span className="font-semibold text-white block mb-0.5">Plus Code: W3RC+9C4 Town</span>
                  Plot B 585, Block 13 Gulberg Town, Karachi City, Sindh, 75950
                </div>

                <a
                  href="https://maps.google.com/?q=Plot+B+585+Karachi+Block+13+Gulberg+Town+Karachi+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-brand-primary/5 transition-all w-full sm:w-auto"
                >
                  <span>Launch Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
