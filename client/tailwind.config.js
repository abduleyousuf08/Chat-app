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
            animation: {
               flip: 'flip 0.5s',
            },
            keyframes: {
               flip: {
                  '0%, 100%': { transform: 'rotateY(0deg)' },
                  '50%': { transform: 'rotateY(180deg)' },
               },
            },
         },
      },
   },
   plugins: [],
};
