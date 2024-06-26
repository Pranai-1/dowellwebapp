export default function FontOptions({name,text,options,txt,formData,handleChange}){
    const value = formData && formData[name] ? formData[name] : "";
    return(
        <div className="flex flex-col gap-3">
        <label htmlFor={name} className=" font-medium">{text}</label>
        <select 
                    label={`Select a ${name}` }
                    name={name}
                    className={`appearance-none block text-md ${name=="fontSize" ? "w-[40px]" :"w-[280px]"} text-[#989093]  font-light  border border-[#DDDADB] p-2`}
                    value={value}
                    onChange={(e)=>handleChange(e.target.name,e.target.value)}
                >
                    {name!="fontSize" && <option value={''} >-- Select {txt}  --  </option>}
                    {options.map((opt, i) => ( 
                    <option key={i} >
                    {opt}
                    </option>
                    ))}
        </select>
        </div>
    )
}