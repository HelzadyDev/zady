import {
    random,
    parseIntOr,
    parseFloatOr,
    isEmail,
    isUrl,
    captalize,
    limitText,
    brBuilder,
    spaceBuilder,
    replaceText,
    toNull,
    notFound,
} from "#package";

// number.ts
console.log("random.int(1, 6):", random.int(1, 6));
console.log("random.float(1.5, 5.0):", random.float(1.5, 5.0));
console.log("parseIntOr('abc', 99):", parseIntOr("abc", 99));
console.log("parseFloatOr('abc', 5.5):", parseFloatOr("abc", 5.5));

// validation.ts
console.log("isEmail('contato@zady.com'):", isEmail("contato@zady.com"));
console.log("isEmail('zady-invalido'):", isEmail("zady-invalido"));
console.log("isUrl('https://google.com'):", isUrl("https://google.com"));
console.log("isUrl('ftp://meu-servidor'):", isUrl("ftp://meu-servidor"));

// text.ts
console.log("captalize('zady bot'):", captalize("zady bot"));
console.log("limitText(...):", limitText("zady é uma lib incrivel", 10));
console.log("brBuilder(...):", brBuilder("Olá!", "Seja bem-vindo ao servidor."));
console.log("spaceBuilder(...):", spaceBuilder("Zady", "", "Core"));
console.log(
    "replaceText(...):",
    replaceText("Olá var(user), bem-vindo!", { user: "Helzady" })
);

// misc.ts
console.log("toNull():", toNull());
console.log("notFound(null):", notFound(null));
console.log("notFound('conteúdo'):", notFound("conteúdo"));