import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export const BRANDS_LOGOS = [
  { name: "Charlotte Tilbury", src: "/images/brands/charlotte.png" },
  { name: "LANEIGE", src: "/images/brands/laneige.png" },
  { name: "Rare Beauty", src: "/images/brands/rare.png" },
  { name: "WESTMAN ATELIER", src: "/images/brands/westman.png" },
  { name: "SOL DE JANEIRO", src: "/images/brands/sol.png" },
  { name: "gisou", src: "/images/brands/qison.png" },
  { name: "rhode", src: "/images/brands/rhode.png" },
  { name: "HOURGLASS", src: "/images/brands/hour.png" },
  { name: "HERMÈS", src: "/images/brands/hermes.png" },
  { name: "SUMMER FRIDAYS", src: "/images/brands/summer.png" },
  { name: "GUCCI", src: "/images/brands/gucci.png" },
  { name: "CHANEL", src: "/images/brands/chanel.png" },
]

const Brands = () => {
  return (
    <section
      style={{
        backgroundColor: "rgba(255, 253, 248, 1)",
        width: "100%",
      }}
      className="font-sans"
    >
      <div
        className="content-container"
        style={{
          padding: "80px 40px 60px 40px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#000000",
            marginBottom: "60px",
            textTransform: "lowercase",
            letterSpacing: "-0.02em",
          }}
        >
          бренды
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center">
          {BRANDS_LOGOS.map((brand, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                height: "40px",
                width: "100%",
              }}
              className="grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-[80px]">
          <LocalizedClientLink
            href="/"
            style={{
              fontSize: "11px",
              textTransform: "lowercase",
              letterSpacing: "0.05em",
              color: "#000000",
              borderBottom: "1px solid #000000",
              paddingBottom: "2px",
            }}
            className="hover:opacity-50 transition-opacity"
          >
            все бренды
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Brands
