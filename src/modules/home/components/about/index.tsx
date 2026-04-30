import Image from "next/image"

const About = () => {
  return (
    <section className="w-full overflow-hidden border-b border-ui-border-base">
      <div className="relative w-full h-auto">
        {/* Используем sizes="100vw", чтобы Next.js понимал масштаб.
           width и height здесь указывают пропорции (например, 1440x650),
           а h-auto позволит картинке сжиматься пропорционально.
        */}
        <Image
          src="/images/about/about-section.png"
          alt="SARVI Cosmetics Philosophy"
          width={1920} // Укажи примерную ширину фрейма из Figma
          height={650} // Укажи высоту фрейма из Figma
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  )
}

export default About
