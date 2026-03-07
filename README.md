# 马踏镇 · 家乡介绍站

广东省茂名市电白区马踏镇的风土人情介绍网站，风格参考 MEXC 活动页（深色 + 金色），支持简体中文、繁体中文、英文。

## 功能概览

- **首页**：概述文案、主图与图片网格、游神滚动图片轮播（双行，悬停暂停）、各专题入口卡片
- **专题子页**：地理位置（概览）、人口组成、习俗信仰（年例 / 拜神 / 游神 / 庙宇）、长山村
- **年例页**：独立的年例数据展示页，支持搜索
- **多语言**：导航栏右上角语言切换（简 / 繁 / EN），默认简体
- **移动端**：汉堡菜单展开全屏导航，支持关闭图标与点击遮罩关闭
- **路由重定向**：旧路径自动跳转至新路径（如 `/location` → `/overview`）
- **部署**：已配置 Netlify（`netlify.toml` + `.nvmrc`）

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16、React 19、TypeScript |
| 包管理 | pnpm |
| UI | shadcn/ui、Tailwind CSS 4 |
| 多语言 | next-intl（zh / zh-Hant / en） |
| 状态/请求 | Zustand、Axios（`src/lib/axios.ts`）、@tanstack/react-query |
| 其他 | Zod、Sonner、ahooks、next-themes、Biome |

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)，默认跳转到简体首页。

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

## 项目结构

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # 首页
│   │   ├── [section]/page.tsx    # 专题子页（overview / people / customs-faith / changshan）
│   │   ├── nianli/page.tsx       # 年例页
│   │   └── layout.tsx
│   ├── globals.css               # 全局样式与 theme-matang 变量
│   └── layout.tsx
├── components/
│   ├── home/
│   │   ├── Nav.tsx               # 服务端：获取文案并传给 NavBar
│   │   ├── NavBar.tsx            # 客户端：桌面/移动端导航与菜单
│   │   ├── Hero.tsx              # 首页 Hero 区域
│   │   ├── YoushenMarquee.tsx    # 游神图片滚动轮播（双行，悬停暂停）
│   │   ├── SectionCard.tsx       # 专题入口卡片
│   │   ├── Footer.tsx
│   │   └── LocaleSwitcher.tsx    # 语言切换器
│   ├── nianli/
│   │   └── NianliClient.tsx      # 年例数据展示（可搜索）
│   ├── providers.tsx             # React Query、next-themes、Sonner
│   └── ui/                       # shadcn 组件（button、marquee、sonner）
├── data/
│   ├── matang.ts                 # 专题 ID 与 block 配置
│   └── nianli.ts                 # 年例数据
├── i18n/
│   ├── routing.ts                # 语言与路由配置
│   ├── request.ts                # 文案加载
│   └── navigation.ts             # i18n Link、usePathname 等
├── lib/
│   ├── axios.ts                  # Axios 封装（拦截器、get/post）
│   └── utils.ts
messages/                         # 多语言 JSON（zh、zh-Hant、en）
netlify.toml                      # Netlify 构建配置
```

## 部署（Netlify）

仓库根目录已包含 `netlify.toml`（构建命令 `pnpm run build`、Node 20、PNPM_FLAGS）与 `.nvmrc`。在 Netlify 中连接本仓库即可自动检测 Next.js 并完成构建与发布。

## 许可

ISC
