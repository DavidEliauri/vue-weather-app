/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            Inter: ["Inter, sans-serif"],
        },
        container: {
            padding: "2rem",
            center: true,
        },
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
        },
    },
    plugins: [],
};
