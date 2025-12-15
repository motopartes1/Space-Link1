import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SpaceLink Brand Colors - Black & White
        primary: {
          DEFAULT: '#0A0A0A', // Negro SpaceLink
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#A3A3A3',
          400: '#737373',
          500: '#0A0A0A',
          600: '#0A0A0A',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        secondary: {
          DEFAULT: '#FFFFFF', // Blanco SpaceLink
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#A3A3A3',
          600: '#737373',
          700: '#525252',
          800: '#262626',
          900: '#171717',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan para acentos (tecnología)
          light: '#22D3EE',
          dark: '#0891B2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0A0A0A 0%, #262626 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #0A0A0A 0px, transparent 50%), radial-gradient(at 80% 0%, #06B6D4 0px, transparent 50%), radial-gradient(at 0% 50%, #262626 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
