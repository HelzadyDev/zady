import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: "@zady/config/build.preset",
    entries: ["src/index"]
})