/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#007bff',
        'blue-secondary': '#0056b3',
        grayLight: '#f8f9fa',
        grayDark: '#343a40',  
      },
    },
  },
  plugins: [],
};
