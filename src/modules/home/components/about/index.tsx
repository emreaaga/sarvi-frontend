import Image from "next/image"

const About = () => {
  return (
    <section className="w-full overflow-hidden border-b border-ui-border-base">
      <div className="relative w-full h-auto">
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
