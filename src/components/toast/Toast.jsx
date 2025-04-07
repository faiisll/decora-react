import {toast} from "react-hot-toast"
import { TbCircleCheckFilled, TbInfoCircleFilled, TbCircleXFilled, TbInfoTriangleFilled} from "react-icons/tb";

const createToast = ({type, message} = {type: "default", message:  "message "}) =>{

  const generateStyle = (t) => {
    const stylesOpt = {
      info: "alert-info",
      success: "alert-success",
      error: "alert-error",
      warning: "alert-warning"
    }
    if(!Object.keys(stylesOpt).includes(t)) return ""
    return stylesOpt[t]
  }

  const generateIcon = (t) => {
    const stylesOpt = {
      success: TbCircleCheckFilled,
      error: TbCircleXFilled,
      warning: TbInfoTriangleFilled
    }
    if(!Object.keys(stylesOpt).includes(t)) return TbInfoCircleFilled
    return stylesOpt[t]

  }

  const toastStyle = generateStyle(type)
  const Icon = generateIcon(type)
  return toast.custom((t) => (
    <div className={`transition-opacity ${t.visible ? 'opacity-100' : 'opacity-0'}`}>
      <div role="alert" className={`alert ${toastStyle} alert-soft`}>
        
        <Icon className="h-5 w-5 mt-1" />
        <span>{message}</span>
      </div>

    </div>
    ))}

export default createToast