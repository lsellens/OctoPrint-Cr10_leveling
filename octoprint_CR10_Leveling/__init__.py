""""OctoPrint Bed Leveling Plugin for OctoPrint
This plugin provides an easy way to manually level the bed of a 3D printer.
It allows users to set various parameters such as nozzle temperature, bed temperature,
and coordinates for leveling points.
"""

# Copyright (C) 2018  electr0sheep
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Email: electr0sheep@electr0sheep.com

from __future__ import absolute_import
from typing import Any, Dict, Optional, Literal

from octoprint.settings import settings
import octoprint.plugin
import octoprint.printer.profile


class Cr10LevelingPlugin(octoprint.plugin.AssetPlugin, # pylint: disable=too-many-ancestors
                          octoprint.plugin.TemplatePlugin,
                          octoprint.plugin.SettingsPlugin,
                          octoprint.plugin.StartupPlugin):
    """OctoPrint Bed Leveling Plugin. Allows user to easily level 3D printer."""

    _printer_profile_manager: octoprint.printer.profile.PrinterProfileManager

    def on_after_startup(self) -> None:
        """Called after the plugin has been started."""
        s = settings()

        control_list = s.get(["controls"])

        for item in control_list:
            if item['name'] == 'Bed Leveling':
                control_list.remove(item)

        s.set(["controls"], control_list)

    def get_settings_defaults(self) -> dict:
        """Return the default settings for the plugin."""
        printer_profile = self._printer_profile_manager.get_current_or_default()
        heated_bed = printer_profile['heatedBed']
        heated_chamber = printer_profile['heatedChamber']
        return dict(show_warning_banner=True, nozzle_temp=170, bed_temp=50,
                    chamber_temp=0, play_tune=True, wait_for_heat=True,
                    front_left_x=30, front_left_y=30, front_right_x=270,
                    front_right_y=30, back_left_x=30, back_left_y=270,
                    back_right_x=270, back_right_y=270, center_x=150, center_y=150,
                    lower_z=0, upper_z=10, feed_rate=3600, autolevel="",
                    has_heated_bed=heated_bed, has_heated_chamber=heated_chamber)

    def get_template_configs(self):
        return [dict(type="settings", custom_bindings=False)]

    def get_assets(self) -> dict:
        """Return the assets (JavaScript, CSS) for the plugin."""
        return dict(js=["cr10leveling.js"])

    def get_update_information(self) -> dict:
        """Return information about the plugin for software update checks."""
        return dict(
            CR10_Leveling=dict(
                displayName="Bed Leveling Plugin",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="lsellens",
                repo="OctoPrint-Cr10_leveling",
                current=self._plugin_version,
                stable_branch=dict(
                    name="Stable", branch="master", comittish=["master"]
                ),
                prerelease_branch=[
                    dict(
                        name="Testing",
                        branch="develop",
                        comittish=["develop", "master"]
                    )
                ],

                # update method: pip
                pip="https://github.com/lsellens/OctoPrint-Cr10_leveling/archive/{target_version}.zip"
            )
        )

    def is_template_autoescaped(self) -> Literal[True]:
        """Return whether the template should be auto-escaped."""
        return True

__plugin_name__ = "Bed Leveling Plugin"
__plugin_pythoncompat__ = ">=2.7, <4"

__plugin_implementation__: Optional[Cr10LevelingPlugin] = None
__plugin_hooks__: Optional[Dict[str, Any]] = None

def __plugin_load__() -> None:
    """Load the plugin."""
    global __plugin_implementation__ # pylint: disable=global-statement
    __plugin_implementation__ = Cr10LevelingPlugin()

    global __plugin_hooks__ # pylint: disable=global-statement
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
