import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: process.env.SOURCE_MAP === 'true',
    },
    base: '/app/',
    plugins: [react()]
})
