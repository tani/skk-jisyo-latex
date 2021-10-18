all: SKK-JISYO.latex.utf8

SKK-JISYO.latex.utf8:
	deno run --allow-read --allow-write build.ts
