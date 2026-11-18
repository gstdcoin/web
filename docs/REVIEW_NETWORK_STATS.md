# Website proposal review

This branch preserves the changes proposed in [web PR 10](https://github.com/gstdcoin/web/pull/10) on a branch owned by gstdcoin, based on the current default branch. It is a draft proposal, not a deployment record.

The stats route reads only the fixed canonical platform endpoint, validates counters, and displays unavailable on upstream errors. Its focused tests cover valid and failed responses. The activity card uses completed tasks rather than all submitted tasks.

The original installer command combined a mutable main URL with a fixed checksum. This branch pins that URL to the reviewed installer commit `1d2608ca147a8146199c3b72c8e5aeb365e8d79c`; SHA-256 `c314582d0712ec9f9611cd3c86f18d1a54099d41f2a8fec2d37f7d315b323732` was verified by reading the public file, without executing it.

Merge remains gated on review of the signed-installation candidate in [gstdbot PR 8](https://github.com/gstdcoin/gstdbot/pull/8) and an operator-approved release compatible with that installer. A green website build does not promote a node release, change its trust root or update an installed daemon.
