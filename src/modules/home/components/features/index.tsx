import FastDelivery from "@modules/common/icons/fast-delivery"
import Package from "@modules/common/icons/package"
import Smartphone from "@modules/common/icons/smartphone"

const Features = () => {
  const features = [
    {
      icon: FastDelivery,
      title: "Fast Shipping",
      description: "Free shipping on orders over $99. Express delivery available."
    },
    {
      icon: Package,
      title: "Secure Packaging",
      description: "Your electronics are protected with premium packaging."
    },
    {
      icon: Smartphone,
      title: "Latest Tech",
      description: "Always up-to-date with the newest electronics and gadgets."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose TechStore?</h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            We're committed to providing the best shopping experience for tech enthusiasts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <feature.icon size="32" color="#1e40af" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-blue-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
