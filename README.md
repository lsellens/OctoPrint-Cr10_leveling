# Bed Leveling for OctoPrint

[![OctoPrint](https://img.shields.io/badge/OctoPrint-Plugin-green?logo=octoprint)](https://plugins.octoprint.org/)
[![GitHub Release](https://img.shields.io/github/v/release/lsellens/OctoPrint-Cr10_leveling)](https://github.com/lsellens/OctoPrint-Cr10_leveling/releases)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**Quickly heat your bed & nozzle and move your printer head to precise leveling positions — directly from OctoPrint’s control tab.**

---

## ✨ Features
- **One-click heating** for nozzle, bed, and chamber (configurable temps)
- **Fast positioning** to four corners + center of bed
- Fully **customizable coordinates**
- **Optional wait** for heating to finish
- **Post-heat tune** option
- Works with printers that have:
  - Heated Bed
  - Heated Chamber
- Homing safety reminder banner

---

## 📸 Screenshots

**Control Tab Buttons**  
![Control Tab Screenshot](https://raw.githubusercontent.com/OctoPrint/plugins.octoprint.org/refs/heads/gh-pages/assets/img/plugins/CR10_Leveling/control.png)

**Settings Panel**  
![Settings Screenshot](https://raw.githubusercontent.com/OctoPrint/plugins.octoprint.org/refs/heads/gh-pages/assets/img/plugins/CR10_Leveling/settings.png)

---

## ⚠️ Safety Warning

After turning on your printer, **always home it first** before issuing movement commands.  
This applies to:
- This plugin
- OctoPrint's default movement controls
- Your printer’s LCD menu

Failing to home may cause the printer to move out-of-bounds.

---

## 📥 Installation

**Option 1: Plugin Manager**  
1. In OctoPrint, go to **Settings → Plugin Manager → Get More...**
2. Search for `Bed Leveling` and install.

**Option 2: Manual Install**  
In OctoPrint’s Plugin Manager, paste this URL:
https://github.com/lsellens/OctoPrint-Cr10_leveling/archive/master.zip


---

## ⚙️ Configuration

From **Settings → Plugins → Bed Leveling**, you can customize:

- Show Warning Banner  
- Nozzle Temp  
- Bed Temp *(visible if heated bed is enabled in printer profile)*  
- Chamber Temp *(visible if heated chamber is enabled)*  
- Wait for heating to finish  
- Play post-heat tune *(only if waiting is enabled)*  
- Feed Rate (movement speed)  
- Lower & Upper Z coordinates  
- Auto-level G-code commands  
- Positions:
  - Front Left
  - Front Right
  - Back Left
  - Back Right
  - Center

---

## 📝 License

Licensed under the [AGPL v3](https://www.gnu.org/licenses/agpl-3.0) license.
