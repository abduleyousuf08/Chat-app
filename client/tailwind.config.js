/** @type {import('tailwindcss').Consfig} */
module.exports = {
   content: ['./src/**/*.{html,js,jsx}'],
   theme: {
      extend: {
         fontFamily: {
            userName: ['Bricolage Grotesque', ' sans-serif'],
            headerMessage: ['Roboto', 'sans-serif'],
            messages: ['Ubuntu', 'sans-serif'],
            buttonCreate: ['Skranji', 'cursive'],
         },
      },
   },
   plugins: [],
};
