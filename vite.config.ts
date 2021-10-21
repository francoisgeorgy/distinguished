import react from '@vitejs/plugin-react'
import packageJson from "./package.json";
import {replaceCodePlugin} from "vite-plugin-replace";

export default {
    build: {
        sourcemap: process.env.SOURCE_MAP === 'true',
    },
    base: '/disting/',
    plugins: [
        react(),
        replaceCodePlugin({
            replacements: [{
                from: "__CLI_NAME__",
                to: packageJson.name,
            }, {
                from: /__CLI_VERSION__/g,
                to: packageJson.version,
            }
            ]
        })
    ]
}
