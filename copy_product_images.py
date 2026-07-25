from pathlib import Path
import shutil
root = Path('Tobby & Yuki')
map = {
    1: 'Dog KH-DOG HARNESS',
    2: 'Dog BFLY-DOG HARNESS',
    3: 'Dog 5 IN 1 COMBO-CAMOUFLAGE',
    4: 'Cat Collar Bell Pack-5',
    5: 'Dog DRAGON WING HARNESS-NEON',
    6: 'Dog 5 IN 1 COMBO-KNIGHT',
    7: 'Cat KH-CAT HARNESS',
    8: 'Cat Collar Charm',
    9: 'Dog 5 IN 1 COMBO-FAIRY',
    10: 'Cat Collar Bell Pack-5',
    11: 'Cat BFLY-CAT HARNESS',
    12: 'Cat KH-CAT HARNESS',
    13: 'Dog TB-LEASH-5FT',
    14: 'Dog TY-Beige-Dog Leash',
    15: 'Dog TY-Green-Dog Leash',
}
public_root = Path('public/images/products')
for pid, folder_name in map.items():
    src_folder = root / folder_name
    if not src_folder.exists():
        print(f'MISSING FOLDER: {src_folder}')
        continue
    dest_folder = public_root / str(pid)
    dest_folder.mkdir(parents=True, exist_ok=True)
    files = sorted([f for f in src_folder.iterdir() if f.is_file()])
    if not files:
        print(f'NO FILES IN {src_folder}')
        continue
    for idx, src_file in enumerate(files, start=1):
        dst = dest_folder / f'{idx}.jpg'
        shutil.copy2(src_file, dst)
        print(f'COPIED {src_file.name} -> {dst}')
print('DONE')
