import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        {customer ? (
          <div className="flex flex-col small:flex-row py-12 gap-8">
            <div className="w-full small:w-64 flex-shrink-0">
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {children}
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-12">
            <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-8 max-w-md w-full">
              {children}
            </div>
          </div>
        )}
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-blue-200 py-12 gap-8 bg-blue-50 rounded-lg p-6">
          <div>
            <h3 className="text-xl-semi mb-4 text-blue-900">Got questions?</h3>
            <span className="txt-medium text-blue-700">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service" className="text-blue-700 hover:text-blue-900">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
