# Changeset 使用指南

本项目使用 [Changesets](https://github.com/changesets/changesets) 来管理版本和生成 CHANGELOG。

## 工作流程

### 1. 开发新功能或修复 Bug

正常开发你的功能或修复。

### 2. 创建 Changeset

当你完成一个功能或修复后，创建一个 changeset：

```bash
npm run changeset
```

这会启动一个交互式命令行界面：

1. **选择版本类型**：
   - `major`: 重大变更（破坏性更新）- 1.0.0 → 2.0.0
   - `minor`: 新功能（向后兼容）- 1.0.0 → 1.1.0
   - `patch`: Bug 修复（向后兼容）- 1.0.0 → 1.0.1

2. **编写变更说明**：描述你的更改内容

### 3. 手动创建 Changeset（推荐）

你也可以直接在 `.changeset` 目录下创建 `.md` 文件：

```markdown
---
"rc-text-ellipsis": minor
---

Add suffix feature

- Add new suffix prop
- Update documentation
```

### 4. 生成版本和 CHANGELOG

当准备发布时，运行：

```bash
npm run changeset:version
```

这会：
- 根据 changeset 文件更新 `package.json` 中的版本号
- 生成或更新 `CHANGELOG.md`
- 删除已处理的 changeset 文件

### 5. 发布到 npm

```bash
npm run changeset:publish
```

这会：
- 发布包到 npm
- 创建 git tags

## 常用命令

```bash
# 创建新的 changeset
npm run changeset

# 查看当前状态
npx changeset status

# 生成版本号和 CHANGELOG
npm run changeset:version

# 发布到 npm
npm run changeset:publish
```

## 本次更新

本次我们已经为 suffix 功能创建了 changeset：
- 文件位置：`.changeset/add-suffix-feature.md`
- 版本类型：minor（新功能）
- 描述了 suffix 功能的所有变更

当你准备发布时，运行 `npm run changeset:version` 即可自动更新版本到 1.2.0。
