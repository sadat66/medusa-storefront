"use client"

import { useState } from "react"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import { Fragment } from "react"
import ReactCountryFlag from "react-country-flag"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

interface CountrySelectorProps {
  regions: HttpTypes.StoreRegion[]
  className?: string
}

export default function CountrySelector({ regions, className = "" }: CountrySelectorProps) {
  const [selected, setSelected] = useState<CountryOption | null>(null)
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const options = regions
    ?.map((r) => {
      return r.countries?.map((c) => ({
        country: c.iso_2,
        region: r.id,
        label: c.display_name,
      }))
    })
    .flat()
    .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))

  const handleChange = (option: CountryOption) => {
    setSelected(option)
    updateRegion(option.country, currentPath)
  }

  return (
    <div className={`relative ${className}`}>
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <ListboxButton className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <span className="flex items-center">
              {selected && (
                <>
                  <ReactCountryFlag
                    svg
                    style={{ width: "16px", height: "16px" }}
                    countryCode={selected.country}
                  />
                  <span className="ml-2 block truncate">{selected.label}</span>
                </>
              )}
              {!selected && (
                <span className="block truncate text-gray-500">Select country</span>
              )}
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options?.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? "text-blue-900 bg-blue-100" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        <ReactCountryFlag
                          svg
                          style={{ width: "16px", height: "16px" }}
                          countryCode={option?.country ?? ""}
                        />
                        <span className={`ml-2 block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {option?.label}
                        </span>
                      </div>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
