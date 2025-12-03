import os
import subprocess
import imageio_ffmpeg

# FFmpeg executable yolu
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

# Dosya yollari
artifacts_dir = r"C:\Users\KarahaN\.gemini\antigravity\brain\1cc2aadb-594c-4ffe-9a11-cc69fc6cdb45"
video1_webp = os.path.join(artifacts_dir, "karahan_games_demo_1764713280504.webp")
video2_webp = os.path.join(artifacts_dir, "karahan_games_full_demo_1764713349311.webp")

# Cikti yollari
output_dir = r"c:\ödev_1"
video1_mp4 = os.path.join(output_dir, "temp_video1.mp4")
video2_mp4 = os.path.join(output_dir, "temp_video2.mp4")
final_mp4 = os.path.join(output_dir, "karahan_games_complete_demo.mp4")
concat_file = os.path.join(output_dir, "concat.txt")

print("="*70)
print("KarahaN Games - Video Birlestirme Araci")
print("="*70)
print(f"\nFFmpeg: {ffmpeg_exe}")

try:
    # Video 1'i MP4'e cevir
    print("\n1. Video 1 MP4'e donusturuluyor...")
    print("   (Bu islem biraz zaman alabilir...)")
    cmd1 = [
        ffmpeg_exe, '-y',
        '-i', video1_webp,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'medium',
        '-movflags', '+faststart',
        video1_mp4
    ]
    result1 = subprocess.run(cmd1, capture_output=True, text=True)
    if result1.returncode != 0:
        print(f"   [HATA] Video 1 donusturulemedi")
        print(result1.stderr)
        raise Exception("Video 1 donusturme hatasi")
    print(f"   [OK] {os.path.basename(video1_mp4)} olusturuldu ({os.path.getsize(video1_mp4) / 1024 / 1024:.2f} MB)")
    
    # Video 2'yi MP4'e cevir
    print("\n2. Video 2 MP4'e donusturuluyor...")
    print("   (Bu islem biraz zaman alabilir...)")
    cmd2 = [
        ffmpeg_exe, '-y',
        '-i', video2_webp,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'medium',
        '-movflags', '+faststart',
        video2_mp4
    ]
    result2 = subprocess.run(cmd2, capture_output=True, text=True)
    if result2.returncode != 0:
        print(f"   [HATA] Video 2 donusturulemedi")
        print(result2.stderr)
        raise Exception("Video 2 donusturme hatasi")
    print(f"   [OK] {os.path.basename(video2_mp4)} olusturuldu ({os.path.getsize(video2_mp4) / 1024 / 1024:.2f} MB)")
    
    # Birlestirme icin concat dosyasi olustur
    print("\n3. Videolar birlestiriliyor...")
    with open(concat_file, 'w', encoding='utf-8') as f:
        # Windows path icin slash'lari duzelt
        f.write(f"file '{video1_mp4.replace(chr(92), '/')}'\n")
        f.write(f"file '{video2_mp4.replace(chr(92), '/')}'\n")
    
    # Videolari birlestir
    cmd3 = [
        ffmpeg_exe, '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', concat_file,
        '-c', 'copy',
        final_mp4
    ]
    result3 = subprocess.run(cmd3, capture_output=True, text=True)
    if result3.returncode != 0:
        print(f"   [HATA] Videolar birlestirilemedi")
        print(result3.stderr)
        raise Exception("Video birlestirme hatasi")
    
    # Gecici dosyalari temizle
    print("\n4. Gecici dosyalar temizleniyor...")
    if os.path.exists(video1_mp4):
        os.remove(video1_mp4)
    if os.path.exists(video2_mp4):
        os.remove(video2_mp4)
    if os.path.exists(concat_file):
        os.remove(concat_file)
    
    print("\n" + "="*70)
    print("[BASARILI!]")
    print("="*70)
    print(f"\nVideo basariyla olusturuldu:")
    print(f"  Dosya: {final_mp4}")
    print(f"  Boyut: {os.path.getsize(final_mp4) / 1024 / 1024:.2f} MB")
    print("\nVideo iki parcayi iceriyor:")
    print("  - Part 1: Karakter secimi ve boyama baslangici")
    print("  - Part 2: Tam ozellik turu (boyama, hikaye, bulmaca, video)")
    print("="*70)
    
except Exception as e:
    print(f"\n[HATA]: {e}")
    # Gecici dosyalari temizlemeye calis
    for f in [video1_mp4, video2_mp4, concat_file]:
        if os.path.exists(f):
            try:
                os.remove(f)
            except:
                pass
