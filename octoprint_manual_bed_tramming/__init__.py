""" "Manual Bed Tramming Plugin for OctoPrint
This plugin provides an easy way to manually tram the bed of a 3D printer.
It allows users to set various parameters such as nozzle temperature, bed temperature,
and coordinates for tramming points.
"""

from __future__ import absolute_import
from typing import Any, Dict, Optional, Literal

import octoprint.plugin
import octoprint.printer.profile


class ManualBedTrammingPlugin(  # pylint: disable=too-many-ancestors
    octoprint.plugin.AssetPlugin,
    octoprint.plugin.TemplatePlugin,
    octoprint.plugin.SettingsPlugin,
    octoprint.plugin.StartupPlugin,
):
    """OctoPrint Manual Bed Tramming Plugin. Allows user to easily tram 3D printer."""

    _printer_profile_manager: octoprint.printer.profile.PrinterProfileManager

    def get_settings_defaults(self) -> dict:
        """Return the default settings for the plugin."""
        printer_profile = self._printer_profile_manager.get_current_or_default()
        heated_bed = printer_profile["heatedBed"]
        heated_chamber = printer_profile["heatedChamber"]
        return {
            "show_warning_banner": True,
            "nozzle_temp": 170,
            "bed_temp": 50,
            "chamber_temp": 0,
            "play_tune": True,
            "wait_for_heat": True,
            "front_left_x": 30,
            "front_left_y": 30,
            "front_right_x": 270,
            "front_right_y": 30,
            "back_left_x": 30,
            "back_left_y": 270,
            "back_right_x": 270,
            "back_right_y": 270,
            "center_x": 150,
            "center_y": 150,
            "lower_z": 0,
            "upper_z": 10,
            "feed_rate": 3600,
            "autolevel": "",
            "has_heated_bed": heated_bed,
            "has_heated_chamber": heated_chamber,
        }

    def get_template_configs(self) -> list[dict]:
        return [{"type": "settings", "custom_bindings": False}]

    def get_assets(self) -> dict:
        """Return the assets (JavaScript, CSS) for the plugin."""
        return {"js": ["js/CR10_Leveling.js"], "css": ["css/CR10_Leveling.css"]}

    def get_update_information(self) -> dict:
        """Return information about the plugin for software update checks."""
        return {
            "CR10_Leveling": {
                "displayName": "Manual Bed Tramming",
                "displayVersion": self._plugin_version,
                # version check: github repository
                "type": "github_release",
                "user": "lsellens",
                "repo": "octoprint-manual_bed_tramming",
                "current": self._plugin_version,
                # update method: pip
                "pip": "https://github.com/lsellens/octoprint-manual_bed_tramming/archive/{target_version}.zip",
            }
        }

    def is_template_autoescaped(self) -> Literal[True]:  # pyright: ignore[reportIncompatibleMethodOverride]
        """Return whether the template should be auto-escaped."""
        return True


__plugin_name__ = "Manual Bed Tramming"
__plugin_pythoncompat__ = ">=2.7, <4"

__plugin_implementation__: Optional[ManualBedTrammingPlugin] = None
__plugin_hooks__: Optional[Dict[str, Any]] = None


def __plugin_load__() -> None:
    """Load the plugin."""
    global __plugin_implementation__  # pylint: disable=global-statement
    __plugin_implementation__ = ManualBedTrammingPlugin()

    global __plugin_hooks__  # pylint: disable=global-statement
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
