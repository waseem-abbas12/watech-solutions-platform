# Watech Solutions - Production Android APK Build & Signing Script
param(
    [switch]$Bundle = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Watech Solutions - Production Android Build Pipeline" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Environment Setup
$sdkPath = "E:\android-sdk"
if (Test-Path $sdkPath) {
    $env:ANDROID_HOME = $sdkPath
    $env:ANDROID_SDK_ROOT = $sdkPath
    Write-Host "[OK] Using Android SDK at $sdkPath" -ForegroundColor Green
} else {
    Write-Warning "Android SDK not found at E:\android-sdk. Checking system environment..."
}

# 2. Capacitor Sync
Write-Host "
[1/3] Syncing Capacitor plugins and configuration..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Error "Capacitor sync failed!"
    exit 1
}

# 3. Build with Gradle
Set-Location -Path "android"

if ($Bundle) {
    Write-Host "
[2/3] Building Signed Android App Bundle (AAB) for Google Play..." -ForegroundColor Yellow
    cmd.exe /c "gradlew.bat :app:bundleRelease -x lint -x lintVitalRelease"
} else {
    Write-Host "
[2/3] Building Signed Production APK..." -ForegroundColor Yellow
    cmd.exe /c "gradlew.bat :app:assembleRelease -x lint -x lintVitalRelease"
}

if ($LASTEXITCODE -ne 0) {
    Set-Location -Path ".."
    Write-Error "Gradle build failed!"
    exit 1
}

Set-Location -Path ".."

# 4. Copy Output Artifact
$releaseDir = "android\app\build\outputs\apk\release"
$apkFile = Get-ChildItem -Path $releaseDir -Filter "*.apk" -ErrorAction SilentlyContinue | Select-Object -First 1
$downloadDir = "public\downloads"
$targetApk = Join-Path $downloadDir "watech-solutions.apk"

if ($apkFile) {
    $apkSource = $apkFile.FullName
    if (-not (Test-Path $downloadDir)) {
        New-Item -ItemType Directory -Path $downloadDir -Force | Out-Null
    }
    Copy-Item -Path $apkSource -Destination $targetApk -Force
    $fileSize = (Get-Item $targetApk).Length / 1MB
    Write-Host "
[3/3] Build Successful!" -ForegroundColor Green
    Write-Host "Output APK : $targetApk" -ForegroundColor Cyan
    Write-Host ("File Size  : {0:N2} MB" -f $fileSize) -ForegroundColor Cyan
    Write-Host "Download URL: /downloads/watech-solutions.apk" -ForegroundColor Green
} elseif ($Bundle) {
    $aabSource = "android\app\build\outputs\bundle\release\app-release.aab"
    Write-Host "
[3/3] Build Successful!" -ForegroundColor Green
    Write-Host "Google Play Bundle (AAB): $aabSource" -ForegroundColor Cyan
} else {
    Write-Warning "Build completed, but output file was not found at $apkSource"
}

Write-Host "========================================================" -ForegroundColor Cyan
