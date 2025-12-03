import os
import subprocess

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
print("Video Donusturme ve Birlestirme Scripti")
print("="*70)

try:
    # Video 1'i MP4'e cevir
    print("\n1. Video 1 MP4'e donusturuluyor...")
    cmd1 = [
        'ffmpeg', '-y',
        '-f', 'webp_pipe',
        '-i', video1_webp,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-r', '25',
        video1_mp4
    ]
    subprocess.run(cmd1, check=True, capture_output=True)
    print(f"   [OK] {video1_mp4} olusturuldu")
    
    # Video 2'yi MP4'e cevir
    print("\n2. Video 2 MP4'e donusturuluyor...")
    cmd2 = [
        'ffmpeg', '-y',
        '-f', 'webp_pipe',
        '-i', video2_webp,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-r', '25',
        video2_mp4
    ]
    subprocess.run(cmd2, check=True, capture_output=True)
    print(f"   [OK] {video2_mp4} olusturuldu")
    
    # Birlestirme icin concat dosyasi olustur
    print("\n3. Videolar birlestiriliyor...")
    with open(concat_file, 'w') as f:
        f.write(f"file '{video1_mp4}'\n")
        f.write(f"file '{video2_mp4}'\n")
    
    # Videolari birlestir
    cmd3 = [
        'ffmpeg', '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', concat_file,
        '-c', 'copy',
        final_mp4
    ]
    subprocess.run(cmd3, check=True, capture_output=True)
    
    # Gecici dosyalari temizle
    os.remove(video1_mp4)
    os.remove(video2_mp4)
    os.remove(concat_file)
    
    print("\n" + "="*70)
    print("[BASARILI!]")
    print("="*70)
    print(f"Video olusturuldu: {final_mp4}")
    print(f"Boyut: {os.path.getsize(final_mp4) / 1024 / 1024:.2f} MB")
    print("="*70)
    
except subprocess.CalledProcessError as e:
    print(f"\n[HATA] FFmpeg komutu basarisiz: {e}")
    print(f"Cikti: {e.stderr.decode('utf-8', errors='ignore') if e.stderr else ''}")
except Exception as e:
    print(f"\n[HATA]: {e}")
    import traceback
    traceback.print_exc()
