/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vlight-grey': 'hsl(0, 0%, 98%)',      
        'pblue':  'hsl(192, 100%, 67%)',
        'ppurple':  'hsl(280, 87%, 65%)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
