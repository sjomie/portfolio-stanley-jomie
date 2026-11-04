# Usage : python3 scripts/cutout.py public/images/portrait.jpg public/images/portrait.png
# Puis : python3 -c "from PIL import Image; Image.open('public/images/portrait.png').save('public/images/portrait.webp', quality=88, method=6)"
# Dépendances : pip install pillow numpy scipy — conçu pour une photo sur fond uni.
# Détourage par fond uniforme : distance couleur au fond + remplissage depuis les bords.
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
im = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
h, w, _ = im.shape
# modèle de fond : dégradé vertical estimé sur les colonnes de bord
edge = np.concatenate([im[:, :40], im[:, -40:]], axis=1).mean(axis=1)  # (h,3)
d = np.linalg.norm(im - edge[:, None, :], axis=2)
bgish = d < 18
lab, _ = ndimage.label(bgish)
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(border))
fg = ~bg
fg = ndimage.binary_fill_holes(ndimage.binary_opening(fg, iterations=2))
lab2, n2 = ndimage.label(fg)
sizes = ndimage.sum(fg, lab2, range(1, n2 + 1))
fg = lab2 == (np.argmax(sizes) + 1)
# alpha doux sur le bord
dist_in = ndimage.distance_transform_edt(fg)
alpha = np.clip((dist_in - 1.5) / 2.5, 0, 1)
alpha = np.asarray(Image.fromarray((alpha * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))).astype(float) / 255
# Décontamination : retire la part du fond gris dans les pixels de bord
B = np.broadcast_to(edge[:, None, :], im.shape)
a3 = np.clip(alpha, 0.05, 1)[..., None]
col = np.where(alpha[..., None] < 0.999, np.clip((im - (1 - a3) * B) / a3, 0, 255), im)
near = (alpha > 0) & (dist_in < 6)
col[near] = col[near] * 0.88
out = Image.fromarray(col.astype('uint8')).convert('RGBA'); out.putalpha(Image.fromarray((alpha * 255).astype('uint8')))
out.save(sys.argv[2], optimize=True); print('ok')
