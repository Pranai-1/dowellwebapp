import { Fragment,useState } from "react";
import FontColor from "./Helper/FontColor";
import FontOptions from "./Helper/FontOptions";
import { fontStyles } from "./utils/fontStyles"
import { IoIosArrowDown } from "react-icons/io";

export default function CustomizeNpxLite({formData,setFormData,setStep}){
    const[empty,setEmpty]=useState({
        leftText: false,
        rightText:false,
        centerText: false,
        orientation: false,
        fontStyle: false,
        fontFormat:false,
        timer:false,
    })

    const orientations = ['Vertical', 'Horizontal']
    const format = ['Numbers', 'emoji']
    const fontSizes=[10,12,14,16,18,20,22,24,28,30,32]

    function handleChange(name,value){
               setFormData((prev)=>({
                    ...prev,[name]:value
                })) 
                if(value.length>0)
                setEmpty((prev)=>({
                 ...prev,[name]:false
                }))    
             }

    function handleNext(){
        let error=false
        for (const prop in formData) {
          
            if(typeof formData[prop]=="string"){
            if (formData[prop].length === 0) {
                console.log(prop)
                error=true
                setEmpty((prev)=>({
                    ...prev,
                    [prop]:true
                }))
            }
        }
    }
    console.log(error)
       if(error)
          return
       else
        setStep((prev)=>prev+1)
    }
   
    return(
        <div className="flex flex-col gap-5 mt-10 ml-5">
            <div>
                <style>

                </style>
               <FontOptions name="orientation" text="Scale Orientation" txt="orientation" formData={formData} options={orientations} handleChange={handleChange}/>
               {empty.orientation && <p className="text-xs text-red-600 p-1">**required</p>}
               </div>
               <div className="flex justify-between items-center gap-10 w-[80%]">
                <div>
                <FontOptions name="fontStyle" text="Font Style" txt="font style" options={fontStyles} formData={formData} handleChange={handleChange}/>
                {empty.fontStyle && <p className="text-xs text-red-600 p-1">**required</p>}
                </div>
                <FontColor name="fontColor" text="Font Color" formData={formData} handleChange={handleChange}/>
                <FontOptions name="fontSize" text="Font Size" txt="font size"  options={fontSizes} formData={formData} handleChange={handleChange}/>
                </div>
                <div>
                <FontOptions name="fontFormat" text="Format" txt="font format" options={format} formData={formData} handleChange={handleChange}/>
                {empty.fontFormat && <p className="text-xs text-red-600 p-1">**required</p>}
                </div>
                <div className="flex justify-between items-center gap-16 w-[80%]">
                {[{value:"Left Value",name:"leftText"},{value:"Center Value",name:"centerText"},{value:"Right Value",name:"rightText"}].map((obj,index)=>(
                    <div key={index} className="flex flex-col gap-2 justify-center">
                   <label htmlFor={obj.name}
                    className="font-medium w-[280px] "
                   >{obj.value}</label>
                   <input type="text" name={obj.name} placeholder="Enter value"
                   onChange={(e)=>{handleChange(e.target.name,e.target.value)}}
                    className="p-2 font-light " value={formData[obj.name]}/>
                     {empty[obj.name] && <p className="text-xs text-red-600 p-1">**required</p>}
                   </div>
                ))}
                 </div>
                <div className="flex justify-between items-center gap-16 w-[80%]">
                {["Left Scale Color","Center Scale Color","Right Scale Color"].map((scale,index)=>(
                      <Fragment key={index}>
                    <FontColor  name={scale === "Left Scale Color" ? "leftColor" : scale === "Right Scale Color" ? "rightColor" :"centerColor"} formData={formData} text={scale} handleChange={handleChange}/>
                    </Fragment>
                ))}
                </div>
                <div  className="flex flex-col gap-2 justify-center">
                   <label htmlFor="timer"
                    className="font-medium "
                   >Toggle set timer</label>
                   <input type="text" name="timer" placeholder="Enter value" className="p-2 font-light  w-[280px]"
                   onChange={(e)=>handleChange(e.target.name,e.target.value)}/>
                    {empty.timer && <p className="text-xs text-red-600 p-1">**required</p>}
                 </div>
                <div className="flex justify-center items-center gap-10 mt-5">
                    <button className="bg-gray-500 p-2 px-8 text-white font-medium" onClick={()=>setStep((prev)=>prev-1)}>Previous</button>
                    <button className="bg-green-600 p-2 px-8 text-white font-medium" onClick={()=>handleNext()}>Next</button>
                </div>
        </div>
    )
}