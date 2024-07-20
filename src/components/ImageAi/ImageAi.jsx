import {CgSpinner} from "react-icons/cg";
import {BiArrowBack, BiPlusMedical, BiSolidRightArrow, BiUpload} from "react-icons/bi";
import {PiNumberOneFill, PiNumberTwoFill} from "react-icons/pi";
import {useState} from "react";
import axios from "axios";
import {AiFillCaretRight} from "react-icons/ai";

const ImageAi = ({handleShowFeaturePage}) => {
    const [type, setType] = useState("heart");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [diagnosis, setDiagnosis] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        if (file) {
            formData.append("img", file);
            formData.append("type", type);
            axios.post('http://localhost:5000/image_response', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                setDiagnosis(res.data.response);
                setLoading(false);
            }).catch(err => console.log(err));
        }
    }

    return (
        <>
            <div className="w-[45rem] h-[35rem] bg-white p-1 shadow-2xl border-2 border-gray-300 rounded-2xl">
                <div className="flex justify-between border-b items-center border-gray-200 p-1 gap-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 border border-gray-200 rounded-full w-10 h-10">
                        <span className="flex justify-center items-center text-2xl text-red-600">
                            <BiPlusMedical/>
                        </span>
                        </div>
                        <h1 className="text-xl font-normal">Image Analysis</h1>
                    </div>
                    <button onClick={handleShowFeaturePage} className="text-2xl hover:text-gray-500 p-1">
                        <BiArrowBack/>
                    </button>
                </div>
                {!diagnosis && <div className="flex flex-grow flex-col p-4">
                    <div className="border-b flex flex-col gap-3 border-gray-200 pb-4">
                        <label htmlFor="selector" className="flex gap-1 items-center"><PiNumberOneFill/><span>Which are you going for?</span></label>
                        <div id="selector" className="flex gap-2">
                            <span>Heart</span>
                            <input type="radio" onChange={e => setType(e.target.value)} checked={type === 'heart'}
                                   name="heart" value={"heart"}/>
                            <span>Lungs</span>
                            <input type="radio" onChange={e => setType(e.target.value)} checked={type === 'lungs'}
                                   value={"lungs"}/>
                            <span>Brain</span>
                            <input type="radio" onChange={e => setType(e.target.value)} checked={type === 'brain'}
                                   value={"brain"}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-3">
                        <label htmlFor="selector" className="flex gap-1 items-center"><PiNumberTwoFill/><span>Please upload an image.</span></label>
                        <label htmlFor="image-upload" className="w-fit hover:cursor-pointer">
                            {!preview && <div
                                className="w-48 h-48 hover:bg-gray-200 overflow-clip rounded-2xl flex justify-center items-center bg-cover border border-gray-200">
                                <BiUpload/></div>}
                            {preview && <img
                                className="w-48 h-48 bg-cover overflow-clip rounded-2xl border border-gray-200 hover:contrast-75"
                                src={preview} alt="img"></img>}
                        </label>
                        <input id="image-upload" type="file" onChange={handleImageChange} className="hidden"/>
                    </div>
                    <button onClick={handleSubmit}
                            className="flex rounded-2xl self-center mt-4 gap-1 justify-center hover:bg-gray-600 bg-gray-800 text-white w-32 items-center p-2">
                        <span>Results</span>
                        {loading ? <CgSpinner className="animate-spin"/> :
                            <BiSolidRightArrow className="translate-y-0.5"/>}
                    </button>
                    <div className="flex flex-col text-sm border p-2 border-gray-200 gap-2 mt-4 bg-gray-50">
                        {type === 'lungs' &&
                            <span>The model differentiates between 5 classes: Viral Pneumonia, Corona Virus, Normal, Tuberculosis and Bacterial Pneumonia</span>}
                        {type === 'heart' && <span>The model differentiates between 2 classes: Sick and Normal</span>}
                        {type === 'brain' &&
                            <span>The model differentiates between 4 classes: Pituitary, No Tumor, Meningioma and Glioma </span>}
                    </div>
                </div>}
                {diagnosis && <div className="flex flex-grow items-center flex-col gap-2 p-4">
                    {preview && <img
                        className="w-64 h-64 bg-cover overflow-clip rounded-2xl border border-gray-200 hover:contrast-75"
                        src={preview} alt="img"></img>}
                    {diagnosis === 'Normal' || diagnosis === 'No Tumor' ?
                        <p className="text-2xl inline font-bold text-gray-800">From the above uploaded image, it appears
                            that you might be:</p> :
                        <p className="text-2xl inline font-bold text-gray-800">From the above uploaded image, it appears
                            that you might have:<AiFillCaretRight/></p>}
                    <span
                        className={`p-2 ${diagnosis === 'Normal' ? 'bg-green-500' : 'bg-red-500'} rounded-2xl font-bold text-2xl`}>{diagnosis}</span>
                </div>}
            </div>
        </>
    );
};

export default ImageAi;