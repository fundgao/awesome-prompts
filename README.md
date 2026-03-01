# 马踏镇 · 家乡介绍站

广东省茂名市电白区马踏镇的风土人情介绍网站，风格参考 MEXC 活动页（深色 + 金色），支持简体中文、繁体中文、英文。

## 功能概览

- **首页**：概述文案、主图与图片网格、各专题入口
- **专题子页**：地理位置、人口组成、风土人情、习俗、**年例与信仰**（年例 / 拜神 / 游神 / 信仰）、美食人文、经济情况、宫罗岭
- **多语言**：导航栏右上角语言切换（简 / 繁 / EN），默认简体
- **移动端**：汉堡菜单展开全屏导航，支持关闭图标与点击遮罩关闭
- **部署**：已配置 Netlify（`netlify.toml` + `.nvmrc`）

## 技术栈

| 类别     | 技术 |
|----------|------|
| 框架     | Next.js 16、React 19、TypeScript |
| 包管理   | pnpm |
| UI       | shadcn/ui、Tailwind CSS 4 |
| 多语言   | next-intl |
| 状态/请求 | zustand、Axios（封装于 `src/lib/axios.ts`）、@tanstack/react-query |
| 其他     | zod、Sonner、ahooks、next-themes、Biome |

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)，默认会跳转到简体首页。

```bash
# 构建
pnpm build

# 生产运行
pnpm start

# 代码检查与格式化
pnpm check      # Biome 检查并自动修复
pnpm format     # 格式化
pnpm lint       # ESLint
```

## 项目结构（简要）

```
src/
├── app/
│   ├── [locale]/           # 多语言路由
│   │   ├── page.tsx         # 首页（概述 + 图片）
│   │   └── [section]/       # 专题子页（如 /location、/faith）
│   ├── globals.css          # 全局与 theme-matang 样式
│   └── layout.tsx
├── components/
│   ├── home/                # 首页与导航
│   │   ├── Nav.tsx          # 服务端：取文案并传给 NavBar
│   │   ├── NavBar.tsx       # 客户端：桌面/移动端导航与菜单
│   │   ├── Hero.tsx、Footer.tsx、LocaleSwitcher.tsx
│   │   └── SectionCard.tsx
│   ├── providers.tsx        # React Query、next-themes、Sonner
│   └── ui/                  # shadcn 组件
├── data/
│   └── matang.ts            # 专题 ID 与 isSectionId
├── i18n/
│   ├── routing.ts           # 语言与路由（zh / zh-Hant / en）
│   ├── request.ts           # 文案加载
│   └── navigation.ts        # Link、usePathname 等
├── lib/
│   ├── axios.ts             # Axios 封装（拦截器、get/post 等）
│   └── utils.ts
messages/                    # 多语言 JSON（zh、zh-Hant、en）
netlify.toml                 # Netlify 构建与环境
```

## 部署（Netlify）

- 仓库根目录已包含 `netlify.toml`（`pnpm run build`、Node 20、PNPM_FLAGS）与 `.nvmrc`。
- 在 Netlify 中连接本仓库即可自动检测 Next.js 并完成构建与发布。

## 许可

ISC
