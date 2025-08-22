import zeroneCharacter from '@/assets/images/zerone_character.jpg';

export default function NotFound(){
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center p-4">
            <img src={zeroneCharacter} width={200} alt="" />
            <h1 className="text-2xl font-bold mb-4">404 Not Found</h1>
            <p className="text-center">죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
            <p className="text-center">페이지가 삭제되었거나, URL이 잘못되었을 수 있습니다.</p>
        </div>
    );
}