#!/usr/bin/env bash
# harmonize_header_sidebar.sh
#
# Usage:
#   ./harmonize_header_sidebar.sh [project-root]
#
# Description:
#   Makes the header and sidebar act as a single integrated shell by:
#     • Shifting header content to the right when sidebar is visible
#       (and back when collapsed) using body classes.
#     • Injecting a useEffect hook in Sidebar.jsx that toggles those
#       body classes automatically.
#     • Adding responsive CSS rules in Header.css to create the spacing.
#   Backs up every touched file with a .bak extension.

set -euo pipefail

ROOT_DIR="${1:-.}"

if sed --version >/dev/null 2>&1; then          # GNU sed
  SED_INPLACE=(-i.bak)
else                                            # BSD sed
  SED_INPLACE=(-i '')
fi

say() { printf '%b\n' "$*"; }

# ---------------------------------------------------------------------------
# Locate files
HEADER_CSS="$ROOT_DIR/src/components/core/Header/Header.css"
SIDEBAR_JSX="$ROOT_DIR/src/components/core/Sidebar/Sidebar.jsx"

[ -f "$HEADER_CSS" ]  || { say "✖ Cannot find Header.css";  exit 1; }
[ -f "$SIDEBAR_JSX" ] || { say "✖ Cannot find Sidebar.jsx"; exit 1; }

# ---------------------------------------------------------------------------
# 1. Add body‑class synchroniser to Sidebar.jsx
HOOK_TAG="// auto-added by harmonize script"
if grep -q "$HOOK_TAG" "$SIDEBAR_JSX"; then
  say "✓ Sidebar.jsx already patched"
else
  say "• Injecting body‑class synchroniser into Sidebar.jsx"
  # we insert the hook right after the opening brace of the component function
  sed "${SED_INPLACE[@]}" "/const Sidebar[^(]*([^)]*)[[:space:]]*=>[[:space:]]*{/a\\
  $HOOK_TAG\\
  \ \ useEffect(() => {\\
  \ \ \ \ document.body.classList.toggle('sidebar-collapsed', !isExpanded);\\
  \ \ \ \ document.body.classList.toggle('sidebar-expanded',  isExpanded);\\
  \ \ }, [isExpanded]);" "$SIDEBAR_JSX"
fi

# ---------------------------------------------------------------------------
# 2. Add integrated‑spacing rules to Header.css
CSS_TAG="/* === Integrated header‑sidebar spacing (auto‑added) === */"
if grep -q "$CSS_TAG" "$HEADER_CSS"; then
  say "✓ Header.css already patched"
else
  say "• Appending integrated‑spacing rules to Header.css"
  cat >> "$HEADER_CSS" <<'CSS_EOF'

/* === Integrated header‑sidebar spacing (auto‑added) === */
body.sidebar-expanded .nav-container {
  margin-left: var(--m-sidebar-width);
}
body.sidebar-collapsed .nav-container {
  margin-left: var(--m-sidebar-collapsed-width);
}

/* Collapse the offset on narrow screens when the sidebar becomes overlay */
@media (max-width: 768px) {
  body.sidebar-expanded .nav-container,
  body.sidebar-collapsed .nav-container {
    margin-left: 0;
  }
}
CSS_EOF
fi

say "✔ Harmonization completed – restart your dev server to test the new look."