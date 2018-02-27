$(function() {
  function MyCustomViewModel (parameters) {
    var self = this;

    self.settings = parameters[0];

    self.getAdditionalControls = function() {
      return [{
        'customClass': '', 'layout': 'horizontal_grid', 'name': 'CR-10 Bed Leveling', 'children':
          [{'width': '11', 'commands':
            ['M140 S50', 'M104 S170', 'M190 S50', 'M109 S170', '', '; Play tune',
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
            ['G1 Z10 F500', 'G1 X10 Y10 F3600', 'G1 Z0 F500', '', ''],
          'customClass': 'btn', 'name': 'Upper Left'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X290 Y10 F3600', 'G1 Z0 F500', ''],
          'customClass': 'btn', 'name': 'Upper Right', 'offset': '2'},
          {'width': '8', 'commands':
            ['G1 Z10 F500', 'G1 X150 Y150 F3600', 'G1 Z0 F500', ''],
          'customClass': 'btn', 'name': 'Center', 'offset': '2'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X10 Y290 F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Lower Left'},
          {'width': '2', 'commands':
            ['G1 Z10 F500', 'G1 X290 Y290 F3600', 'G1 Z0 F500'],
          'customClass': 'btn', 'name': 'Lower Right', 'offset': '2'}]
      }]
    }
  }

  OCTOPRINT_VIEWMODELS.push({
    construct: MyCustomViewModel,
    dependencies: ["controlViewModel"]
  });
})
