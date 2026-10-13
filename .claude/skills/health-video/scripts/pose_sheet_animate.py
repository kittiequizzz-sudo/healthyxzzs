# Animate a pose sheet (key poses in one image): curl warp along the spine, planted per-pose legs,
# flow-aligned halfway swaps between drawings, hole fill. Built for the senior_m sit-up; generalise per exercise.
import cv2, numpy as np, subprocess, math
BG=np.array([215,236,245],np.uint8); BGf=BG.astype(np.float32); HOUSE=np.array([228,169,88],np.float32)
HIP=np.array([392.0,412.0])
HEAD=[(167,374),(241,251),(312,183),(393,132)]
ang=[math.degrees(math.atan2(HIP[1]-y, HIP[0]-x)) for x,y in HEAD]
def prep(i):
    p=cv2.imread(f'qa/pose{i}.png'); p[:,652:]=BG
    a=(np.abs(p.astype(int)-BG.astype(int)).max(axis=2)>28).astype(np.uint8)*255
    n,lab,st,_=cv2.connectedComponentsWithStats(a); keep=np.zeros_like(a)
    big=1+np.argmax(st[1:,4])
    for k in range(1,n):
        if k==big or (st[k,4]>150 and st[k,0]+st[k,2]<600): keep[lab==k]=255
    keep=cv2.morphologyEx(keep,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8))
    hsv=cv2.cvtColor(p,cv2.COLOR_BGR2HSV); m=cv2.inRange(hsv,(95,40,60),(130,255,255))>0
    out=p.astype(np.float32); out[m]=np.clip(out[m]*(HOUSE/out[m].mean(axis=0)),0,255)
    return out, keep
PP=[prep(i) for i in range(4)]
C=[c for c,_ in PP]; FG=[f for _,f in PP]
h,w=FG[0].shape
yy,xx=np.mgrid[0:h,0:w].astype(np.float32)
# legs = foreground common to all poses, right of the hip
common=FG[0].copy()
for f in FG[1:]: common=cv2.bitwise_and(common,f)
common[:, :int(HIP[0])-40]=0
n,lab,st,_=cv2.connectedComponentsWithStats(common); big=1+np.argmax(st[1:,4]); legs=(lab==big).astype(np.uint8)*255
legs=cv2.morphologyEx(legs,cv2.MORPH_CLOSE,np.ones((9,9),np.uint8))
legs=cv2.bitwise_and(cv2.dilate(legs,np.ones((9,9),np.uint8)),FG[0])
legs[:, 560:]=FG[0][:, 560:]  # feet
cv2.imwrite('qa/legs_mask.png',legs)
legs_cut=cv2.dilate(legs,np.ones((7,7),np.uint8))
hipdisk=(np.hypot(xx-HIP[0],yy-HIP[1])<70).astype(np.uint8)*255
LEGI=[]
for i in range(4):
    li=cv2.bitwise_and(cv2.dilate(legs,np.ones((11,11),np.uint8)),FG[i])
    li[:, 540:]=FG[i][:, 540:]
    LEGI.append(li)
def upper_alpha(i):
    cut=cv2.bitwise_and(LEGI[i],cv2.bitwise_not(hipdisk))
    return cv2.GaussianBlur(cv2.bitwise_and(FG[i],cv2.bitwise_not(cut)),(3,3),0).astype(np.float32)/255
UA=[upper_alpha(i) for i in range(4)]
LA=[cv2.GaussianBlur(LEGI[i],(3,3),0).astype(np.float32)/255 for i in range(4)]
R=np.hypot(xx-HIP[0],yy-HIP[1]); PHI=np.arctan2(yy-HIP[1],xx-HIP[0])
def smooth(a,b,x): t=np.clip((x-a)/(b-a),0,1); return t*t*(3-2*t)
def bend(img,alpha,deg,curl):
    # rotate about hip; for the curl phase the angle grows along the spine (lower back stays down)
    prof=smooth(40,260,R) if curl else 1.0
    th=np.radians(deg)*prof
    # rotation sign: screen coords; source = rotate dest by -th
    sx=HIP[0]+R*np.cos(PHI+th); sy=HIP[1]+R*np.sin(PHI+th)
    im=cv2.remap(img.astype(np.float32),sx.astype(np.float32),sy.astype(np.float32),cv2.INTER_LINEAR,borderValue=(0,0,0))
    al=cv2.remap(alpha,sx.astype(np.float32),sy.astype(np.float32),cv2.INTER_LINEAR,borderValue=0)
    return im,al
dis=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
def flowwarp(img,al,flow,t):
    mx=(xx+flow[...,0]*float(t)).astype(np.float32); my=(yy+flow[...,1]*float(t)).astype(np.float32)
    return cv2.remap(img,mx,my,cv2.INTER_LINEAR,borderValue=(0,0,0)), cv2.remap(al,mx,my,cv2.INTER_LINEAR,borderValue=0)
def comp(col,al):
    return col*al[...,None]+BGf*(1-al[...,None])
def frame(p):
    i=min(int(p),2); t=p-i; d=ang[i+1]-ang[i]; curl=(i==0)
    s=1.0 if t>=0.5 else 0.0
    A,Aa=bend(C[i],UA[i],-d*t,curl)
    B,Ba=bend(C[i+1],UA[i+1],d*(1-t),curl)
    if 0.2<t<0.8:
        fw=smooth(0.2,0.5,t) if t<0.5 else smooth(0.8,0.5,t)
        ga=cv2.cvtColor(comp(A,Aa).astype(np.uint8),cv2.COLOR_BGR2GRAY); gb=cv2.cvtColor(comp(B,Ba).astype(np.uint8),cv2.COLOR_BGR2GRAY)
        fab=dis.calc(ga,gb,None); fba=dis.calc(gb,ga,None)
        A,Aa=flowwarp(A,Aa,fba,fw*0.5)        # A moves toward B
        B,Ba=flowwarp(B,Ba,fab,fw*0.5)      # B moves toward A
    up=A*(1-s)+B*s; ua=Aa*(1-s)+Ba*s
    j=i if t<0.5 else i+1; lo=C[j]; la=LA[j]
    out=comp(up,ua)
    out=lo*la[...,None]+out*(1-la[...,None])
    # fill small holes inside the figure (where the moving torso and the planted hips meet)
    tot=np.clip(ua+la,0,1)
    solid=(tot>0.5).astype(np.uint8)*255
    closed=cv2.morphologyEx(solid,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(21,21)))
    hole=cv2.bitwise_and(closed,cv2.bitwise_not(solid))
    hole=cv2.bitwise_and(hole,(np.hypot(xx-HIP[0],yy-HIP[1])<170).astype(np.uint8)*255)
    out=np.clip(out,0,255).astype(np.uint8)
    if hole.any():
        out=cv2.inpaint(out,cv2.dilate(hole,np.ones((3,3),np.uint8)),5,cv2.INPAINT_TELEA)
    return out
def mj(t): t=min(max(t,0),1); return t**3*(10-15*t+6*t*t)
if __name__=='__main__':
    seg=[('hold',0.4),('up',1.4),('hold',0.4),('down',1.9)]*2+[('hold',0.4)]
    fps=30; W,H=1920,1080; k=1.65
    enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r',str(fps),'-i','-','-c:v','libx264','-crf','17','-pix_fmt','yuv420p','out/situp_motion.mp4'],stdin=subprocess.PIPE)
    state=0.0
    for kind,dur in seg:
        n=int(dur*fps)
        for f in range(n):
            u=f/n; p=3*mj(u) if kind=='up' else (3*(1-mj(u)) if kind=='down' else state)
            fr=frame(min(p,2.999)); big=cv2.resize(fr,None,fx=k,fy=k,interpolation=cv2.INTER_CUBIC)
            canvas=np.empty((H,W,3),np.uint8); canvas[:]=BG; bh,bw=big.shape[:2]
            y0=H-bh-70; x0=(W-bw)//2+40; canvas[y0:y0+bh,x0:x0+bw]=big
            cv2.line(canvas,(x0-60,y0+int(430*k)-4),(x0+bw+20,y0+int(430*k)-4),(20,16,14),4)
            enc.stdin.write(canvas.tobytes())
        if kind=='up': state=3.0
        if kind=='down': state=0.0
    enc.stdin.close(); enc.wait(); print('done')
