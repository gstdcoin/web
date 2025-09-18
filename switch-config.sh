#!/bin/bash

# Script to switch between different Caddy configurations

case "$1" in
  "production")
    echo "�� Switching to production configuration (gstdtoken.net with SSL)..."
    cp Caddyfile.production Caddyfile
    echo "✅ Production configuration activated"
    echo "📝 To apply changes, run: docker compose restart caddy"
    ;;
  "testing")
    echo "🔄 Switching to testing configuration (localhost without SSL)..."
    cp Caddyfile.testing Caddyfile
    echo "✅ Testing configuration activated"
    echo "📝 To apply changes, run: docker compose restart caddy"
    ;;
  "local")
    echo "🔄 Switching to local configuration (localhost with self-signed SSL)..."
    cp Caddyfile.local Caddyfile
    echo "✅ Local configuration activated"
    echo "📝 To apply changes, run: docker compose restart caddy"
    ;;
  *)
    echo "Usage: $0 {production|testing|local}"
    echo ""
    echo "Configurations:"
    echo "  production  - gstdtoken.net with Let's Encrypt SSL"
    echo "  testing     - localhost without SSL (HTTP only)"
    echo "  local       - localhost with self-signed SSL"
    exit 1
    ;;
esac
