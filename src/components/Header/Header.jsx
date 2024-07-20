const Header = () => {
    return (
        <div className="absolute top-0 p-4 w-full bg-black bg-opacity-30 flex ">
            <h1 className="text-2xl font-mono font-bold items-center text-white flex">
                    <span className="text-red-600 flex">
                        <div className="bg-white w-10 h-10 rounded-full"></div>
                        <div className="bg-amber-500 w-10 h-10 -translate-x-7 rounded-full"></div>
                    </span>
                <span className="-translate-x-4">Health Diagnosis Bot</span>
            </h1>
        </div>
    );
};

export default Header;