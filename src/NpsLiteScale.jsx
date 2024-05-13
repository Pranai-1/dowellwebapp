import Sidebar from "./Sidebar"
import { FaLessThan } from "react-icons/fa";
import { Fragment, useState } from "react";

import CustomizeNpxLite from "./CustomizeNpxLite";
import ConfigureNpxLite from "./ConfigureNpxLite";
import PreviewNpxLite from "./PreviewNpxLite";


export default function NpsLiteScale(){
const[goBack,setGoBack]=useState(false)
const[step,setStep]=useState(1)
const[numErr,setNumErr]=useState(false)
const[nameErr,setNameErr]=useState(false)
const[channelErr,setChannelErr]=useState(-1)
const[instanceErr,setInstanceErr]=useState({index:-1,idx:-1})
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
    ],
    orientation: "",
    // user: "yes",  //should be boolean
    // question: "",
    // username: "Ndoneambrose",
   // scalecolor: "#E5E7E8",
    // numberrating: 10,
    // no_of_scales: 3,
    fontColor: "#E5E7E8",
    fontStyle: "",
    fontFormat:"",
    fontSize:16,
     timer: 0,
    // template_name: "testing5350",
    // name: "",
    // text: "good+neutral+best",
    leftText: "",
    rightText: "",
    centerText: "",
    leftColor: "#E5E7E8",
    rightColor: "#E5E7E8",
    centerColor: "#E5E7E8",
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
            setRequiredChannel(-1)
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
            setRequiredInstance({index:-1,idx:-1})
            const instanceExists = formData.channels[index].instances.includes(value)
              
            
            if (instanceExists) {
                setInstanceErr({index,idx});
            } else {
                setInstanceErr({index:-1,idx:-1});
            }
  
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
            if (idx === index && channel.instances.length>1) {
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
            let error=false
        if(formData.scaleName.length<3){
            setNameErr(true)
            error=true
        }

        if(formData.numResponses<25 || formData.numResponses>10000){
            setNumErr(true)
            error=true
            
        }

        formData.channels.map((channel, index) => {
        
            if (channel.channelName.length === 0) {
                setRequiredChannel(index);
                error=true
            }
        });


        formData.channels.map((channel, index) => {
            channel.instances.map((instance, idx) => {
                if (instance.length === 0) {
                    setRequiredInstance({index, idx});
                    error=true
                }
            });
        });



        if(error)
            return
        else
setStep((prev)=>prev+1)

}

    const GoBackPopUp=({onCancel,onConfirm})=>{
        return(
           <div className="fixed top-1/3 left-1/4 w-max h-max p-5 bg-white rounded-lg">
             <p className="font-bold">Are you sure?</p>
             <p className="mt-3 font-medium">Changes made so far will not be saved.Do you really </p>
             <p className="font-medium">want to cancel the process and go back?</p>
             <div className="flex gap-4 justify-center items-center mt-3">
             <button className="p-2 px-4 bg-green-600 rounded-lg" onClick={onCancel}>No</button>
             <button className="p-2 px-4 bg-red-600 rounded-lg" onClick={onConfirm}>Yes</button>
             </div>
           </div>
        )
    }
    return(
          <div>
       
          <div className="h-full relative overflow-hidden flex flex-col justify-center items-center">
            <span className="  p-5 flex justify-start items-center gap-3 w-full">
         <FaLessThan onClick={handleBack} className=" cursor-pointer"/>
            <span  className=" font-bold text-lg text-black">NPS LITE SCALE</span>
            </span>
             <style scoped>
                    {
                        `
                       
                        .div-changes {
                            padding: 40px 10px;
                            margin-left: 20px;
                        }

                        .button-changes {
                            padding: 5px 10px;
                            font-size:0.8rem;
                        }
                        .tracker-changes {
                            padding: 0px 8px;
                            font-size:0.8rem;
                        }
                        
                        .content-changes {
                            width: 100px;
                            font-size: 0.8rem;
                        }
                        @media (min-width: 768px) {
                            .div-changes {
                                padding: 40px;
                                margin-left: 56px;
                            }

                           
                            .content-changes {
                                width: 150px;
                                font-size:1rem
                            }
                            .tracker-changes {
                                padding: 8px 16px;
                            }
                        }
                        .text-changes {
                            font-size: 0.8rem;
                        }
                        @media (min-width:523px) {
                            .text-changes {
                                font-size: 1rem;
                            }
                        }
                        @media (min-width: 514px) {
                        .button-changes {
                            padding: 10px 10px;
                            font-size:1rem;
                        }
                    }
                        @media (min-width: 818px) {
                            .button-changes {
                                padding: 10px 40px;
                                font-size:1rem;
                            }
                    }
                        @media (min-width: 969px) {
                            .button-changes {
                                padding: 10px 60px;
                                font-size:1rem;
                            }
                    }
                        @media (min-width: 1121px) {
                        .button-changes {
                            padding: 10px 80px;
                            font-size:1rem;
                        }
                    }
                        
                        `
                    }
                </style>
       
               

                <div className="mt-5  bg-gray-300 rounded-lg  h-max  w-[80%] div-changes">
                    <div className="flex flex-col justify-start items-start">
                    <p className="font-bold">NPS LITE SCALE eg.</p>
                    <p className="font-sans font-medium text-sm">This is how a nps lite scale would look.</p>
                    </div>
                    <p className="flex justify-center items-center font-sans font-medium p-3 text-lg mt-5 text-ch">How was your experience using our product? Please rate your experience below.</p>
                  
             
                    <div className="flex justify-center items-center gap-12 mt-5">
                        <button className="bg-red-500  rounded-lg button-changes">Bad 😞</button>
                        <button  className="bg-yellow-400  rounded-lg button-changes">Average 😐</button>
                        <button  className="bg-green-500  rounded-lg button-changes" >Excellent 😄</button>
                    </div>
                </div>
             
         
             
            <div className="mt-14 pt-10 bg-gray-300 rounded-lg  h-max w-[80%] div-changes">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                
                    <p className={` bg-green-500 text-xl rounded-full w-max tracker-changes`}>1</p>
                    <p className="w-max  content-changes">Configure your scale</p>
                    </div>
                    <div className={`h-[6px] w-[200px] ${step>1 ?"bg-green-500" :"bg-gray-400"} rounded-lg mt-5 m-3`}></div>
                    <div className="flex flex-col justify-center items-center">
                    <p className={` ${step>1 ?"bg-green-500" :"bg-gray-400 "} tracker-changes text-xl rounded-full w-max`}>2</p>
                    <p className="w-max content-changes">Customize your scale</p>
                    </div>
                    <div className={`h-[6px] w-[200px] ${step>2 ?"bg-green-500" :"bg-gray-400"} rounded-lg mt-5 m-3`}></div>
                    <div className="flex flex-col justify-center items-center">
                    <p className={` ${step>2 ?"bg-green-500" :"bg-gray-400 "} tracker-changes text-xl rounded-full w-max`}>3</p>
                    <p className="w-max content-changes">Preview your scale</p>
                    </div>
                   
                </div>
                {step==1 && (
                     <ConfigureNpxLite
                     formData={formData} 
                     handleFormData={handleFormData} nameErr={nameErr} numErr={numErr} channelErr={channelErr}
                     requiredChannel={requiredChannel} requiredInstance={requiredInstance} instanceErr={instanceErr}
                    decreaseInstance={decreaseInstance} increaseInstance={increaseInstance} addChannel={addChannel}
                    deleteChannel={deleteChannel} handleNext={handleNext}
                     />
                 )}
                {step==2 && (
                    <CustomizeNpxLite formData={formData} setFormData={setFormData} setStep={setStep}/>
                )}
                 {step==3 && (
                    <PreviewNpxLite formData={formData} setStep={setStep}/>
                )}
    </div>
</div>
          {goBack &&( 
            <GoBackPopUp onCancel={handleCancel} onConfirm={handleConfirm}/>
          )}
         
        </div>
       
    )
}