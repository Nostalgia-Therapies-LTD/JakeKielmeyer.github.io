import React, {useState} from 'react';
import PhotoFile from './PhotoFile';

const Upload =()=>{

    const [file, setfile] = useState(null);
    const [error, seterror] = useState(null);
    const types =['image/jpeg','image/png'];

    const changeHandler= (e) =>{
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)){
            setfile(selected);
            seterror('');
            console.log(selected);
        }
        else{
            setfile (null);
            seterror ('Please choose image file (jpeg or png)');
        }
    }

    return(
        <form className="form">
            <label className="label">
            <input className="label input" type = "file" onChange={changeHandler}/>
            <span>+</span>
            </label>
            <div>
            {error && <div>{error}</div>}
            {file && <div>{file.name}</div> }
            {file && <PhotoFile file={file} setfile={setfile}/>}
            </div> 
        </form>
    )
}

export default Upload;