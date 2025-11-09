export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563EB',
          dark: '#38BDF8',
        },
        secondary: '#10B981',
        accent: {
          light: '#FBBF24',
          dark: '#4ADE80',
        },
        background: {
          light: '#F9FAFB',
          dark: '#0F172A',
        },
        card: {
          dark: '#1E293B',
        },
        text: {
          light: '#111827',
          dark: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
}
