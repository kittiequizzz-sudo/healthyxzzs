# Video 1 (INTRO + PUNTO 1 + PUNTO 2): câu lệnh cho ChatGPT

Khoảng 1.180 từ, tức **khoảng 8 phút** giọng đọc. Cần 6 ảnh (22 hình). Câu lệnh viết riêng cho **ChatGPT**:
- Mỗi câu lệnh lặp lại đầy đủ phong cách và mô tả Antonio. ChatGPT hay tự kéo về kiểu hoạt hình tròn trịa
  của nó, nên cần liệt kê rõ những gì phải tránh.
- ChatGPT không làm khổ 16:9 hay 21:9; dùng **khổ ngang 3:2** (1536×1024).
- **Tạo tất cả trong cùng một cuộc trò chuyện**, để ChatGPT nhớ nhân vật.
- **Mỗi lần tạo đều đính kèm** `antonio_ref_clean.png`, và sau khi có ảnh 0 đạt thì đính kèm thêm `antonio_sheet`.

Lần thử đầu (`characters/antonio/try1_chatgpt_rejected.webp`) bị lệch so với ảnh mẫu: mặt tròn kiểu trẻ con,
mũi to, mắt chấm, tóc xù, áo xanh nhạt, màu tươi. Các câu lệnh dưới đây chặn đúng những lỗi đó.

## Khối mô tả dùng chung (đã có sẵn trong từng câu lệnh)
- **STYLE**: tranh minh họa 2D kiểu tạp chí sức khỏe, tỉ lệ người thật (đầu ≈ 1/7 chiều cao), nét viền đậm,
  tô bóng 1 tông, nếp nhăn bằng nét mực mảnh, màu dịu.
- **ANTONIO**: mặt trái xoan dài, gò má rõ, mũi thẳng đầu hơi đỏ, nếp nhăn trán và đuôi mắt, bọng mắt, mắt có
  lòng trắng và tròng xám, lông mày bạc cong, ria mép bạc dày gọn, tóc bạc ngắn chải ngược (mượt, không xù),
  hơi có bụng. Áo sơ mi caro xanh jean xám, tay dài xắn đến cẳng tay, thắt lưng nâu, quần kaki, giày trắng.
- **AVOID**: đầu to kiểu chibi, mặt tròn trẻ con, mũi củ, mắt chấm, màu tươi, áo xanh nhạt, tóc xoăn, chữ.

## ORDER 0: nhân vật Antonio (`antonio_sheet`)
Đính kèm `antonio_ref_clean.png`, rồi dán:

```
Create a full-body character turnaround of the man in the attached image. He must be clearly the same person, drawn in exactly the same illustration style.

STYLE: hand-drawn 2D editorial cartoon, like a modern health-magazine illustration. Semi-realistic adult proportions, head about 1/7 of body height. Thick dark outlines, cel shading with one clear shadow tone, fine ink lines for wrinkles, muted desaturated colours.

ANTONIO, 67 years old: long oval face with defined cheekbones, strong straight nose with a slightly reddish tip, forehead wrinkles, crow's feet and soft bags under the eyes, real eyes with white sclera and grey irises, arched expressive grey eyebrows, thick neat grey moustache, short grey hair combed back and slightly to the side, smooth. Peach skin with rosy cheeks. Ordinary build with a slight belly, not muscular. Muted denim blue-grey plaid button shirt with darker blue checks, long sleeves rolled up to the forearm, brown leather belt, khaki trousers, white sneakers.

LAYOUT: three views side by side, same size, standing relaxed, feet on the same ground line: front view, side view facing right, three-quarter view. Plain flat cream background #F5ECD7, no shadows on the ground.

AVOID: chibi or big-head proportions, round baby face, bulbous nose, dot eyes, curly or fluffy hair, light baby-blue shirt, bright saturated colours, any text, letters or logos. Landscape 3:2.
```

*Gửi ảnh cho tôi kiểm tra trước khi làm tiếp.*

---

> Từ ORDER 1A trở đi: đính kèm `antonio_sheet` (ảnh 0 đã đạt) **và** `antonio_ref_clean.png`.

## ORDER 1A: câu chuyện Antonio (`p1_antonio_a`)
*Nghĩa: 4 khung. Chống tay đứng dậy khỏi ghế bành · đi bộ buổi sáng · leo cầu thang · ngại ghế thấp ở nhà cháu.*

```
Create one image: a 2x2 grid of four separate illustration panels with thin white gaps. Every panel shows the same man, Antonio, from the attached character sheet; keep his face, hair, moustache and clothes identical.

STYLE (match the attached reference exactly): hand-drawn 2D editorial cartoon, semi-realistic adult proportions (head about 1/7 of body height), thick dark outlines, cel shading with one shadow tone, fine ink wrinkle lines, muted desaturated colours, simple cosy backgrounds in soft slate blue and warm wood tones.

ANTONIO: 67, long oval face, straight nose with a reddish tip, wrinkles, grey eyes, thick grey moustache, short grey hair combed back, slight belly. Muted denim blue-grey plaid shirt with sleeves rolled to the forearm, brown belt, khaki trousers, white sneakers.

Panel 1 (top left): Antonio in a low, soft armchair in his living room, pushing hard on both armrests with his hands to get up, a small effortful expression.
Panel 2 (top right): Antonio walking briskly and happily along a park path in early morning sunlight.
Panel 3 (bottom left): Antonio climbing indoor stairs slowly, holding the handrail, a little tired.
Panel 4 (bottom right): Antonio at his grandchildren's house, looking hesitantly at a very low child-size chair while two small grandchildren play on the floor.

AVOID: chibi proportions, round baby face, dot eyes, bright colours, any text, letters, speech bubbles, signs or logos. Landscape 3:2.
```

## ORDER 1B: những lúc cần sức mạnh (`p1_antonio_b`)
*Nghĩa: 4 khung. Vấp tấm thảm · ngồi mép giường buổi sáng · đứng dậy từ sàn nhà · ngồi ghế dựa tường chuẩn bị làm bài kiểm tra 30 giây.*

```
Create one image: a 2x2 grid of four separate illustration panels with thin white gaps. Every panel shows the same man, Antonio, from the attached character sheet; keep his face, hair, moustache and clothes identical.

STYLE (match the attached reference exactly): hand-drawn 2D editorial cartoon, semi-realistic adult proportions (head about 1/7 of body height), thick dark outlines, cel shading with one shadow tone, fine ink wrinkle lines, muted desaturated colours, simple cosy home backgrounds in soft slate blue and warm wood tones.

ANTONIO: 67, long oval face, straight nose with a reddish tip, wrinkles, grey eyes, thick grey moustache, short grey hair combed back, slight belly. Muted denim blue-grey plaid shirt with sleeves rolled to the forearm, brown belt, khaki trousers, white sneakers.

Panel 1 (top left): Antonio catching his foot on the turned-up edge of a rug in his living room, arms out, recovering his balance (he does not fall).
Panel 2 (top right): morning, Antonio in striped pyjamas sitting on the edge of his bed, about to stand up.
Panel 3 (bottom left): Antonio getting up from the living-room floor, kneeling on one knee, one hand on the seat of a sturdy wooden chair for support.
Panel 4 (bottom right): Antonio sitting on a sturdy armless wooden chair placed against a wall, arms crossed on his chest, ready to stand; a simple stopwatch with a blank face lies on a small side table next to him.

AVOID: chibi proportions, round baby face, dot eyes, bright colours, any text, letters, numbers, speech bubbles, signs or logos. Landscape 3:2.
```

## ORDER 1C: ẩn dụ chiếc xe + kết thúc có hậu (`p1_metaforas`)
*Nghĩa: 4 khung. Xe chạy đều trên đường bằng (= đi bộ) · xe lên dốc (= đứng dậy khỏi ghế) · Antonio nhìn chiếc ghế trong phòng khách · Antonio đứng dậy vui vẻ.*

```
Create one image: a 2x2 grid of four separate illustration panels with thin white gaps.

STYLE (match the attached reference exactly): hand-drawn 2D editorial cartoon, thick dark outlines, cel shading with one shadow tone, muted desaturated colours, soft slate-blue and warm backgrounds.

Panel 1 (top left): a small, friendly, rounded cartoon car (no brand, no face) driving calmly on a flat sunny road.
Panel 2 (top right): the same small car driving up a steep hill, small effort lines behind it.
Panel 3 (bottom left): Antonio from the attached character sheet (identical face, grey moustache, short grey hair combed back, denim blue-grey plaid shirt with rolled sleeves, khaki trousers, white sneakers) in his cosy living room, standing beside a sturdy wooden chair placed against the wall, looking at it with a curious, motivated smile.
Panel 4 (bottom right): the same Antonio standing up easily and confidently from a sturdy chair, smiling, one fist lightly raised in a small victory.

Antonio has semi-realistic adult proportions (head about 1/7 of body height). AVOID: chibi proportions, round baby face, dot eyes, bright colours, any text, letters, numbers or logos. Landscape 3:2.
```

## ORDER 1D: tư thế đứng dậy khỏi ghế (`sts_pose_sheet`)
*Nghĩa: 1 hàng 4 tư thế nhìn nghiêng, tay bắt chéo ngực: ngồi → cúi tới trước → nhấc hông → đứng thẳng. Bàn chân và ghế không di chuyển. Nền kem phẳng để tôi cắt rời. Video 2 dùng lại ảnh này.*

```
Create one image: an exercise step-by-step pose sheet of Antonio from the attached character sheet (identical face, grey moustache, short grey hair combed back, denim blue-grey plaid shirt with sleeves rolled to the forearm, brown belt, khaki trousers, white sneakers).

STYLE (match the attached reference exactly): hand-drawn 2D editorial cartoon, semi-realistic adult proportions, thick dark outlines, cel shading with one shadow tone, muted colours.

LAYOUT: one single row of 4 poses, left to right, evenly spaced, all the same size, all on the same floor line. Side view, Antonio faces right. Each pose has its own identical sturdy armless wooden chair; the chair and the feet stay in exactly the same position relative to each other in all 4 poses. Arms crossed on the chest in every pose.

Pose 1: sitting near the front edge of the chair, back straight and upright, knees bent at 90 degrees, feet flat on the floor, slightly behind the knees.
Pose 2: still seated, leaning the trunk forward from the hips about 45 degrees with a straight back, head in line with the spine, shoulders above the knees, heels down.
Pose 3: hips lifted about a hand's width above the seat, knees half bent, trunk still leaning forward, weight over the feet, heels down.
Pose 4: standing fully upright in front of the chair, hips and knees straight, chin level, arms still crossed.

BACKGROUND: plain flat cream #F5ECD7 everywhere, no gradient, no floor shadows, only a thin simple floor line.
AVOID: chibi proportions, round baby face, feet moving between poses, heels lifting, rounded back, any text, numbers, arrows or labels. Landscape 3:2.
```

## ORDER 1E: đồ vật + cơ đùi (`p1_objetos`)
*Nghĩa: 6 món vẽ tách rời: ghế · bậc thang · giày trắng · tấm thảm · trái tim · chân lộ cơ đùi. Nền kem phẳng để tôi cắt rời.*
*Chỉ cần đính kèm ảnh mẫu gốc (ông bà ngồi bàn), để trái tim giống trái tim trên máy tính bảng.*

```
Create one image: an illustration sheet of six separate objects, in the same hand-drawn 2D editorial cartoon style as the attached reference (thick dark outlines, cel shading with one shadow tone, muted warm colours).

Draw the six items well apart, evenly spaced in two rows of three, none touching:
1) a sturdy armless wooden kitchen chair, side view
2) a single indoor wooden stair step
3) a pair of white sneakers
4) a small living-room rug with one corner turned up
5) a friendly anatomical human heart, like the heart on the tablet in the reference
6) a human right leg in side view with the skin removed, showing the red thigh muscles: quadriceps on the front, gluteus maximus and hamstrings at the back, anatomically correct

BACKGROUND: plain flat cream #F5ECD7 everywhere, no gradient, no shadows.
AVOID: any text, labels, numbers, brands or logos. Landscape 3:2.
```

## Kiểm tra khi nhận ảnh
- Antonio giống ảnh mẫu: mặt dài, mắt có tròng, tóc chải ngược mượt, áo caro xanh jean (không xanh nhạt),
  tỉ lệ người thật.
- Không có chữ, số hay logo. Đồng hồ bấm giờ ở 1B để mặt trống.
- 1D: bàn chân không di chuyển, gót luôn chạm sàn, lưng thẳng khi cúi, nghiêng người trước rồi mới nhấc hông.
- 1D và 1E: nền kem phẳng một màu.
- Nếu một khung sai, sửa riêng khung đó trong cùng cuộc trò chuyện ("Edit only panel 3: …") thay vì tạo lại cả ảnh.

## Giọng đọc video 1 (`voice_p1.mp3`)
Đọc phần **"# PARTE 1"** trong `script.md` (từ đầu đến hết câu "Nos vemos en el próximo vídeo.", dừng trước "# PARTE 2").
Khoảng 1.180 từ, tầm 8 phút. Giọng ấm, chậm, rõ (khoảng 150 từ/phút), không nhạc nền, không đọc các tiêu đề "## …",
ngừng khoảng 1 giây trước mỗi PUNTO.
