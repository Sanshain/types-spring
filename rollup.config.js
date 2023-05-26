//@ts-check
import dts from "rollup-plugin-dts";

export default {
    input: './sources/index.d.ts',
    output: {
        file: './dist/index.ts',
        format: 'es'
    },
    plugins: [
        dts({})
    ]
}