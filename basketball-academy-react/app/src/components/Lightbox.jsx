import { useEffect } from 'react'

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!src) return null
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-court border border-ember text-ember text-xl"
      >
        ✕
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-xl border-2 border-ember shadow-[0_0_30px_rgba(255,193,7,0.3)] object-contain"
      />
    </div>
  )
}
