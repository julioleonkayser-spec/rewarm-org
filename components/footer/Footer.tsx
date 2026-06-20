function FlameLogo() {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <defs>
        <linearGradient id="footerFlame" x1="14" y1="2" x2="14" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="0.5" stopColor="#F97316" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <path
        d="M14 2C14 2 8 8 8 14C8 17.3 9.8 19.5 12 20.5C11.5 19 11.5 17.5 12.5 16C13.5 14.5 14 13 14 13C14 13 14.5 14.5 15.5 16C16.5 17.5 16.5 19 16 20.5C18.2 19.5 20 17.3 20 14C20 8 14 2 14 2Z"
        fill="url(#footerFlame)"
      />
      <path
        d="M14 13C14 13 12 16 12 18C12 20.2 12.9 22 14 22C15.1 22 16 20.2 16 18C16 16 14 13 14 13Z"
        fill="#FCD34D"
        opacity="0.9"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#0A0A0A] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FlameLogo />
          <span className="font-bold text-[#A1A1AA] text-sm">ReWarm</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="text-[#52525B] hover:text-[#A1A1AA] text-sm transition-colors">Privacy</a>
          <a href="/terms" className="text-[#52525B] hover:text-[#A1A1AA] text-sm transition-colors">Terms</a>
          <a href="mailto:support@rewarm.org" className="text-[#52525B] hover:text-[#A1A1AA] text-sm transition-colors">support@rewarm.org</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-4 pt-4 border-t border-[#141414]">
        <p className="text-[#3F3F46] text-xs text-center">
          © 2026 ReWarm · AI Lead Reactivation
        </p>
      </div>
    </footer>
  )
}
