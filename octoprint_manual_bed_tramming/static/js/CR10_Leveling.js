/*
 * View model for octoprint-manual_bed_tramming
 *
 * Author: lsellens
 * License: AGPL-3.0
 */
$(function () {
  function ManualBedTrammingViewModel(parameters) {
    const self = this;

    self.settingsViewModel = parameters[0];
    self.controlViewModel = parameters[1];

    function createButton({ width = '2', offset = '0', name, commands = [], command = null, output = null, customClass = 'btn', additionalClasses = 'nowrap' }) {
      const button = { width, offset, customClass, additionalClasses, name };
      if (output) {
        button.output = output;
      } else if (command) {
        button.command = command;
      } else {
        button.commands = commands;
      }
      return button;
    }

    function applyHeatCommands(button, nozzle, bed, chamber) {
      if (!button || !Array.isArray(button.commands)) return;

      const settings = self.settingsViewModel.settings.plugins.CR10_Leveling;
      const commands = [`M104 S${nozzle}`];

      if (settings.has_heated_bed()) {
        commands.push(`M140 S${bed}`);
      }

      if (settings.has_heated_chamber()) {
        commands.push(`M141 S${chamber}`);
      }

      button.commands.unshift(...commands);
    }

    function waitForHeatCommands(button, nozzle, bed, chamber) {
      if (!button || !Array.isArray(button.commands)) return;

      const settings = self.settingsViewModel.settings.plugins.CR10_Leveling;
      const commands = [`M109 S${nozzle}`];

      if (settings.has_heated_bed()) {
        commands.push(`M190 S${bed}`);
      }

      if (settings.has_heated_chamber()) {
        commands.push(`M191 S${chamber}`);
      }

      button.commands.push(...commands);
    }

    function stopHeatCommands(button, nozzle, bed, chamber) {
      if (!button || !Array.isArray(button.commands)) return;

      const settings = self.settingsViewModel.settings.plugins.CR10_Leveling;
      const commands = [`M104 S0`];

      if (settings.has_heated_bed()) {
        commands.push(`M140 S0`);
      }

      if (settings.has_heated_chamber()) {
        commands.push(`M141 S0`);
      }

      button.commands.push(...commands);
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
      const settings = self.settingsViewModel.settings.plugins.CR10_Leveling;
      const children = [];

      children.push(createButton({ width: '11', output: 'If you changed settings, make sure you refresh the page' }));

      // Optional warning banners
      if (settings.show_warning_banner()) {
        children.push(createButton({ width: '11', output: 'Warning: Do not use controls without homing first!' }));
      }

      // Apply/Stop heat buttons
      const applyHeatButton = createButton({ name: 'Apply Heat', additionalClasses: 'btn-danger nowrap' });
      const stopHeatButton = createButton({ name: 'Stop Heat', width: '7', offset: '2', additionalClasses: 'btn-warning nowrap' });

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
          name: 'Auto Level',
          width: '7',
          offset: '0',
          additionalClasses: 'btn-success',
          ...(autolevel.includes('\n')
            ? { commands: autolevel.split('\n') }
            : { command: autolevel })
        });

        children.splice(stopIndex + 1, 0, autolevelButton);
      }

      // Tramming position buttons
      const positions = [
        { name: 'Back \xa0Left\xa0', x: settings.back_left_x(), y: settings.back_left_y(), offset: '0' },
        { name: 'Back Right', x: settings.back_right_x(), y: settings.back_right_y(), offset: '2' },
        { name: '\xa0\xa0Center\xa0\xa0', x: settings.center_x(), y: settings.center_y(), offset: '2', width: '9' },
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
        waitForHeatCommands(applyHeatButton, settings.nozzle_temp(), settings.bed_temp(), settings.chamber_temp());

        if (settings.play_tune()) {
          addTuneCommands(applyHeatButton);
        }
      } else {
        applyHeatCommands(applyHeatButton, settings.nozzle_temp(), settings.bed_temp(), settings.chamber_temp());
      }

      stopHeatCommands(stopHeatButton);

      return [{
        customClass: '',
        layout: 'horizontal_grid',
        name: 'Bed Tramming',
        children: children
      }];
    }
  }

  OCTOPRINT_VIEWMODELS.push({
    construct: ManualBedTrammingViewModel,
    dependencies: ["settingsViewModel", "controlViewModel"]
  });
});
