import cv2, numpy as np, subprocess, math
BG=(215,236,245); HOUSE=np.array([228,169,88],np.float32)  # BGR #58A9E4
P=[cv2.imread(f'qa/pose{i}.png') for i in range(4)]
for p in P: p[:,648:]=BG
def recolor(img):
    hsv=cv2.cvtColor(img,cv2.COLOR_BGR2HSV); m=cv2.inRange(hsv,(95,40,60),(130,255,255))>0
    mean=img[m].astype(np.float32).mean(axis=0); out=img.astype(np.float32)
    out[m]=np.clip(out[m]*(HOUSE/mean),0,255); return out.astype(np.uint8)
P=[recolor(p) for p in P]
# lock shins/feet to pose 0 (feathered)
mask=np.zeros(P[0].shape[:2],np.float32); mask[205:,478:]=1; mask=cv2.GaussianBlur(mask,(31,31),0)[...,None]
P=[(p*(1-mask)+P[0]*mask).astype(np.uint8) for p in P]
dis=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_ULTRAFAST)
dis=cv2.DISOpticalFlow_create(2)
G=[cv2.cvtColor(p,cv2.COLOR_BGR2GRAY) for p in P]
flows={}
for i in range(3):
    flows[(i,i+1)]=dis.calc(G[i],G[i+1],None); flows[(i+1,i)]=dis.calc(G[i+1],G[i],None)
h,w=G[0].shape; gx,gy=np.meshgrid(np.arange(w,dtype=np.float32),np.arange(h,dtype=np.float32))
def warp(img,flow,t):
    return cv2.remap(img,gx-flow[...,0]*t,gy-flow[...,1]*t,cv2.INTER_LINEAR,borderValue=BG)
def morph(i,j,t):
    if t<=0: return P[i]
    if t>=1: return P[j]
    a=warp(P[i],-flows[(j,i)],t)  # backward-mapped: sample A along flow from B->A
    b=warp(P[j],-flows[(i,j)],1-t)
    return (a.astype(np.float32)*(1-t)+b.astype(np.float32)*t).astype(np.uint8)
def mj(t): t=min(max(t,0),1); return t**3*(10-15*t+6*t*t)
seg=[('up',1.3),('hold',0.35),('down',1.8),('hold',0.45)]*2
fps=30; W,H=1920,1080; k=1.6
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r',str(fps),'-i','-','-c:v','libx264','-crf','17','-pix_fmt','yuv420p','out/situp_motion.mp4'],stdin=subprocess.PIPE)
T=0; state=0.0
for kind,d in seg:
    n=int(d*fps)
    for f in range(n):
        u=f/n
        if kind=='up': p=3*mj(u)
        elif kind=='down': p=3*(1-mj(u))
        else: p=state
        i=min(int(p),2); fr=morph(i,i+1,p-i)
        big=cv2.resize(fr,None,fx=k,fy=k,interpolation=cv2.INTER_CUBIC)
        canvas=np.full((H,W,3),BG,np.uint8); bh,bw=big.shape[:2]
        y0=H-bh-60; x0=(W-bw)//2; canvas[y0:y0+bh,x0:x0+bw]=big
        cv2.line(canvas,(x0-40,y0+bh-2),(x0+bw+40,y0+bh-2),(20,16,14),4)
        enc.stdin.write(canvas.tobytes())
    state=3.0 if kind=='up' else (0.0 if kind=='down' else state)
enc.stdin.close(); enc.wait(); print('ok')
