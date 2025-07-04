---
layout: plugin

id: CR10_Leveling
title: Bed Leveling
description: Adds bed leveling buttons to the controls tab
authors:
- lsellens
- AvanOsch
- electr0sheep
license: AGPLv3
date: 2021-04-24
homepage: https://github.com/lsellens/OctoPrint-Cr10_leveling
source: https://github.com/lsellens/OctoPrint-Cr10_leveling
archive: https://github.com/lsellens/OctoPrint-Cr10_leveling/archive/master.zip
tags:
- ui
- bed leveling
screenshots:
- url: /assets/img/plugins/CR10_Leveling/control.png
  alt: Control Tab
- url: /assets/img/plugins/CR10_Leveling/settings.png
  alt: Settings
featuredimage: /assets/img/plugins/CR10_Leveling/control.png
compatibility:
  python: '>=2.7, <4'
---

This plugin adds buttons to apply heat to the bed and nozzle, and move the
printing head to each of the four corners of the bed, as well as the center of
the bed.

The coordinates and temperatures can all be customized in the plugin's settings.
