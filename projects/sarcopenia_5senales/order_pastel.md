# Ảnh cần tạo — phong cách pastel cho người lớn, nhiều nhân vật

Yêu cầu của bạn (30/10): **(1)** không khóa một nhân vật, mà có nhiều nhân vật khác nhau; **(2)** nhân vật biểu cảm hơn,
trông như phim hoạt hình cho người lớn (tỉ lệ người lớn, không chibi); **(3)** cảnh không lặp lại.
→ Mỗi khung hình chỉ dùng **một lần** trong video. Phần 1 dài 8:39, nên cần khoảng 46 hình.

## Câu phong cách (đã có sẵn ở đầu mọi prompt bên dưới)
"Warm pastel 2D cartoon for adults, same line and colour style as the attached reference…": cùng nét viền nâu mềm và
màu pastel như tấm nhân vật của bạn, nhưng **tỉ lệ người lớn** (đầu ≈ 1/6 chiều cao), người 60–80 tuổi có tóc bạc,
nếp nhăn và **nét mặt rõ cảm xúc** (lông mày, miệng).

## Dàn nhân vật (tạo tấm 0 trước, rồi đính kèm tấm 0 vào mọi tấm cảnh)
| Tên | Tuổi | Hình dáng | Vai trò |
|---|---|---|---|
| **Nhân vật chính của bạn** | ~65 | tóc xoăn nâu muối tiêu, kính tròn, áo thun vàng mù tạt, quần be | "bạn", người xem |
| **Pilar** | 68 | nữ, tóc bob bạc, áo len cardigan màu san hô | các dấu hiệu, bài tập |
| **José** | 72 | nam, cao gầy, mũ lưỡi trai vải (flat cap), áo gile xám | các dấu hiệu |
| **Lola** | 75 | nữ, tóc trắng xoăn búi, áo hoa, khuyên tai | các dấu hiệu |
| **Mercedes** | 63 | nữ, tóc ngắn màu nâu đỏ, kính đỏ, áo khoác thể thao | các dấu hiệu, bình luận |
| **Antonio** | 66 | nam, hói, tóc bạc hai bên, ria mép trắng, kính tròn, áo sơ mi xanh nhạt | câu chuyện Señal 1 (Sevilla) |
| **Rafael** | 69 | nam, tóc ngắn bạc, râu bạc ngắn, áo len xanh lá | câu chuyện Señal 2 (Valencia) |
| **Lucía** | 35 | nữ chuyên viên vật lý trị liệu, tóc đuôi ngựa, đồng phục xanh ngọc, không logo | hướng dẫn tập |

Gemini thường in một dấu lấp lánh nhỏ ở góc dưới bên phải ảnh; tôi sẽ cắt hoặc che đi.

---

# PHẦN 1: mở đầu + Señal 1 + Señal 2

## 0 · `reparto`: tấm dàn nhân vật (đính kèm tấm nhân vật của bạn)
*Tạo trước tiên: 8 nhân vật đứng thành hàng, kèm một hàng biểu cảm. Các tấm sau đính kèm tấm này để nhân vật giữ đúng mặt.*

> Warm pastel 2D cartoon for adults, same line and colour style as the attached reference (thick soft dark-brown outlines, flat pastel colours, minimal shading, rosy cheeks, simple round eyes) but with ADULT proportions (head about one sixth of body height, realistic older bodies) and expressive faces. Character lineup sheet on a flat cream #FCEDCE background, eight full-body characters standing side by side, front view, same scale, no text: 1) the character from the reference, aged about 65, salt-and-pepper curly hair, round glasses, mustard-yellow T-shirt, beige trousers; 2) Pilar, woman aged 68, silver bob haircut, coral cardigan, dark trousers; 3) José, man aged 72, tall and thin, grey flat cap, grey waistcoat over a white shirt; 4) Lola, woman aged 75, white curly hair in a bun, floral blouse, small earrings, a bit plump; 5) Mercedes, woman aged 63, short auburn hair, red glasses, sporty zip jacket; 6) Antonio, man aged 66, bald on top with white hair on the sides, white moustache, round glasses, light-blue shirt; 7) Rafael, man aged 69, short grey hair, short grey beard, green cardigan; 8) Lucía, woman aged 35, physiotherapist, ponytail, plain teal uniform without logos. Below them, a second row with the head of each character showing a different strong expression: frustrated, surprised, laughing, worried, proud, tired, determined, kind smile. 16:9, high resolution.

## A1 · `gancho1`: mở đầu (4 người, 4 dấu hiệu)
*Pilar chống tay đứng dậy khỏi sofa, José xách túi nặng, Lola bước ngắn lê chân, Mercedes trên cân mà quần rộng.*

> Warm pastel 2D cartoon for adults, same line and colour style and the same characters as the attached cast sheet (adult proportions, expressive faces, thick soft dark-brown outlines, flat pastel colours, minimal shading). Character illustration sheet, 2x2 grid of four separate panels with thin gaps, each panel with a different pastel background colour (peach, mint, sky blue, lilac), no text. Panel 1: Pilar struggling to get up from a low sofa, pushing hard with both hands, gritted teeth, strained eyebrows. Panel 2: José walking home with two heavy shopping bags, arms pulled down, exhausted face. Panel 3: Lola walking on a pavement with short shuffling steps, feet barely lifting, unsure look. Panel 4: Mercedes standing on a bathroom scale with a blank display, holding up trousers that are loose at the waist, eyebrows raised in surprise. 16:9, high resolution.

## A2 · `gancho2`: mở đầu (tuổi tác, tin vui, bình luận)
*Nhân vật chính soi gương nắn cánh tay gầy; Pilar thổi nến sinh nhật nhún vai "do tuổi?"; một nhóm người lớn tuổi tập thể dục vui vẻ trong công viên; Mercedes gõ bình luận trên điện thoại.*

> Warm pastel 2D cartoon for adults, same line and colour style and the same characters as the attached cast sheet (adult proportions, expressive faces, thick soft dark-brown outlines, flat pastel colours, minimal shading). Character illustration sheet, 2x2 grid of four separate panels with thin gaps, each panel with a different pastel background colour, no text, no numbers. Panel 1: the main character (salt-and-pepper curly hair, round glasses, mustard T-shirt) in front of a bathroom mirror pinching a thin upper arm, worried frown. Panel 2: Pilar at a small birthday table with a cake and candles, shrugging with a doubtful half-smile. Panel 3: José, Lola and Rafael doing simple exercises together in a sunny park, laughing, full of energy. Panel 4: Mercedes relaxed on a sofa typing on her smartphone (blank screen), big friendly smile. 16:9, high resolution.

## B1 · `manos1`: Señal 1, việc thường ngày
*Lola gồng mở hũ, José phải dùng hai tay cầm chảo, nhân vật chính "ngày trước" xách túi nhẹ tênh, Pilar nhờ hàng xóm xách giúp.*

> Warm pastel 2D cartoon for adults, same line and colour style and the same characters as the attached cast sheet (adult proportions, expressive faces, thick soft dark-brown outlines, flat pastel colours, minimal shading). Character illustration sheet, 2x2 grid of four separate panels with thin gaps, warm peach and coral pastel tones, no text. Panel 1: Lola in her kitchen straining to open a glass jar lid, face scrunched, tongue out in effort. Panel 2: José at the stove holding a heavy frying pan with both hands, wobbling, nervous expression. Panel 3: the main character a few years younger-looking, carrying two shopping bags easily with one hand each, cheerful and confident. Panel 4: Pilar at the entrance of her building, embarrassed smile, handing a heavy bag to a kind young neighbour. 16:9, high resolution.

## B2 · `manos2`: Señal 1, câu chuyện Antonio
*Antonio đặt túi xuống ở cửa tòa nhà, xoa ngón tay; nhún vai "chắc tại tuổi"; gặp chuyên viên Lucía đưa quả bóng; đi bộ mỗi ngày nhưng suy nghĩ "vậy chưa đủ".*

> Warm pastel 2D cartoon for adults, same line and colour style and the same characters as the attached cast sheet (adult proportions, expressive faces, thick soft dark-brown outlines, flat pastel colours, minimal shading). Character illustration sheet, 2x2 grid of four separate panels with thin gaps, Seville street and home settings in warm peach, coral and terracotta pastel tones, no text. All panels show Antonio (bald on top, white side hair, white moustache, round glasses, light-blue shirt). Panel 1: Antonio stopped at the doorway of his apartment building, two shopping bags on the ground, rubbing his aching fingers, wincing. Panel 2: Antonio on the street shrugging and waving it off with a resigned smile, as if saying "it's just age". Panel 3: Antonio sitting with the physiotherapist Lucía, who hands him a soft red rubber ball; Antonio curious and hopeful. Panel 4: Antonio walking alone in a park in the morning, thoughtful, finger on his chin. 16:9, high resolution.

## P0 · `agarre`: bài tập bàn tay (cận cảnh, không cần đính kèm ảnh nhân vật)
*3 hình cận cảnh bàn tay người lớn tuổi: tay thả lỏng cầm bóng, tay bóp bóng (bóng lõm), tay xách túi nhẹ với cổ tay thẳng.*

> Warm pastel 2D cartoon illustration for adults, thick soft dark-brown outlines, flat pastel colours, minimal shading. One single row of three close-up drawings of the same older person's right hand and forearm (light skin with a few age spots, mustard-yellow sleeve), same scale, evenly spaced on a flat cream #FCEDCE background, no text: 1) the open relaxed hand gently holding a soft red rubber ball, wrist straight; 2) the same hand squeezing the ball firmly with all fingers, the ball visibly squashed, forearm muscles slightly tensed, wrist straight; 3) the same hand holding a small light shopping bag by the handles, wrist straight, arm hanging relaxed. 21:9, high resolution.

## C1 · `silla1`: Señal 2, đứng dậy khỏi ghế
*José "mười năm trước" đứng bật dậy khỏi sofa; Mercedes chống hai tay lên tay vịn lắc người; Lola thử mấy lần mới đứng dậy được; nhân vật chính ngồi xoa đùi suy nghĩ.*

> Warm pastel 2D cartoon for adults, same line and colour style and the same characters as the attached cast sheet (adult proportions, expressive faces, thick soft dark-brown outlines, flat pastel colours, minimal shading). Character illustration sheet, 2x2 grid of four separate panels with thin gaps, mint green and sage pastel tones, no text. Panel 1: José looking a bit younger, getting up from a sofa effortlessly by just leaning forward, relaxed smile. Panel 2: Mercedes in an armchair pushing down hard on both armrests and rocking her body forward to stand up, strained face. Panel 3: Lola half-risen from a chair and falling back onto the seat, frustrated sigh, motion lines showing several attempts. Panel 4: the main character sitting on a chair, rubbing the front of the thighs, worried and thinking. 16:9, high resolution.

## C2 · `silla2`: Señal 2, câu chuyện Rafael
*Rafael tưới cây ở ban công; phải chống tay lên đầu gối mới đứng lên; ngại ghế đẩu thấp; tập đứng lên ngồi xuống cùng Lucía và cười tự hào.*

> Warm pastel 2D cartoon for adults, same line and colour style and the same characters as the attached cast sheet (adult proportions, expressive faces, thick soft dark-brown outlines, flat pastel colours, minimal shading). Character illustration sheet, 2x2 grid of four separate panels with thin gaps, Valencia home with a sunny balcony in mint, lemon and sky pastel tones, no text. All panels show Rafael (short grey hair, short grey beard, green cardigan). Panel 1: Rafael happily watering potted plants on a sunny balcony in the morning. Panel 2: Rafael getting up from his favourite armchair with both hands pushing on his knees, effort on his face. Panel 3: Rafael standing next to a very low stool, looking at it worried and hesitant. Panel 4: Rafael standing up from a sturdy chair placed against a wall, arms crossed on his chest, proud big smile, while the physiotherapist Lucía claps. 16:9, high resolution.

## P1 · `sit_to_stand`: động tác đứng lên – ngồi xuống (đính kèm tấm 0)
*Pilar làm mẫu, 4 tư thế xếp một hàng, nhìn ngang: ngồi thẳng → nghiêng người tới trước → nhấc mông → đứng thẳng.*

> Warm pastel 2D cartoon for adults, same line and colour style as the attached cast sheet (adult proportions, thick soft dark-brown outlines, flat pastel colours). Key-pose sheet of Pilar (woman aged 68, silver bob, coral cardigan, dark trousers, flat shoes), calm focused expression. Side view facing right, one single row of 4 poses, identical size, same floor line, evenly spaced, each pose with the same sturdy wooden chair without armrests standing against a plain wall. Feet flat on the floor, hip-width apart, slightly behind the knees, arms crossed on the chest in every pose. Pose 1: sitting upright, back straight, hips and knees at 90 degrees. Pose 2: still seated, trunk leaning forward about 35 degrees from the hips with a straight back, nose over the toes. Pose 3: buttocks just lifted off the seat, knees over the feet, trunk still leaning forward. Pose 4: standing fully upright in front of the chair, hips and knees straight, heels down. Flat cream background #FCEDCE, simple floor line, no labels, no numbers, no text, wide 21:9 image.

## H · `objetos`: đồ vật (dùng cho cả video; không cần đính kèm ảnh)
> Warm pastel 2D flat illustration sheet, cartoon explainer style for adults, thick soft dark-brown outlines, flat pastel colours, minimal shading, consistent style and scale. Nine items drawn SEPARATELY and evenly spaced in two rows on a flat cream #FCEDCE background: 1) a glass jar of preserves with a metal lid, 2) two full shopping bags with vegetables and bread, 3) a heavy black frying pan, 4) a soft red rubber stress ball, 5) a white bathroom scale with a blank display, 6) a red elastic resistance band in a loose loop, 7) the sole of an old shoe seen from below with the toe area visibly worn out, 8) a pair of small light dumbbells, 9) a pair of loose beige trousers. No text, no labels, no numbers, no logos, no brands, 16:9, high resolution.

## I · `musculos`: hình giải phẫu (dùng cho cả video; không cần đính kèm ảnh)
> Warm pastel 2D flat medical illustration sheet, friendly but anatomically correct, thick soft dark-brown outlines, flat pastel colours, minimal shading, consistent style and scale. Six items drawn SEPARATELY and evenly spaced in two rows on a flat cream #FCEDCE background: 1) a hand and forearm, palm side, with the forearm flexor muscles shown in soft red, fingers gently curled, 2) a leg in side view from hip to knee with the quadriceps on the front of the thigh and the gluteal muscles highlighted in soft red, 3) a lower leg in back view with the calf muscles (gastrocnemius and soleus) highlighted in soft red, 4) a round cross-section of a young adult's thigh: a large soft-red muscle area, a thin yellow fat ring, a white bone in the centre, 5) a round cross-section of an older inactive adult's thigh with the SAME outer size: a smaller soft-red muscle area, a thick yellow fat ring and yellow fat streaks inside the muscle, a white bone in the centre, 6) a single long muscle fibre cut open showing many small oval orange mitochondria inside. No text, no labels, no numbers, 16:9, high resolution.

---

## Thứ tự tạo
1. **0 `reparto`**, đính kèm tấm nhân vật của bạn.
2. A1, A2, B1, B2, C1, C2, P1: đính kèm **tấm 0**.
3. P0, H, I: không cần đính kèm.

# PHẦN 2 và PHẦN 3
Tôi sẽ viết theo cùng cách (dàn nhân vật này, mỗi khung dùng một lần, mỗi Señal một tông màu) khi bạn làm tới.
