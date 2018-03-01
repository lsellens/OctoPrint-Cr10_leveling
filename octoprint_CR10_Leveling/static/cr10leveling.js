$(function() {
  function MyCustomViewModel (parameters) {
    var self = this;

    self.settings = parameters[0];

    self.getAdditionalControls = function() {
      var settings = self.settings.settings.settings.plugins.CR10_Leveling
      if (settings.play_tune()) {
        return [{
          'customClass': '', 'layout': 'horizontal_grid', 'name': 'CR-10 Bed Leveling', 'children':
            [{'width': '11', 'output': 'WARNING: DO NOT USE CONTROLS WITHOUT HOMING FIRST!!!'},
            {'width': '11', 'output': 'If you changed settings, make sure you refresh the page'},
            {'width': '11', 'commands':
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
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.front_left_x() + 'Y' +
              settings.front_left_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Front Left'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.front_right_x() + 'Y' +
              settings.front_right_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Front Right', 'offset': '2'},
            {'width': '8', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.center_x() + 'Y' +
              settings.center_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Center', 'offset': '2'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.back_left_x() + 'Y' +
              settings.back_left_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Back Left'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.back_right_x() + 'Y' +
              settings.back_right_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Back Right', 'offset': '2'}]
        }]
      } else {
        return [{
          'customClass': '', 'layout': 'horizontal_grid', 'name': 'CR-10 Bed Leveling', 'children':
            [{'width': '11', 'commands':
              ['M140 S' + settings.bed_temp(), 'M104 S' + settings.nozzle_temp(),
              'M190 S' + settings.bed_temp(), 'M109 S' + settings.nozzle_temp()],
            'customClass': 'btn btn-danger', 'name': 'Apply Heat', 'offset': '2'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.front_left_x() + 'Y' +
              settings.front_left_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Front Left'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.front_right_x() + 'Y' +
              settings.front_right_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Front Right', 'offset': '2'},
            {'width': '8', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.center_x() + 'Y' +
              settings.center_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Center', 'offset': '2'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.back_left_x() + 'Y' +
              settings.back_left_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Back Left'},
            {'width': '2', 'commands':
              ['G90', 'G0 Z10 F500', 'G0 X' + settings.back_right_x() + 'Y' +
              settings.back_right_y() + 'F' + settings.feed_rate(), 'G0 Z0 F500'],
            'customClass': 'btn', 'name': 'Back Right', 'offset': '2'}]
        }]
      }
    }
  }

  OCTOPRINT_VIEWMODELS.push({
    construct: MyCustomViewModel,
    dependencies: ["controlViewModel"]
  });
})
