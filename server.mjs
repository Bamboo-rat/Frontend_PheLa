import express from "express";
import { createRequestHandler } from "@react-router/express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Import module build của server
import * as build from "./build/server/index.js";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Phục vụ các file tĩnh từ thư mục build/client
app.use(express.static(join(__dirname, "build/client")));

// Xử lý tất cả các request còn lại bằng handler của React Router
// Lần này, chúng ta truyền trực tiếp module 'build' đã import vào
app.all("*", createRequestHandler({ build }));

app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on http://0.0.0.0:${port}`);
});