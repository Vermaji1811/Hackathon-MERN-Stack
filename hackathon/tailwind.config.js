

// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path according to your project structure
  ],
  theme: {
    extend: {
      spacing: {
        '60': '15rem',
        '72': '18rem',  // Add custom spacing value
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
