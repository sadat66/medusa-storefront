import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
      <Text className="txt-compact-small-plus text-blue-900 font-semibold mb-3">{title}</Text>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className="flex gap-x-2 items-center p-2 rounded-md hover:bg-blue-100 transition-colors duration-200"
          >
            <div className="flex items-center gap-x-2">
              {i.value === value && <EllipseMiniSolid className="text-blue-600" />}
              <RadioGroup.Item
                checked={i.value === value}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "!txt-compact-small !transform-none hover:cursor-pointer transition-colors duration-200",
                  {
                    "text-blue-900 font-medium": i.value === value,
                    "text-blue-700": i.value !== value,
                  }
                )}
                data-testid="radio-label"
                data-active={i.value === value}
              >
                {i.label}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
