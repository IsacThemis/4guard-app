import os
import json
import argparse
import sys
from datetime import datetime

class AntigravitySkillBridge:
    """
    TITAN Bridge: Antigravity - OpenCode Integration Manager
    Tailored for Windows Environments
    """
    def __init__(self):
        self.user_profile = os.environ.get('USERPROFILE')
        self.opencode_root = os.path.join(self.user_profile, '.opencode')
        self.shared_skills = os.path.join(self.opencode_root, 'shared-skills')
        self.manifest_file = os.path.join(self.opencode_root, 'manifest.json')

    def check_health(self):
        print("🔍 TITAN Bridge Health Check (Windows)")
        print(f"User Profile: {self.user_profile}")
        print(f"OpenCode Root: {self.opencode_root} -> {'Exists' if os.path.exists(self.opencode_root) else 'MISSING'}")
        
        if os.path.exists(self.manifest_file):
            with open(self.manifest_file, 'r', encoding='utf-8-sig') as f:
                data = json.load(f)
                print(f"Last Sync: {data.get('last_sync')}")
                print(f"Skills Count: {data.get('skills_count')}")
        else:
            print("⚠️ manifest.json NOT FOUND. Please run sync first.")

    def list_skills(self):
        if not os.path.exists(self.shared_skills):
            print("❌ Shared skills directory not found.")
            return
        
        skills = [d for d in os.listdir(self.shared_skills) if os.path.isdir(os.path.join(self.shared_skills, d))]
        print(f"🛠️ Available Skills ({len(skills)}):")
        for s in skills:
            print(f"  - {s}")

    def get_skill_content(self, skill_name):
        skill_path = os.path.join(self.shared_skills, skill_name)
        if not os.path.exists(skill_path):
            print(f"❌ Skill '{skill_name}' not found in bridge.")
            return

        # Look for SKILL.md or any .md file recursively
        content_file = None
        for root, dirs, files in os.walk(skill_path):
            for f in files:
                if f.lower() == "skill.md" or f.endswith(".md"):
                    content_file = os.path.join(root, f)
                    break
            if content_file: break

        if content_file:
            print(f"📖 Reading: {os.path.relpath(content_file, self.user_profile)}")
            print("-" * 40)
            with open(content_file, 'r', encoding='utf-8', errors='ignore') as f:
                print(f.read())
            print("-" * 40)
        else:
            print(f"⚠️ No active definition (.md) found for '{skill_name}'")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="TITAN Bridge: Antigravity - OpenCode")
    parser.add_argument('command', choices=['health', 'list', 'read', 'info', 'run'], help="Command to execute")
    parser.add_argument('skill', nargs='?', help="Skill name (required for read/info/run)")
    args = parser.parse_args()

    bridge = AntigravitySkillBridge()
    if args.command == 'health':
        bridge.check_health()
    elif args.command == 'list':
        bridge.list_skills()
    elif args.command in ['read', 'info', 'run']:
        if not args.skill:
            print("❌ Skill name is required for this command.")
            sys.exit(1)
        bridge.get_skill_content(args.skill)
