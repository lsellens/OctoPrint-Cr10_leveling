// OctoPrint CR-10 Leveling Plugin. Allows user to easily level 3D printer.
// Copyright (C) 2018  electr0sheep
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// Email: electr0sheep@electr0sheep.com

$(function() {
  function MyCustomViewModel (parameters) {
    var self = this;

    self.settings = parameters[0];

    self.getAdditionalControls = function() {
      var settings = self.settings.settings.settings.plugins.CR10_Leveling

      var baseSettings = [{
        'customClass': '', 'layout': 'horizontal_grid', 'name': 'CR-10 Bed Leveling', 'children':
          [{'width': '11', 'output': 'WARNING: DO NOT USE CONTROLS WITHOUT HOMING FIRST!!!'},
            {'width': '11', 'output': 'If you changed settings, make sure you refresh the page'},
          {'width': '11', 'commands':
            [],
          'customClass': 'btn btn-danger', 'name': 'Apply Heat', 'offset': '2'},
          {'width': '2', 'commands':
            ['G90', 'G0 Z' + settings.upper_z() + 'F500', 'G0 X' +
            settings.back_left_x() + 'Y' + settings.back_left_y() + 'F' +
            settings.feed_rate(), 'G0 Z' + settings.lower_z() + 'F500'],
          'customClass': 'btn', 'name': 'Back \xa0Left\xa0'},
          {'width': '2', 'commands':
            ['G90', 'G0 Z' + settings.upper_z() + 'F500', 'G0 X' +
            settings.back_right_x() + 'Y' + settings.back_right_y() + 'F' +
            settings.feed_rate(), 'G0 Z' + settings.lower_z() + 'F500'],
          'customClass': 'btn', 'name': 'Back Right', 'offset': '2'},
          {'width': '8', 'commands':
            ['G90', 'G0 Z' + settings.upper_z() + 'F500', 'G0 X' +
            settings.center_x() + 'Y' + settings.center_y() + 'F' +
            settings.feed_rate(), 'G0 Z' + settings.lower_z() + 'F500'],
          'customClass': 'btn', 'name': 'Center', 'offset': '2'},
          {'width': '2', 'commands':
            ['G90', 'G0 Z' + settings.upper_z() + 'F500', 'G0 X' +
            settings.front_left_x() + 'Y' + settings.front_left_y() + 'F' +
            settings.feed_rate(), 'G0 Z' + settings.lower_z() + 'F500'],
          'customClass': 'btn', 'name': 'Front \xa0Left\xa0'},
          {'width': '2', 'commands':
            ['G90', 'G0 Z' + settings.upper_z() + 'F500', 'G0 X' +
            settings.front_right_x() + 'Y' + settings.front_right_y() + 'F' +
            settings.feed_rate(), 'G0 Z' + settings.lower_z() + 'F500'],
          'customClass': 'btn', 'name': 'Front Right', 'offset': '2'}]
      }]

      var finalSettings = baseSettings;

      if (settings.wait_for_heat()) {
        waitForHeat(finalSettings);
      }
      if (settings.heat_simultaneously() || !settings.wait_for_heat()) {
        applySimultaneousHeat(finalSettings);
      }
      if (settings.play_tune()) {
        applyTune(finalSettings);
      }
      return finalSettings;
    }

    function applyTune(currentSettings) {
      var heatCommand = currentSettings[0].children[2].commands;

      heatCommand.push('M300 S0 P66', 'M300 S987 P66', 'M300 S0 P66', 'M300 S1975 P66',
      'M300 S0 P66', 'M300 S2959 P66', 'M300 S0 P66', 'M300 S2489 P66',
      'M300 S0 P66', 'M300 S1975 P66', 'M300 S2959 P66', 'M300 S0 P133',
      'M300 S2489 P133', 'M300 S0 P133', 'M300 S2093 P66', 'M300 S0 P66',
      'M300 S4186 P66', 'M300 S0 P66', 'M300 S3135 P66', 'M300 S0 P66',
      'M300 S2637 P66', 'M300 S0 P66', 'M300 S4186 P66', 'M300 S3135 P66',
      'M300 S0 P133', 'M300 S2637 P133', 'M300 S0 P133', 'M300 S987 P66',
      'M300 S0 P66', 'M300 S1975 P66', 'M300 S0 P66', 'M300 S2959 P66',
      'M300 S0 P66', 'M300 S2489 P66', 'M300 S0 P66', 'M300 S1975 P66',
      'M300 S2959 P66', 'M300 S0 P133', 'M300 S2489 P133', 'M300 S0 P133',
      'M300 S2489 P66', 'M300 S2637 P66', 'M300 S2793 P66', 'M300 S0 P66',
      'M300 S2793 P66', 'M300 S2959 P66', 'M300 S3135 P66', 'M300 S0 P66',
      'M300 S3135 P66', 'M300 S3322 P66', 'M300 S1760 P66', 'M300 S0 P66',
      'M300 S1975 P100')
    }

    function waitForHeat(currentSettings) {
      var settings = self.settings.settings.settings.plugins.CR10_Leveling;
      var heatCommand = currentSettings[0].children[2].commands;

      heatCommand.push('M190 S' + settings.bed_temp(), 'M109 S' + settings.nozzle_temp());
    }

    function applySimultaneousHeat(currentSettings) {
      var settings = self.settings.settings.settings.plugins.CR10_Leveling;
      var heatCommand = currentSettings[0].children[2].commands;

      heatCommand.unshift('M140 S' + settings.bed_temp(), 'M104 S' + settings.nozzle_temp());
    }

  }

  OCTOPRINT_VIEWMODELS.push({
    construct: MyCustomViewModel,
    dependencies: ["controlViewModel"]
  });
})
