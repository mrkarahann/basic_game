import os
import shutil

# Kaynak ve hedef yollar
artifacts_dir = r"C:\Users\KarahaN\.gemini\antigravity\brain\1cc2aadb-594c-4ffe-9a11-cc69fc6cdb45"
video1_src = os.path.join(artifacts_dir, "karahan_games_demo_1764713280504.webp")
video2_src = os.path.join(artifacts_dir, "karahan_games_full_demo_1764713349311.webp")

output_dir = r"c:\ödev_1"
video1_dest = os.path.join(output_dir, "karahan_games_demo_part1.webp")
video2_dest = os.path.join(output_dir, "karahan_games_demo_part2.webp")

print("="*70)
print("Video Dosyalarini Kopyalama")
print("="*70)

# Video dosyalarini kopyala
print("\nVideo dosyalari kopyalaniyor...")
shutil.copy2(video1_src, video1_dest)
print(f"[OK] {video1_dest}")

shutil.copy2(video2_src, video2_dest)
print(f"[OK] {video2_dest}")

print("\n" + "="*70)
print("[TAMAMLANDI]")
print("="*70)
print("\nVideo dosyalari proje klasorune kopyalandi:")
print(f"  - {video1_dest}")
print(f"  - {video2_dest}")
print("\nBu dosyalar animated WebP formatindadir.")
print("Online bir araçla mp4'e donusturebilir ve birlestir ilirsiniz:")
print("  - https://cloudconvert.com/webp-to-mp4")
print("  - https://ezgif.com/webp-to-mp4")
print("="*70)
