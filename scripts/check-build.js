import fs from "fs"

if (!fs.existsSync("./build")) {
  console.error("❌ Pasta build não encontrada!");
  console.error("Execute o build antes de publicar.");
  process.exit(1);
}

console.log("✅ Build encontrado.");