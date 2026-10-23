// Local development server for vCard Personal Portfolio
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }

    // Security: prevent directory traversal
    const safePath = "." + pathname;

    const targetFile = Bun.file(safePath);
    const exists = await targetFile.exists();

    if (exists) {
      const ext = safePath.slice(safePath.lastIndexOf(".")).toLowerCase();
      const contentType = MIME_TYPES[ext] || targetFile.type || "application/octet-stream";

      return new Response(targetFile, {
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new Response(
      `<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The file <code>${pathname}</code> was not found.</p><a href="/">Return to Home</a></body></html>`,
      {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  },
});

console.log(`\n==================================================`);
console.log(`  vCard Personal Portfolio is running locally!`);
console.log(`  URL: http://localhost:${server.port}`);
console.log(`==================================================\n`);
