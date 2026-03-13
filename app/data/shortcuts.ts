export interface Shortcut {
  id: string;
  key: string;
  description: string;
  context?: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const categories: Category[] = [
  // Keyboard shortcuts
  { id: 'general', name: '通用控制', emoji: '⌨️', color: 'from-blue-500 to-cyan-500' },
  { id: 'text', name: '文本编辑', emoji: '✏️', color: 'from-purple-500 to-pink-500' },
  { id: 'multiline', name: '多行输入', emoji: '📝', color: 'from-green-500 to-teal-500' },
  { id: 'quick', name: '快捷前缀', emoji: '⚡', color: 'from-yellow-500 to-orange-500' },
  { id: 'vim-mode', name: 'Vim 模式切换', emoji: '🔄', color: 'from-red-500 to-rose-500' },
  { id: 'vim-nav', name: 'Vim 导航', emoji: '🧭', color: 'from-indigo-500 to-violet-500' },
  { id: 'vim-edit', name: 'Vim 编辑', emoji: '🔧', color: 'from-amber-500 to-yellow-500' },
  { id: 'vim-text', name: 'Vim 文本对象', emoji: '📦', color: 'from-pink-500 to-rose-500' },
  // Slash commands
  { id: 'cmd-session', name: '会话管理', emoji: '💬', color: 'from-sky-500 to-blue-500' },
  { id: 'cmd-info', name: '信息查看', emoji: '📊', color: 'from-teal-500 to-cyan-500' },
  { id: 'cmd-model', name: '模式控制', emoji: '🎛️', color: 'from-violet-500 to-purple-500' },
  { id: 'cmd-config', name: '配置管理', emoji: '⚙️', color: 'from-slate-500 to-gray-500' },
  { id: 'cmd-code', name: '代码工具', emoji: '🔍', color: 'from-rose-500 to-pink-500' },
  { id: 'cmd-ext', name: '集成扩展', emoji: '🔌', color: 'from-lime-500 to-green-500' },
];

export const shortcuts: Shortcut[] = [
  // ─── General controls ────────────────────────────────────────────────────────
  { id: 'tab', key: 'Tab', description: '接受 AI 提示建议', context: '输入框出现灰色建议时按 Tab 接受，Enter 接受并立即提交', category: 'general' },
  { id: 'ctrl-c', key: 'Ctrl+C', description: '取消当前输入或生成', context: '标准中断信号', category: 'general' },
  { id: 'ctrl-f', key: 'Ctrl+F', description: '终止所有后台 Agent', context: '3秒内按两次确认', category: 'general' },
  { id: 'ctrl-d', key: 'Ctrl+D', description: '退出 Claude Code 会话', context: 'EOF 信号', category: 'general' },
  { id: 'ctrl-g', key: 'Ctrl+G', description: '在默认编辑器中打开', context: '编辑 prompt 或自定义响应', category: 'general' },
  { id: 'ctrl-l', key: 'Ctrl+L', description: '清除终端屏幕', context: '保留对话历史', category: 'general' },
  { id: 'ctrl-o', key: 'Ctrl+O', description: '切换详细输出模式', context: '显示工具使用和执行详情', category: 'general' },
  { id: 'ctrl-r', key: 'Ctrl+R', description: '反向搜索命令历史', context: '交互式搜索；Tab/Esc 接受，Enter 执行，Ctrl+C 取消', category: 'general' },
  { id: 'ctrl-v', key: 'Ctrl+V / Cmd+V / Alt+V', description: '从剪贴板粘贴图片', context: 'Cmd+V 限 iTerm2，Alt+V 限 Windows', category: 'general' },
  { id: 'ctrl-b', key: 'Ctrl+B', description: '后台运行任务', context: 'Tmux 用户需按两次', category: 'general' },
  { id: 'ctrl-t', key: 'Ctrl+T', description: '切换任务列表显示', context: '在终端状态区显示/隐藏任务，最多显示 10 条', category: 'general' },
  { id: 'arrows-lr', key: '← / →', description: '在对话框标签间切换', context: '导航权限对话框和菜单', category: 'general' },
  { id: 'arrows-ud', key: '↑ / ↓', description: '导航命令历史', context: '调取之前的输入', category: 'general' },
  { id: 'esc-esc', key: 'Esc + Esc', description: '回退或总结', context: '恢复到之前状态，或总结选定消息', category: 'general' },
  { id: 'shift-tab', key: 'Shift+Tab / Alt+M', description: '切换权限模式', context: '在自动接受/计划模式/普通模式间切换', category: 'general' },
  { id: 'opt-p', key: 'Option+P / Alt+P', description: '切换模型', context: '不清除 prompt 直接切换模型', category: 'general' },
  { id: 'opt-t', key: 'Option+T / Alt+T', description: '切换扩展思考模式', context: '需先运行 /terminal-setup', category: 'general' },

  // ─── Text editing ────────────────────────────────────────────────────────────
  { id: 'ctrl-k', key: 'Ctrl+K', description: '删除到行尾', context: '删除的文本可粘贴', category: 'text' },
  { id: 'ctrl-u', key: 'Ctrl+U', description: '删除整行', context: '删除的文本可粘贴', category: 'text' },
  { id: 'ctrl-y', key: 'Ctrl+Y', description: '粘贴已删除的文本', context: '粘贴 Ctrl+K 或 Ctrl+U 删除的内容', category: 'text' },
  { id: 'alt-y', key: 'Alt+Y', description: '循环粘贴历史', context: '粘贴后循环切换历史删除内容（需 Option as Meta）', category: 'text' },
  { id: 'alt-b', key: 'Alt+B', description: '向前移动一个词', context: '词级导航（macOS 需配置 Option as Meta）', category: 'text' },
  { id: 'alt-f', key: 'Alt+F', description: '向后移动一个词', context: '词级导航（macOS 需配置 Option as Meta）', category: 'text' },

  // ─── Multiline input ─────────────────────────────────────────────────────────
  { id: 'backslash-enter', key: '\\ + Enter', description: '快速换行', context: '所有终端均支持', category: 'multiline' },
  { id: 'opt-enter', key: 'Option+Enter', description: 'macOS 默认换行', context: 'macOS 默认配置', category: 'multiline' },
  { id: 'shift-enter', key: 'Shift+Enter', description: '换行（无需配置）', context: 'iTerm2, WezTerm, Ghostty, Kitty 开箱即用', category: 'multiline' },
  { id: 'ctrl-j', key: 'Ctrl+J', description: '换行符换行', context: '换行控制字符', category: 'multiline' },
  { id: 'paste-direct', key: 'Paste', description: '直接粘贴多行内容', context: '代码块、日志等长内容直接粘贴', category: 'multiline' },

  // ─── Quick prefixes ───────────────────────────────────────────────────────────
  { id: 'slash', key: '/', description: '命令或 Skill', context: '在输入开头使用，输入字母可过滤', category: 'quick' },
  { id: 'excl', key: '!', description: 'Bash 直接执行模式', context: '直接运行命令并将输出加入会话；Tab 补全历史命令', category: 'quick' },
  { id: 'at', key: '@', description: '文件路径提及', context: '触发文件路径自动补全', category: 'quick' },
  { id: 'ampersand', key: '&', description: '后台云端执行任务', context: '将任务发送到云端 Claude 后台运行', category: 'quick' },

  // ─── Vim mode switching ───────────────────────────────────────────────────────
  { id: 'vim-esc', key: 'Esc', description: '进入 NORMAL 模式', context: '从 INSERT 模式切换', category: 'vim-mode' },
  { id: 'vim-i', key: 'i', description: '在光标前插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-shift-i', key: 'I', description: '在行首插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-a', key: 'a', description: '在光标后插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-shift-a', key: 'A', description: '在行尾插入', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-o', key: 'o', description: '在下方新建行', context: 'NORMAL 模式', category: 'vim-mode' },
  { id: 'vim-shift-o', key: 'O', description: '在上方新建行', context: 'NORMAL 模式', category: 'vim-mode' },

  // ─── Vim navigation ───────────────────────────────────────────────────────────
  { id: 'vim-hjkl', key: 'h / j / k / l', description: '左/下/上/右移动', context: 'NORMAL 模式导航', category: 'vim-nav' },
  { id: 'vim-w', key: 'w', description: '移到下一个词', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-e', key: 'e', description: '移到词尾', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-b', key: 'b', description: '移到上一个词', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-0', key: '0', description: '移到行首', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-caret', key: '^', description: '移到第一个非空字符', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-dollar', key: '$', description: '移到行尾', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-gg', key: 'gg', description: '移到输入开头', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-G', key: 'G', description: '移到输入末尾', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-f', key: 'f{char}', description: '跳到下一个指定字符', context: 'NORMAL 模式，如 fa 跳到下一个 a', category: 'vim-nav' },
  { id: 'vim-F', key: 'F{char}', description: '跳到上一个指定字符', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-t', key: 't{char}', description: '跳到下一个指定字符前', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-T', key: 'T{char}', description: '跳到上一个指定字符后', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-semi', key: ';', description: '重复上次 f/F/t/T 动作', context: 'NORMAL 模式', category: 'vim-nav' },
  { id: 'vim-comma', key: ',', description: '反向重复上次 f/F/t/T 动作', context: 'NORMAL 模式', category: 'vim-nav' },

  // ─── Vim editing ─────────────────────────────────────────────────────────────
  { id: 'vim-x', key: 'x', description: '删除字符', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-dd', key: 'dd', description: '删除整行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-D', key: 'D', description: '删除到行尾', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-dw', key: 'dw / de / db', description: '删除词/到词尾/向前词', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-cc', key: 'cc', description: '修改整行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-C', key: 'C', description: '修改到行尾', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-cw', key: 'cw / ce / cb', description: '修改词/到词尾/向前词', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-yy', key: 'yy / Y', description: '复制整行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-yw', key: 'yw / ye / yb', description: '复制词/到词尾/向前词', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-p', key: 'p', description: '在光标后粘贴', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-P', key: 'P', description: '在光标前粘贴', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-indent', key: '>> / <<', description: '增加/减少缩进', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-J', key: 'J', description: '合并下一行', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-dot', key: '.', description: '重复上次操作', context: 'NORMAL 模式', category: 'vim-edit' },
  { id: 'vim-u', key: 'u', description: '撤销', context: 'NORMAL 模式', category: 'vim-edit' },

  // ─── Vim text objects ─────────────────────────────────────────────────────────
  { id: 'vim-to-iw', key: 'iw / aw', description: '内部/周围单词', context: '与 d、c、y 组合使用，如 diw 删除单词', category: 'vim-text' },
  { id: 'vim-to-iW', key: 'iW / aW', description: '内部/周围 WORD', context: 'WORD 以空白为分隔（含标点）', category: 'vim-text' },
  { id: 'vim-to-dq', key: 'i" / a"', description: '内部/周围双引号', context: '如 ci" 修改双引号内内容', category: 'vim-text' },
  { id: 'vim-to-sq', key: "i' / a'", description: '内部/周围单引号', context: "如 di' 删除单引号内内容", category: 'vim-text' },
  { id: 'vim-to-paren', key: 'i( / a(', description: '内部/周围括号', context: '如 ci( 修改括号内内容', category: 'vim-text' },
  { id: 'vim-to-bracket', key: 'i[ / a[', description: '内部/周围方括号', context: '如 di[ 删除方括号内内容', category: 'vim-text' },
  { id: 'vim-to-brace', key: 'i{ / a{', description: '内部/周围大括号', context: '如 ci{ 修改大括号内内容', category: 'vim-text' },

  // ─── Session management commands ─────────────────────────────────────────────
  { id: 'cmd-clear', key: '/clear', description: '清空对话历史，全新开始', context: '切换任务时用；不关 Claude Code；别名：/reset, /new', category: 'cmd-session' },
  { id: 'cmd-compact', key: '/compact', description: '压缩对话历史，释放上下文空间', context: '对话很长接近 token 上限时；可加指令如 /compact 保留 API 相关内容', category: 'cmd-session' },
  { id: 'cmd-resume', key: '/resume', description: '恢复之前保存的会话', context: '第二天继续昨天的任务；传 session ID 或名字；别名：/continue', category: 'cmd-session' },
  { id: 'cmd-fork', key: '/fork', description: '从当前节点分叉出新会话', context: '想尝试不同方案又不破坏现有上下文时', category: 'cmd-session' },
  { id: 'cmd-rename', key: '/rename', description: '重命名当前会话', context: '方便后续 /resume 时找到它；不传名字会自动生成', category: 'cmd-session' },
  { id: 'cmd-rewind', key: '/rewind', description: '回滚代码和对话到历史检查点', context: 'Claude 做错了，撤回到更早的状态；别名：/checkpoint', category: 'cmd-session' },
  { id: 'cmd-export', key: '/export', description: '将当前对话导出为纯文本', context: '保存重要对话记录；不加文件名会弹出选项', category: 'cmd-session' },
  { id: 'cmd-copy', key: '/copy', description: '复制最后一条 AI 回复到剪贴板', context: '有代码块时可选择复制单个块还是整条回复', category: 'cmd-session' },

  // ─── Info commands ────────────────────────────────────────────────────────────
  { id: 'cmd-cost', key: '/cost', description: '显示当前会话的 token 用量统计', context: '随时检查这次对话烧了多少 token', category: 'cmd-info' },
  { id: 'cmd-usage', key: '/usage', description: '查看套餐限额和速率限制状态', context: '担心快到月度上限时检查剩余额度', category: 'cmd-info' },
  { id: 'cmd-context', key: '/context', description: '用彩色格子可视化上下文窗口占用', context: '直观看 context 还剩多少空间，判断是否需要 /compact', category: 'cmd-info' },
  { id: 'cmd-stats', key: '/stats', description: '查看使用统计：每日用量、历史、连续天数', context: '复盘一段时间内的使用规律，GitHub 风格热力图', category: 'cmd-info' },
  { id: 'cmd-diff', key: '/diff', description: '打开交互式 diff 查看器展示未提交改动', context: '用左右键切换 git diff 和每轮修改；提交前 review 用', category: 'cmd-info' },
  { id: 'cmd-insights', key: '/insights', description: '生成 Claude Code 会话分析报告', context: '了解项目区域、交互模式和卡点分布', category: 'cmd-info' },
  { id: 'cmd-status', key: '/status', description: '显示版本、模型、账号和网络连接信息', context: '排查问题、确认当前使用的是哪个模型', category: 'cmd-info' },
  { id: 'cmd-doctor', key: '/doctor', description: '诊断并验证 Claude Code 安装环境', context: '安装后遇到异常、命令不生效时运行', category: 'cmd-info' },

  // ─── Model / mode commands ────────────────────────────────────────────────────
  { id: 'cmd-model', key: '/model', description: '切换 AI 模型（Sonnet / Opus / Haiku）', context: '复杂任务换 Opus，速度优先用 Haiku；用方向键调整推理强度', category: 'cmd-model' },
  { id: 'cmd-fast', key: '/fast', description: '开启快速模式，提升输出速度', context: '简单任务或赶时间时开启；可能略降思考深度', category: 'cmd-model' },
  { id: 'cmd-plan', key: '/plan', description: '进入计划模式，先看方案再决定执行', context: 'Claude 先规划分析，确认后再放行修改；防止乱改代码', category: 'cmd-model' },
  { id: 'cmd-vim-cmd', key: '/vim', description: '切换 Vim / Normal 编辑模式', context: '习惯 Vim 键位的用户开启；也可在 /config 里永久设置', category: 'cmd-model' },
  { id: 'cmd-theme', key: '/theme', description: '切换颜色主题（暗色/亮色/色盲模式/ANSI）', context: '调整终端显示风格；支持 daltonized 色盲友好主题', category: 'cmd-model' },

  // ─── Config commands ──────────────────────────────────────────────────────────
  { id: 'cmd-config', key: '/config', description: '打开设置界面，调整全局行为偏好', context: '20+ 可配置项，包括主题、输出风格、记忆等；别名：/settings', category: 'cmd-config' },
  { id: 'cmd-permissions', key: '/permissions', description: '查看或更新工具执行权限', context: '限制或开放 Claude 可运行哪些命令；别名：/allowed-tools', category: 'cmd-config' },
  { id: 'cmd-init', key: '/init', description: '初始化项目，自动生成 CLAUDE.md 指南', context: '新项目第一次用 Claude Code 时运行，让 AI 了解项目结构', category: 'cmd-config' },
  { id: 'cmd-memory', key: '/memory', description: '编辑 CLAUDE.md 记忆文件，管理自动记忆', context: '手动更新项目规则或全局偏好；可开关自动记忆功能', category: 'cmd-config' },
  { id: 'cmd-hooks', key: '/hooks', description: '配置工具事件的生命周期钩子', context: '在文件保存、提交前等特定事件自动触发脚本', category: 'cmd-config' },
  { id: 'cmd-statusline', key: '/statusline', description: '配置终端底部状态栏显示内容', context: '可显示 git 分支、token 用量等；不加参数自动从 shell 提示符配置', category: 'cmd-config' },
  { id: 'cmd-terminal-setup', key: '/terminal-setup', description: '配置终端快捷键绑定（如 Shift+Enter）', context: '在 VS Code、Alacritty、Zed 等终端中首次使用时运行', category: 'cmd-config' },
  { id: 'cmd-keybindings', key: '/keybindings', description: '打开或创建快捷键配置文件', context: '自定义键位映射，支持 chord 组合键', category: 'cmd-config' },

  // ─── Code review commands ─────────────────────────────────────────────────────
  { id: 'cmd-pr-comments', key: '/pr-comments', description: '拉取并展示 GitHub PR 的 review 评论', context: '在终端直接看 reviewer 反馈，不用切换浏览器；需要 gh CLI', category: 'cmd-code' },
  { id: 'cmd-security-review', key: '/security-review', description: '分析当前分支变更，识别安全漏洞', context: '涉及认证、权限、数据处理的代码上线前运行', category: 'cmd-code' },
  { id: 'cmd-sandbox', key: '/sandbox', description: '开启沙箱模式，隔离文件系统和网络访问', context: '运行不信任的代码或做实验时保护本地环境', category: 'cmd-code' },
  { id: 'cmd-install-github-app', key: '/install-github-app', description: '安装 Claude GitHub Actions App', context: '团队项目配置 AI 自动 review 所有 PR', category: 'cmd-code' },

  // ─── Extension / integration commands ────────────────────────────────────────
  { id: 'cmd-mcp', key: '/mcp', description: '管理 MCP 服务器连接和 OAuth 认证', context: '添加浏览器、数据库、API 等工具到 Claude Code', category: 'cmd-ext' },
  { id: 'cmd-agents', key: '/agents', description: '创建和管理子 Agent 配置', context: '设置专门负责某类任务的 Agent，如专写测试的 Agent', category: 'cmd-ext' },
  { id: 'cmd-skills', key: '/skills', description: '列出所有可用的自定义技能', context: '查看本地 skill 库，用 / 触发已安装的 skill', category: 'cmd-ext' },
  { id: 'cmd-plugin', key: '/plugin', description: '管理 Claude Code 插件（安装/删除/市场）', context: '从官方市场安装社区插件扩展功能', category: 'cmd-ext' },
  { id: 'cmd-ide', key: '/ide', description: '管理 IDE 集成状态', context: '配置 VS Code、Cursor 等编辑器的 Claude Code 插件', category: 'cmd-ext' },
  { id: 'cmd-btw', key: '/btw', description: '提问一个不影响对话历史的临时问题', context: '想快速查个信息但不想污染主对话；Claude 回答完就消失', category: 'cmd-ext' },
];
