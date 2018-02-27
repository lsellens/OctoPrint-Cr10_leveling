# coding=utf-8
from __future__ import absolute_import

from octoprint.settings import settings
import octoprint.plugin


class Cr10_levelingPlugin(octoprint.plugin.SettingsPlugin,
                          octoprint.plugin.TemplatePlugin,
                          octoprint.plugin.StartupPlugin):

    def get_template_configs(self):
        return dict(type="settings", custom_bindings=False)

    def on_after_startup(self):
        s = settings()
        addedControls = [{u'customClass': u'', u'layout': u'horizontal_grid', u'name': u'CR-10 Bed Leveling', u'children': [{u'width': u'11', u'commands': [u'M140 S50', u'M104 S170', u'M190 S50', u'M109 S170', u'', u'; Play tune', u'M300 S0 P66', u'M300 S987 P66', u'M300 S0 P66', u'M300 S1975 P66', u'M300 S0 P66', u'M300 S2959 P66', u'M300 S0 P66', u'M300 S2489 P66', u'M300 S0 P66', u'M300 S1975 P66', u'M300 S2959 P66', u'M300 S0 P133', u'M300 S2489 P133', u'M300 S0 P133', u'M300 S2093 P66', u'M300 S0 P66', u'M300 S4186 P66', u'M300 S0 P66', u'M300 S3135 P66', u'M300 S0 P66', u'M300 S2637 P66', u'M300 S0 P66', u'M300 S4186 P66', u'M300 S3135 P66', u'M300 S0 P133', u'M300 S2637 P133', u'M300 S0 P133', u'M300 S987 P66', u'M300 S0 P66', u'M300 S1975 P66', u'M300 S0 P66', u'M300 S2959 P66', u'M300 S0 P66', u'M300 S2489 P66', u'M300 S0 P66', u'M300 S1975 P66', u'M300 S2959 P66', u'M300 S0 P133', u'M300 S2489 P133', u'M300 S0 P133', u'M300 S2489 P66', u'M300 S2637 P66', u'M300 S2793 P66', u'M300 S0 P66', u'M300 S2793 P66', u'M300 S2959 P66', u'M300 S3135 P66', u'M300 S0 P66', u'M300 S3135 P66', u'M300 S3322 P66', u'M300 S1760 P66', u'M300 S0 P66', u'M300 S1975 P100'], u'customClass': u'btn btn-danger', u'name': u'Apply Heat', u'offset': u'2'}, {u'width': u'2', u'commands': [u'G1 Z10 F500', u'G1 X10 Y10 F3600', u'G1 Z0 F500', u'', u''], u'customClass': u'btn', u'name': u'Upper Left'}, {u'width': u'2', u'commands': [u'G1 Z10 F500', u'G1 X290 Y10 F3600', u'G1 Z0 F500', u''], u'customClass': u'btn', u'name': u'Upper Right', u'offset': u'2'}, {u'width': u'8', u'commands': [u'G1 Z10 F500', u'G1 X150 Y150 F3600', u'G1 Z0 F500', u''], u'customClass': u'btn', u'name': u'Center', u'offset': u'2'}, {u'width': u'2', u'commands': [u'G1 Z10 F500', u'G1 X10 Y290 F3600', u'G1 Z0 F500'], u'customClass': u'btn', u'name': u'Lower Left'}, {u'width': u'2', u'commands': [u'G1 Z10 F500', u'G1 X290 Y290 F3600', u'G1 Z0 F500'], u'customClass': u'btn', u'name': u'Lower Right', u'offset': u'2'}]}]

        addItemsToControl = True
        for item in s.get(["controls"]):
            if (item['name'] == 'CR-10 Bed Leveling'):
                addItemsToControl = False

        if addItemsToControl:
            addedControls = addedControls + s.get(["controls"])
            s.set(["controls"], addedControls)

    def on_settings_save(self):
        print()
        print("You saved settings")
        print()


    def get_update_information(self):
        # Define the configuration for your plugin to use with the Software Update
        # Plugin here. See https://github.com/foosel/OctoPrint/wiki/Plugin:-Software-Update
        # for details.
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
