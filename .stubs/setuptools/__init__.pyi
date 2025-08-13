import abc
from .depends import Require as Require
from .dist import Distribution as Distribution
from .extension import Extension as Extension
from .warnings import SetuptoolsDeprecationWarning as SetuptoolsDeprecationWarning
from _typeshed import Incomplete
from abc import abstractmethod
from distutils.core import Command as _Command
from typing import overload

__all__ = ['setup', 'Distribution', 'Command', 'Extension', 'Require', 'SetuptoolsDeprecationWarning', 'find_packages', 'find_namespace_packages']

find_packages: Incomplete
find_namespace_packages: Incomplete

def setup(**attrs): ...

class Command(_Command, metaclass=abc.ABCMeta):
    command_consumes_arguments: bool
    distribution: Distribution
    def __init__(self, dist: Distribution, **kw) -> None: ...
    @overload
    def reinitialize_command(self, command: str, reinit_subcommands: bool = False, **kw) -> _Command: ...
    @overload
    def reinitialize_command(self, command: _CommandT, reinit_subcommands: bool = False, **kw) -> _CommandT: ...
    @abstractmethod
    def initialize_options(self) -> None: ...
    @abstractmethod
    def finalize_options(self) -> None: ...
    @abstractmethod
    def run(self) -> None: ...

class sic(str): ...
