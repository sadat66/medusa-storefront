import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-50 border-t border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Medusa Store</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Your trusted destination for quality products. We're committed to providing 
              exceptional service and premium products to our customers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Store
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/account"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Account
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/cart"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Cart
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-900 transition-colors duration-200"
                >
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-600">
              © {currentYear} Medusa Store. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
