# CR-10 Leveling

This plugins adds leveling controls for your CR-10 to the Control tab.

## Warning

After turning on your printer, you must first home it before you can safely issuing gcode that causes movement.
This is true for this plugin, OctoPrint's default movement controls, and even the LCD control on the CR-10.
    
Failing to do so can cause the printer to move out-of-bounds.

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/electr0sheep/OctoPrint-Cr10_leveling/archive/master.zip

## Configuration

The plugin will look for the leveling controls at OctoPrint boot and add them if
it doesn't find them. To disable this checking, simply disable the plugin. No
other configuration is necessary.
