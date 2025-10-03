import express from "express";
import { createRequestHandler } from "@react-router/express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// 1. Phục vụ tất cả các file tĩnh (js, css, images...) từ thư mục `build/client`
// Bất kỳ request nào khớp với một file trong này sẽ được trả về ngay lập tức.
app.use(express.static(join(__dirname, "build/client")));

// 2. Với tất cả các request còn lại (không phải file tĩnh), hãy để React Router xử lý
// Đây là phần render phía server (SSR) cho các trang của bạn.
app.get("*", createRequestHandler({
  build: join(__dirname, "build"),
}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on http://0.0.0.0:${port}`);
});