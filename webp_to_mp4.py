import os
import subprocess
import imageio_ffmpeg

# FFffmpeg executable yolu
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

# Dosya yollari
output_dir = r"c:\ödev_1"
video1_webp = os.path.join(output_dir, "video_part1.webp")
video2_webp = os.path.join(output_dir, "video_part2.webp")
final_mp4 = os.path.join(output_dir, "karahan_games_complete_demo.mp4")

print("="*70)
print("KarahaN Games - Animated WebP to MP4 Converter")
print("="*70)

try:
    # Tek komutla iki videoyu birlestir ve MP4'e cevir
    # filter_complex kullanarak frame'leri al ve birlestir
    print("\nVideolar isleniyor ve birlestiriliyor...")
    print("(Bu islem birkac dakika surebilir...)\n")
    
    cmd = [
        ffmpeg_exe, '-y',
        '-i', video1_webp,
        '-i', video2_webp,
        '-filter_complex',
        '[0:v][1:v]concat=n=2:v=1:a=0[outv]',
       '-map', '[outv]',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-crf', '23',
        '-movflags', '+faststart',
        final_mp4
    ]
    
    # FFmpeg cikisini goster
    result = subprocess.run(cmd, capture_output=False, text=True)
    
    if result.returncode == 0 and os.path.exists(final_mp4):
        print("\n" + "="*70)
        print("[BASARILI!]")
        print("="*70)
        print(f"\nVideo basariyla olusturuldu:")
        print(f"  Dosya: {final_mp4}")
        print(f"  Boyut: {os.path.getsize(final_mp4) / 1024 / 1024:.2f} MB")
        print("="*70)
    else:
        print(f"\n[HATA] Video olusturulamadi (return code: {result.returncode})")
        
except Exception as e:
    print(f"\n[HATA]: {e}")
    import traceback
    traceback.print_exc()
