$UserHome = $env:USERPROFILE
$GlobalSkills = "$UserHome\.gemini\antigravity\skills"
$ProjectSkills = "C:\Users\USUARIO\Downloads\Prometeo TITAN\.agent\skills"
$OpenCodeShared = "$UserHome\.opencode\shared-skills"
$BackupDir = "$UserHome\.opencode\backups"
$ManifestPath = "$UserHome\.opencode\manifest.json"

Write-Host "🚀 Starting Multi-Source Sync (Global + Project)..." -ForegroundColor Cyan

# Backup
if (Test-Path $OpenCodeShared) {
    if ((Get-ChildItem -Path $OpenCodeShared).Count -gt 0) {
        $ts = Get-Date -Format "yyyyMMdd_HHmmss"
        Compress-Archive -Path "$OpenCodeShared\*" -DestinationPath "$BackupDir\full-backup-$ts.zip" -Force
    }
}

# Sync from Global
if (Test-Path $GlobalSkills) {
    Write-Host "📥 Syncing Global Skills..." -ForegroundColor Gray
    Copy-Item -Path "$GlobalSkills\*" -Destination $OpenCodeShared -Recurse -Force -ErrorAction SilentlyContinue
}

# Sync from Project (Overrides/Adds Blueprints & Workflow)
if (Test-Path $ProjectSkills) {
    Write-Host "📥 Syncing Project-Specific Skills (Blueprints & Workflow)..." -ForegroundColor Gray
    Copy-Item -Path "$ProjectSkills\*" -Destination $OpenCodeShared -Recurse -Force -ErrorAction SilentlyContinue
}

# Manifest
$folders = Get-ChildItem -Path $OpenCodeShared -Directory
$metadata = @{
    version = "1.1.0"
    last_sync = [DateTime]::Now.ToString("yyyy-MM-dd HH:mm:ss")
    skills_count = $folders.Count
    skills = @()
}

foreach ($f in $folders) {
    $hasMd = Test-Path "$($f.FullName)\SKILL.md"
    $obj = @{
        name = $f.Name
        path = $f.FullName
        has_definition = $hasMd
    }
    $metadata.skills += $obj
}

$metadata | ConvertTo-Json -Depth 5 | Set-Content -Path $ManifestPath -Encoding utf8
Write-Host "✅ Multi-Sync Finished. Total Skills in Bridge: $($folders.Count)" -ForegroundColor Green
