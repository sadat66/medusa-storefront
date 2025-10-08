const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        // Override Medusa UI colors with blue theme
        ui: {
          fg: {
            base: "#1e40af", // blue-800
            subdued: "#3b82f6", // blue-500
            muted: "#60a5fa", // blue-400
            disabled: "#93c5fd", // blue-300
            on: {
              color: "#ffffff",
              dark: "#ffffff",
              inverted: "#1e40af",
            },
          },
          bg: {
            base: "#ffffff",
            elevated: "#f8fafc", // slate-50
            elevated: {
              hover: "#f1f5f9", // slate-100
            },
            subdued: "#f8fafc", // slate-50
            disabled: "#f1f5f9", // slate-100
            interactive: {
              base: "#ffffff",
              hover: "#f8fafc", // slate-50
              active: "#f1f5f9", // slate-100
              selected: "#dbeafe", // blue-100
              disabled: "#f1f5f9", // slate-100
            },
            component: {
              base: "#ffffff",
              hover: "#f8fafc", // slate-50
              active: "#f1f5f9", // slate-100
              selected: "#dbeafe", // blue-100
              disabled: "#f1f5f9", // slate-100
            },
            overlay: "rgba(0, 0, 0, 0.5)",
            badge: {
              neutral: "#f1f5f9", // slate-100
              base: "#dbeafe", // blue-100
            },
            tag: {
              neutral: {
                base: "#f1f5f9", // slate-100
                hover: "#e2e8f0", // slate-200
              },
              base: {
                base: "#dbeafe", // blue-100
                hover: "#bfdbfe", // blue-200
              },
            },
          },
          border: {
            base: "#e2e8f0", // slate-200
            strong: "#cbd5e1", // slate-300
            interactive: {
              base: "#cbd5e1", // slate-300
              hover: "#94a3b8", // slate-400
              active: "#1e40af", // blue-800
              disabled: "#e2e8f0", // slate-200
            },
            error: "#ef4444", // red-500
            success: "#22c55e", // green-500
            warning: "#f59e0b", // amber-500
          },
          button: {
            primary: {
              base: "#1e40af", // blue-800
              hover: "#1d4ed8", // blue-700
              active: "#1e3a8a", // blue-900
              disabled: "#93c5fd", // blue-300
            },
            secondary: {
              base: "#ffffff",
              hover: "#f8fafc", // slate-50
              active: "#f1f5f9", // slate-100
              disabled: "#f1f5f9", // slate-100
            },
            transparent: {
              base: "transparent",
              hover: "#f8fafc", // slate-50
              active: "#f1f5f9", // slate-100
              disabled: "transparent",
            },
            danger: {
              base: "#ef4444", // red-500
              hover: "#dc2626", // red-600
              active: "#b91c1c", // red-700
              disabled: "#fca5a5", // red-300
            },
          },
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
