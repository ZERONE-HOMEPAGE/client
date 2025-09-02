export default function Card({ children, className, animation }: { children: React.ReactNode; className?: string; animation?: string }) {
    return (
        <div data-aos={animation} className={`bg-white p-4 rounded shadow-md ${className}`}>
            {children}
        </div>
    );
}