# Bed Leveling

### Adds bed leveling buttons to the controls tab.

This plugin adds buttons to apply heat to the bed and nozzle, and move the printing head to each of the four corners of the bed, as well as the center of the bed.

The coordinates and temperatures can all be customized in the plugin’s settings.

![image](https://raw.githubusercontent.com/OctoPrint/plugins.octoprint.org/refs/heads/gh-pages/assets/img/plugins/CR10_Leveling/control.png)

## Warning

After turning on your printer, you must first home it before you can safely issue gcode that causes movement.
This is true for this plugin, OctoPrint's default movement controls, and even the LCD control on the Printer.

Failing to do so can cause the printer to move out-of-bounds.

## Setup

Install via the bundled [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html)
or manually using this URL:

    https://github.com/lsellens/OctoPrint-Cr10_leveling/archive/master.zip

## Configuration

Options can be configured from OctoPrint's settings menu under "Plugins"
Available options are:
 - Show Warning Banner (Enables/Disables UI warning about homing)
 - Bed Temp
 - Nozzle Temp
 - Wait for heating to finish
 - Play post-heat tune (only visable if "Wait for Heating to finish" is Enabled)
 - Feed Rate (Speed of movement)
 - Lower Z coordinate
 - Upper Z coordinate
 - Autolevel Commands
 - Front Left Position
 - Front Right Position
 - Back Left Position
 - Back Right Position
 - Center Position

![image](https://raw.githubusercontent.com/OctoPrint/plugins.octoprint.org/refs/heads/gh-pages/assets/img/plugins/CR10_Leveling/settings.png)
