import { Fragment } from "react";
import FontColor from "./Helper/FontColor";
import FontOptions from "./Helper/FontOptions";
import { fontStyles } from "./utils/fontStyles"
import { IoIosArrowDown } from "react-icons/io";

export default function CustomizeNpxLite(props){
    const orientations = ['Vertical', 'Horizontal']
    const format = ['Numbers', 'emoji']
    const fontSizes=[10,12,14,16,18,20,22,24,28,30,32]

    function handleChange(name,value){
               props.setFormData((prev)=>({
                    ...prev,[name]:value
                }))     
             }
    
    return(
        <div className="flex flex-col gap-5 mt-10 ml-5">
               <FontOptions name="orientation" text="Scale Orientation" txt="orientation" formData={props.formData} options={orientations} handleChange={handleChange}/>
               <div className="flex justify-between items-center gap-10 w-[80%]">
                <FontOptions name="fontStyle" text="Font Style" txt="font style" options={fontStyles} formData={props.formData} handleChange={handleChange}/>
                <FontColor name="fontColor" text="Font Color"/>
                <FontOptions name="fontSize" text="Font Size" txt="font size" options={fontSizes} formData={props.formData} handleChange={handleChange}/>
                </div>
                <FontOptions name="fontformat" text="Format" txt="font format" options={format} formData={props.formData} handleChange={handleChange}/>
                <div className="flex justify-between items-center gap-16 w-[80%]">
                {["Left Value","Center Value","Right Value"].map((value,index)=>(
                    <div key={index} className="flex flex-col gap-2 justify-center">
                   <label htmlFor={value === "Left Value" ? "leftText" : value === "Right Value" ? "rightText" :"centerText"}
                    className="font-medium w-[280px] "
                   >{value}</label>
                   <input type="text" name={value === "Left Value" ? "leftText" : value === "Right Value" ? "rightText" :"centerText"} placeholder="Enter value"
                   onChange={(e)=>{handleChange(e.target.name,e.target.valuevalue)}}
                    className="p-2 font-light "/>
                   </div>
                ))}
                 </div>
                <div className="flex justify-between items-center gap-16 w-[80%]">
                {["Left Scale Color","Center Scale Color","Right Scale Color"].map((scale,index)=>(
                      <Fragment key={index}>
                    <FontColor  name={scale === "Left Scale Color" ? "leftColor" : scale === "Right Scale Color" ? "rightColor" :"centerColor"} formData={props.formData} text={scale} handleChange={handleChange}/>
                    </Fragment>
                ))}
                </div>
                <div  className="flex flex-col gap-2 justify-center">
                   <label htmlFor="timer"
                    className="font-medium "
                   >Toggle set timer</label>
                   <input type="text" name="timer" placeholder="Enter value" className="p-2 font-light  w-[280px]"
                   onChange={(e)=>handleChange(e.target.name,e.target.value)}/>
                   </div>
                <div className="flex justify-center items-center gap-10 mt-5">
                    <button className="bg-gray-500 p-2 px-8 text-white font-medium">Previous</button>
                    <button className="bg-green-600 p-2 px-8 text-white font-medium">Next</button>
                </div>
        </div>
    )
}