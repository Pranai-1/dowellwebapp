import Sidebar from "./Sidebar"
import { FaLessThan } from "react-icons/fa";
import { Fragment, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin2Fill } from "react-icons/ri";
export default function NpsLiteScale(){
const[goBack,setGoBack]=useState(false)
const[step,setStep]=useState(1)
const[numErr,setNumErr]=useState(false)
const[nameErr,setNameErr]=useState(false)
const[channelErr,setChannelErr]=useState(-1)
const[instanceErr,setInstanceErr]=useState({index:-1,idx:-1})
const[channelCount,setChannelCount]=useState(1)
const[requiredChannel,setRequiredChannel]=useState(-1)
const[requiredInstance,setRequiredInstance]=useState({index:-1,idx:-1})
const[formData,setFormData]=useState({
    scaleName:"",
    numResponses:"",
    channels:[
       { 
        channelName:"",
        instances:[""]
    }
    ]
})
    function handleBack(){
        setGoBack(true)
    }

    function handleCancel(){
        setGoBack(false)
    }

    function handleConfirm(){//nmeed to know the details
        console.log("going back")
        setGoBack(false)
    }
console.log(formData)
function handleFormData(value, name, index = 0, idx = 0) {
    switch (name) {
        case "scaleName":
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            if (value.length < 3) setNameErr(true);
            else setNameErr(false);
            break;

        case "numResponses":
            let num = Number(value);
            setFormData(prev => ({
                ...prev,
                [name]: num
            }));
            if (num < 30 || num > 10000) {
                setNumErr(true);
            } else {
                setNumErr(false);
            }
            break;

        case "channelName":
            const nameExists = formData.channels.some((channel, idx) => idx !== index && channel.channelName === value);
            if (nameExists) {
                setChannelErr(index)
            }else{
                setChannelErr(-1);
            }
            setFormData(prev => ({
                ...prev,
                channels: prev.channels.map((channel, idx) => idx === index ? { ...channel, channelName: value } : channel)
            }));
          
            break;

        case "InstanceName":
            const instanceExists = formData.channels[index].instances.includes(value)
              
            
            if (instanceExists) {
                setInstanceErr({index,idx});
            } else {
                setInstanceErr({index:-1,idx:-1});
            }
            console.log(idx)
            setFormData(prev => ({
                ...prev,
                channels: prev.channels.map((channel, i) => i === index ? {
                    ...channel,
                    instances: channel.instances.map((inst, iidx) => iidx === idx ? value : inst)
                } : channel)
            }));
        
            break;

        default:
            return formData;
    }
}

function increaseInstance(index){
    setFormData((prev)=>({
        ...prev,
        channels:prev.channels.map((channel,idx)=>idx==index?{
            ...channel,
            instances:[...channel.instances,""]
        }:channel)
    }))
}

function decreaseInstance(index){
    setFormData(prev => ({
        ...prev,
        channels: prev.channels.map((channel, idx) => {
            if (idx === index) {
                return {
                    ...channel,
                    instances: channel.instances.slice(0, -1)
                };
            }
            return channel;
        })
    }));
    if(instanceErr.index==index){
        setInstanceErr({index:-1,idx:-1})
    }
    
}

function addChannel(){
    let newChannel={
        channelName:"",
        instances:[""]
    }
    setFormData(prev => ({
        ...prev,
        channels:[...prev.channels,newChannel]
        
    }));
    
}

function deleteChannel(index){
    setFormData(prev => ({
        ...prev,
        channels: prev.channels.filter((channel, idx) => idx !== index)
        
    })); 
    if(channelErr==index){
        setChannelErr(-1)
    }
}

function handleNext(){
if(formData.scaleName.length<3){
    setNameErr(true)
}
if(formData.numResponses<25 || formData.numResponses>10000){
    setNumErr(true)
}
 formData.channels.map((channel,index)=>{
    if(channel.channelName.length==0 ){
        setRequiredChannel(index)
    }
 })
 formData.channels.map((channel,index)=>{
    channel.instances.map((instance,idx)=>{
        if(instance.length==0){
            setRequiredInstance({index,idx})
        }
    })
 })
}
console.log(instanceErr)
    const GoBackPopUp=({onCancel,onConfirm})=>{
        return(
           <div className="fixed top-1/3 left-[700px] w-[400px] h-max p-5 bg-white rounded-lg">
             <p className="font-bold">Are you sure?</p>
             <p className="mt-3">Changes made so far will not be saved.Do you really want to cancel the process and go back?</p>
             <div className="flex gap-4 justify-center items-center mt-3">
             <button className="p-2 px-4 bg-green-600 rounded-lg" onClick={onCancel}>No</button>
             <button className="p-2 px-4 bg-red-600 rounded-lg" onClick={onConfirm}>Yes</button>
             </div>
           </div>
        )
    }
    return(
          <div className="flex">
          <Sidebar/>
          <div className="h-full w-[80%] pl-5 relative overflow-auto left-72">
            <span className="  p-5 flex justify-start items-center gap-3">
         <FaLessThan onClick={handleBack}/>
            <span  className=" font-bold text-lg text-black">NPS LITE SCALE</span>
            </span>
            <div className="mt-5 p-5 py-10 ml-5 bg-gray-300 rounded-lg w-[95%] h-max">
                <p className="font-bold">NPS LITE SCALE eg.</p>
                <p className="font-sans font-medium text-sm">This is how a nps lite scale would look.</p>
                <p className="flex justify-center items-center font-sans font-medium p-3 text-lg mt-5">How was your experience using our product? Please rate your experience below.</p>
                <div className="flex justify-center items-center gap-6 mt-5">
                    <button className="bg-red-500 p-2 px-12 rounded-lg">Bad 😞</button>
                    <button  className="bg-yellow-400 p-2 px-12 rounded-lg">Average 😐</button>
                    <button  className="bg-green-500 p-2 px-12 rounded-lg">Excellent 😄</button>
                </div>
            </div>
            <div className="mt-14 p-5 ml-5 bg-gray-300 rounded-lg w-[95%] h-max">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                    <p className={`p-2 px-4 bg-green-500 text-xl rounded-full w-max`}>1</p>
                    <p>Configure your scale</p>
                    </div>
                    <div className={`h-[6px] w-[200px] ${step>1 ?"bg-green-500" :"bg-gray-400"} rounded-lg mt-5 m-3`}></div>
                    <div className="flex flex-col justify-center items-center">
                    <p className={`p-2 px-4 ${step>1 ?"bg-green-500" :"bg-gray-400"} text-xl rounded-full w-max`}>2</p>
                    <p>Customize your scale</p>
                    </div>
                    <div className={`h-[6px] w-[200px] ${step>2 ?"bg-green-500" :"bg-gray-400"} rounded-lg mt-5 m-3`}></div>
                    <div className="flex flex-col justify-center items-center">
                    <p className={`p-2 px-4 ${step>2 ?"bg-green-500" :"bg-gray-400"} text-xl rounded-full w-max`}>3</p>
                    <p>Preview your scale</p>
                    </div>
                   
                </div>
            <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col justify-start items-center gap-3 mt-10 w-full">
                <label className="p-2 font-medium" htmlFor="scaleName">Scale Name:</label>
                <input 
                    type="text" 
                    value={formData["scaleName"]} 
                    name="scaleName" 
                    placeholder="Enter scale name" 
                    onChange={e => handleFormData(e.target.value, e.target.name)} 
                    className="p-2 rounded-md px-4"
                />
                 {nameErr && <p className="text-xs text-red-600 items-end">**min 3 characters</p>}
            </div>

            <div className="flex flex-col justify-center items-center gap-5">
                <label className="p-2 font-medium" htmlFor="numResponses">No. of Responses per Instance:</label>
                <input type="number" value={formData["numResponses"]} name="numResponses" placeholder="Enter number" 
                 className="p-2 rounded-md px-4"
                 onChange={e => handleFormData(e.target.value,e.target.name)} />
                 {numErr && <p className="text-xs text-red-600 items-end">**(min:25- max:10000)</p>}
            </div>
            {formData.channels.map((channel,index1)=>(
                <div key={index1} className="flex justify-center items-center gap-5">
                 <div className="flex flex-col justify-start items-center gap-5">
                <label className="p-2 font-medium" htmlFor="channelName">Specify Channel:</label>
                <input type="text" value={channel.channelName}  name="channelName" placeholder="Enter channel name" 
                 className="p-2 rounded-md px-4"
                onChange={e => handleFormData(e.target.value,e.target.name,index1)} />
               {channelErr==index1 && <p className="text-xs text-red-600 items-end">**channel name already exists</p>}
               {requiredChannel==index1 && <p className="text-xs text-red-600 items-end">**required</p>}
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
                <label className="p-2 font-medium" htmlFor="InstanceName">Specify Instances:</label>
                {channel.instances.map((instance, index) => (
                    <>
                <input
                    key={index}
                    type="text"
                    value={instance}
                    name="InstanceName"
                    placeholder={`Enter instance ${index+1} name`}
                    onChange={e =>  handleFormData(e.target.value,e.target.name,index1,index)}
                    className="p-2 rounded-md px-4"
                />
                {instanceErr.index==index1 && instanceErr.idx==index && <p className="text-xs text-red-600 items-end">**instance name already exists</p>}
                {requiredInstance.index==index1 && requiredInstance.idx==index && <p className="text-xs text-red-600 items-end">**required</p>}
                </>
                ))}
               
            </div>
            <div className="flex justify-center items-center gap-2 mt-14">
            <button onClick={()=>decreaseInstance(index1)}>-</button>
            <p className="p-2 bg-white">{channel.instances.length} </p>
            <button onClick={()=>increaseInstance(index1)}>+</button>
            {index1>0 &&(
             <RiDeleteBin2Fill className="text-2xl cursor-pointer" onClick={()=>deleteChannel(index1)}/>
          )}
            </div>
          
                </div>
            ))}
             <button className="flex justify-center items-center gap-2 bg-blue-600 rounded-lg p-2 px-12"
             onClick={addChannel}
             >Add Channel <CiCirclePlus/></button>
            <button className="bg-green-600 p-2 px-10 rounded-lg" onClick={()=>handleNext()}>Next</button>
         </div>
    </div>
</div>
          {goBack &&( 
            <GoBackPopUp onCancel={handleCancel} onConfirm={handleConfirm}/>
          )}
         
        </div>
       
    )
}