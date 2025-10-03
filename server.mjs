import express from "express";
import { createRequestHandler } from "@react-router/express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware để phục vụ các file tĩnh từ thư mục build/client
// Đây là phần quan trọng nhất để sửa lỗi 404 cho các file assets
app.use(express.static(join(__dirname, "build/client")));

// Handler của React Router sẽ xử lý tất cả các request còn lại
app.all("*", createRequestHandler({
  build: join(__dirname, "build"),
}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on http://0.0.0.0:${port}`);
});