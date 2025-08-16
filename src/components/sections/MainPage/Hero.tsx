import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredCell, setHoveredCell] = useState<{col: number, row: number} | null>(null);
    const [clickedCells, setClickedCells] = useState<Set<string>>(new Set());
    

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

            ctx.strokeStyle = '#000000';
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
        <div className="relative flex flex-row items-center justify-start p-4 bg-gray-100 h-full overflow-hidden">
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
