import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: "@zady/config/build.preset",
    entries: ["src/index"],
    declaration: true,
    rollup: {
        emitCJS: true
    }
})