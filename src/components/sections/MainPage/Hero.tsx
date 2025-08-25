import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCell, setHoveredCell] = useState<{ col: number; row: number } | null>(null);

  // 초기 활성 셀들
  const initialCells = new Set([
    "33-11","34-10","34-11","34-12","35-9","35-10","35-11","35-12","35-13","35-25","35-26",
    "36-8","36-9","36-12","36-13","36-14","36-24","36-25","36-26","37-7","37-8","37-13",
    "37-14","37-15","37-23","37-24","37-25","37-26","38-6","38-7","38-14","38-15","38-21",
    "38-22","38-23","38-24","38-25","38-26","39-5","39-6","39-15","39-16","39-19","39-20",
    "39-21","39-22","39-25","39-26","40-4","40-5","40-15","40-16","40-17","40-18","40-19",
    "40-20","40-25","40-26","41-4","41-5","41-16","41-17","41-18","41-19","41-25","41-26",
    "42-4","42-5","42-15","42-16","42-17","42-18","42-25","42-26","43-4","43-5","43-13",
    "43-14","43-15","43-16","43-18","43-19","43-25","43-26","44-4","44-5","44-12","44-13",
    "44-14","44-19","44-20","44-24","44-25","44-26","45-4","45-5","45-11","45-12","45-13",
    "45-20","45-21","45-23","45-24","45-25","46-4","46-5","46-10","46-11","46-21","46-22",
    "46-23","46-24","47-4","47-5","47-9","47-10","47-20","47-21","47-22","47-23","48-4",
    "48-5","48-7","48-8","48-9","48-19","48-20","48-21","48-23","48-24","49-4","49-5",
    "49-6","49-7","49-8","49-17","49-18","49-19","49-24","49-25","50-4","50-5","50-6",
    "50-7","50-15","50-16","50-17","50-18","50-25","50-26","51-4","51-5","51-6","51-15",
    "51-16","51-26"
  ]);

  // 클릭 상태 (state + ref 동기화)
  const [clickedCells, setClickedCells] = useState<Set<string>>(initialCells);
  const clickedRef = useRef<Set<string>>(new Set(initialCells));

  // ▶︎ hover 억제: 어떤 셀이 “클릭으로 꺼졌고 아직 커서를 빼지 않음”이면 이 Set에 저장
  const suppressHoverRef = useRef<Set<number>>(new Set());

  // 캔버스/그리드
  const canvasInfoRef = useRef<{ cols: number; rows: number; cellWidth: number; cellHeight: number } | null>(null);

  // 베이스 타일 (검정 볼록)
  const baseTileRef = useRef<HTMLCanvasElement | null>(null);

  // glow 애니메이션
  const glowRef = useRef<Float32Array | null>(null);
  const targetRef = useRef<Float32Array | null>(null);
  const animatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // 라운드 사각형
  function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
    const p = new Path2D();
    const rr = Math.min(r, w / 2, h / 2);
    p.moveTo(x + rr, y);
    p.arcTo(x + w, y, x + w, y + h, rr);
    p.arcTo(x + w, y + h, x, y + h, rr);
    p.arcTo(x, y + h, x, y, rr);
    p.arcTo(x, y, x + w, y, rr);
    p.closePath();
    return p;
  }

  function makeBaseTile(size = 120): HTMLCanvasElement {
    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;
    const c = off.getContext("2d")!;

    const PAD = Math.round(size * 0.05);
    const R = Math.round(size * 0.15);
    const inner = roundedRectPath(PAD, PAD, size - PAD * 2, size - PAD * 2, R);

    // 배경
    c.fillStyle = "#111";
    c.fill(inner);

    // 헬퍼: inset shadow 근사
    function drawInsetGradient(color: string, offsetX: number, offsetY: number, blur: number, spread: number) {
      c.save();
      c.clip(inner);

      // inset은 안쪽에서 바깥쪽으로 어두워져야 하므로, gradient 방향 조절
      const g = c.createLinearGradient(
        PAD + offsetX, PAD + offsetY,
        size - PAD, size - PAD
      );
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g;

      c.fillRect(PAD, PAD, size - PAD * 2, size - PAD * 2);
      c.restore();
    }

    // 1) inset 3px 3px 4px -1px rgba(93,93,93,0.45)
    drawInsetGradient("rgba(93,93,93,0.45)", 3, 3, 4, -1);

    // 2) inset -4px -2px 4px 0px rgba(83,83,83,0.65)
    drawInsetGradient("rgba(83,83,83,0.65)", -4, -2, 4, 0);

    // 3) inset -2px 0px 2px -1px rgba(0,0,0,0.53)
    drawInsetGradient("rgba(0,0,0,0.53)", -2, 0, 2, -1);

    // 4) drop shadow 0px 0px 4px 0px rgba(0,0,0,1)
    c.save();
    c.shadowColor = "rgba(0,0,0,1)";
    c.shadowBlur = 4;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = "#0000";
    c.fill(inner);
    c.restore();

    return off;
  }


  // glow 그리기 (0~1)
  // 단조로운 흰색 + 극미한 중앙 하이라이트
// 헤일로(바깥 원형 빛) 없음 + 셀 내부에서만 부드럽게 페이드아웃
function drawGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  p: number
) {
  if (p <= 0) return;

  const S = Math.min(w, h);
  const cx = x + w / 2;
  const cy = y + h / 2;

  // 라운드 사각형 내부에만 그리기 → 바깥 원형 헤일로 완전 차단
  const PAD = Math.round(S * 0.05);
  const R   = Math.round(S * 0.15);
  const inner = roundedRectPath(x + PAD, y + PAD, w - PAD * 2, h - PAD * 2, R);

  ctx.save();
  ctx.clip(inner);

  // 셀 안에서만 흰 → 투명으로 부드럽게 페이드
  // 위쪽은 하얗게, 오른쪽 아래만 그림자지게
  const offsetX = S * 0.15; // 오른쪽으로 오프셋
  const offsetY = S * 0.15; // 아래쪽으로 오프셋
  const g = ctx.createRadialGradient(cx - offsetX, cy - offsetY, 0, cx, cy, S * 0.8);
  g.addColorStop(0.0, `rgba(255,255,255,${0.95 * p})`); // 위쪽 왼쪽이 가장 밝음
  g.addColorStop(0.6, `rgba(255,255,255,${0.5 * p})`);  // 중간
  g.addColorStop(1.0, "rgba(255,255,255,0)");           // 오른쪽 아래가 어두움

  // 가산합성은 유지해도 되고(더 밝게), 너무 세면 주석 처리해서 기본 합성 사용
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = g;

  // ❗ 바깥으로 나가지 않도록 셀 영역만 채운다 (헤일로 제거 핵심)
  ctx.fillRect(x, y, w, h);

  ctx.restore();
}



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = 60, rows = 30;
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    canvasInfoRef.current = { cols, rows, cellWidth, cellHeight };

    baseTileRef.current = makeBaseTile(120);

    glowRef.current = new Float32Array(cols * rows);
    targetRef.current = new Float32Array(cols * rows);

    // 초기 on
    initialCells.forEach(key => {
      const [cIdx, rIdx] = key.split("-").map(Number);
      const idx = rIdx * cols + cIdx;
      targetRef.current![idx] = 1; glowRef.current![idx] = 1;
    });

    // 전체 그리기
    const drawAll = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * cellWidth, y = r * cellHeight;
        if (baseTileRef.current) ctx.drawImage(baseTileRef.current, x, y, cellWidth, cellHeight);
        drawGlow(ctx, x, y, cellWidth, cellHeight, glowRef.current![r*cols+c]);
      }
    };
    drawAll();

    // 애니메이션
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const speedOn = 6, speedOff = 6;
      let anyDirty = false;

      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const cur = glowRef.current![idx], tgt = targetRef.current![idx];
        if (Math.abs(cur - tgt) < 0.002) continue;
        const rate = tgt > cur ? speedOn : speedOff;
        const k = 1 - Math.exp(-rate * dt);
        const next = cur + (tgt - cur) * k;
        glowRef.current![idx] = next; anyDirty = true;

        const x = c * cellWidth, y = r * cellHeight;
        ctx.clearRect(x, y, cellWidth, cellHeight);
        if (baseTileRef.current) ctx.drawImage(baseTileRef.current, x, y, cellWidth, cellHeight);
        drawGlow(ctx, x, y, cellWidth, cellHeight, next);
      }
      if (anyDirty) rafRef.current = requestAnimationFrame(step);
      else { animatingRef.current = false; rafRef.current = null; }
    };

    const ensureAnimating = () => {
      if (!animatingRef.current) {
        animatingRef.current = true;
        last = performance.now();
        rafRef.current = requestAnimationFrame(step);
      }
    };

    // 이벤트
    let lastHovered: { col: number; row: number } | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / cellWidth);
      const row = Math.floor((e.clientY - rect.top) / cellHeight);
      const ok = col >= 0 && col < cols && row >= 0 && row < rows;
      const curr = ok ? { col, row } : null;

      if (lastHovered?.col === curr?.col && lastHovered?.row === curr?.row) return;

      // 이전 hover 복원
      if (lastHovered) {
        const idx = lastHovered.row * cols + lastHovered.col;
        const key = `${lastHovered.col}-${lastHovered.row}`;
        // 이 칸에서 벗어나면 suppressHover 해제
        suppressHoverRef.current.delete(idx);
        targetRef.current![idx] = clickedRef.current.has(key) ? 1 : 0;
      }

      if (curr) {
        const idx = curr.row * cols + curr.col;
        const key = `${curr.col}-${curr.row}`;
        // suppressHover에 있으면 hover로는 안 켠다 (클릭 우선)
        if (!suppressHoverRef.current.has(idx)) {
          targetRef.current![idx] = clickedRef.current.has(key) ? 1 : 1;
        } else {
          targetRef.current![idx] = clickedRef.current.has(key) ? 1 : 0;
        }
      }

      lastHovered = curr;
      setHoveredCell(curr);
      ensureAnimating();
    };

    const handleMouseLeave = () => {
      if (lastHovered) {
        const idx = lastHovered.row * cols + lastHovered.col;
        const key = `${lastHovered.col}-${lastHovered.row}`;
        suppressHoverRef.current.delete(idx);
        targetRef.current![idx] = clickedRef.current.has(key) ? 1 : 0;
        lastHovered = null;
        setHoveredCell(null);
        ensureAnimating();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / cellWidth);
      const row = Math.floor((e.clientY - rect.top) / cellHeight);
      if (col < 0 || col >= cols || row < 0 || row >= rows) return;

      const key = `${col}-${row}`;
      const idx = row * cols + col;

      setClickedCells(prev => {
        const next = new Set(prev);
        // 토글
        if (next.has(key)) next.delete(key); else next.add(key);
        clickedRef.current = next;

        // 클릭이 hover보다 우선: 지금 결과가 꺼짐이면 hover 중이어도 0으로
        const isOn = next.has(key);
        targetRef.current![idx] = isOn ? 1 : 0;

        // 방금 클릭으로 꺼졌으면, 커서를 뺄 때까지 hover가 다시 못 켜게 억제
        if (!isOn) suppressHoverRef.current.add(idx);
        else suppressHoverRef.current.delete(idx);

        ensureAnimating();
        return next;
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cw = canvas.width / cols, ch = canvas.height / rows;
      canvasInfoRef.current = { cols, rows, cellWidth: cw, cellHeight: ch };
      const ctx2 = canvas.getContext("2d")!;
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * cw, y = r * ch;
        if (baseTileRef.current) ctx2.drawImage(baseTileRef.current, x, y, cw, ch);
        drawGlow(ctx2, x, y, cw, ch, glowRef.current![r*cols+c]);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-row items-center justify-start p-4 bg-black h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative flex flex-col ml-[calc(100vw/60*7)] items-start gap-4 z-10">
        <p className="text-2xl text-gray-400 font-medium">한양대학교 ERICA 소프트웨어융합대학</p>
        <h1 className="text-4xl text-white font-bold">알고리즘학회 영과일</h1>
        <Button variant="primary" onClick={() => window.open('https://forms.gle/tM5VeU42QsDkQ7cz7', '_blank')}>가입하기 →</Button>
      </div>
    </div>
  );
}