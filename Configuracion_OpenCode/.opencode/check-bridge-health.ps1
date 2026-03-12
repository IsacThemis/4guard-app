# ⚔️ TITAN Bridge: Health Check (Windows)

$OpenCodePath = "$env:USERPROFILE\.opencode"
$Status = "PASS"

Write-Host "--- TITAN BRIDGE INTEGRITY REPORT ---" -ForegroundColor Blue

$Checks = @(
    @{Name="Base Directory"; Path=$OpenCodePath},
    @{Name="Shared Skills"; Path="$OpenCodePath\shared-skills"},
    @{Name="Bridge Logic"; Path="$OpenCodePath\antigravity-integration.py"},
    @{Name="Backups Folder"; Path="$OpenCodePath\backups"}
)

foreach ($Check in $Checks) {
    if (Test-Path $Check.Path) {
        Write-Host "[OK] $($Check.Name) detected." -ForegroundColor Green
    } else {
        Write-Host "[FAIL] $($Check.Name) MISSING." -ForegroundColor Red
        $Status = "FAIL"
    }
}

$SkillsCount = (Get-ChildItem -Path "$OpenCodePath\shared-skills" -Directory).Count
Write-Host "`nSkills available in Bridge: $SkillsCount" -ForegroundColor Cyan

if ($Status -eq "PASS") {
    Write-Host "`n✅ INTEGRITY STATUS: NOMINAL" -ForegroundColor Green
} else {
    Write-Host "`n❌ INTEGRITY STATUS: COMPROMISED" -ForegroundColor Red
}
