# Video 3: hình minh hoạ 2D cho các cảnh hoạt hình

Mình làm phần chuyển động bằng code (hạt GLP-1, chìa khoá insulin bay, chuông rung, thước đo, nhãn chữ).
Bạn chỉ cần tạo **hình tĩnh từng cơ quan / đồ vật**, mỗi file một vật.

## Quy tắc chung (quan trọng)

- **Một vật duy nhất, nằm giữa khung, nền trắng tinh (#FFFFFF), không bóng đổ xuống nền**, không có gì khác trong hình.
  Mình tự xoá nền trắng, nên đừng để vật chạm mép khung (chừa lề khoảng 10 %).
- **Không chữ, không nhãn, không mũi tên, không số, không logo**.
- Khung **vuông 1:1**, càng lớn càng tốt (≥ 1536 px).
- **Cùng một style cho cả bộ**: tạo hình 1 (`a_corazon.png`) trước. Nếu ưng thì **đính kèm hình 1 vào mọi prompt sau**
  và thêm câu *"same illustration style as the attached image"*.
- Tên file đúng như bảng (gửi kiểu gì cũng được, mình sẽ đổi tên theo thứ tự nếu bạn ghi chú).

## Style (dán đoạn này vào đầu MỌI prompt)

> Flat 2D medical illustration in a modern editorial infographic style, like a high-end health documentary.
> Clean vector look with soft gradient shading and subtle highlights, slightly simplified but anatomically
> recognisable shapes, warm saturated colours, smooth edges, no outlines or only a thin darker outline of the
> same colour. Friendly and clear, not gory, not realistic photo, not 3D render, not cartoon with faces.
> Single object centered, isolated on a pure white background, no shadow, no text, no labels, no arrows,
> square 1:1, high resolution.

## Danh sách (≈ 14 hình)

| # | File | Dùng ở đoạn | Prompt (sau đoạn style) |
|---|---|---|---|
| 1 | `a_corazon.png` ★ làm trước | Corazón y riñones | A human heart, stylized anatomical heart with aorta and main vessels, front view, red and coral tones. |
| 2 | `a_rinones.png` | Corazón y riñones | A pair of human kidneys side by side with short ureters, front view, deep red-brown with lighter highlights. |
| 3 | `a_intestino.png` ★ | GLP-1 sale del intestino | The human small intestine coiled inside the frame of the large intestine, front view, soft pink and coral tones. |
| 4 | `a_pancreas.png` ★ | La fábrica de llaves | A human pancreas, horizontal, elongated shape with lobular texture, warm peach-orange tones. |
| 5 | `a_higado.png` | El hígado saca azúcar | A human liver, front view, deep burgundy-red with soft highlights, gallbladder small and green underneath. |
| 6 | `a_estomago.png` | Náuseas, vómito… | A human stomach with a short esophagus on top, front view, J-shape, pink-coral tones. |
| 7 | `a_cerebro.png` | “Ya estoy lleno” | A human brain, side view facing left, soft pink-lilac tones with clear folds. |
| 8 | `a_tiroides.png` | Tiroides | The thyroid gland (butterfly shape) wrapped on the front of the trachea with cartilage rings, front view, thyroid in rose-red, trachea in pale beige. |
| 9 | `a_ojo.png` | Retina | Cross-section of a human eyeball seen from the side: cornea and lens on the left, retina lining the back on the right and the optic nerve leaving to the right. Clean and simple, white sclera, retina in warm orange-red. |
| 10 | `a_raton.png` | Animales de laboratorio | A small white laboratory mouse, full body, side view facing right, cute but realistic proportions. |
| 11 | `a_campana.png` ★ | Cái “chuông” GLP-1 (dùng ở 5 cảnh) | A shiny golden hand bell (classic bell shape with a small handle on top), front view, gold with warm highlights. |
| 12 | `a_candado_oxido.png` | “Ổ khoá gỉ” | A big old padlock, closed, covered with orange-brown rust patches, front view, grey steel. |
| 13 | `a_candado_limpio.png` | ổ khoá hết gỉ một phần | **Đính kèm hình 12** và yêu cầu: *"Same padlock, same angle and size, but most of the rust is gone, clean shiny steel, shackle slightly open."* |
| 14 | `a_musculo.png` | Ít cơ = ít “cửa” cho đường | A bundle of red skeletal muscle fibers, horizontal, seen from the side with the round cut ends showing on the left, healthy red tones. |

★ = quan trọng nhất (xuất hiện lâu hoặc nhiều lần). Nếu chỉ kịp làm vài hình thì ưu tiên: 1, 3, 4, 11, 2, 6.

## Không cần làm

Chìa khoá insulin, viên đường, thước đo, lịch tiêm, cân, biểu đồ, biển cảnh báo: mình vẽ bằng code để chúng
chuyển động được.
