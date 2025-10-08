import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Package from "@modules/common/icons/package"
import Smartphone from "@modules/common/icons/smartphone"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-50 border-t border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">TechStore</h3>
            <p className="text-blue-700 text-sm leading-relaxed mb-6 max-w-md">
              Your premier destination for the latest electronics and tech gadgets. 
              We offer cutting-edge smartphones, laptops, smart home devices, and more 
              with fast shipping and expert customer support.
            </p>
            
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FastDelivery size="20" color="#1e40af" />
                <span className="text-sm text-blue-700 font-medium">Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center gap-3">
                <Package size="20" color="#1e40af" />
                <span className="text-sm text-blue-700 font-medium">Secure packaging & delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone size="20" color="#1e40af" />
                <span className="text-sm text-blue-700 font-medium">Latest tech products</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/collections/smartphones"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Smartphones
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/collections/laptops"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Laptops & Computers
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/collections/smart-home"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Smart Home
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/collections/audio"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Audio & Headphones
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/collections/gaming"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Gaming
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/account"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  My Account
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/cart"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Shopping Cart
                </LocalizedClientLink>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Track Your Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-blue-200">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Stay Updated</h4>
            <p className="text-sm text-blue-700 mb-4">
              Get the latest tech news and exclusive deals delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-200 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-600">
              © {currentYear} TechStore. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
