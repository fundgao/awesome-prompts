## 1. 路径与激活项

- [x] 1.1 在 `NavBar` 内使用 `usePathname()`（next-intl 或 next）获取当前 pathname，规范化后计算 `activeId`：首页为 `"home"`，section 页为对应 section id（与 `navItems[].id` 一致），其余为 `null`
- [x] 1.2 为「首页」Link 与每个 section Link 根据 `activeId` 判断是否激活，设置 `aria-current="page"`（仅激活项），并为激活项添加激活样式 class（如 `matang-nav-link-active`）

## 2. 桌面端与移动端

- [x] 2.1 桌面端导航：对首页链接与 `navItems` 的每个 Link 应用 1.2 的激活逻辑与样式，保证当前页对应项高亮
- [x] 2.2 移动端菜单：对展开面板内的首页链接与 section 链接应用同一套激活逻辑与样式，与桌面端一致

## 3. 样式与验收

- [x] 3.1 在全局或组件样式中定义 `matang-nav-link-active`（或所用 class），与现有主题一致（如字色/字重/下划线），桌面与移动共用
- [x] 3.2 验收：首页时仅「首页」激活，section 页时仅对应 section 激活；桌面与移动表现一致；激活项带 `aria-current="page"`
