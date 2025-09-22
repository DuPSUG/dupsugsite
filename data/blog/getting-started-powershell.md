---
title: "Getting Started with PowerShell Scripting"
date: "2024-01-15"
author: "Admin"
---

# Welcome to PowerShell Scripting
PowerShell is a powerful **command-line shell** and scripting language built on .NET. Here are some key features:
## Key Features
- Object-oriented pipeline
- Extensive cmdlet library
- Cross-platform support
- Integration with .NET
### Basic Commands
```powershell
Get-Process | Where-Object {$_.CPU -gt 100}
Get-ChildItem -Path C:\\ -Recurse
```
*Happy scripting!*