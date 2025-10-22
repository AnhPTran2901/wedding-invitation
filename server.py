#!/usr/bin/env python3
"""Simple dev server with no-cache headers for static wedding site.

Usage:
  python3 server.py 8000   # optional port (default 8000)
Then open: http://localhost:8000

It disables browser caching so you always see latest edits to HTML/CSS/JS/images.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import sys, os, datetime

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add aggressive no-cache headers
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        # Fallback to parent for correct MIME types
        return super().guess_type(path)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    root = os.path.dirname(os.path.abspath(__file__))
    os.chdir(root)
    with ThreadingHTTPServer(('0.0.0.0', port), NoCacheHandler) as httpd:
        print(f"No-cache static server running on http://localhost:{port} (root: {root})")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down...")
