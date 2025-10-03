import express from "express";
import { createRequestHandler } from "@react-router/express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// 1. Phục vụ tất cả các file tĩnh (js, css, images...) từ thư mục `build/client`
app.use(express.static(join(__dirname, "build/client")));

// 2. Sử dụng handler của React Router như một middleware cuối cùng
// Nó sẽ xử lý tất cả các request không phải là file tĩnh
app.use(createRequestHandler({
  build: join(__dirname, "build"),
}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on http://0.0.0.0:${port}`);
});