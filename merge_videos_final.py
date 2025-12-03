#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
from moviepy.editor import VideoFileClip, concatenate_videoclips

# Video dosyalarinin yollari
artifacts_dir = r"C:\Users\KarahaN\.gemini\antigravity\brain\1cc2aadb-594c-4ffe-9a11-cc69fc6cdb45"
video1_path = os.path.join(artifacts_dir, "karahan_games_demo_1764713280504.webp")
video2_path = os.path.join(artifacts_dir, "karahan_games_full_demo_1764713349311.webp")
output_path = r"c:\ödev_1\karahan_games_complete_demo.mp4"

print("="*70)
print("KarahaN Games - Video Birlestirme Araci")
print("="*70)

# Dosyalari kontrol et
print("\n1. Video dosyalari kontrol ediliyor...")
if not os.path.exists(video1_path):
    print(f"   [HATA] {video1_path} bulunamadi!")
    sys.exit(1)
if not os.path.exists(video2_path):
    print(f"   [HATA] {video2_path} bulunamadi!")
    sys.exit(1)

print(f"   [OK] Video 1 bulundu: {os.path.getsize(video1_path) / 1024 / 1024:.2f} MB")
print(f"   [OK] Video 2 bulundu: {os.path.getsize(video2_path) / 1024 / 1024:.2f} MB")

try:
    # Video dosyalarini yukle
    print("\n2. Video dosyalari yukleniyor...")
    print("   (Bu islem biraz zaman alabilir...)")
    
    clip1 = VideoFileClip(video1_path)
    print(f"   [OK] Video 1 yuklendi - Sure: {clip1.duration:.2f} saniye")
    
    clip2 = VideoFileClip(video2_path)
    print(f"   [OK] Video 2 yuklendi - Sure: {clip2.duration:.2f} saniye")
    
    # Videolari birlestir
    print("\n3. Videolar birlestiriliyor...")
    final_clip = concatenate_videoclips([clip1, clip2], method="compose")
    print(f"   [OK] Birlestirilmis video suresi: {final_clip.duration:.2f} saniye")
    
    # MP4 olarak kaydet
    print("\n4. MP4 dosyasi olusturuluyor...")
    print(f"   Hedef: {output_path}")
    print("   (Bu islem birkac dakika surebilir...)")
    
    final_clip.write_videofile(
        output_path,
        codec='libx264',
        audio_codec='aac',
        temp_audiofile='temp-audio.m4a',
        remove_temp=True,
        fps=30
    )
    
    # Kaynaklari temizle
    clip1.close()
    clip2.close()
    final_clip.close()
    
    # Sonuc
    print("\n" + "="*70)
    print("[BASARILI!]")
    print("="*70)
    print(f"Video basariyla olusturuldu: {output_path}")
    print(f"Dosya boyutu: {os.path.getsize(output_path) / 1024 / 1024:.2f} MB")
    print("="*70)
    
except Exception as e:
    print(f"\n[HATA]: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
