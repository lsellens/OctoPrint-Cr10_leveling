// OctoPrint Bed Leveling Plugin. Allows user to easily level 3D printer.
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

$(function () {
  function MyCustomViewModel(parameters) {
    const self = this;
    self.settings = parameters[0];

    function createButton({ width = '2', offset = '0', name, commands = [], command = null, output = null, customClass = 'btn', additionalClasses = 'nowrap' }) {
      const button = {
        width,
        offset,
        customClass,
        additionalClasses,
        name
      };
      if (output) {
        button.output = output;
      } else if (command) {
        button.command = command;
      } else {
        button.commands = commands;
      }
      return button;
    }

    function applyHeatCommands(button, bed, nozzle) {
      if (button && Array.isArray(button.commands)) {
        button.commands.unshift(`M140 S${bed}`, `M104 S${nozzle}`);
      }
    }

    function waitForHeatCommands(button, bed, nozzle) {
      if (button && Array.isArray(button.commands)) {
        button.commands.push(`M190 S${bed}`, `M109 S${nozzle}`);
      }
    }

    function addTuneCommands(button) {
      if (!button || !Array.isArray(button.commands)) return;
      const tune = [
        'M300 S0 P66', 'M300 S987 P66', 'M300 S0 P66', 'M300 S1975 P66',
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
        'M300 S1975 P100'
      ];
      button.commands.push(...tune);
    }

    self.getAdditionalControls = function () {
      const settings = self.settings.settings.settings.plugins.CR10_Leveling;
      const children = [];

      children.push(createButton({ width: '11', output: 'If you changed settings, make sure you refresh the page' }));

      // Optional warning banners
      if (settings.show_warning_banner()) {
        children.push(createButton({ width: '11', output: 'WARNING: DO NOT USE CONTROLS WITHOUT HOMING FIRST!!!' }));
      }

      // Apply/Stop heat buttons
      const applyHeatButton = createButton({ name: 'Apply Heat', additionalClasses: 'btn-danger nowrap' });
      const stopHeatButton = createButton({
        name: 'Stop Heat',
        commands: ['M140 S0', 'M104 S0'],
        width: '7',
        offset: '2',
        additionalClasses: 'btn-warning nowrap'
      });

      children.push(applyHeatButton, stopHeatButton);

      // Optional autolevel button
      if (settings.autolevel()) {
        const stopIndex = children.findIndex(btn => btn.name === 'Stop Heat');
        if (stopIndex !== -1) {
          children[stopIndex].width = '2';
          children[stopIndex].offset = '0';
        }

        const autolevel = settings.autolevel();
        const autolevelButton = createButton({
          name: 'Autolevel',
          width: '7',
          offset: '0',
          additionalClasses: 'btn-success',
          ...(autolevel.includes('\n')
            ? { commands: autolevel.split('\n') }
            : { command: autolevel })
        });

        children.splice(stopIndex + 1, 0, autolevelButton);
      }

      // Leveling position buttons
      const positions = [
        { name: 'Back \xa0Left\xa0', x: settings.back_left_x(), y: settings.back_left_y(), offset: '0' },
        { name: 'Back Right', x: settings.back_right_x(), y: settings.back_right_y(), offset: '2' },
        { name: 'Center', x: settings.center_x(), y: settings.center_y(), offset: '2', width: '9' },
        { name: 'Front \xa0Left\xa0', x: settings.front_left_x(), y: settings.front_left_y(), offset: '0' },
        { name: 'Front Right', x: settings.front_right_x(), y: settings.front_right_y(), offset: '2' }
      ];

      positions.forEach(pos => {
        children.push(createButton({
          name: pos.name,
          width: pos.width || '2',
          offset: pos.offset,
          commands: [
            'G90',
            `G0 Z${settings.upper_z()} F500`,
            `G0 X${pos.x} Y${pos.y} F${settings.feed_rate()}`,
            `G0 Z${settings.lower_z()} F500`
          ]
        }));
      });

      // Add heat commands
      if (settings.wait_for_heat()) {
        waitForHeatCommands(applyHeatButton, settings.bed_temp(), settings.nozzle_temp());

        if (settings.play_tune()) {
          addTuneCommands(applyHeatButton);
        }
      } else {
        applyHeatCommands(applyHeatButton, settings.bed_temp(), settings.nozzle_temp());
      }

      if (settings.play_tune()) {
        addTuneCommands(applyHeatButton);
      }

      return [{
        customClass: '',
        layout: 'horizontal_grid',
        name: 'Bed Leveling',
        children: children
      }];
    }
  }

  OCTOPRINT_VIEWMODELS.push({
    construct: MyCustomViewModel,
    dependencies: ["controlViewModel"]
  });
});
