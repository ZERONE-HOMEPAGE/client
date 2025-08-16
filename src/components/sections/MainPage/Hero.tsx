import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";


//고쳐야되는 오류: 리사이즈 시 캔버스 크기 조정이 안됨, header가 캔버스 위에 겹치게 해야하는데 sticky속성떄문에 안됨
//추가해야될거: 클릭한 셀의 색상 변경,작동로직 최적화, 코드분류(hooks, utils 등)

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredCell, setHoveredCell] = useState<{col: number, row: number} | null>(null);
    
    // 미리 칠해질 셀들(&로고)
    const initialCells = new Set([
        '33-11', '34-10', '34-11', '34-12', '35-9', '35-10', '35-11', '35-12', '35-13', '35-25', '35-26',
        '36-8', '36-9', '36-12', '36-13', '36-14', '36-24', '36-25', '36-26', '37-7', '37-8', '37-13',
        '37-14', '37-15', '37-23', '37-24', '37-25', '37-26', '38-6', '38-7', '38-14', '38-15', '38-21',
        '38-22', '38-23', '38-24', '38-25', '38-26', '39-5', '39-6', '39-15', '39-16', '39-19', '39-20',
        '39-21', '39-22', '39-25', '39-26', '40-4', '40-5', '40-15', '40-16', '40-17', '40-18', '40-19',
        '40-20', '40-25', '40-26', '41-4', '41-5', '41-16', '41-17', '41-18', '41-19', '41-25', '41-26',
        '42-4', '42-5', '42-15', '42-16', '42-17', '42-18', '42-25', '42-26', '43-4', '43-5', '43-13',
        '43-14', '43-15', '43-16', '43-18', '43-19', '43-25', '43-26', '44-4', '44-5', '44-12', '44-13',
        '44-14', '44-19', '44-20', '44-24', '44-25', '44-26', '45-4', '45-5', '45-11', '45-12', '45-13',
        '45-20', '45-21', '45-23', '45-24', '45-25', '46-4', '46-5', '46-10', '46-11', '46-21', '46-22',
        '46-23', '46-24', '47-4', '47-5', '47-9', '47-10', '47-20', '47-21', '47-22', '47-23', '48-4',
        '48-5', '48-7', '48-8', '48-9', '48-19', '48-20', '48-21', '48-23', '48-24', '49-4', '49-5',
        '49-6', '49-7', '49-8', '49-17', '49-18', '49-19', '49-24', '49-25', '50-4', '50-5', '50-6',
        '50-7', '50-15', '50-16', '50-17', '50-18', '50-25', '50-26', '51-4', '51-5', '51-6', '51-15',
        '51-16', '51-26'
    ]);
    
    const [clickedCells, setClickedCells] = useState<Set<string>>(initialCells);
    

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cols = 60;
        const rows = 30;
        const cellWidth = canvas.width / cols;
        const cellHeight = canvas.height / rows;

        canvasInfoRef.current = { cols, rows, cellWidth, cellHeight };

        let lastHoveredCell: {col: number, row: number} | null = null;

        const drawCell = (col: number, row: number) => {
            const x = col * cellWidth;
            const y = row * cellHeight;
            
            const isHovered = hoveredCell?.col === col && hoveredCell?.row === row;
            const cellKey = `${col}-${row}`;
            const isClicked = clickedCells.has(cellKey);
            
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2, 8);
            
            if (isClicked) {
                ctx.fillStyle = '#ef4444';
                ctx.fill();
            } else if (isHovered) {
                ctx.fillStyle = '#3b82f6';
                ctx.fill();
            }

            ctx.strokeStyle = '#0E0E0E';
            ctx.lineWidth = 1;
            ctx.stroke();
        };

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    drawCell(col, row);
                }
            }
        };

        drawGrid();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const col = Math.floor(mouseX / cellWidth);
            const row = Math.floor(mouseY / cellHeight);
            
            const newHoveredCell = (col >= 0 && col < cols && row >= 0 && row < rows) 
                ? {col, row} : null;
            
            const prevCell = lastHoveredCell;
            const currCell = newHoveredCell;
            
            if (!prevCell && !currCell) return;
            if (prevCell && currCell && prevCell.col === currCell.col && prevCell.row === currCell.row) return;
            
            if (prevCell) {
                drawCell(prevCell.col, prevCell.row);
            }
            
            if (currCell) {
                drawCell(currCell.col, currCell.row);
            }
            
            lastHoveredCell = currCell;
            setHoveredCell(currCell);
        };
        
        const handleMouseLeave = () => {
            if (lastHoveredCell) {
                drawCell(lastHoveredCell.col, lastHoveredCell.row);
            }
            lastHoveredCell = null;
            setHoveredCell(null);
        };
        
        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const col = Math.floor(mouseX / cellWidth);
            const row = Math.floor(mouseY / cellHeight);
            
            if (col >= 0 && col < cols && row >= 0 && row < rows) {
                const cellKey = `${col}-${row}`;
                console.log('Clicked cell:', cellKey);
                
                setClickedCells(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(cellKey)) {
                        newSet.delete(cellKey);
                    } else {
                        newSet.add(cellKey);
                    }
                    return newSet;
                });
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawGrid();
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('click', handleClick);
        window.addEventListener('resize', handleResize);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const prevHoveredCellRef = useRef<{col: number, row: number} | null>(null);
    const canvasInfoRef = useRef<{cols: number, rows: number, cellWidth: number, cellHeight: number} | null>(null);


    const redrawCell = useCallback((col: number, row: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !canvasInfoRef.current) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { cellWidth, cellHeight } = canvasInfoRef.current;
        const x = col * cellWidth;
        const y = row * cellHeight;
        
        const isHovered = hoveredCell?.col === col && hoveredCell?.row === row;
        const cellKey = `${col}-${row}`;
        const isClicked = clickedCells.has(cellKey);
        

        ctx.clearRect(x, y, cellWidth, cellHeight);
        
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2, 8);
        
        if (isClicked) {
            ctx.fillStyle = '#ef4444';
            ctx.fill();
        } else if (isHovered) {
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
        }

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }, [hoveredCell, clickedCells]);


    useEffect(() => {

        if (prevHoveredCellRef.current) {
            redrawCell(prevHoveredCellRef.current.col, prevHoveredCellRef.current.row);
        }
        
        if (hoveredCell) {
            redrawCell(hoveredCell.col, hoveredCell.row);
        }
        
        prevHoveredCellRef.current = hoveredCell;
    }, [hoveredCell, redrawCell]);

    useEffect(() => {
        clickedCells.forEach(cellKey => {
            const [col, row] = cellKey.split('-').map(Number);
            redrawCell(col, row);
        });
    }, [clickedCells, redrawCell]);

    return (
        <div className="relative flex flex-row items-center justify-start p-4 bg-black h-full overflow-hidden">
            <canvas 
                ref={canvasRef}
                className="absolute inset-0 z-0"
            />
            <div className="relative flex flex-col ml-[20%] items-start gap-4 z-10">
                <p className="text-2xl text-gray-600 font-medium">한양대학교 ERICA 소프트웨어융합대학</p>
                <h1 className="text-4xl text-white font-bold">알고리즘학회 영과일</h1>
                <Button variant="primary">가입하기</Button>
            </div>
        </div>
    );
}
