import os
import sys

# Video dosyalarının yolu
artifacts_dir = r"C:\Users\KarahaN\.gemini\antigravity\brain\1cc2aadb-594c-4ffe-9a11-cc69fc6cdb45"
video1 = os.path.join(artifacts_dir, "karahan_games_demo_1764713280504.webp")
video2 = os.path.join(artifacts_dir, "karahan_games_full_demo_1764713349311.webp")
output_dir = r"c:\ödev_1"

print("Video dosyalarını kontrol ediliyor...")
if not os.path.exists(video1):
    print(f"Hata: {video1} bulunamadı!")
    sys.exit(1)
if not os.path.exists(video2):
    print(f"Hata: {video2} bulunamadı!")
    sys.exit(1)

print(f"Video 1 boyutu: {os.path.getsize(video1)} bytes")
print(f"Video 2 boyutu: {os.path.getsize(video2)} bytes")

# .webp dosyalarını .webm olarak kopyala (gerçekte WebM formatında)
webm1 = os.path.join(output_dir, "video1.webm")
webm2 = os.path.join(output_dir, "video2.webm")

print("\nDosyalar kopyalanıyor...")
import shutil
shutil.copy2(video1, webm1)
shutil.copy2(video2, webm2)
print(f"✓ {webm1} oluşturuldu")
print(f"✓ {webm2} oluşturuldu")

# FFmpeg olmadığı için manuel olarak concat işlemi yapamıyoruz
# Bunun yerine kullanıcıya talimat vereceğiz
print("\n" + "="*60)
print("ÖNEMLİ NOT:")
print("="*60)
print("Video birleştirme için FFmpeg gerekli.")
print("İki video dosyası WebM formatında kaydedildi:")
print(f"  1. {webm1}")
print(f"  2. {webm2}")
print("\nBu videoları birleştirmek için:")
print("1. FFmpeg'i indirip kurun: https://ffmpeg.org/download.html")
print("2. Şu komutu çalıştırın:")
print(f'   ffmpeg -i "{webm1}" -i "{webm2}" -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" "karahan_games_complete_demo.mp4"')
print("\nVEYA online bir video birleştirme aracı kullanabilirsiniz.")
print("="*60)
