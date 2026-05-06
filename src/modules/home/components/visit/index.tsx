"use client"

import Button from "@modules/common/components/button"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useState } from "react"

const VisitDrawer = dynamic(() => import("./visit-drawer"), {
  ssr: false,
})

const Visit = ({ dict }: { dict: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full bg-white overflow-hidden border-t border-ui-border-base">
      <div className="flex flex-col items-center justify-center px-6 py-14 md:px-10 text-center min-h-[500px] md:h-[800px]">
        <div className="max-w-[420px] flex flex-col items-center">
          <h2 className="uppercase text-[#111111] mb-4 md:mb-6 text-[22px] sm:text-[26px] md:text-[34px] font-extrabold tracking-tight leading-[1.1]">
            {dict.title}
          </h2>

          <p className="text-[11px] md:text-[13px] leading-[1.6] text-[#333333] mb-8 md:mb-10 max-w-[320px] md:max-w-[380px]">
            {dict.description}
          </p>

          <div className="relative w-[150px] h-[150px] md:w-[220px] md:h-[220px] mb-8 md:mb-10">
            <Image
              src="/images/visit/sarvi-hands.png"
              alt="Sarvi Details"
              fill
              className="object-cover"
            />
          </div>

          <Button
            variant="primary"
            className="w-full sm:w-fit px-12 h-10 text-[9px] md:text-[10px] tracking-widest uppercase bg-[#1A1A1A] text-white transition-opacity hover:opacity-90"
            onClick={() => setIsOpen(true)}
          >
            {dict.button}
          </Button>
        </div>
      </div>

      <div className="hidden md:block relative w-full h-[800px]">
        <Image
          src="/images/visit/showroom.jpg"
          alt="Sarvi Showroom Interior"
          fill
          className="object-cover"
          priority
        />
      </div>

      {isOpen && <VisitDrawer open={isOpen} setOpen={setIsOpen} />}
    </section>
  )
}

export default Visit
