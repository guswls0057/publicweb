import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/publicweb/", // 예: 레포지토리 이름이 my-web 이라면 '/my-web/' 으로 작성
});
