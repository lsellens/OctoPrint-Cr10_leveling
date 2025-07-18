import collections
import contextlib
import queue
import tempfile
import threading
from _typeshed import Incomplete
from collections.abc import Generator, Set
from octoprint import UMASK as UMASK
from octoprint.util.connectivity import ConnectivityChecker as ConnectivityChecker
from octoprint.util.files import find_collision_free_name as find_collision_free_name, get_dos_filename as get_dos_filename, silent_remove as silent_remove
from octoprint.util.net import address_for_client as address_for_client, interface_addresses as interface_addresses, server_reachable as server_reachable

logger: Incomplete

def to_bytes(s_or_u: str | bytes, encoding: str = 'utf-8', errors: str = 'strict') -> bytes: ...
def to_unicode(s_or_u: str | bytes, encoding: str = 'utf-8', errors: str = 'strict') -> str: ...
def sortable_value(value, default_value: str = ''): ...
sv = sortable_value

def pp(value): ...
def warning_decorator_factory(warning_type): ...
def warning_factory(warning_type): ...

deprecated: Incomplete
variable_deprecated: Incomplete
pending_deprecation: Incomplete
variable_pending_deprecation: Incomplete
to_str: Incomplete
to_native_str: Incomplete

def get_formatted_size(num): ...
def is_allowed_file(filename, extensions): ...
def get_formatted_timedelta(d): ...
def get_formatted_datetime(d): ...
def get_class(name): ...
def get_fully_qualified_classname(o): ...
def get_exception_string(fmt: str = "{type}: '{message}' @ {file}:{function}:{line}"): ...
def sanitize_ascii(line): ...
def filter_non_ascii(line): ...
def filter_non_utf8(line): ...
def chunks(l, n) -> Generator[Incomplete]: ...
def is_running_from_source(): ...
def fast_deepcopy(obj): ...
def dict_merge(a, b, leaf_merger: Incomplete | None = None, in_place: bool = False): ...
def dict_sanitize(a, b): ...

dict_clean: Incomplete

def dict_minimal_mergediff(source, target): ...
def dict_contains_keys(keys, dictionary): ...
def dict_flatten(dictionary, prefix: str = '', separator: str = '.'): ...

class fallback_dict(dict):
    custom: Incomplete
    fallbacks: Incomplete
    def __init__(self, custom, *fallbacks) -> None: ...
    def __getitem__(self, item): ...
    def __setitem__(self, key, value) -> None: ...
    def __delitem__(self, key) -> None: ...
    def __contains__(self, key) -> bool: ...
    def keys(self) -> Generator[Incomplete]: ...
    def values(self) -> Generator[Incomplete]: ...
    def items(self) -> Generator[Incomplete]: ...

def dict_filter(dictionary, filter_function): ...

class DefaultOrderedDict(collections.OrderedDict):
    default_factory: Incomplete
    def __init__(self, default_factory: Incomplete | None = None, *a, **kw) -> None: ...
    def __getitem__(self, key): ...
    def __missing__(self, key): ...
    def __reduce__(self): ...
    def copy(self): ...
    def __copy__(self): ...
    def __deepcopy__(self, memo): ...

class Object: ...

def guess_mime_type(data): ...
def parse_mime_type(mime): ...
def mime_type_matches(mime, other): ...
@contextlib.contextmanager
def atomic_write(filename, mode: str = 'w+b', encoding: str = 'utf-8', prefix: str = 'tmp', suffix: str = '', permissions: Incomplete | None = None, max_permissions: int = 511) -> Generator[Incomplete]: ...
@contextlib.contextmanager
def tempdir(ignore_errors: bool = False, onerror: Incomplete | None = None, **kwargs) -> Generator[Incomplete]: ...
@contextlib.contextmanager
def temppath(prefix: Incomplete | None = None, suffix: str = '') -> Generator[Incomplete]: ...
TemporaryDirectory = tempfile.TemporaryDirectory

def bom_aware_open(filename, encoding: str = 'ascii', mode: str = 'r', **kwargs): ...

BOMS: Incomplete

def get_bom(filename, encoding): ...
def is_hidden_path(path): ...
def thaw_frozendict(obj): ...

thaw_immutabledict: Incomplete

def utmify(link, source: Incomplete | None = None, medium: Incomplete | None = None, name: Incomplete | None = None, term: Incomplete | None = None, content: Incomplete | None = None): ...

class RepeatedTimer(threading.Thread):
    interval: Incomplete
    function: Incomplete
    finished: Incomplete
    args: Incomplete
    kwargs: Incomplete
    run_first: Incomplete
    condition: Incomplete
    on_condition_false: Incomplete
    on_cancelled: Incomplete
    on_finish: Incomplete
    daemon: Incomplete
    def __init__(self, interval, function, args: Incomplete | None = None, kwargs: Incomplete | None = None, run_first: bool = False, condition: Incomplete | None = None, on_condition_false: Incomplete | None = None, on_cancelled: Incomplete | None = None, on_finish: Incomplete | None = None, daemon: bool = True) -> None: ...
    def cancel(self) -> None: ...
    def run(self) -> None: ...

class ResettableTimer(threading.Thread):
    is_reset: bool
    interval: Incomplete
    function: Incomplete
    args: Incomplete
    kwargs: Incomplete
    on_cancelled: Incomplete
    on_reset: Incomplete
    daemon: Incomplete
    def __init__(self, interval, function, args: Incomplete | None = None, kwargs: Incomplete | None = None, on_reset: Incomplete | None = None, on_cancelled: Incomplete | None = None, daemon: bool = True) -> None: ...
    def run(self) -> None: ...
    def cancel(self) -> None: ...
    def reset(self, interval: Incomplete | None = None) -> None: ...

class CountedEvent:
    def __init__(self, value: int = 0, minimum: int = 0, maximum: Incomplete | None = None, **kwargs) -> None: ...
    @property
    def min(self): ...
    @min.setter
    def min(self, val) -> None: ...
    @property
    def max(self): ...
    @max.setter
    def max(self, val) -> None: ...
    @property
    def is_set(self): ...
    @property
    def counter(self): ...
    def set(self) -> None: ...
    def clear(self, completely: bool = False) -> None: ...
    def reset(self) -> None: ...
    def wait(self, timeout: Incomplete | None = None) -> None: ...
    def blocked(self): ...
    def acquire(self, blocking: int = 1): ...
    def release(self): ...

class InvariantContainer:
    def __init__(self, initial_data: Incomplete | None = None, guarantee_invariant: Incomplete | None = None) -> None: ...
    def append(self, item) -> None: ...
    def remove(self, item) -> None: ...
    def __len__(self) -> int: ...
    def __iter__(self): ...

class PrependableQueue(queue.Queue):
    def __init__(self, maxsize: int = 0) -> None: ...
    def prepend(self, item, block: bool = True, timeout: bool = True) -> None: ...

class TypedQueue(PrependableQueue):
    def __init__(self, maxsize: int = 0) -> None: ...
    def put(self, item, item_type: Incomplete | None = None, *args, **kwargs) -> None: ...
    def get(self, *args, **kwargs): ...
    def prepend(self, item, item_type: Incomplete | None = None, *args, **kwargs) -> None: ...

class TypeAlreadyInQueue(Exception):
    type: Incomplete
    def __init__(self, t, *args, **kwargs) -> None: ...

class CaseInsensitiveSet(Set):
    data: Incomplete
    def __init__(self, *args) -> None: ...
    def __contains__(self, item) -> bool: ...
    def __iter__(self): ...
    def __len__(self) -> int: ...

def natural_key(text): ...
def count(gen): ...
def fqfn(f): ...
def time_this(logtarget: str = 'octoprint.util.timings', expand_logtarget: bool = False, message: str = '{func} took {timing:.2f}ms', incl_func_args: bool = False, log_enter: bool = False, message_enter: str = 'Entering {func}...'): ...
def generate_api_key(): ...
def map_boolean(value, true_text, false_text): ...
def serialize(filename, data, encoding: str = 'utf-8', compressed: bool = True) -> None: ...
def deserialize(filename, encoding: str = 'utf-8'): ...
