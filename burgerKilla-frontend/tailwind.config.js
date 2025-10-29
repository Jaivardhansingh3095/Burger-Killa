/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '480px' }, // use as mobile:text-green-200
        tablet: { min: '768px' }, // use as tablet:text-blue-500
        desktop: '1440px', // use as desktop:text-red-600
      },
    },
  },
  plugins: [],
};
