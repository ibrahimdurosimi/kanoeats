import re

with open('src/components/LandingPage.tsx', 'r') as f:
    content = f.read()

# Fix the script innerHTML
script_pattern = r'script\.innerHTML = ".*?function initLandingScript.*?\}?\\n"\s*\+\s*"[^"]*";'
# We will just replace the useEffect content.

def fix_landing(content):
    content = content.replace(
        "script.innerHTML = \"\\nfunction initLandingScript(onNavigate) {\\n",
        "script.innerHTML = \"\\nfunction initLandingScript() {\\n"
    )
    content = content.replace(
        "if(onNavigate) onNavigate('dashboard');",
        "if(window._onNavigate) window._onNavigate('dashboard');"
    )
    content = content.replace(
        "\\n\\n(window as any)._cleanupLanding = initLandingScript(() => onNavigate('dashboard'));",
        "\\n\\nwindow._cleanupLanding = initLandingScript();"
    )
    content = content.replace(
        "const script = document.createElement('script');",
        "(window as any)._onNavigate = onNavigate;\n    const script = document.createElement('script');"
    )
    return content

content = fix_landing(content)
with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(content)

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

def fix_dashboard(content):
    content = content.replace(
        "script.innerHTML = \"\\nfunction initAppScript(onNavigate) {\\n",
        "script.innerHTML = \"\\nfunction initAppScript() {\\n"
    )
    content = content.replace(
        "if (onNavigate) onNavigate('landing');",
        "if(window._onNavigateLanding) window._onNavigateLanding('landing');"
    )
    content = content.replace(
        "\\n\\n(window as any)._cleanup = initAppScript(() => onNavigate('landing'));",
        "\\n\\nwindow._cleanup = initAppScript();"
    )
    content = content.replace(
        "const script = document.createElement('script');",
        "(window as any)._onNavigateLanding = onNavigate;\n    const script = document.createElement('script');"
    )
    return content

content = fix_dashboard(content)
with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)

