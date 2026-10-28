import { MessageCircle } from '@/components/Icons';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2349032903453"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Opara Drive Gallery on WhatsApp"
      className="fixed bottom-6 left-6 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#25D366] bg-[#D4AF37]" />
      </span>
    </a>
  );
}
