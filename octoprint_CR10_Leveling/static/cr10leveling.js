$(function() {
  function MyCustomViewModel (parameters) {
    var self = this;

    self.settings = parameters[0];

    self.getAdditionalControls = function() {
      var settings = self.settings.settings.settings.plugins.CR10_Leveling
      console.log("nozzle temp: " + settings.nozzle_temp());
      console.log("bed temp: " + settings.bed_temp());
      return [{
        'customClass': '', 'layout': 'horizontal_grid', 'name': 'CR-10 Bed Leveling', 'children':
          [{'width': '11', 'commands':
            ['M140 S' + settings.bed_temp(), 'M104 S' + settings.nozzle_temp(),
            'M190 S' + settings.bed_temp(), 'M109 S' + settings.nozzle_temp(),
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
            'M300 S1975 P100'],
          'customClass': 'btn btn-danger', 'name': 'Apply Heat', 'offset': '2'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X' + settings.upper_left_x() + 'Y' +
            settings.upper_left_y() + 'F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Upper Left'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X' + settings.upper_right_x() + 'Y' +
            settings.upper_right_y() + 'F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Upper Right', 'offset': '2'},
          {'width': '8', 'commands':
            ['G1 Z10 F500', 'G1 X' + settings.center_x() + 'Y' +
            settings.center_y() + 'F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Center', 'offset': '2'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X' + settings.lower_left_x() + 'Y' +
            settings.lower_left_y() + 'F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Lower Left'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X' + settings.lower_right_x() + 'Y' +
            settings.lower_right_y() + 'F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Lower Right', 'offset': '2'}]
      }]
    }
    self.onSettingsBeforeSave = function () {
      console.log("Saving settings...");
      self.getAdditionalControls();
    }
  }

  OCTOPRINT_VIEWMODELS.push({
    construct: MyCustomViewModel,
    dependencies: ["controlViewModel"]
  });
})
