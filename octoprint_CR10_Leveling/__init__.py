# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class Cr10_levelingPlugin(octoprint.plugin.AssetPlugin,
                          octoprint.plugin.TemplatePlugin,
                          octoprint.plugin.SettingsPlugin):

    def get_settings_defaults(self):
        return dict(bed_temp=60, nozzle_temp=200)

    def get_template_configs(self):
        return [dict(type="settings", custom_bindings=False)]

    def get_assets(self):
        return dict(js=["cr10leveling.js"])

    def get_update_information(self):
        return dict(
            CR10_Leveling=dict(
                displayName="CR-10 Leveling Plugin",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="electr0sheep",
                repo="OctoPrint-Cr10_leveling",
                current=self._plugin_version,

                # update method: pip
                pip="https://github.com/electr0sheep/OctoPrint-Cr10_leveling/archive/{target_version}.zip"
            )
        )


__plugin_name__ = "CR-10 Leveling Plugin"


def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = Cr10_levelingPlugin()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
