import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Smartphone from "@modules/common/icons/smartphone"
import Laptop from "@modules/common/icons/laptop"
import SmartHome from "@modules/common/icons/smart-home"
import Headphones from "@modules/common/icons/headphones"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-blue-200 relative bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      {/* Background Tech Icons */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10">
          <Smartphone size="60" color="#1e40af" />
        </div>
        <div className="absolute top-32 right-20">
          <Laptop size="80" color="#1e40af" />
        </div>
        <div className="absolute bottom-32 left-20">
          <SmartHome size="70" color="#1e40af" />
        </div>
        <div className="absolute bottom-20 right-10">
          <Headphones size="50" color="#1e40af" />
        </div>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-4xl md:text-5xl leading-tight text-blue-900 font-bold"
          >
            Latest Electronics & Tech
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-relaxed text-blue-700 font-medium mt-4"
          >
            Discover cutting-edge gadgets, smartphones, laptops, and smart home devices
          </Heading>
        </span>
        
        {/* Tech Categories */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
            <Smartphone size="20" color="#1e40af" />
            <span className="text-sm font-medium text-blue-900">Smartphones</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
            <Laptop size="20" color="#1e40af" />
            <span className="text-sm font-medium text-blue-900">Laptops</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
            <SmartHome size="20" color="#1e40af" />
            <span className="text-sm font-medium text-blue-900">Smart Home</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
            <Headphones size="20" color="#1e40af" />
            <span className="text-sm font-medium text-blue-900">Audio</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <LocalizedClientLink href="/store">
            <Button size="large" className="px-8 py-3">
              Shop Electronics
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections">
            <Button variant="secondary" size="large" className="px-8 py-3">
              Browse Categories
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
