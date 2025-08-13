from setuptools import setup
import octoprint_setuptools

if __name__ == "__main__":
    setup_params = octoprint_setuptools.create_plugin_setup_parameters(
        identifier="CR10_Leveling",
        package="octoprint_CR10_Leveling"
    )
    setup(**setup_params)
