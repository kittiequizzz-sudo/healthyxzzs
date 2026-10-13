# Prototype: animate a pose sheet (keyframes in one image) with a locked lower body and hip pivot.
# Used for the senior_m sit-up test; generalise poses/pivot/regions per exercise.
import cv2, numpy as np, subprocess, math
BG=np.array([215,236,245],np.uint8); HOUSE=np.array([228,169,88],np.float32)
HIP=(392.0,412.0)
HEAD=[(167,374),(241,251),(312,183),(393,132)]
ang=[math.degrees(math.atan2(HIP[1]-y, HIP[0]-x)) for x,y in HEAD]  # trunk angle from floor
print('trunk angles', [round(180-a,1) for a in ang])
def prep(i):
    p=cv2.imread(f'qa/pose{i}.png'); p[:,648:]=BG
    a=(np.abs(p.astype(int)-BG.astype(int)).max(axis=2)>28).astype(np.uint8)*255
    n,lab,st,_=cv2.connectedComponentsWithStats(a); keep=np.zeros_like(a)
    big=1+np.argmax(st[1:,4]); keep[lab==big]=255
    for k in range(1,n):
        if st[k,4]>150 and st[k,0]<600: keep[lab==k]=255   # eyes/hair islands
    keep[:,600:]=0
    alpha=cv2.GaussianBlur(keep,(3,3),0)
    hsv=cv2.cvtColor(p,cv2.COLOR_BGR2HSV); m=cv2.inRange(hsv,(95,40,60),(130,255,255))>0
    out=p.astype(np.float32); out[m]=np.clip(out[m]*(HOUSE/out[m].mean(axis=0)),0,255)
    return np.dstack([out.astype(np.uint8),alpha])
P=[prep(i) for i in range(4)]
# masks: upper body = everything except locked lower body (shorts + legs region of pose 0)
h,w=P[0].shape[:2]
legs=np.zeros((h,w),np.float32); cv2.fillPoly(legs,[np.array([[322,432],[322,345],[445,300],[462,165],[620,150],[620,432]])],1)
legs=cv2.GaussianBlur(legs,(15,15),0)
LEGS=P[0].astype(np.float32)*legs[...,None]
def premul(img,m):
    f=img.astype(np.float32); a=f[...,3:4]/255.0*m[...,None]; return np.dstack([f[...,:3]*a,a])
def upper(i): return premul(P[i],1-legs)
U=[upper(i) for i in range(4)]
Lo=[premul(P[i],legs) for i in range(4)]
def rot(img,deg):
    M=cv2.getRotationMatrix2D(HIP,deg,1.0); return cv2.warpAffine(img,M,(w,h),flags=cv2.INTER_LINEAR,borderValue=0)
def over(dst,src):
    a=src[...,3:4]/255.0; dst[...,:3]=src[...,:3]*a+dst[...,:3]*(1-a); return dst
def frame(p):
    i=min(int(p),2); t=p-i; d=ang[i+1]-ang[i]
    # rotate pose i forward toward i+1 and pose i+1 backward; quick swap with 0.12 overlap
    s=np.clip((t-0.48)/0.04,0,1)
    a=rot(U[i], -d*t); b=rot(U[i+1], d*(1-t))
    up=a*(1-s)+b*s
    lo=Lo[i]*(1-s)+Lo[i+1]*s
    As=up[...,3:]+lo[...,3:]; n=np.maximum(As,1.0)
    col=(up[...,:3]+lo[...,:3])/n; A=As/n
    out=col+BG.astype(np.float32)*(1-A)
    return np.clip(out,0,255).astype(np.uint8)
def mj(t): t=min(max(t,0),1); return t**3*(10-15*t+6*t*t)
seg=[('hold',0.4),('up',1.3),('hold',0.4),('down',1.8)]*2+[('hold',0.4)]
fps=30; W,H=1920,1080; k=1.65
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r',str(fps),'-i','-','-c:v','libx264','-crf','17','-pix_fmt','yuv420p','out/situp_motion.mp4'],stdin=subprocess.PIPE)
state=0.0; nfr=0
for kind,dur in seg:
    n=int(dur*fps)
    for f in range(n):
        u=f/n; p=3*mj(u) if kind=='up' else (3*(1-mj(u)) if kind=='down' else state)
        fr=frame(min(p,2.999)); big=cv2.resize(fr,None,fx=k,fy=k,interpolation=cv2.INTER_CUBIC)
        canvas=np.empty((H,W,3),np.uint8); canvas[:]=BG; bh,bw=big.shape[:2]
        y0=H-bh-70; x0=(W-bw)//2+40; canvas[y0:y0+bh,x0:x0+bw]=big
        cv2.line(canvas,(x0-60,y0+int(430*k)-4),(x0+bw+20,y0+int(430*k)-4),(20,16,14),4)
        # breathing: tiny vertical scale
        enc.stdin.write(canvas.tobytes()); nfr+=1
    if kind=='up': state=3.0
    if kind=='down': state=0.0
enc.stdin.close(); enc.wait(); print('frames',nfr)
