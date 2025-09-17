const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

function getAssetPath(fileName) {
  if (process.env.NODE_ENV === "production") {
    return path.join(process.resourcesPath, "assets", fileName);
  }
  return path.join(__dirname, "public", fileName);
}

async function generarPdf(datos) {
  const letraGenero =
    datos.genero === "Masculino" ? "o" : datos.genero === "Femenino" ? "a" : "";

  // ✅ Logo con ruta dinámica
  const logoPath = getAssetPath("SmLogo.png");
  const logoData = fs.readFileSync(logoPath);
  const logoBase64 = logoData.toString("base64");
  const logoDataUrl = `data:image/png;base64,${logoBase64}`;
  /* const logoPath = path.join(__dirname, "public", "SmLogo.png");
  const logoData = fs.readFileSync(logoPath);
  const logoBase64 = logoData.toString("base64");
  const logoDataUrl = `data:image/png;base64,${logoBase64}`; */

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Certificado de Bautismo</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>
          @page {
            size: A4;
            margin: 30px;
          }
         .font-alex {
           font-family: 'Alex Brush', cursive;
          }
        .font-pt-serif {
           font-family: "PT Serif", serif;
        }
        </style>
      </head>
      <body>
 <div class="flex items-center justify-center">
    <div class="w-[794px] h-auto mx-auto bg-white border-gray-300 p-8 font-semibold flex flex-col">
      <div class="relative pt-2 px-4 pb-10 border-double border-4 border-black before:content-[''] before:absolute before:inset-[-10px] before:border-4 before:border-double before:border-black">

        <div class="grid grid-rows-[auto_auto] gap-4">
  <!-- FILA 1: Logo + Texto -->
  <div class="relative">
    <img src="${logoDataUrl}" alt="LOGO" class="w-22 h-auto pt-3 absolute left-0 top-0" />
    
    <div class="text-center">
      <h2 class="text-2xl font-pt-serif">DIÓCESIS DE PUERTO PLATA</h2>
      <h2 class="text-3xl font-alex">Parroquia San Marcos Evangelista</h2>
    </div>
  </div>

  <!-- FILA 2: Certificado -->
  <div class="text-center mb-12 mt-10">
    <h1 class="text-2xl font-pt-serif uppercase">CERTIFICADO DE BAUTISMO</h1>
  </div>
</div>

    <div class="flex items-center gap-2 leading-loose tracking-wide mr-0 font-pt-serif text-[14px]">
  <span>El que suscribe</span>
  <div class="flex flex-col items-center flex-1 border-b border-black -mt-1">
    <span class="leading-tight font-normal">${datos.nombreSuscribe}</span>
  </div>
</div>
          <p class="leading-loose tracking-wide mb-6 pr-2 -mr-4 font-pt-serif text-[14px]">
            certifica que en el libro No. <span class="font-normal border-b border-black px-2">${
              datos.libroBautizo
            }</span>
            Folio <span class="font-normal border-b border-black px-2">${
              datos.folioBautizo
            }</span> 
            No. <span class="font-normal border-b border-black px-2">${
              datos.numeroArchivo
            }</span>
            del Archivo de esta Parroquia, se encuentra la partida de Bautismo de
            <span class="uppercase border-b border-black">${
              datos.nombreBautizado
            }</span> 
            <span class="pl-1">Nacid${letraGenero}</span> <span class="whitespace-nowrap">el día <span class="font-normal border-b border-black px-2">${
    datos.diaNacimiento
  }</span></span> del mes <span class="whitespace-nowrap"> de 
            <span class="font-normal border-b border-black px-2">${
              datos.mesNacimiento
            }</span></span> del año 
            <span class="font-normal border-b border-black px-2">${
              datos.anoNacimiento
            }</span> en
            <span class="font-normal border-b border-black px-2">${
              datos.lugarNacimiento
            }</span> hij${letraGenero} de <span class="font-normal border-b border-black">${
    datos.nombrePadre
  } y ${
    datos.nombreMadre
  }</span>, según consta en el Libro-Registro de Nacimiento 
            <span class="whitespace-nowrap">No. <span class="font-normal border-b border-black px-2">${
              datos.libroNacimiento
            }</span></span> 
            <span class="whitespace-nowrap">Folio
            <span class="font-normal border-b border-black px-2">${
              datos.folioNacimiento
            }</span></span> 
            <span class="whitespace-nowrap">No.
            <span class="font-normal border-b border-black px-2">${
              datos.archivoNacimiento
            }</span></span>  
            <span class="whitespace-nowrap">del año
            <span class="font-normal border-b border-black px-2">${
              datos.anoArchivo
            }</span></span>, ${datos.oficialia}.
          </p>

          <p class="mb-2 tracking-wide font-pt-serif text-[14px]">
            Bautizad${letraGenero} el día 
            <span class="font-normal border-b border-black px-2">${
              datos.diaBautismo
            }</span> del mes de
            <span class="font-normal border-b border-black px-2">${
              datos.mesBautismo
            }</span> del año
            <span class="font-normal border-b border-black px-2">${
              datos.anoBautismo
            }</span>
          </p>

          <p class="mb-2 tracking-wide font-pt-serif text-[14px]">
            Padrinos <span class="font-normal border-b border-black px-2">${
              datos.padrino
            } y ${datos.madrina}</span>
          </p>

          <p class="mb-6 tracking-wide font-pt-serif text-[14px]">
            Ministro del Sacramento <span class="font-normal border-b border-black px-2">${
              datos.ministroSacramento
            }</span>
          </p>

          <p class="mb-10 tracking-wide font-pt-serif text-[14px]">
            Notas marginales <span class="font-normal text-start border-b border-black px-2">${
              datos.notasMarginales || "Ningunas"
            }</span>
          </p>

          <p class="text-left tracking-wide font-pt-serif text-[14px]">
            Dado en Puerto Plata, Rep. Dom. El día 
            <span class="font-normal border-b border-black px-2">${
              datos.diaEmision
            }</span> del mes de 
            <span class="font-normal border-b border-black px-2">${
              datos.mesEmision
            }</span> del año 
            <span class="font-normal border-b border-black px-2">${
              datos.anoEmision
            }</span>
          </p>

          <div class="flex justify-between items-center mt-30">
          <p class="pl-20 font-pt-serif text-[14px]">Sello Parroquial</p>

          <p class="pr-14 text-right">
            _____________________________________ <br />
            <span class="px-20 font-pt-serif text-[14px]">
            Firma del Párroco</span>
          </p>
         
          </div>

          <div class="text-center justify-center mt-20">
            <p class="text-[14px] font-pt-serif">Calle Principal No. 42, San Marcos, Puerto Plata, Rep. Dom.</p>
            <p class="text-[14px] font-pt-serif">Email: pmarcosev@gmail.com</p>
            <p class="text-[14px] font-pt-serif">Tel. 809-970-3880</p>
          </div>
          
        </div>
        </div>
      </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new", // usa 'true' si da problemas en servidores
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // importante en algunos entornos
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "load" });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Configurar el tamaño de la página a A4 y generar el PDF
  const pdfBuffer = await page.pdf({
    width: "794px", // A4 ancho en px a 96 DPI
    height: "1123px", // A4 alto en px a 96 DPI
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = generarPdf;
