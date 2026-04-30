"use client"

import Button from "@modules/common/components/button"
import { X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenPromo")

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenPromo", "true")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white w-full max-w-[950px] max-h-[95vh] flex flex-col md:flex-row overflow-hidden shadow-2xl rounded-sm overflow-y-auto md:overflow-visible">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 md:top-5 md:right-5 z-20 text-gray-500 hover:text-black transition-colors p-2 bg-white/80 rounded-full md:bg-transparent"
        >
          <X size={24} />
        </button>

        <div className="relative w-full md:w-1/2 h-[250px] md:h-auto min-h-[300px] bg-gray-100">
          <Image
            src="/images/promo/promo-bg.png"
            alt="Promo background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-6 md:mb-8 flex justify-center md:justify-start">
            <div className="relative w-[110px] h-[110px] md:w-[130px] md:h-[130px] border border-[#8CA5C1] p-1 rounded-sm shadow-sm bg-white">
              <div className="relative w-full h-full">
                <Image
                  src="/images/promo/tg-qr.png"
                  alt="Telegram QR"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-4 text-ui-fg-base leading-tight text-center md:text-left">
            Подписывайтесь на наш <br className="hidden md:block" />
            <span
              className="underline decoration-1 underline-offset-4"
              style={{ color: "#8CA5C1" }}
            >
              TELEGRAM КАНАЛ
            </span>
          </h2>

          <p className="text-[13px] md:text-sm text-ui-fg-subtle mb-8 leading-relaxed text-center md:text-left">
            Инсайды бьюти-рынка Кореи, доступ к лимитированным сериям,
            профессиональная аналитика и искусство заботы о себе. Всё, что нужно
            знать о люксовом сегменте K-beauty.
          </p>

          <div className="flex justify-center md:justify-start">
            <a
              href="https://t.me/your_channel"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto"
            >
              <Button
                variant="primary"
                className="w-full md:w-fit px-10 h-11 uppercase tracking-widest text-[10px] font-bold border-none shadow-md hover:shadow-lg transition-all"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                Подписаться на канал
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoModal
